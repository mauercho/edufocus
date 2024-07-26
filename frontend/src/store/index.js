import { create } from 'zustand';
import { userTypeSlice } from './userTypeSlice';
import { tokenSlice } from './tokenSlice';
import { userNameSlice } from './userNameSlice';
import { liveSlice } from './liveSlice';

const useBoundStore = create((...a) => ({
  // TODO: persist 옵션 추가
  ...userTypeSlice(...a),
  ...tokenSlice(...a),
  ...userNameSlice(...a),
  ...liveSlice(...a),
}));

export default useBoundStore;
