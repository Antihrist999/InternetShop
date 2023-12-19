import { ICatalogCart } from '../../types/catalogCart'
import { api } from '../api'

export const catalogApi = api.injectEndpoints({
	endpoints: builder => ({
		getCategories: builder.query<ICatalogCart[], void>({
			query: () => `/categories/`,
			providesTags: result => {
				return result
					? [...result.map(({ id }) => ({ type: 'categories' as const, id })), 'categories']
					: ['categories']
			}
		})
	})
})
export const { useGetCategoriesQuery } = catalogApi
