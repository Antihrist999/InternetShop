function PriceField({ ...props }) {
	const priceCard = () => {
		if (props.product.price.discount)
			return (
				props.product.price.price - (props.product.price.price * props.product.price.discount) / 100
			)
		return props.product.price.price
	}
	const getClassName = () => {
		if (props.reverse !== undefined && props.reverse)
			return 'flex flex-row flex-row-reverse justify-between items-center ' + props.width
		return 'flex flex-row justify-between items-center ' + props.width
	}
	const getClassText = () => {
		if (props.reverse !== undefined && props.reverse)
			return 'font-bold text-end ' + props.fontSizeDiscount
		return props.reverse !== undefined && !props.reverse
			? 'font-bold ' + props.fontSizeDiscount
			: 'font-bold text-start ' + props.fontSizeDiscount
	}
	const getClassLabel1 = () => {
		if (props.reverse !== undefined && props.reverse)
			return 'text-grey1 text-xs text-end min-h-[16px]'
		return props.reverse !== undefined && !props.reverse
			? 'text-grey1 text-xs min-h-[16px]'
			: 'text-grey1 text-xs text-start min-h-[16px]'
	}
	const getClassText2 = () => {
		if (props.reverse !== undefined && !props.reverse)
			return 'text-grayscale text-end ' + props.fontSize
		return props.reverse !== undefined && props.reverse
			? 'text-grayscale ' + props.fontSize
			: 'text-end text-grayscale ' + props.fontSize
	}
	const getClassLabel2 = () => {
		if (props.reverse !== undefined && !props.reverse) return 'text-grey1 text-xs text-end '
		return props.reverse !== undefined && props.reverse
			? 'text-grey1 text-xs '
			: 'text-end text-grey1 text-xs '
	}
	return (
		<div className={getClassName()}>
			<div className="flex flex-col $props.width">
				<label className={getClassText()}>{priceCard()} ₽</label>
				{!!props.product.price.discount && <label className={getClassLabel1()}>С картой</label>}
				{!props.product.price.discount && <label className={getClassLabel1()}></label>}
			</div>

			{!!props.product.price.discount && (
				<div className="flex flex-col">
					<label className={getClassText2()}>{props.product.price.price} ₽</label>
					<label className={getClassLabel2()}>Обычная</label>
				</div>
			)}
		</div>
	)
}
export default PriceField
