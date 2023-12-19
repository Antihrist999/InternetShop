import '../css/filter.css'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { ChangeEvent, useState } from 'react'
import { Button, InputBase } from '@mui/material'
import { styled } from '@mui/material/styles'

import FormControlLabel from '@mui/material/FormControlLabel'
import Switch, { SwitchProps } from '@mui/material/Switch'
import { IFilter } from '../types/filter'
import { useGetUserId } from '../hooks/useGetUserId'
interface ISetFilter {
	setFilteres: React.Dispatch<React.SetStateAction<IFilter>>
}
function Filter(props: ISetFilter) {
	const userId = useGetUserId().userId
	const minDistance = 1
	const [value, setValue] = useState<number[]>([0, 9999])
	const [checked, setChecked] = useState<boolean>(true)
	const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked)
	}
	const handleChange = (newValue: number | number[], activeThumb: number) => {
		if (!Array.isArray(newValue)) {
			return
		}
		if (activeThumb === 0) {
			setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
		} else {
			setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
		}
	}

	const ISwitch = styled((props: SwitchProps) => (
		<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
	))(({ theme }) => ({
		width: 46,
		height: 24,
		padding: 0,
		'& .MuiSwitch-switchBase': {
			padding: 0,
			margin: 2,
			transitionDuration: '300ms',
			'&.Mui-checked': {
				transform: 'translateX(22px)',
				color: '#fff',
				'& + .MuiSwitch-track': {
					backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
					opacity: 1,
					border: 0
				},
				'&.Mui-disabled + .MuiSwitch-track': {
					opacity: 0.5
				}
			},
			'&.Mui-focusVisible .MuiSwitch-thumb': {
				color: '#33cf4d',
				border: '6px solid #fff'
			},
			'&.Mui-disabled .MuiSwitch-thumb': {
				color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600]
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: theme.palette.mode === 'light' ? 0.7 : 0.3
			}
		},
		'& .MuiSwitch-thumb': {
			boxSizing: 'border-box',
			width: 20,
			height: 20
		},
		'& .MuiSwitch-track': {
			borderRadius: 24 / 2,
			backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
			opacity: 1,
			transition: theme.transitions.create(['background-color'], {
				duration: 500
			})
		}
	}))
	return (
		<div className="filter">
			<div className="filter-text logo-text">Фильтр</div>
			<Box sx={{ width: 272 }}>
				<div className="row-end">
					<div className="text">Цена</div>
					<Button
						style={{
							borderRadius: '4px',
							backgroundColor: '#f3f2f1',
							color: '#606060',
							textAlign: 'center',
							fontFamily: 'Rubik',
							fontSize: '12px',
							fontStyle: 'normal',
							fontWeight: '400',
							lineHeight: '150%',
							width: '85px',
							height: '32px',
							textTransform: 'capitalize'
						}}
						variant="contained"
						className=""
						onClick={() => {
							setChecked(true)
							setValue([0, 9999])
						}}
					>
						Очистить
					</Button>
				</div>
				<div className="number-row">
					<div className="number-field">
						<InputBase
							type="number"
							autoComplete="off"
							className="input-field"
							value={value[0]}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								if (e.currentTarget.value.indexOf('0') === 0) {
									e.currentTarget.value = e.currentTarget.value.replace('0', '')
								}
								setValue([Number(e.currentTarget.value), value[1]])
							}}
						/>
					</div>
					<div className="dash" />
					<div className="number-field">
						<InputBase
							type="number"
							autoComplete="off"
							className="input-field"
							value={value[1]}
							onChange={(e: ChangeEvent<HTMLInputElement>) => {
								setValue([value[0], Number(e.currentTarget.value)])
							}}
						/>
					</div>
				</div>
				<Slider
					getAriaLabel={() => 'Minimum distance'}
					value={value}
					min={0}
					max={10000}
					onChange={(event: Event, value: number | number[], activeThumb: number) => {
						handleChange(value, activeThumb)
					}}
					disableSwap
					style={{ color: '#70C05B' }}
				/>
			</Box>
			<FormControlLabel
				control={<ISwitch sx={{ m: 1 }} onChange={handleCheck} checked={checked} />}
				label="В наличии"
				className="text"
			/>
			<Button
				style={{
					borderRadius: '4px',
					textAlign: 'center',
					fontFamily: 'Rubik',
					fontSize: '16px',
					fontStyle: 'normal',
					fontWeight: '400',
					lineHeight: '150%',
					width: '272px',
					height: '40px',
					textTransform: 'capitalize'
				}}
				variant="contained"
				className=""
				onClick={() => {
					props.setFilteres({
						minPrice: value[0],
						maxPrice: value[1],
						/* category: string[],
						available?: boolean, */
						isFavorite: true,
						userId: userId
					})
				}}
			>
				Применить
			</Button>
		</div>
	)
}
export default Filter
