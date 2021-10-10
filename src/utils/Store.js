import create from "zustand";

export const useStore = create((set) => ({
  state: {
    auth: {
      isLoggedIn: true,
      user: {},
    },
  },
  fns: {
    setState: (newState) =>
      set((store) => ({
        state: {
          ...store?.state,
          ...newState,
        },
      })),
  },
}));
