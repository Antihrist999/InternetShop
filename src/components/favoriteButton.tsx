import IconButton from '@mui/material/IconButton/IconButton'
import {
	useGetFavoriteByProductIdQuery,
	useDeleteFavoriteMutation,
	useCreateFavoriteMutation
} from '../store/serviceApi/favotite.api'
import { useEffect, useState } from 'react'
import { CFavorite, IFavorite } from '../types/favorite'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { useGetUserId } from '../hooks/useGetUserId'

function FavoriteButton({ ...props }) {
	const productId = props.id
	const userId = useGetUserId().userId
	const [value, setValue] = useState<IFavorite>(new CFavorite())
	const { data, isSuccess } = useGetFavoriteByProductIdQuery(
		{
			productId,
			userId
		},
		{ skip: !productId }
	)
	const [deleteCard] = useDeleteFavoriteMutation()
	const [create] = useCreateFavoriteMutation()
	useEffect(() => {
		if (isSuccess) setValue(data)
	}, [data])
	const handleClick = () => {
		if (value?.id === undefined) create({ isFavorite: true, productId, userId })
		else deleteCard({ ...value })
	}
	return (
		<div>
			<IconButton
				color={value?.isFavorite ? 'primary' : 'default'}
				onClick={() => {
					handleClick()
				}}
				sx={props.sx}
			>
				{value?.isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
			</IconButton>
			{props.label && <label className="text-sm text-grayscale">В избранное</label>}
		</div>
	)
}
export default FavoriteButton
