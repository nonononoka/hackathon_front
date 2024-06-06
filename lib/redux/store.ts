import { configureStore } from '@reduxjs/toolkit'
import { counterSlice } from './features/counter/counterSlice'

// create a instance per-request while retaining the strong type safely.
export const makeStore = () => {
  return configureStore({
    reducer: counterSlice.reducer,
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
