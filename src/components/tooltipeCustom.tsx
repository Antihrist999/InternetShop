import { useState } from 'react'

export const HoverTooltip = () => {
	const [isTooltipVisible, setIsTooltipVisible] = useState(false)

	return (
		<>
			<button
				style={{ backgroundColor: 'black', color: 'white' }}
				onMouseEnter={() => setIsTooltipVisible(true)}
				onMouseLeave={() => setIsTooltipVisible(false)}
			>
				Hover me
			</button>
			{isTooltipVisible && (
				<p
					style={{
						position: 'absolute',
						top: '10px',
						left: '10px',
						backgroundColor: 'rgba(0, 0, 0, .8)',
						color: 'white',
						padding: '5px'
					}}
				>
					Hello World!
				</p>
			)}
		</>
	)
}
