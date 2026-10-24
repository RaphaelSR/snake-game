# Snake Game

A classic snake game built with React and TypeScript, inspired by the nostalgic game.

🎮 **[Play Online](https://raphaelsr.github.io/snake-game/)**

## 🎮 About

This project recreates the beloved Snake game that many of us enjoyed on old Nokia phones. Built with modern web technologies for a nostalgic gaming experience.

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env.local
```

3. Configure Firebase (see Firebase Setup section below)

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🔥 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Analytics in your project
4. Go to Project Settings > General > Your apps
5. Add a web app and copy the config
6. Fill the `.env.local` file with your Firebase config values

### Leaderboard access

The browser adds a new document to `rankings` and reads the top ten scores for
each mode and difficulty. It does not update or delete existing scores.

`firestore.rules` validates new entries, rejects unexpected fields, and denies
client updates, deletes, individual document reads and unbounded queries.
`firestore.indexes.json` defines the composite index required by the leaderboard
query (`mode`, `difficulty`, then descending `score`). The index must be ready
before publishing the bounded-query client to an existing project.

These files are not deployed by the GitHub Pages workflow. Before applying them,
review the project's current rules and other collections: the supplied rules
deny access outside `rankings` and must be merged with any unrelated application
rules in a shared Firebase project. Existing documents are preserved; the schema
validation applies only to new writes.

Valid guest submissions remain allowed. These rules do not prove that a score
was earned, authenticate a player, or enforce the browser's submission cooldown.
Preventing forged scores and limiting abusive traffic requires a trusted score
submission service and server-side controls; App Check can provide an additional
layer. Client Firebase configuration is public and is not an authorization secret.

Test the service and rules locally (Node 22+ and Java 21+):

```bash
npm test
npx --yes firebase-tools@15.34.1 emulators:exec --only firestore --project demo-snake-security 'npm run test:rules'
```

The rules tests use a local demo project, never the production database.

## 🎯 How to Play

- **Movement**: Use arrow keys or WASD to control the snake
- **Objective**: Eat the food to grow your snake and increase your score
- **Game Over**: Avoid hitting the walls or your own tail
- **Restart**: Press R or click the restart button when game ends

## 🛠️ Technologies

- **React 18** - User interface
- **TypeScript** - Static typing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Firebase Analytics** - Usage tracking and metrics

## 🔨 Build for production

```bash
npm run build
```

## 📊 Analytics

The game tracks usage analytics to understand player behavior:
- Game sessions and duration
- Preferred game modes and difficulty levels
- Theme and language preferences
- High scores and achievements
- Settings changes

All data is anonymized and used only for improving the game experience.
