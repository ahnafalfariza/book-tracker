import create from 'zustand'

const useStore = create((set, get) => ({
  idx: null,
  setIdx: (idx) => set(() => ({ idx: idx })),
  ceramic: null,
  setCeramic: (ceramic) => set(() => ({ ceramic: ceramic })),
  booksData: [],
  setBooksData: (data) => set((state) => ({ booksData: data })),
}))

export default useStore
