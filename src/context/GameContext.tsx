import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef
} from "react";
import type { GameState, Direction, GameSettings } from "@/types";
import {
  INITIAL_SNAKE,
  generateFood,
  moveSnakeWithMode,
  checkCollisionWithMode,
  checkFoodCollision,
  getOppositeDirection
} from "@/utils/gameLogic";
import { saveHighScore, getHighScore } from "@/utils/storageManager";
import { useGameSettings } from "./GameSettingsContext";
import { useAnalyticsContext } from "./AnalyticsContext";
import { GAME_MODES, DIFFICULTY_LEVELS } from "@/types/gameSettings";

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
  | { type: "RESTART_GAME"; payload: GameSettings }
  | { type: "CHANGE_DIRECTION"; payload: Direction }
  | { type: "MOVE_SNAKE"; payload: GameSettings }
  | { type: "GAME_OVER" }
  | { type: "EAT_FOOD" }
  | { type: "SET_HIGH_SCORE"; payload: number }
  | { type: "MOVE_FOOD" }
  | { type: "TICK_TIMER" };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_GAME":
      return { ...state, isPlaying: true, isGameOver: false };

    case "PAUSE_GAME":
      return { ...state, isPlaying: false };

    case "RESTART_GAME": {
      const mode = GAME_MODES[action.payload.mode];
      return {
        ...state,
        snake: INITIAL_SNAKE,
        food: generateFood(INITIAL_SNAKE),
        direction: "RIGHT",
        score: 0,
        isGameOver: false,
        isPlaying: false,
        timeLeft: mode.features.timeLimit
          ? mode.features.timeLimit / 1000
          : undefined
      };
    }

    case "CHANGE_DIRECTION":
      if (getOppositeDirection(action.payload) === state.direction) {
        return state;
      }
      return { ...state, direction: action.payload };

    case "MOVE_SNAKE": {
      const settings = action.payload;
      const newSnake = moveSnakeWithMode(
        state.snake,
        state.direction,
        settings.mode
      );
      const head = newSnake[0];

      if (checkCollisionWithMode(head, state.snake, settings.mode)) {
        return { ...state, isGameOver: true, isPlaying: false };
      }

      if (checkFoodCollision(head, state.food)) {
        const grownSnake = [...newSnake, state.snake[state.snake.length - 1]];
        const difficulty = DIFFICULTY_LEVELS[settings.difficulty];
        const newScore =
          state.score + Math.round(10 * difficulty.scoreMultiplier);
        const newHighScore = Math.max(newScore, state.highScore);

        if (newHighScore > state.highScore) {
          saveHighScore(newHighScore);
        }

        return {
          ...state,
          snake: grownSnake,
          food: generateFood(grownSnake),
          score: newScore,
          highScore: newHighScore,
          foodEaten: true
        };
      }

      return { ...state, snake: newSnake, foodEaten: false };
    }

    case "MOVE_FOOD":
      return {
        ...state,
        food: generateFood(state.snake)
      };

    case "TICK_TIMER": {
      const timeLeft = (state.timeLeft || 0) - 1;
      if (timeLeft <= 0) {
        return { ...state, isGameOver: true, isPlaying: false, timeLeft: 0 };
      }
      return { ...state, timeLeft };
    }

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
  const { settings } = useGameSettings();
  const analytics = useAnalyticsContext();

  const gameStartTime = useRef<number>(0);
  const lastPauseTime = useRef<number>(0);
  const totalPausedTime = useRef<number>(0);

  useEffect(() => {
    const savedHighScore = getHighScore();
    dispatch({ type: "SET_HIGH_SCORE", payload: savedHighScore });
  }, []);

  useEffect(() => {
    if (!state.isPlaying) return;

    const difficulty = DIFFICULTY_LEVELS[settings.difficulty];
    const gameLoop = setInterval(() => {
      dispatch({ type: "MOVE_SNAKE", payload: settings });
    }, difficulty.speed);

    return () => clearInterval(gameLoop);
  }, [state.isPlaying, settings]);

  // Food movement for moving food modes
  useEffect(() => {
    if (!state.isPlaying) return;

    const mode = GAME_MODES[settings.mode];
    if (!mode.features.movingFood) return;

    const difficulty = DIFFICULTY_LEVELS[settings.difficulty];
    const baseFoodInterval = mode.features.foodMoveInterval || 5000;
    const adjustedFoodInterval =
      baseFoodInterval * difficulty.foodSpeedMultiplier;

    const foodMoveInterval = setInterval(() => {
      dispatch({ type: "MOVE_FOOD" });
    }, adjustedFoodInterval);

    return () => clearInterval(foodMoveInterval);
  }, [state.isPlaying, settings.mode, settings.difficulty]);

  // Timer for time attack mode
  useEffect(() => {
    if (!state.isPlaying) return;

    const mode = GAME_MODES[settings.mode];
    if (!mode.features.timeLimit) return;

    const timer = setInterval(() => {
      dispatch({ type: "TICK_TIMER" });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isPlaying, settings.mode]);

  useEffect(() => {
    if (state.isGameOver && gameStartTime.current > 0) {
      const duration =
        (Date.now() - gameStartTime.current - totalPausedTime.current) / 1000;
      const isNewHighScore = state.score === state.highScore && state.score > 0;

      analytics.trackGameEnd(state.score, duration, isNewHighScore);

      if (isNewHighScore) {
        analytics.trackHighScore(state.score);
      }
    }
  }, [state.isGameOver, state.score, state.highScore, analytics]);

  useEffect(() => {
    if (state.isPlaying && lastPauseTime.current > 0) {
      totalPausedTime.current += Date.now() - lastPauseTime.current;
      lastPauseTime.current = 0;
      analytics.trackGameResumed(state.score);
    }
  }, [state.isPlaying, state.score, analytics]);

  useEffect(() => {
    if (state.foodEaten) {
      analytics.trackFoodEaten(state.score);
    }
  }, [state.foodEaten, state.score, analytics]);

  const startGame = useCallback(() => {
    gameStartTime.current = Date.now();
    totalPausedTime.current = 0;
    analytics.trackGameStart();
    dispatch({ type: "START_GAME" });
  }, [analytics]);

  const pauseGame = useCallback(() => {
    lastPauseTime.current = Date.now();
    const duration =
      (Date.now() - gameStartTime.current - totalPausedTime.current) / 1000;
    analytics.trackGamePaused(state.score, duration);
    dispatch({ type: "PAUSE_GAME" });
  }, [analytics, state.score]);

  const restartGame = useCallback(() => {
    if (state.isPlaying || state.isGameOver) {
      const duration =
        (Date.now() - gameStartTime.current - totalPausedTime.current) / 1000;
      analytics.trackGameEnd(
        state.score,
        duration,
        state.score === state.highScore && state.score > 0
      );
    }
    dispatch({ type: "RESTART_GAME", payload: settings });
  }, [
    analytics,
    settings,
    state.score,
    state.highScore,
    state.isPlaying,
    state.isGameOver
  ]);

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
