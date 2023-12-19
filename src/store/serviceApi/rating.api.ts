import { IRating, IStatistic } from '../../types/rating'
import { api } from '../api'

export const ratingApi = api.injectEndpoints({
	endpoints: builder => ({
		getRatings: builder.query<IRating[], string>({
			query: () => `/ratings/`,
			providesTags: result =>
				// is result available?
				result
					? [...result.map(({ id }) => ({ type: 'ratings' as const, id })), 'ratings']
					: ['ratings']
		}),
		getRatingByProductId: builder.query<IRating[], string>({
			query: id => `/ratings/${id}`,
			providesTags: (result, error, productId) => [{ type: 'ratings', productId }]
		}),
		getRatingByProductIdAndUserId: builder.query<IRating, unknown>({
			query: ({ productId: productId, userId: userId }) =>
				`/ratings/ratingUser/${productId},${userId}`,
			providesTags: (result, error, productId) => [{ type: 'ratings', productId }]
		}),
		getRatingById: builder.query<IRating, string>({
			query: id => `/ratings/${id}`,
			providesTags: (result, error, id) => [{ type: 'ratings', id }]
		}),
		getStatistic: builder.query<IStatistic, string>({
			query: productId => `/ratings/stat/${productId}`,
			providesTags: (result, error, id) => [{ type: 'ratings', id }]
		}),

		updateRating: builder.mutation<void, Pick<IRating, 'id'> & Partial<IRating>>({
			query: (Rating: IRating) => {
				return {
					url: `/ratings/update`,
					method: 'POST',
					body: { ...Rating }
				}
			},
			invalidatesTags: (result, error, arg) => {
				return [{ type: 'ratings', productId: arg.productId }]
			}
		}),
		createRating: builder.mutation<void, Pick<IRating, 'id'> & Partial<IRating>>({
			query: (Rating: IRating) => {
				return {
					url: `/Ratings/create`,
					method: 'POST',
					body: { ...Rating }
				}
			},
			invalidatesTags: (result, error, arg) => {
				return [{ type: 'ratings', productId: arg.productId }]
			}
		})
	})
})
export const {
	useGetRatingsQuery,
	useGetRatingByIdQuery,
	useUpdateRatingMutation,
	useCreateRatingMutation,
	useGetRatingByProductIdQuery,
	useGetRatingByProductIdAndUserIdQuery,
	useGetStatisticQuery
} = ratingApi
