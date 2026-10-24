import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

function loadService({ readFailure = false } = {}) {
  const calls = { queries: [], writes: [] };
  const firestore = {
    collection: () => "rankings",
    doc: (...args) => args.slice(1).join("/"),
    setDoc: async (...args) => calls.writes.push(args),
    query: (...args) => args,
    where: (...args) => ({ where: args }),
    orderBy: (...args) => ({ orderBy: args }),
    limit: (count) => ({ limit: count }),
    serverTimestamp: () => "server-timestamp",
    getDocs: async (query) => {
      calls.queries.push(query);
      if (readFailure) throw new Error("Missing index or permission denied");
      return {
        forEach: (callback) => callback({
          id: "entry",
          data: () => ({ playerName: "Player", score: 120, mode: "classic", difficulty: "regular", timestamp: { seconds: 1 } })
        })
      };
    }
  };
  const constants = { MIN_SCORE_FOR_RANKING: 10, MAX_RANKINGS_PER_MODE: 10, FIREBASE: { COLLECTION: "rankings", CACHE_DURATION: 300000 } };
  const modules = {
    "firebase/firestore": firestore,
    "@/config/firebase": { db: {} },
    "@/constants/rankings": { RANKING_CONSTANTS: constants },
    "@/utils/rankingUtils": {
      sanitizePlayerName: (name) => name.trim(),
      isValidPlayerName: (name) => /^[a-zA-Z0-9 _.-]{2,20}$/.test(name)
    }
  };
  const source = readFileSync(new URL("../src/services/rankingService.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  const exports = {};
  runInNewContext(compiled.outputText, {
    exports,
    require: (name) => {
      assert.ok(name in modules, `Unexpected dependency: ${name}`);
      return modules[name];
    }
  });
  return { service: exports.rankingService, calls };
}

test("score submission writes one entry and only reads a bounded leaderboard", async () => {
  const { service, calls } = loadService();
  const result = await service.submitScore("Player", 120, "classic", "regular");
  assert.equal(result.rank, 1);
  assert.equal(calls.writes.length, 1);
  assert.equal(calls.queries.length, 1);
  assert.equal(calls.queries[0].find((constraint) => constraint?.limit)?.limit, 10);
});

test("a failed leaderboard query never retries an unbounded read", async () => {
  const { service, calls } = loadService({ readFailure: true });
  const entries = await service.getRankings("classic", "regular");
  assert.equal(entries.length, 0);
  assert.equal(calls.queries.length, 1);
  assert.equal(calls.queries[0].find((constraint) => constraint?.limit)?.limit, 10);
});

test("invalid scores are rejected before sending database writes", async () => {
  const { service, calls } = loadService();
  await assert.rejects(service.submitScore("Player", 100001, "classic", "regular"), /Invalid score/);
  assert.equal(calls.writes.length, 0);
});
