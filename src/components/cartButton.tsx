import { useEffect, useState } from 'react'
import { CCartsSelect, ICarts } from '../types/cart'

import { Button } from '@mui/material'
import { useGetUserId } from '../hooks/useGetUserId'
import {
	useCreateCartsMutation,
	useDeleteCartsMutation,
	useGetCartByProductIdQuery
} from '../store/serviceApi/cart.api'

function CartButton({ ...props }) {
	const productId = props.id
	const userId = useGetUserId().userId
	const { data, isSuccess } = useGetCartByProductIdQuery({
		userId,
		productId
	})
	const [value, setValue] = useState<ICarts>(new CCartsSelect())
	const [deleteCard] = useDeleteCartsMutation()
	const [create] = useCreateCartsMutation()

	const handleClick = () => {
		if (value?.id === undefined)
			create({ isSelected: false, isCarts: true, productId, userId, counter: 1 })
		else deleteCard({ ...value })
	}
	useEffect(() => {
		if (isSuccess) {
			setValue(data)
		}
	}, [data])

	return (
		<Button
			sx={{ margin: 0, padding: 0 }}
			className="h-full w-full normal-case"
			onClick={() => {
				handleClick()
			}}
			color={value?.isCarts ? 'primary' : 'secondary'}
			variant={value?.isCarts ? 'contained' : 'outlined'}
		>
			В корзину
		</Button>
	)
}
export default CartButton
