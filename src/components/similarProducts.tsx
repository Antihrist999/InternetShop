import { useEffect, useState } from 'react'

import { IProductCatalog } from '../types/product'
import { useGetProductsByCategoryQuery } from '../store/serviceApi/product.api'
import { Link } from 'react-router-dom'

function SimilarProducts({ ...props }) {
	const [value, setValue] = useState<IProductCatalog[]>([])

	const { data, isSuccess } = useGetProductsByCategoryQuery(props.catalog, {
		skip: props.catalog === undefined
	})

	useEffect(() => {
		if (isSuccess) setValue(data)
	}, [data])

	return (
		<div>
			{value.map(product => (
				<div className="h-[104px]" key={product.id}>
					<Link to={`/DetailCard/${product.id}`}>
						<img src={`data:image/png;base64,${product.picture?.image}`} className="h-1/2 w-full" />
					</Link>
					<label className="font-bold h-1/2  w-full	flex p-2 text-lg">{product.price.price} Р</label>
				</div>
			))}
		</div>
	)
}
export default SimilarProducts
