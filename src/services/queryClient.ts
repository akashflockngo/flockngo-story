import { QueryClient } from '@tanstack/react-query'
import { useAssetStore } from '../store/useAssetStore'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, // Assets are static; cache indefinitely during session
      gcTime: 1000 * 60 * 60, // Keep in memory for 1 hour
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * Preload and decode an image using HTML5 Image + img.decode()
 * Stores the result in memory cache and syncs with Zustand.
 */
export async function preloadImage(src: string): Promise<string> {
  const store = useAssetStore.getState()
  if (store.isAssetLoaded(src)) {
    return src
  }

  return queryClient.fetchQuery({
    queryKey: ['asset-image', src],
    queryFn: () =>
      new Promise<string>((resolve, reject) => {
        const img = new Image()
        img.src = src

        const handleSuccess = async () => {
          try {
            if ('decode' in img) {
              await img.decode()
            }
          } catch {
            // Ignore decode failures for older browsers or edge cases
          }
          store.markAssetLoaded(src)
          resolve(src)
        }

        if (img.complete) {
          handleSuccess()
        } else {
          img.onload = handleSuccess
          img.onerror = (err) => reject(err)
        }
      }),
  })
}
