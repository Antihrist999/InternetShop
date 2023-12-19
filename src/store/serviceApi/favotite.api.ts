import { IFavorite, IFavoriteProduct } from '../../types/favorite'
import { api } from '../api'

export const serviceApi = api.injectEndpoints({
	endpoints: builder => ({
		getFavorites: builder.query<IFavorite[], void>({
			query: () => `/favorites/`,
			providesTags: result =>
				// is result available?
				result
					? [...result.map(({ id }) => ({ type: 'favorites' as const, id })), 'favorites']
					: ['favorites']
		}),
		getFavoriteByProductId: builder.query<IFavorite, unknown>({
			query: ({ productId: productId, userId: userId }) => `/favorites/${userId},${productId}`,
			providesTags: (result, error, productId) => [{ type: 'favorites', productId }]
		}),
		getFavoriteForUser: builder.query<IFavoriteProduct[], string>({
			query: userId => `favorites/all/${userId}`,
			providesTags: (result, error, productId) => [{ type: 'favorites', productId }]
		}),
		updateFavorite: builder.mutation<void, Pick<IFavorite, 'id'> & Partial<IFavorite>>({
			query: (favorite: IFavorite) => {
				return {
					url: `/favorites/update`,
					method: 'POST',
					body: { ...favorite }
				}
			},
			invalidatesTags: (result, error, arg) => {
				return [{ type: 'favorites', productId: arg.productId }]
			}
		}),
		createFavorite: builder.mutation<void, Pick<IFavorite, 'id'> & Partial<IFavorite>>({
			query: (favorite: IFavorite) => {
				return {
					url: `/favorites/create`,
					method: 'POST',
					body: { ...favorite }
				}
			},
			invalidatesTags: (result, error, arg) => {
				return [{ type: 'favorites', productId: arg.productId }]
			}
		}),
		deleteFavorite: builder.mutation<void, Pick<IFavorite, 'id'> & Partial<IFavorite>>({
			query: (favorite: IFavorite) => {
				return {
					url: `/favorites/${favorite.id}`,
					method: 'DELETE'
				}
			},
			invalidatesTags: (result, error, arg) => {
				return [{ type: 'favorites', productId: arg.productId }]
			}
		})
	})
})
export const {
	useGetFavoritesQuery,
	useGetFavoriteByProductIdQuery,
	useUpdateFavoriteMutation,
	useCreateFavoriteMutation,
	useDeleteFavoriteMutation,
	useGetFavoriteForUserQuery
} = serviceApi
