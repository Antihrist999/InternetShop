import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api, apiAddress } from './api'
import { cartsSlice } from './slice/carts.slice'
import { setupListeners } from '@reduxjs/toolkit/query'
import { userSlice } from './slice/user.slice'

const reducers = combineReducers({
	carts: cartsSlice.reducer,
	user: userSlice.reducer
})
export const store = configureStore({
	reducer: {
		reducer: reducers,
		[api.reducerPath]: api.reducer,
		[apiAddress.reducerPath]: apiAddress.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat([api.middleware, apiAddress.middleware])
})
// enable listener behavior for the store
setupListeners(store.dispatch)
export type TypeRootState = ReturnType<typeof store.getState>
