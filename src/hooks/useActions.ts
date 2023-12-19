import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { cartsSlice } from '../store/slice/carts.slice'
import { userSlice } from '../store/slice/user.slice'

const rootActions = {
	...cartsSlice.actions,
	...userSlice.actions
}
export const useActions = () => {
	const dispatch = useDispatch()
	return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch])
}
