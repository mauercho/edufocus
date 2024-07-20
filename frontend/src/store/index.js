import { create } from 'zustand';
import { userTypeSlice } from './userTypeSlice';
import { tokenSlice } from './tokenSlice';

const useBoundStore = create((...a) => ({
  ...userTypeSlice(...a),
  ...tokenSlice(...a),
}));

export default useBoundStore;
