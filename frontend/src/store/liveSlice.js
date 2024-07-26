// liveTabStatus: 'chat' | 'quiz'

export const liveSlice = (set) => ({
  liveTabStatus: 'chat',
  setLiveTabStatus: (liveTabStatus) => set({ liveTabStatus }),
});
