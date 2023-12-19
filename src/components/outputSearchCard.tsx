import Stack from '@mui/material/Stack'
import { useGetProductsBySearchQuery } from '../store/serviceApi/product.api'
import Card from './card'

export function OutputSearchCard({ ...props }) {
	const { data: products, isFetching } = useGetProductsBySearchQuery(props.value, {
		skip: !props.value
	})
	return !isFetching ? (
		<Stack direction="row" justifyContent="center" alignItems="center" spacing={12}>
			{products?.map((product, index) =>
				index < 3 ? <Card product={product} key={product.id} /> : ''
			)}
		</Stack>
	) : (
		<div></div>
	)
}
