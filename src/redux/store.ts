import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "@/features/user/store/user.slice";
import { baseApi } from "@/redux/api/baseApi";
import { eventReducer } from "@/features/event/store/event.slice";
import { metricsReducer } from "@/features/metrics/store/metrics.slice";
import { paymentReducer } from "@/features/payment/store/payment.slice";
import { authReducer } from "@/features/auth/store/auth.slice";

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  whitelist: [],
  storage,
};

const rootReducer = combineReducers({
  event: eventReducer,
  metrics: metricsReducer,
  payment: paymentReducer,
  user: userReducer,
  auth: authReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(baseApi.middleware)
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
