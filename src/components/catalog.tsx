import Stack from '@mui/material/Stack'
import CatalogCart from './catalogCart'
import { useGetCategoriesQuery } from '../store/serviceApi/catalog.api'
interface ICatalog {
	setCategory: React.Dispatch<React.SetStateAction<string>>
}
export function Catalog(props: ICatalog) {
	const { data: catalog, isFetching } = useGetCategoriesQuery()
	return !isFetching ? (
		<div
			style={{
				width: '1208px',
				justifyContent: 'center',
				margin: 'auto',
				display: 'flex',
				flexDirection: 'column',
				gap: '60px'
			}}
		>
			<div
				style={{
					alignItems: 'flex-start'
				}}
				className="text"
			>
				Кaталог
			</div>
			<Stack useFlexGap flexWrap="wrap" direction="row" alignItems="flex-start" spacing={'40px'}>
				{catalog?.map((catalogCart, index) =>
					index < 10 ? (
						<CatalogCart
							setCategory={props.setCategory}
							name={catalogCart.name}
							key={catalogCart.id}
							size={index === 0 || index === 5 ? 'fat-card' : 'card'}
						/>
					) : (
						''
					)
				)}
			</Stack>
		</div>
	) : (
		<div
			style={{
				width: '1208px',
				alignItems: 'flex-start'
			}}
			className="text"
		>
			Кaталог
		</div>
	)
}
