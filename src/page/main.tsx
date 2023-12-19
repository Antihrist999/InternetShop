import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps'
import { CarouselCard } from '../components/carouselCard'
import ButtonGroupCustom from '../components/buttonGroupCustom'
import { useState } from 'react'

function Main() {
	const magaz = [
		{ label: 'Москва', disabled: false, coord: [55.45, 37.36], isActive: false },
		{ label: 'Питер', disabled: false, coord: [59.57, 30.19], isActive: false },
		{ label: 'Воронеж', disabled: false, coord: [51.4, 39.12], isActive: false }
	]
	const [map, setMap] = useState(magaz[0])
	const handleClick = (value: React.SetStateAction<number>) => {
		setMap(magaz[Number(value)])
	}
	return (
		<div className="flex flex-col flex-1">
			<div
				className="h-[200px] w-full"
				style={{
					background: ' url(' + require(`./../asset/images/image.png`) + ')'
				}}
			></div>
			<div className="pt-20">
				<CarouselCard label="Акции" hrefLabel="Все акции" count={4} value={[]} />
			</div>
			<div className="pt-32">
				<CarouselCard label="Новинки" hrefLabel="Все новинки" count={4} value={[]} />
			</div>
			<div className="pt-32">
				<CarouselCard label="Покупали раньше" hrefLabel="Все покупки" count={4} value={[]} />
			</div>
			<div>
				<div>Специальное предложение хедер</div>
				<div>
					<div>Покупали раньше Карусель</div>
					<div>Покупали раньше Карусель</div>
				</div>
			</div>
			<div className="m-auto">
				<label className="text-main text-4xl font-bold ">Наши магазины</label>
				<YMaps>
					<div className="mt-10">
						<ButtonGroupCustom
							data={magaz}
							className="w-3/4  flex flex-col mb-4"
							handleClick={handleClick}
						/>
						<Map width="1208px" height="353px" state={{ center: map.coord, zoom: 9 }}>
							<Placemark geometry={map.coord} defaultGeometry={map.coord} />
						</Map>
					</div>
				</YMaps>
			</div>
			<div>
				<div>Статьи хедер</div>
				<div>
					<div>карта</div>
					<div>карта</div>
				</div>
			</div>
		</div>
	)
}
export default Main
