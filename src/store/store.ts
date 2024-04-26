import { configureStore } from '@reduxjs/toolkit';
import userSlice, { USER_PERSISTENT_STATE } from './user.slice';
import { saveState } from './storage';
import cartSlice from './cart.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveState(
    {
      jwt: store.getState().user.jwt,
      id: store.getState().user.id,
      email: store.getState().user.email,
      name: store.getState().user.name,
    },
    USER_PERSISTENT_STATE
  );
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
