import { Card } from '@mui/material'
import '../css/catalog.css'
import { Link } from 'react-router-dom'
interface ICatalog {
	setCategory: React.Dispatch<React.SetStateAction<string>>
	name: string
	size: string
}
function CatalogCart(props: ICatalog) {
	const setCategory = (value: string) => {
		props.setCategory(value)
	}
	return (
		<Card className={props.size}>
			<Link
				style={{
					height: '200px',
					background:
						'linear-gradient(180deg, rgba(112, 192, 91, 0.00) 0%, #70C05B 82%), url(' +
						require(`./../asset/images/${props.name}.png`) +
						')'
				}}
				onClick={() => {
					setCategory(props.name)
				}}
				to="/catalogProducts"
			>
				<div className="text-card"> {props.name}</div>
			</Link>
		</Card>
	)
}
export default CatalogCart
