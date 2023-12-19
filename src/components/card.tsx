import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
/* import CardMedia from '@mui/material/CardMedia' */

import { IProduct } from '../types/product'

import cardStyle from './card.module.css'
import FavoriteButton from './favoriteButton'
import RatingButton from './ratingButton'
import CartButton from './cartButton'
import PriceText from './priceText'
import { Link } from 'react-router-dom'
function сard(props: { product: IProduct }) {
	const product = props.product
	const parseText = (text: string, limit: number) => {
		if (text.length > limit) {
			for (let i = limit; i > 0; i--) {
				if (
					text.charAt(i) === ' ' &&
					(text.charAt(i - 1) !== ',' || text.charAt(i - 1) !== '.' || text.charAt(i - 1) !== ';')
				) {
					return text.substring(0, i) + '...'
				}
			}
			return text.substring(0, limit) + '...'
		} else return text
	}

	return (
		<div className={cardStyle.card} key={product.id}>
			<div className={cardStyle.media}>
				<FavoriteButton id={product.id} sx={{ position: 'absolute', left: '82%' }} />
				<Link to={`/DetailCard/${product.id}`}>
					<img src={`data:image/png;base64,${product.picture?.image}`} />
				</Link>

				{product.price !== null && (
					<div className={cardStyle.notice}>
						<label className={cardStyle.noticeText}>{product.price.discount} %</label>
					</div>
				)}
			</div>
			<CardContent className={cardStyle.cardContent} sx={{ margin: 0, padding: '8px' }}>
				{product.price !== null && <PriceText product={product} fontSizeDiscount="text-lg" />}
				<div className={cardStyle.desc}>
					<label>{parseText(product.name, 54)}</label>
				</div>

				<RatingButton id={product.id} />

				<CardActions className="h-2/6 mt-4">
					<CartButton id={product.id} />
				</CardActions>
			</CardContent>
		</div>
	)
}
export default сard
