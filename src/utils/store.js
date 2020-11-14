import create from 'zustand'

export const useStore = create((set) => ({
  booksData: [],
  setBooksData: (data) => set((state) => ({ booksData: data })),
}))
