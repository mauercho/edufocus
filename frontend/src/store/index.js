import { create } from 'zustand';
import { userTypeSlice } from './userTypeSlice';
import { tokenSlice } from './tokenSlice';
import { userNameSlice } from './userNameSlice';
import { persist } from 'zustand/middleware';
import { liveSlice } from './liveSlice';

const useBoundStore = create(
  persist(
    (...a) => ({
      ...userTypeSlice(...a),
      ...tokenSlice(...a),
      ...userNameSlice(...a),
      ...liveSlice(...a),
    }),
    { name: 'bound-store' }
  )
);

export default useBoundStore;
