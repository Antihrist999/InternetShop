import { useEffect, useState } from 'react'
import RatingButton from './ratingButton'
import { useAddRewiewMutation, useGetRewiewByProductIdQuery } from '../store/serviceApi/rewiew.api'
import { IRewiew } from '../types/rewiew'
import RewiewItem from './rewiewItem'
import TextField from '@mui/material/TextField/TextField'
import { useGetUserId } from '../hooks/useGetUserId'
import Rating from '@mui/material/Rating/Rating'
import {
	useCreateRatingMutation,
	useGetRatingByProductIdAndUserIdQuery,
	useGetStatisticQuery,
	useUpdateRatingMutation
} from '../store/serviceApi/rating.api'
import { CRating, IRating, IStatistic } from '../types/rating'

function Reviews({ ...props }) {
	const [value, setValue] = useState<IRewiew[]>([])
	const [rating, setRating] = useState<IRating>(new CRating())
	const [stat, setStat] = useState<IStatistic>()
	const [text, setText] = useState('')
	const id = props.id
	const { userId } = useGetUserId()
	const { data, isSuccess, isError } = useGetRewiewByProductIdQuery(id, { skip: !id })
	const { data: ratingUser, isSuccess: isSuccessRatingUser } =
		useGetRatingByProductIdAndUserIdQuery({ productId: id, userId: userId }, { skip: !id })
	const [addRewiew] = useAddRewiewMutation()
	const [updateRating] = useUpdateRatingMutation()
	const [createRating] = useCreateRatingMutation()
	const { data: statistic, isSuccess: isSuccessStatistic } = useGetStatisticQuery(id, { skip: !id })
	const handleClickRating = (NewValue: number) => {
		setRating({ ...rating, rating: NewValue })
		if (rating?.id !== undefined) updateRating({ ...rating, rating: NewValue })
		else createRating({ rating: NewValue, productId: id, userId: userId })
	}
	const handleClickAddRewiew = () => {
		addRewiew({
			userId: userId,
			productId: id,
			message: text
		})
		setText('')
	}
	useEffect(() => {
		if (isSuccess) setValue(data)
	}, [data])
	useEffect(() => {
		if (isSuccessRatingUser) setRating(ratingUser)
	}, [ratingUser])
	useEffect(() => {
		if (isSuccessStatistic) setStat(statistic)
	}, [statistic])
	return (
		<div className="w-full m-auto">
			<label className="text-4xl text-main font-bold">Отзывы</label>
			<div className="flex flex-row mt-10">
				<div className="w-[168px] mr-36 flex flex-col">
					<RatingButton id={id} label />

					<div className="flex flex-row justify-between items-center">
						<label>5</label>
						<Rating
							name="simple-controlled"
							size="small"
							defaultValue={5}
							sx={{ color: '#FF6633' }}
							readOnly
						/>
						<label>{stat?.[5]}</label>
					</div>
					<div className="flex flex-row justify-between">
						<label>4</label>
						<Rating
							name="simple-controlled"
							size="small"
							defaultValue={4}
							sx={{ color: '#FF6633' }}
							readOnly
						/>
						<label>{stat?.[4]}</label>
					</div>
					<div className="flex flex-row justify-between">
						<label>3</label>
						<Rating
							name="simple-controlled"
							size="small"
							defaultValue={3}
							sx={{ color: '#FF6633' }}
							readOnly
						/>
						<label>{stat?.[3]}</label>
					</div>
					<div className="flex flex-row justify-between">
						<label>2</label>
						<Rating
							name="simple-controlled"
							size="small"
							defaultValue={2}
							sx={{ color: '#FF6633' }}
							readOnly
						/>
						<label>{stat?.[2]}</label>
					</div>
					<div className="flex flex-row justify-between">
						<label>1</label>
						<Rating
							name="simple-controlled"
							size="small"
							defaultValue={1}
							sx={{ color: '#FF6633' }}
							readOnly
						/>
						<label>{stat?.[1]}</label>
					</div>
				</div>
				<div className="w-3/6 flex flex-col  ">
					{!isError && (
						<div className="overflow-auto max-h-[428px] mb-4">
							{value.map(rewiew => (
								<RewiewItem key={rewiew.id} rewiew={rewiew} />
							))}
						</div>
					)}
					<div>
						<div className="flex flex-row mb-4 items-center">
							<label className=" text-lg font-bold text-main  mr-4">Ваша оценка</label>
							<Rating
								key={props.id}
								name="simple-controlled"
								value={rating?.rating}
								size="large"
								onChange={(_event, NewValue) => {
									if (NewValue) {
										handleClickRating(NewValue)
									}
								}}
								sx={{ '.MuiRating-icon': { fontSize: '24px ' } }}
							/>
						</div>
						<TextField
							className="w-full min-h-[100px] rounded "
							id="outlined-multiline-static"
							multiline
							rows={4}
							placeholder="Отзыв"
							value={text}
							onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
								setText(event.target.value)
							}}
						/>
						<button
							className="bg-primary1 h-10 w-1/4 rounded mt-4"
							onClick={() => handleClickAddRewiew()}
						>
							<label className="text-primary">Отправить отзыв</label>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
export default Reviews
