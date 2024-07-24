import { create } from 'zustand';
import { userTypeSlice } from './userTypeSlice';
import { tokenSlice } from './tokenSlice';

const useBoundStore = create((...a) => ({
  // TODO: persist 옵션 추가
  ...userTypeSlice(...a),
  ...tokenSlice(...a),
}));

export default useBoundStore;
