import { IProduct } from './product'

export interface IFavorite {
	id?: string
	userId?: string
	productId: string
	isFavorite?: boolean
}
export interface IFavoriteProduct extends IFavorite {
	product: IProduct
}
export class CFavorite {
	id = ''
	userId = ''
	productId = ''
	isFavorite? = false
}
