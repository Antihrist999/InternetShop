import { IRewiew } from '../../types/rewiew'
import { api } from '../api'

export const rewiewApi = api.injectEndpoints({
	endpoints: builder => ({
		getRewiews: builder.query<IRewiew[], string>({
			query: () => `/rewiews/`,
			providesTags: result =>
				// is result available?
				result
					? [...result.map(({ id }) => ({ type: 'rewiews' as const, id })), 'rewiews']
					: ['rewiews']
		}),
		getRewiewByProductId: builder.query<IRewiew[], string>({
			query: productId => `/rewiews/${productId}`,
			providesTags: (result, error, productId) => [{ type: 'rewiews', productId }]
		}),
		getRewiewById: builder.query<IRewiew, string>({
			query: id => `/rewiews/${id}`,
			providesTags: (result, error, id) => [{ type: 'rewiews', id }]
		}),
		updateRewiew: builder.mutation<void, Pick<IRewiew, 'productId'> & Partial<IRewiew>>({
			query: (rewiew: IRewiew) => {
				return {
					url: `/rewiews/update/${rewiew.id}`,
					method: 'PUT',
					body: rewiew
				}
			},
			invalidatesTags: (result, error, args) => [{ type: 'rewiews', productId: args.productId }]
		}),
		addRewiew: builder.mutation<void, Pick<IRewiew, 'productId'> & Partial<IRewiew>>({
			query: (rewiew: IRewiew) => {
				return {
					url: `/rewiews/create/`,
					method: 'POST',
					body: rewiew
				}
			},
			invalidatesTags: (result, error, args) => [{ type: 'rewiews', productId: args.productId }]
		})
	})
})
export const {
	useGetRewiewsQuery,
	useGetRewiewByIdQuery,
	useUpdateRewiewMutation,
	useGetRewiewByProductIdQuery,
	useAddRewiewMutation
} = rewiewApi
