import { IProduct } from './product'
import { IUser } from './user'

export interface IRewiew {
	id: string
	message: string
	userId: string
	productId: string
	product: IProduct
	user: IUser
	createdAt: string
}
export class CRewiew {
	message = ''
	userId = 0
	productId = 0
}
