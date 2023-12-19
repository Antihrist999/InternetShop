import { IFilter } from '../../types/filter'
import { IProduct, IProductCatalog, IProductDetail, IProductSearch } from '../../types/product'
import { api } from '../api'

export const productApi = api.injectEndpoints({
	endpoints: builder => ({
		getProducts: builder.query<IProduct[], void>({
			query: () => `/products/`,
			providesTags: result => {
				// is result available?
				return result
					? [...result.map(({ id }) => ({ type: 'products' as const, id })), 'products']
					: ['products']
			}
		}),
		getProductById: builder.query<IProduct, string>({
			query: id => `/products/${id}`,
			providesTags: (result, error, id) => [{ type: 'products', id }]
		}),
		getDetailProductById: builder.query<IProductDetail, string>({
			query: id => `/products/${id}`,
			providesTags: (result, error, id) => [{ type: 'products', id }]
		}),
		getProductsBySearch: builder.query<IProduct[], string>({
			query: value => {
				return {
					url: `/products/name/${value}`
				}
			},
			providesTags: (result, error, id) => [{ type: 'products', id }]
		}),
		getProductsByCategory: builder.query<IProductCatalog[], string>({
			query: value => `/products?category=${value}`,
			providesTags: result => {
				// is result available?
				return result
					? [...result.map(({ id }) => ({ type: 'products' as const, id })), 'products']
					: ['products']
			}
		}),
		getFavoriteProducts: builder.query<IProduct[], IFilter>({
			query: (filter: IFilter) => {
				return {
					url: '/products/filtered',
					method: 'POST',
					body: { ...filter }
				}
			}
		}),
		getProductsByName: builder.query<IProductSearch[], string>({
			query: value => {
				return {
					url: `/products/name/${value}`
				}
			},
			transformResponse: (resp: IProduct[]) => {
				const arrOut: IProductSearch[] = []
				resp.map(item => {
					arrOut.push({
						id: item.id,
						name: item.name
					})
				})
				return arrOut
			},
			providesTags: (result, error, id) => [{ type: 'products', id }]
		})
	})
})

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useGetDetailProductByIdQuery,
	useGetProductsByNameQuery,
	useGetProductsBySearchQuery,
	useGetProductsByCategoryQuery,
	useGetFavoriteProductsQuery
} = productApi
