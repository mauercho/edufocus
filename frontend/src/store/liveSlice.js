export const liveSlice = (set) => ({
  liveToken: null,
  setLiveToken: (liveToken) => set({ liveToken }),
  participants: 0,
  setParticipants: (participants) => set({ participants }),
});
