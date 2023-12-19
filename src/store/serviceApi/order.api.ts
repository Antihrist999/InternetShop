import { IOrders } from '../../types/order'
import { api } from '../api'

export const orderApi = api.injectEndpoints({
	endpoints: builder => ({
		getOrders: builder.query<IOrders[], null>({
			query: () => {
				return `/orders`
			},

			providesTags: result => {
				return result
					? [...result.map(({ id }) => ({ type: 'orders' as const, id })), 'orders']
					: ['orders']
			}
		})
	})
})
export const { useGetOrdersQuery } = orderApi
