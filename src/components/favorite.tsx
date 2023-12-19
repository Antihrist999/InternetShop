import Stack from '@mui/material/Stack'
import Card from './card'
import { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId'
/* import { IFavoriteProduct } from '../types/favorite' */
import Filter from './filter'
import { IFilter } from '../types/filter'
import { useGetFavoriteProductsQuery } from '../store/serviceApi/product.api'
import { IProduct } from '../types/product'

export function Favorite() {
	const userId = useGetUserId().userId
	const beginFilter = {
		isFavorite: true,
		userId: userId,
		minPrice: 0,
		maxPrice: 999999
	}
	const [favorite, setFavorite] = useState<IProduct[]>([])
	const [filteres, setFilteres] = useState<IFilter>(beginFilter)
	const { data, isSuccess: favoriteSuccess } = useGetFavoriteProductsQuery(filteres)

	useEffect(() => {
		if (favoriteSuccess) {
			setFavorite(data)
		}
	}, [data])

	return (
		<div
			style={{
				width: '1208px',
				justifyContent: 'center',
				margin: 'auto',
				display: 'flex',
				flexDirection: 'column',
				gap: '60px'
			}}
		>
			<div
				style={{
					alignItems: 'flex-start'
				}}
				className="text"
			>
				Избранное
			</div>
			<div style={{ display: 'flex', flexDirection: 'row', gap: '40px' }}>
				<Filter setFilteres={setFilteres} />
				<Stack useFlexGap flexWrap="wrap" direction="row" alignItems="flex-start" spacing={'40px'}>
					{favorite?.map(item => <Card product={item} key={item.id} />)}
				</Stack>
			</div>
		</div>
	)
}
