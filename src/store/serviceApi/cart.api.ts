import { ICarts, ICartsSelect } from '../../types/cart'

import { api } from '../api'

export const cartApi = api.injectEndpoints({
	endpoints: builder => ({
		getCarts: builder.query<ICartsSelect[], string | null>({
			query: userId => `/carts/all/${userId}`,

			providesTags: result => {
				return result
					? [
							...result.map(({ id, productId }) => ({ type: 'carts' as const, id, productId })),
							'carts'
					  ]
					: ['carts']
			}
		}),
		getCartByProductId: builder.query<ICarts, unknown>({
			query: ({ productId: productId, userId: userId }) => {
				return `/carts/${userId},${productId}`
			},
			providesTags: (result, error, productId) => [{ type: 'carts', productId }]
		}),
		getCartById: builder.query<ICarts, string>({
			query: id => `/carts/${id}`,
			providesTags: (result, error, id) => [{ type: 'carts', id }]
		}),
		createCarts: builder.mutation<void, Pick<ICartsSelect, 'productId'> & Partial<ICartsSelect>>({
			query: (cart: ICartsSelect) => {
				return {
					url: `/carts/create/`,
					method: 'POST',
					body: { ...cart }
				}
			},
			invalidatesTags: (result, error, args) => [{ type: 'carts', productId: args.productId }]
		}),
		updateCarts: builder.mutation<void, Pick<ICartsSelect, 'productId'> & Partial<ICartsSelect>>({
			query: (cart: ICartsSelect) => {
				return {
					url: `/carts/update/`,
					method: 'POST',
					body: { ...cart }
				}
			},
			invalidatesTags: (result, error, args) => [{ type: 'carts', productId: args.productId }]
		}),
		deleteCarts: builder.mutation<void, Pick<ICartsSelect, 'productId'> & Partial<ICartsSelect>>({
			query: (cart: ICartsSelect) => {
				return {
					url: `/carts/${cart.id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: (result, error, args) => [{ type: 'carts', productId: args.productId }]
		})
	})
})
export const {
	useGetCartsQuery,
	useGetCartByIdQuery,
	useUpdateCartsMutation,
	useCreateCartsMutation,
	useGetCartByProductIdQuery,
	useDeleteCartsMutation
} = cartApi
