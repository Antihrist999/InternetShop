import { IProduct } from './product'

export interface ICarts {
	id?: string
	userId?: string
	productId: string
	isCarts?: boolean
}
export interface ICartsDetails {
	cart: ICartsSelect
}
export interface ICartsSelect extends ICarts {
	isSelected: boolean
	counter: number
	product: IProduct
}
export class CCartsSelect {
	userId = ''
	productId = ''
	isCarts = false
	isSelected = false
	counter = 0
}
