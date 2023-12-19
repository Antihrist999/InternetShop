import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ICartsSelect } from '../../types/cart'

const initialState: ICartsSelect[] = []

export const cartsSlice = createSlice({
	name: 'select',
	initialState,
	reducers: {
		addCarts(state, action: PayloadAction<ICartsSelect>) {
			const { id } = action.payload
			const isExist = state.some(item => item.id === id)
			if (!isExist) state.push(action.payload)
			return state
		},
		switchSelected(state, action: PayloadAction<ICartsSelect>) {
			const { id } = action.payload
			const isExist = state.some(item => item.id === id)
			if (isExist)
				state.find(item => {
					if (item.id === id) item.isSelected = !item.isSelected
				})
			else state.push({ ...action.payload, isSelected: !action.payload.isSelected })
			return state
		},
		switchAllSelected(state, bool: PayloadAction<boolean>) {
			state.map(item => (item.isSelected = bool.payload))
			return state
		},
		increment(state, action: PayloadAction<ICartsSelect>) {
			const { id } = action.payload
			const isExist = state.some(item => item.id === id)
			if (isExist)
				state.find(item => {
					if (item.id === id) item.counter = item.counter + 1
				})
			else state.push({ ...action.payload, counter: action.payload.counter + 1 })
			return state
		},
		decrement(state, action: PayloadAction<ICartsSelect>) {
			const { id } = action.payload
			const isEx = state.some(item => item.id === id)
			if (isEx)
				state.find(item => {
					if (item.id === id) item.counter = item.counter - 1
				})
			else state.push({ ...action.payload, counter: action.payload.counter - 1 })
			return state
		}
	}
})
export const counter = cartsSlice
