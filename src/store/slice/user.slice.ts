import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../types/user'

const initialState: IUser = { id: '' }

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		getUserId: () => {
			return { id: '65247a15c42649f6fcd32e1' }
		}
	}
})
export const user = userSlice
