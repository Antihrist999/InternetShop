import { useEffect, useState } from 'react'
import { useGetOrdersQuery } from '../store/serviceApi/order.api'
import { IOrders } from '../types/order'
import Stack from '@mui/material/Stack/Stack'
import CarouselOrders from '../components/carouselOrders'
import Button from '@mui/material/Button/Button'

function Orders() {
	const { data, isSuccess } = useGetOrdersQuery(null)
	const [value, setValue] = useState<IOrders[]>([])
	useEffect(() => {
		if (isSuccess) {
			setValue(data)
		}
	}, [data])
	return (
		<div className="w-[1205px] m-auto flex flex-col gap-[60px]">
			<div className="w-1,205px flex">
				<h1 className="text-[64px] font-sans font-bold">Заказы</h1>
			</div>
			<Stack direction="column" justifyContent="space-between" alignItems="center" spacing={3}>
				{value.map(item => (
					<CarouselOrders orders={item.orders} status={item.status} key={item.id} />
				))}
			</Stack>
			<div className="flex justify-center">
				<Button variant="contained" sx={{ width: '193px', bgcolor: '#F3F2F1', color: '#606060' }}>
					Показать еще
				</Button>
			</div>
		</div>
	)
}

export default Orders
