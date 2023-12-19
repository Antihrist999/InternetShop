import Stack from '@mui/material/Stack/Stack'
import { IOrdersDetails } from '../types/order'
import Card from './card'
import Button from '@mui/material/Button/Button'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
interface IOrdersObj {
	orders: IOrdersDetails[]
	status?: string
}
function CarouselOrders({ ...props }: IOrdersObj) {
	console.log('props', props)

	const rename = () => {
		let colorTag = 'red'
		switch (props.status) {
			case 'В процессе': {
				colorTag = '#F3F2F1'
				break
			}
			case 'Не доставили': {
				colorTag = '#D80000'
				break
			}
			case 'Возврат': {
				colorTag = '#D80000'
				break
			}
			case 'Получен': {
				colorTag = '#70C05B'
				break
			}
			default: {
				break
			}
		}
		return colorTag
	}
	const statusText = () => {
		let colorText = 'black'
		switch (props.status) {
			case 'В процессе': {
				colorText = '#414141'
				break
			}
			case 'Не доставили': {
				colorText = '#F2F2F2'
				break
			}
			case 'Возврат': {
				colorText = '#F2F2F2'
				break
			}
			case 'Получен': {
				colorText = '#FFFFFF'
				break
			}
			default: {
				break
			}
		}
		return colorText
	}
	const orderPrice = () => {
		const summ = props.orders.reduce((a, item) => {
			const price = item.product.price.price
			console.log('123', a)
			console.log('12312', props.orders.length)
			return a + price
		}, 0)
		return summ.toFixed(2)
	}

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-row w-[1208px] justify-between gap-10">
				<div className="flex flex-row h-[36px] gap-[24px]">
					<label className="h-[36px] text-4xl font-sans font-bold">01.04.2021</label>
					<label className="h-[36px] text-4xl font-sans font-bold">11:00-14:00</label>
					<div
						className="flex justify-center items-center rounded min-w-22"
						style={{ backgroundColor: rename() }}
					>
						<label
							className="flex mx-2 font-sans text-base font-normal"
							style={{ color: statusText() }}
						>
							{props.status}
						</label>
					</div>
				</div>
				<div className="flex flex-row w-[347px] h-[40px] justify-between gap-6">
					<label className="flex font-sans text-2xl font-normal">{orderPrice()} ₽</label>
					{props.status !== 'В процессе' ? (
						<Button variant="contained" sx={{ width: '200px' }}>
							Заказать
						</Button>
					) : (
						<Button
							variant="contained"
							sx={{ width: '200px', bgcolor: '#70C05B', color: '#FFFFFF' }}
							startIcon={<CalendarTodayOutlinedIcon sx={{ color: '#414141' }} />}
						>
							Когда доставить
						</Button>
					)}
				</div>
			</div>
			<div className="flex flex-col gap-10 mb-[120px]">
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					spacing={6}
					className="w-[1208px] pt-10"
				>
					{props.orders.map(element => (
						<Card product={element.product} key={element.id} />
					))}
				</Stack>

				{props.status === 'В процессе' && (
					<div className="flex gap-2 items-center justify-center">
						<Button
							variant="contained"
							sx={{ bgcolor: '#F3F2F1', color: '#606060' }}
							startIcon={<RemoveRedEyeOutlinedIcon sx={{ color: '#414141' }} />}
						>
							Посмотреть заказ
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default CarouselOrders
