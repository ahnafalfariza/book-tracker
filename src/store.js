import create from 'zustand'

const useStore = create((set, get) => ({
  userData: {},
  setUserData: (userData) => set(() => ({ userData: userData })),
  userId: null,
  setUserId: (userId) => set(() => ({ userId: userId })),
  booksData: [],
  setBooksData: (data) => set((state) => ({ booksData: data })),
}))

export default useStore
