import { IProduct } from './product'

export interface IOrders {
	id?: string
	userId?: string
	orderId: string
	status: 'Получен' | 'Не доставили' | 'Возврат' | 'В процессе'
	orders: IOrdersDetails[]
}

export interface IOrdersDetails {
	id: string
	productId: string
	orderId: string
	counter: number
	product: IProduct
}

export class COrdersSelect {
	id = ''
	userId = ''
	productId = ''
	orderId = ''
	// isOrders = false
	// isSelected = false
	counter = 0
}
