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
