import { INITIAL_Z_INDEX, SLIDE_CONFIG } from '#constants'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

const useSlideStore = create(
  immer((set) => ({
    slides: SLIDE_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,
    // Haptics toggle for mobile interactions (default: enabled)
    hapticsEnabled: true,

    setHapticsEnabled: (value) =>
      set((state) => {
        state.hapticsEnabled = Boolean(value)
      }),

    toggleHaptics: () =>
      set((state) => {
        state.hapticsEnabled = !state.hapticsEnabled
      }),

    openSlide: (slideKey, data = null) =>
      set((state) => {
        const s = state.slides[slideKey]
        if (!s) return
        s.isOpen = true
        s.zIndex = state.nextZIndex
        s.data = data ?? s.data
        state.nextZIndex++
      }),

    closeSlide: (slideKey) =>
      set((state) => {
        const s = state.slides[slideKey]
        if (!s) return
        s.isOpen = false
        s.zIndex = INITIAL_Z_INDEX
        s.data = null
      }),

    focusSlide: (slideKey) =>
      set((state) => {
        const s = state.slides[slideKey]
        if (!s) return
        s.zIndex = state.nextZIndex
        state.nextZIndex++
      }),
  }))
)

export default useSlideStore
