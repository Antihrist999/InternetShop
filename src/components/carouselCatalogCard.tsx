import Stack from '@mui/material/Stack'
import { useGetProductsByCategoryQuery } from '../store/serviceApi/product.api'
import Card from './card'

export function CarouselCatalogCard({ ...props }) {
	const { data: products, isFetching } = useGetProductsByCategoryQuery(props.category)
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
