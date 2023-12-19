import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:4300'
const API_URL_ADDRESS = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address'
export const api = createApi({
	reducerPath: 'api',
	tagTypes: [
		'products',
		'favorites',
		'carts',
		'ratings',
		'categories',
		'individualCard',
		'rewiews',
		'orders'
	],
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: headers => {
			headers.set('Access-Control-Allow-Origin', '*')
			headers.set('Content-Type', 'application/json')
			return headers
		}
	}),
	endpoints: () => ({})
})
export const apiAddress = createApi({
	reducerPath: 'address',
	tagTypes: ['address'],
	baseQuery: fetchBaseQuery({ baseUrl: API_URL_ADDRESS }),
	endpoints: () => ({})
})
