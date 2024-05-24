import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export interface CounterSliceState {
    value: number;
}

const initialState: CounterSliceState = {
    value: 0,
};

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1
        },
    }
})

export const { decrement, increment } = counterSlice.actions;

export const selectCount = (state: RootState) => state.value