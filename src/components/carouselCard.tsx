import Stack from '@mui/material/Stack'
import { useGetProductsQuery } from '../store/serviceApi/product.api'
import Card from './card'

interface ICarouselCard {
	hrefLabel?: string
	label: string
	count: number
	value: []
}

export function CarouselCard({ ...props }: ICarouselCard) {
	const { data: products, isFetching } = useGetProductsQuery()
	return !isFetching ? (
		<div className="flex flex-col items-center">
			<div className="flex flex-row w-[1208px] justify-between">
				<label className="text-4xl font-bold">{props.label}</label>
				{props.hrefLabel?.length && (
					<div className="flex flex-row items-center">
						<label className="color-grayscale">{props.hrefLabel}</label>
						<button className="pl-1">{'>'}</button>
					</div>
				)}
			</div>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center"
				spacing={6}
				className="w-[1208px] pt-10"
			>
				{products?.map((product, index) =>
					index < props.count ? <Card product={product} key={product.id} /> : ''
				)}
			</Stack>
		</div>
	) : (
		<div></div>
	)
}
