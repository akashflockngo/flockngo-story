import { create } from 'zustand'

export interface AssetStoreState {
  loadedUrls: Set<string>
  filmLoadedCount: number
  filmTotalCount: number
  filmKeyframesReady: boolean
  isAssetLoaded: (url: string) => boolean
  markAssetLoaded: (url: string) => void
  setFilmLoadedCount: (count: number) => void
  setFilmKeyframesReady: (ready: boolean) => void
}

export const useAssetStore = create<AssetStoreState>((set, get) => ({
  loadedUrls: new Set<string>(),
  filmLoadedCount: 0,
  filmTotalCount: 240,
  filmKeyframesReady: false,

  isAssetLoaded: (url: string) => get().loadedUrls.has(url),

  markAssetLoaded: (url: string) =>
    set((state) => {
      if (state.loadedUrls.has(url)) return state
      const next = new Set(state.loadedUrls)
      next.add(url)
      return { loadedUrls: next }
    }),

  setFilmLoadedCount: (count: number) =>
    set({ filmLoadedCount: count }),

  setFilmKeyframesReady: (ready: boolean) =>
    set({ filmKeyframesReady: ready }),
}))
