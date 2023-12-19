export interface IRating {
	id?: string
	productId: string
	userId: string
	rating: number
}

export class CRating {
	id = ''
	productId = ''
	userId = ''
	rating = 0
}
export interface IStatistic {
	1: number
	2: number
	3: number
	4: number
	5: number
}
