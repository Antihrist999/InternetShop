import IconButton from '@mui/material/IconButton/IconButton'

import ShareIcon from '@mui/icons-material/Share'

function ShareButton({ ...props }) {
	return (
		<div>
			<IconButton>{<ShareIcon />}</IconButton>
			{props.label && <label className="text-sm text-grayscale">Поделиться</label>}
		</div>
	)
}
export default ShareButton
