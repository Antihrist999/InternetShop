import { FormControl, FormHelperText, Input } from '@mui/material'

export function InputCustom({ ...props }) {
	return (
		<FormControl variant="standard" sx={{ width: props.width }}>
			<FormHelperText>{props.label}</FormHelperText>
			<Input
				{...props}
				sx={{
					'.MuiInput-input': {
						paddingLeft: '8px',
						border: '1px solid #BFBFBF',
						borderRadius: '4px',
						backgroundColor: 'white'
					}
				}}
				disableUnderline
			/>
		</FormControl>
	)
}
export default InputCustom
