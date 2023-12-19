import { Button, FormControlLabel, Switch } from '@mui/material'

import { useGetCartsQuery } from '../store/serviceApi/cart.api'
import { useEffect, useState } from 'react'
import { useGetUserId } from '../hooks/useGetUserId'
import { useGetIndividualCardByUserIdQuery } from '../store/serviceApi/individualCard.api'
import { ICartsSelect } from '../types/cart'
import { Link } from 'react-router-dom'
import { CIndividualCard, IIndividualCard } from '../types/individualCard'

function CartPrice({ ...props }) {
	const [carts, setCarts] = useState<ICartsSelect[]>([])
	const [individualCard, setIndividualCard] = useState<IIndividualCard>(new CIndividualCard())
	const [discont, setDiscont] = useState(true)
	const userId = useGetUserId().userId
	const { data: cartsQuery, isSuccess: isSuccessCarts } = useGetCartsQuery(userId)

	const {
		data: individualCardQuery,
		isSuccess: isSuccessIndividual,
		isError
	} = useGetIndividualCardByUserIdQuery(String(userId))
	console.log(isError)
	useEffect(() => {
		if (isSuccessCarts) setCarts(cartsQuery)
		if (isSuccessIndividual) setIndividualCard(individualCardQuery)
	}, [cartsQuery, individualCardQuery])

	const selectProductsCounter = () => {
		let counter = 0
		carts.map(item => {
			if (item.isSelected) counter = counter + 1
			return counter
		})
		return counter
	}

	const summDiscont = () => {
		const summ = carts.reduce((a, item) => {
			const price = item.product?.price?.price ?? 0
			const productDiscont = item.product.price.discount ?? 0
			if (item.isSelected) {
				return a + (item.counter * price * productDiscont) / 100
			} else return a
		}, 0)
		return Number(summ.toFixed(2))
		return 0
	}

	const summNotDiscont = () => {
		const summ = carts.reduce((a, item) => {
			const price = item.product?.price?.price ?? 0
			if (item.isSelected) {
				return a + item.counter * price
			} else return a
		}, 0)
		return Number(summ.toFixed(2))
		return 0
	}
	const total = summNotDiscont() - summDiscont()
	const totalSumm = () => {
		let summ = 0
		const calcBonusSumm = Number(
			discont ? (individualCard?.account !== undefined ? individualCard.account : 0) : 0
		)
		const isBonusSumm =
			total -
				Number(discont ? (individualCard?.account !== undefined ? individualCard.account : 0) : 0) >
			1
		if (isBonusSumm) summ += total - calcBonusSumm
		else {
			summ += calcBonusSumm - total
		}
		return summ.toFixed(2)
	}

	return (
		<div className={props.className}>
			<div className="flex flex-col pt-5  pl-4 w-full">
				{isError && (
					<FormControlLabel
						label={'Списать ' + individualCard.account + ' ₽'}
						defaultChecked
						control={
							<Switch checked={discont} onChange={event => setDiscont(event.target.checked)} />
						}
					/>
				)}
				{isError && <label className="pt-5">На карте накоплено {individualCard.account} ₽</label>}
				<div className="flex flex-row  justify-between pt-12">
					<div className="flex flex-col text-gray">
						<label>Кол-во: {selectProductsCounter()}</label>
						<label>Скидка</label>
					</div>
					<div className="flex flex-col items-end ">
						<label>{summNotDiscont()} ₽</label>
						<label className="text-primary font-bold">- {summDiscont()} ₽</label>
					</div>
				</div>

				<div className="flex flex-row justify-between pt-14 text-main">
					<div>
						<label className="text-12xl font-bold">Итог</label>
					</div>
					<div>
						<label>{totalSumm()}₽</label>
					</div>
				</div>
				{isError && <label className="text-center text-secondary">Вы получяете 100 бонусов</label>}
				{Number(totalSumm()) < 1000 && (
					<div className="pt-18 bg-error h-6 mt-8 text-white text-center align-middle rounded">
						<label>Минимальная сумма заказа 1000р</label>
					</div>
				)}
				{Number(totalSumm()) > 1000 && <div className="pt-18 h-6 mt-8"></div>}
				<Link to="/delivery" className="w-full flex">
					<Button sx={{ marginTop: '16px' }} variant="contained" className="w-full flex">
						Оформить заказ
					</Button>
				</Link>
			</div>
		</div>
	)
}
export default CartPrice
