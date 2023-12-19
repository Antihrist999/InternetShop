import { useTypedSelector } from './useTypedSelector'

export const useGetUserId = () => {
	const userId = useTypedSelector(() => {
		return String(1)
	})
	const userName = useTypedSelector(() => {
		return 'Толя'
	})
	return { userId: userId, userName: userName }
}
