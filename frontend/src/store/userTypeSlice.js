export const userTypeSlice = (set) => ({
  userType: null,
  setUserType: (userType) => set({ userType }),
  isTeacher: () => set.userType === 'teacher',
  isStudent: () => set.userType === 'student',
  isGuest: () => set.userType === null,
});
