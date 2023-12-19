import { IIndividualCard } from '../../types/individualCard'
import { api } from '../api'

export const individualCardApi = api.injectEndpoints({
	endpoints: builder => ({
		getIndividualCardByUserId: builder.query<IIndividualCard, string>({
			query: userId => {
				return `/individualCards/userId/${userId}`
			},
			providesTags: (result, error, userId) => [{ type: 'individualCard', userId }]
		})
	})
})
export const { useGetIndividualCardByUserIdQuery } = individualCardApi
