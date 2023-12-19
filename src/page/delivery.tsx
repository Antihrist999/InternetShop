import { Autocomplete, FormHelperText, TextField } from '@mui/material'

import CartPrice from '../components/cartPrice'
import { useGetAddressQuery } from '../store/serviceApi/address.api'
import { useEffect, useState } from 'react'
import InputCustom from '../components/inputCustom'
import SelectCustom from '../components/selectCustom'
import ButtonGroupCustom from '../components/buttonGroupCustom'

interface IAddressValue {
	value: string
	data?: {
		city: string
		house: string
		street: string
		flat: string
		settlement: string
	}
}
function Delivery() {
	const now: Date = new Date()

	const time = [
		{ label: '8:00 - 14:00', disabled: true },
		{ label: '14:00 - 18:00', disabled: false },
		{ label: '18:00 - 20:00', disabled: false },
		{ label: '20:00 - 22:00', disabled: true }
	]

	const [searchValue, setSearchValue] = useState('')
	const data = useGetAddressQuery(searchValue, {
		skip: !searchValue.length
	})
	const [selectDate, setSelectDate] = useState('13.11.2023')
	const [street, setStreet] = useState('')
	const [house, setHouse] = useState('')
	const [flat, setFlat] = useState('')
	const [addition, setAddition] = useState('')
	const [options, setOptions] = useState<IAddressValue[]>([])

	const handleSearch = (value: string) => {
		setSearchValue(value)
	}

	useEffect(() => {
		if (data.isSuccess) {
			setOptions(data.data.suggestions)
		}
	}, [data.isSuccess])

	const getSelectDate = () => {
		const limitDelivery = 10
		const arrDate = []

		for (let i = 0; i < limitDelivery; i++) {
			const datestring = now.getDate() + i + '.' + (now.getMonth() + 1) + '.' + now.getFullYear()
			arrDate.push(datestring)
		}
		return arrDate
	}

	return (
		<div className="m-auto bg-background w-[1208px] h-[626px]">
			<div className="flex flex-row pb-16 bg-background">
				<div className="text-main text-7xl font-bold">Доставка</div>
			</div>
			<div className="flex flex-row bg-background">
				<div className="w-3/4">
					<label className="text-main text-3xl font-bold">Куда</label>
					<div className="pt-6 flex flex-row justify-between	">
						<div>
							<FormHelperText>Населенный пункт</FormHelperText>
							<Autocomplete
								id="combo-box-demo"
								size="small"
								options={options}
								sx={{ width: 300, '.MuiInputBase-root': { height: 34 }, backgroundColor: 'white' }}
								onInputChange={(event: React.SyntheticEvent<Element, Event>, value) => {
									handleSearch(value)
								}}
								onChange={(_event, value) => {
									setHouse(value?.data?.house ?? '')
									setStreet(value?.data?.street ?? value?.data?.settlement ?? '')
									setFlat(value?.data?.flat ?? '')
								}}
								isOptionEqualToValue={(option, value) => option.data?.city === value.data?.city}
								getOptionLabel={option => option.value}
								renderInput={params => <TextField {...params} />}
							/>
						</div>
						<InputCustom
							value={street}
							label="Улица"
							width="300px"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setStreet(event.target.value)
							}}
						></InputCustom>

						<InputCustom
							value={house}
							width="50px"
							label="Дом"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setHouse(event.target.value)
							}}
						></InputCustom>

						<InputCustom
							width="50px"
							value={flat}
							label="Квартира"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setFlat(event.target.value)
							}}
						></InputCustom>
						<InputCustom
							width="150px"
							value={addition}
							label="Дополнительно"
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
								setAddition(event.target.value)
							}}
						></InputCustom>
					</div>
					<div className="flex flex-col pt-10">
						<label className="text-main text-3xl font-bold pb-4">Когда</label>
						<div className="flex flex-row justify-between h-16">
							<SelectCustom
								label="Дата"
								className="mr-10 w-1/4 flex flex-col"
								option={getSelectDate()}
								value={selectDate}
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
									setSelectDate(event.target.value)
								}}
							/>
							<ButtonGroupCustom data={time} className="w-3/4  flex flex-col" label />
						</div>
					</div>
				</div>
				<CartPrice className="flex flex-row w-1/4" delivery />
			</div>
		</div>
	)
}
export default Delivery
