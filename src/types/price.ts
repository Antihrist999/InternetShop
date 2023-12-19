export interface IPrice {
	productId: string
	price: number
	discount?: number
}
export class CPrice {
	productId = ''
	price = 0
	discount = 0
}
