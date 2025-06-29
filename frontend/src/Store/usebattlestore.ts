import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Player {
  userId: string;
  username: string;
  socketId?: string;
}

interface Example {
  input: string;
  output: string;
  explanation: string;
}

interface TestCase {
  input: string;
  output: string;
}

interface Question {
  _id: string;
  title: string;
  description: string;
  difficulty: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  testcases: TestCase[];
}

interface BattleState {
  roomId: string | null;
  question: Question | null;
  opponent: Player | null;
  player: Player | null;
  setBattleData: (data: {
    roomId: string;
    question: Question;
    opponent: Player;
    player: Player;
  }) => void;
  clearBattle: () => void;
}

export const useBattleStore = create(persist<BattleState>((set) => ({
  roomId: null,
  question: null,
  opponent: null,
  player: null,

  setBattleData: ({ roomId, question, opponent, player }) =>
    set({ roomId, question, opponent, player }),

  clearBattle: () =>
    set({
      roomId: null,
      question: null,
      opponent: null,
      player: null,
    }),
}), {
    name: 'battle-storage', // localStorage key
    partialize : (state) : any => ({
        roomId: state.roomId,
        question: state.question,
        opponent: state.opponent,
        player: state.player,
    }),
    }));