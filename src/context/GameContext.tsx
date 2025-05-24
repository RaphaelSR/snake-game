import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback
} from "react";
import type { GameState, Direction } from "@/types";
import {
  INITIAL_SNAKE,
  generateFood,
  moveSnake,
  checkCollision,
  checkFoodCollision,
  getOppositeDirection
} from "@/utils/gameLogic";
import { saveHighScore, getHighScore } from "@/utils/storageManager";

interface GameContextValue extends GameState {
  startGame: () => void;
  pauseGame: () => void;
  restartGame: () => void;
  changeDirection: (direction: Direction) => void;
}

const GameContext = createContext<GameContextValue | undefined>(undefined);

type GameAction =
  | { type: "START_GAME" }
  | { type: "PAUSE_GAME" }
  | { type: "RESTART_GAME" }
  | { type: "CHANGE_DIRECTION"; payload: Direction }
  | { type: "MOVE_SNAKE" }
  | { type: "GAME_OVER" }
  | { type: "EAT_FOOD" }
  | { type: "SET_HIGH_SCORE"; payload: number };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return { ...state, isPlaying: true, isGameOver: false };

    case "PAUSE_GAME":
      return { ...state, isPlaying: false };

    case "RESTART_GAME":
      return {
        ...state,
        snake: INITIAL_SNAKE,
        food: generateFood(INITIAL_SNAKE),
        direction: "RIGHT",
        score: 0,
        isGameOver: false,
        isPlaying: false
      };

    case "CHANGE_DIRECTION":
      if (getOppositeDirection(action.payload) === state.direction) {
        return state;
      }
      return { ...state, direction: action.payload };

    case "MOVE_SNAKE":
      const newSnake = moveSnake(state.snake, state.direction);
      const head = newSnake[0];

      if (checkCollision(head, state.snake)) {
        return { ...state, isGameOver: true, isPlaying: false };
      }

      if (checkFoodCollision(head, state.food)) {
        const grownSnake = [...newSnake, state.snake[state.snake.length - 1]];
        const newScore = state.score + 10;
        const newHighScore = Math.max(newScore, state.highScore);

        if (newHighScore > state.highScore) {
          saveHighScore(newHighScore);
        }

        return {
          ...state,
          snake: grownSnake,
          food: generateFood(grownSnake),
          score: newScore,
          highScore: newHighScore
        };
      }

      return { ...state, snake: newSnake };

    case "SET_HIGH_SCORE":
      return { ...state, highScore: action.payload };

    default:
      return state;
  }
}

const initialState: GameState = {
  snake: INITIAL_SNAKE,
  food: generateFood(INITIAL_SNAKE),
  direction: "RIGHT",
  score: 0,
  isGameOver: false,
  isPlaying: false,
  highScore: 0
};

export function GameProvider({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const savedHighScore = getHighScore();
    dispatch({ type: "SET_HIGH_SCORE", payload: savedHighScore });
  }, []);

  useEffect(() => {
    if (!state.isPlaying) return;

    const gameLoop = setInterval(() => {
      dispatch({ type: "MOVE_SNAKE" });
    }, 150);

    return () => clearInterval(gameLoop);
  }, [state.isPlaying]);

  const startGame = useCallback(() => {
    dispatch({ type: "START_GAME" });
  }, []);

  const pauseGame = useCallback(() => {
    dispatch({ type: "PAUSE_GAME" });
  }, []);

  const restartGame = useCallback(() => {
    dispatch({ type: "RESTART_GAME" });
  }, []);

  const changeDirection = useCallback((direction: Direction) => {
    dispatch({ type: "CHANGE_DIRECTION", payload: direction });
  }, []);

  const value: GameContextValue = {
    ...state,
    startGame,
    pauseGame,
    restartGame,
    changeDirection
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
