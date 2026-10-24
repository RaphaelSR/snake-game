import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { after, before, beforeEach, test } from "node:test";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment
} from "@firebase/rules-unit-testing";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setLogLevel,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";

let environment;
let db;

const ranking = (changes = {}) => ({
  playerName: "Player 1",
  score: 120,
  mode: "classic",
  difficulty: "regular",
  timestamp: serverTimestamp(),
  ...changes
});

before(async () => {
  setLogLevel("silent");
  assert.match(
    process.env.FIRESTORE_EMULATOR_HOST ?? "",
    /^(127\.0\.0\.1|localhost):\d+$/,
    "Run these tests with the local Firestore emulator"
  );
  const [host, port] = process.env.FIRESTORE_EMULATOR_HOST.split(":");
  environment = await initializeTestEnvironment({
    projectId: "demo-snake-security",
    firestore: {
      host,
      port: Number(port),
      rules: await readFile(new URL("../firestore.rules", import.meta.url), "utf8")
    }
  });
  db = environment.unauthenticatedContext().firestore();
});

beforeEach(async () => environment.clearFirestore());
after(async () => environment?.cleanup());

test("guests can submit every supported mode and difficulty", async () => {
  for (const mode of ["classic", "infinite", "moving_food", "time_attack"]) {
    for (const difficulty of ["easy", "regular", "hard"]) {
      await assertSucceeds(setDoc(doc(db, "rankings", `${mode}_${difficulty}`), ranking({ mode, difficulty })));
    }
  }
});

test("the game can read the top ten scores without reading the full collection", async () => {
  await environment.withSecurityRulesDisabled(async (context) => {
    const seedDb = context.firestore();
    for (let index = 0; index < 12; index++) {
      await setDoc(doc(seedDb, "rankings", `entry_${index}`), ranking({ score: 10 + index }));
    }
  });
  const scores = await assertSucceeds(getDocs(query(
    collection(db, "rankings"),
    where("mode", "==", "classic"),
    where("difficulty", "==", "regular"),
    orderBy("score", "desc"),
    limit(10)
  )));
  assert.equal(scores.size, 10);
  assert.equal(scores.docs[0].data().score, 21);
  await assertFails(getDocs(collection(db, "rankings")));
  await assertFails(getDocs(query(collection(db, "rankings"), limit(11))));
});

test("clients cannot overwrite, update, delete or read individual entries", async () => {
  const entry = doc(db, "rankings", "existing");
  await assertSucceeds(setDoc(entry, ranking()));
  await assertFails(setDoc(entry, ranking({ score: 999 })));
  await assertFails(updateDoc(entry, { score: 999 }));
  await assertFails(deleteDoc(entry));
  await assertFails(getDoc(entry));
});

test("writes reject unsupported fields, missing fields and forged timestamps", async () => {
  await assertFails(setDoc(doc(db, "rankings", "extra"), ranking({ email: "private@example.test" })));
  const missing = ranking();
  delete missing.playerName;
  await assertFails(setDoc(doc(db, "rankings", "missing"), missing));
  await assertFails(setDoc(doc(db, "rankings", "timestamp"), ranking({ timestamp: Timestamp.fromMillis(1) })));
});

test("writes reject invalid scores, names, modes and difficulties", async () => {
  const invalid = [
    { score: -1 }, { score: 9 }, { score: 100001 }, { score: 12.5 }, { score: "120" },
    { playerName: "x" }, { playerName: "x".repeat(21) }, { playerName: "<script>" },
    { mode: "unsupported" }, { difficulty: "unsupported" }
  ];
  for (const [index, changes] of invalid.entries()) {
    await assertFails(setDoc(doc(db, "rankings", `invalid_${index}`), ranking(changes)));
  }
});

test("all other collections and nested collections are denied", async () => {
  await assertFails(setDoc(doc(db, "users", "private"), ranking()));
  await assertFails(getDocs(query(collection(db, "users"), limit(10))));
  await assertFails(setDoc(doc(db, "rankings", "entry", "private", "child"), ranking()));
});
