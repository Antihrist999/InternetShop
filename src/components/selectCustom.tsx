import { FormControl, MenuItem, Select } from '@mui/material'

export function SelectCustom({ ...props }) {
	return (
		<div {...props}>
			<label className="text-gray">{props.label}</label>
			<FormControl size="small">
				<Select
					defaultValue={props.defaultValue}
					value={props.value}
					onChange={props.onChange}
					sx={{
						backgroundColor: 'white',
						'.MuiInputBase-root': { display: 'flex' },

						'.MuiSelect-select': {
							border: '1px solid #BFBFBF',
							borderRadius: '4px',
							paddingLeft: '8px'
						}
					}}
				>
					{props.option.map((item: string, index: number) => (
						<MenuItem value={item} key={index}>
							{item}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
export default SelectCustom
