import { FC, useState } from 'react'

interface IButtonProps {
	label: string
	disabled: boolean
}
interface IButtonGroupProps {
	data: IButtonProps[]
	className: string
	label?: boolean
	handleClick?: (value: React.SetStateAction<number>) => void
}
const ButtonGroupCustom: FC<IButtonGroupProps> = ({ ...props }) => {
	const init = props.data.findIndex(val => !val.disabled)
	const [selectedButton, setSelectedButton] = useState<number | null>(init)
	const getColor = (index: number, style: string) =>
		selectedButton === index
			? 'bg-secondary text-white ' + style
			: 'bg-white text-grayscale ' + style
	return (
		<div className={props.className}>
			{props.label && <label className="text-gray">Время</label>}
			<div className="flex flex-row h-full">
				{props.data.map((button, index) => (
					<button
						className={getColor(index, 'w-full rounded')}
						key={index}
						disabled={button.disabled}
						onClick={() => {
							if (props?.handleClick) props.handleClick(index)
							setSelectedButton(index)
						}}
					>
						{button.label}
					</button>
				))}
			</div>
		</div>
	)
}

export default ButtonGroupCustom
