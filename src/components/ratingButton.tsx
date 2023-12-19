import Rating from '@mui/material/Rating/Rating'
import {
	useCreateRatingMutation,
	useGetRatingByProductIdQuery,
	useUpdateRatingMutation
} from '../store/serviceApi/rating.api'
import { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId'

function RatingButton({ ...props }) {
	const productId = props.id
	const userId = useGetUserId().userId

	const [rating, setRating] = useState(0)
	const { data, isSuccess } = useGetRatingByProductIdQuery(productId, {
		skip: !productId
	})

	const [update] = useUpdateRatingMutation()
	const [create] = useCreateRatingMutation()
	useEffect(() => {
		if (isSuccess) {
			setRating(
				data.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0) /
					data.length
			)
		}
	}, [data])

	const onClickUpdateRating = (NewValue: number | null) => {
		if (!NewValue) return
		const rating = data?.find(rating => {
			return rating.productId === productId && rating.userId == userId
		})
		if (!rating) create({ rating: NewValue, userId: userId, productId: productId })
		else update({ ...rating, rating: NewValue })
	}
	return (
		<div className="justify-between flex flex-row items-center">
			<Rating
				key={props.id}
				name="simple-controlled"
				value={rating}
				onChange={(_event, NewValue) => {
					onClickUpdateRating(NewValue)
				}}
				sx={{ color: '#FF6633' }}
				readOnly={props.readOnly}
				size={props.size}
			/>
			{props.label && (
				<label className="text-main text-lg ml-4 font-bold">{rating.toFixed(0)} из 5</label>
			)}
		</div>
	)
}
export default RatingButton
