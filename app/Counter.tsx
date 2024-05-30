'use client'

import {
  decrement,
  increment,
} from '@/infrastructure/redux/features/counter/counterSlice'
import { useAppSelector, useAppDispatch } from '@/infrastructure/redux/hooks'
export default function Counter() {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.value)

  return (
    <>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(increment())}>+</button>
      <span aria-label="Count">{count}</span>
    </>
  )
}
