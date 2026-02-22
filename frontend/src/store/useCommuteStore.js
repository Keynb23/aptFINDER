import { create } from "zustand";

/**
 * Zustand store for managing commute parameters and locations.
 */
export const useCommuteStore = create((set) => ({
  // Person 1 Location
  workA: {
    name: "Person 1",
    address: "",
    coords: null,
    targetTime: 30,
  },

  // Person 2 Location
  workB: {
    name: "Person 2",
    address: "",
    coords: null,
    targetTime: 30,
  },

  setWorkA: (location) =>
    set((state) => ({
      workA: { ...state.workA, ...location },
    })),

  setWorkB: (location) =>
    set((state) => ({
      workB: { ...state.workB, ...location },
    })),

  setTargetTimeA: (time) =>
    set((state) => ({ workA: { ...state.workA, targetTime: time } })),
  setTargetTimeB: (time) =>
    set((state) => ({ workB: { ...state.workB, targetTime: time } })),

  reset: () =>
    set({
      workA: { name: "Person 1", address: "", coords: null, targetTime: 30 },
      workB: { name: "Person 2", address: "", coords: null, targetTime: 30 },
    }),
}));
