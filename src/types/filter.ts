export interface IFilter {
	minPrice?: number
	maxPrice?: number
	category?: string[]
	available?: boolean
	isFavorite?: boolean
	userId: string
}
