import { create } from 'zustand';
import { userTypeSlice } from './userTypeSlice';
import { tokenSlice } from './tokenSlice';
import { userNameSlice } from './userNameSlice';
import { persist } from 'zustand/middleware';

const useBoundStore = create(
  persist(
    (...a) => ({
      ...userTypeSlice(...a),
      ...tokenSlice(...a),
      ...userNameSlice(...a),
    }),
    { name: 'bound-store' }
  )
);

export default useBoundStore;
