import { apiAddress } from '../api'
/* import { apiAddress } from '../api' */
const API_TOKEN = 'c757cbba94e0248948b558b4781d0a9587f77bfa'

interface IAddress {
	suggestions: IAddressValue[]
}
interface IAddressValue {
	value: string
}
export const addressApi = apiAddress.injectEndpoints({
	endpoints: builder => ({
		getAddress: builder.query<IAddress, string>({
			query: query => {
				return {
					url: `/`,
					method: 'POST',
					body: JSON.stringify({ query: query }),
					mode: 'cors',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: 'Token ' + API_TOKEN
					}
				}
			}
		})
	})
})
export const { useGetAddressQuery } = addressApi
