export const userNameSlice = (set) => ({
  userName: null,
  setUserName: (userName) => set({ userName }),
  isAnonymous: () => set.userName === null,
});
