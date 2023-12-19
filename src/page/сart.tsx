import { Box, Button, Checkbox, FormControlLabel, Stack } from '@mui/material'
import ItemCart from '../components/itemCart'
import {
	useDeleteCartsMutation,
	useGetCartsQuery,
	useUpdateCartsMutation
} from '../store/serviceApi/cart.api'
import { useEffect, useState } from 'react'

import IndeterminateCheckBoxRoundedIcon from '@mui/icons-material/IndeterminateCheckBoxRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import CartPrice from '../components/cartPrice'
import { ICartsSelect } from '../types/cart'
import { useGetUserId } from '../hooks/useGetUserId'

function Cart() {
	const [carts, setCarts] = useState<ICartsSelect[]>([])
	const [checked, setChecked] = useState(true)
	const [updateCard] = useUpdateCartsMutation()
	const [deleteCard] = useDeleteCartsMutation()
	const userId = useGetUserId().userId
	const { data: cartsQuery, isSuccess } = useGetCartsQuery(userId)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
		carts.map(cart => updateCard({ ...cart, isSelected: event.target.checked }))
	}
	useEffect(() => {
		if (isSuccess) setCarts(cartsQuery)
	}, [cartsQuery])
	const handleDeleteSelected = () => {
		carts.map(item => {
			if (item?.isSelected) deleteCard({ ...item })
		})
	}

	return (
		<div className="m-auto  max-w-[1205px] " color="red">
			<div className="flex flex-row pb-16 ">
				<div className="text-main text-7xl font-bold">Корзина</div>
			</div>
			<div className="text-xs ">
				<FormControlLabel
					sx={{
						'.MuiFormControlLabel-label': {
							fontSize: '12px'
						}
					}}
					control={
						<Checkbox
							sx={{
								color: '#70C05B'
							}}
							style={{ paddingLeft: '28px' }}
							icon={<CheckBoxRoundedIcon />}
							color="secondary"
							checked={checked}
							checkedIcon={<IndeterminateCheckBoxRoundedIcon />}
							onChange={handleChange}
							inputProps={{ 'aria-label': 'controlled' }}
						/>
					}
					label="Выделить всё"
				/>
				<Button
					style={{ paddingLeft: '12px' }}
					variant="text"
					onClick={() => {
						handleDeleteSelected()
					}}
				>
					<label className="text-primary text-xs normal-case	">Удалить выбранные</label>
				</Button>
			</div>
			<div className="flex flex-row">
				<Box className="w-3/4">
					<Stack spacing={2}>
						{carts?.map(cart => {
							return (
								<ItemCart
									key={cart?.id}
									cart={{
										...cart
									}}
								/>
							)
						})}
					</Stack>
				</Box>
				<CartPrice className="flex flex-row w-1/4 pb-10" />
			</div>
		</div>
	)
}
export default Cart
