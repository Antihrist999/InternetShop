import IconButton from '@mui/material/IconButton/IconButton'
import { IRewiew } from '../types/rewiew'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined'
import Rating from '@mui/material/Rating/Rating'
import { useGetRatingByProductIdAndUserIdQuery } from '../store/serviceApi/rating.api'
import { useEffect, useState } from 'react'
import useGetDateFormat from '../hooks/useGetDateFormat'

interface IRewiewObj {
	rewiew: IRewiew
}
function RewiewItem({ ...props }: IRewiewObj) {
	const { rewiew } = props
	const [rating, setRating] = useState(0)
	const { data, isSuccess } = useGetRatingByProductIdAndUserIdQuery(
		{
			productId: rewiew.productId,
			userId: rewiew.userId
		},
		{ skip: !rewiew.productId }
	)
	useEffect(() => {
		if (isSuccess) setRating(data.rating)
	}, [data])
	return (
		<div className="flex flex-col mb-10">
			<div className="flex flex-row ">
				<IconButton>
					<Person2OutlinedIcon />
				</IconButton>
				<label className="text-main text-lg flex items-center">{rewiew.user?.id}</label>
			</div>
			<div className="flex flex-row mt-2 items-center">
				<Rating
					name="simple-controlled"
					value={rating}
					size="large"
					readOnly
					sx={{ '.MuiRating-icon': { fontSize: '24px ' } }}
				/>
				<label className="text-grayscale text-sm pl-2">
					{useGetDateFormat(new Date(rewiew.createdAt))}
				</label>
			</div>
			<label className="text-main mt-2">{rewiew.message}</label>
		</div>
	)
}
export default RewiewItem
