import { CCartsSelect, ICarts } from './cart'
import { CPrice, IPrice } from './price'
import { CRating, IRating } from './rating'

export interface IProduct {
	id: string
	mainImage: string
	rating: IRating
	name: string
	price: IPrice
	cart: ICarts
	picture: IPicture
}

export interface IProductSearch {
	id: string
	name: string
}
interface IPicture {
	id: string
	name: string
	type: string
	image: string
}
export class CProduct {
	id = ''
	image = []
	rating = new CRating()
	name = ''
	price = new CPrice()
	cart = new CCartsSelect()
	articul = ''
	brend = ''
	mass = ''
	made = ''
	mainImage = ''
	category = ''
	picture = new CPicture()
}
export interface IProductCatalog extends IProduct {
	category: string
}
export interface IProductDetail extends IProductCatalog {
	articul: string
	brend: string
	mass: string
	made: string
	image: Array<string>
}
class CPicture {
	id = ''
	name = ''
	type = ''
	image = ''
}
