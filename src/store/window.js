import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        focusedWindow: null,

        openWindow: (windowKey, data=null) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isOpen = true;
            win.zIndex = state.nextZIndex;
            win.data = data ?? win.data;
            state.nextZIndex ++;

        }),

        closeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isOpen = false;
            win.zIndex = INITIAL_Z_INDEX;
            win.data = null;
        }),

        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.zIndex = state.nextZIndex;
            state.nextZIndex ++;
            state.focusedWindow = windowKey;
        }),

        // explicit focus API (sets focus without opening)
        setFocusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) {
              state.focusedWindow = null;
              return;
            }
            state.focusedWindow = windowKey;
            win.zIndex = state.nextZIndex;
            state.nextZIndex++;
        }),

        clearFocusWindow: () => set((state) => {
            state.focusedWindow = null;
        })

    }))
)

export default useWindowStore;