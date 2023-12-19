import { Checkbox, Stack } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import { FC, useEffect, useState } from 'react'
import { ICartsDetails } from '../types/cart'

import { useGetProductByIdQuery } from '../store/serviceApi/product.api'
import { useUpdateCartsMutation } from '../store/serviceApi/cart.api'
import { CProduct, IProduct } from '../types/product'
import PriceField from './priceText'

const ItemCart: FC<ICartsDetails> = ({ cart }) => {
	const [product, setProduct] = useState<IProduct>(new CProduct())
	const [updateCarts] = useUpdateCartsMutation()
	const { data: productQuery, isSuccess } = useGetProductByIdQuery(cart.productId, {
		skip: !cart.productId
	})

	useEffect(() => {
		if (isSuccess) setProduct(productQuery)
	}, [isSuccess])

	const getSummProduct = () => {
		return (cart?.counter * product.price.price).toFixed(2)
	}

	const getSummDiscont = () => {
		return (priceCard() * cart.counter).toFixed(2)
	}
	const priceCard = () => {
		if (product.price.discount)
			return product.price.price - (product.price.price * product.price.discount) / 100
		return product.price.price
	}

	return (
		<div
			style={{
				minHeight: product.price.discount ? '90px' : '72px'
			}}
			className="flex bg-white hover:shadow-shadow rounded max-w-4xl"
		>
			<Stack
				direction="row"
				spacing={1}
				style={{ width: '876px' }}
				justifyContent="space-between"
				alignItems="center"
			>
				<div>
					<img src={`data:image/png;base64,${product.picture?.image}`} className="w-20 ml-2 flex" />
				</div>
				<Checkbox
					style={{ position: 'absolute', display: 'flex', paddingBottom: '60px' }}
					color="secondary"
					checked={cart?.isSelected}
					onChange={() => updateCarts({ ...cart, isSelected: !cart.isSelected })}
					inputProps={{ 'aria-label': 'controlled' }}
				/>

				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						width: '536px'
					}}
				>
					<label style={{ fontWeight: 'bold' }}>{product.name}</label>

					{!product.price.discount && <label>{product.price.price} ₽ за шт.</label>}
					{product.price.discount && (
						<div className="flex flex-row h-8">
							<PriceField
								product={product}
								fontSizeDiscount="text-xs"
								fontSize="text-xs"
								width="w-28"
							/>
							<label className="text-xs text-grayscale pl-1">за шт.</label>
							<div className="flex bg-primary justify-center h-full w-14 mx-2 rounded items-center">
								<label className="text-white flex">-{product.price.discount} %</label>
							</div>
						</div>
					)}
				</div>

				<div
					style={{
						width: '100px',
						display: 'flex',
						flexDirection: 'row',
						backgroundColor: '#70C05B',
						justifyContent: 'space-around',
						height: '40px',
						alignItems: 'center',
						borderRadius: '4px'
					}}
				>
					<IconButton
						onClick={() =>
							cart?.counter !== undefined && cart?.counter > 1
								? updateCarts({ ...cart, counter: cart.counter - 1 })
								: 1
						}
						style={{ color: '#FFFFFF' }}
						className="h-6 w-6"
					>
						-
					</IconButton>

					<label style={{ color: '#FFFFFF' }}>{cart.counter}</label>
					<IconButton
						style={{ color: '#FFFFFF' }}
						onClick={() => updateCarts({ ...cart, counter: cart.counter + 1 })}
					>
						+
					</IconButton>
				</div>
				{!product.price.discount && (
					<label
						style={{
							fontWeight: 'bold',
							fontSize: '18px',
							width: '120px',
							textAlign: 'end',
							marginRight: '8px'
						}}
					>
						{getSummProduct()} ₽
					</label>
				)}
				{product.price.discount && (
					<div
						style={{
							width: '120px',
							display: 'flex',
							flexDirection: 'column',
							marginRight: '8px'
						}}
					>
						<label
							style={{
								fontWeight: 'bold',
								fontSize: '18px',
								textAlign: 'end'
							}}
						>
							{getSummDiscont()} ₽
						</label>
						<label
							style={{
								fontSize: '16px',
								color: '#8F8F8F',
								textDecoration: 'line-through',
								textAlign: 'end'
							}}
						>
							{getSummProduct()} ₽
						</label>
					</div>
				)}
			</Stack>
		</div>
	)
}
export default ItemCart
