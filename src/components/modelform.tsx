import { Box, Button, Typography, Modal, Paper } from '@mui/material'
import { createPortal } from 'react-dom'

const modelStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 550,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	borderRadius: '10px',
	boxShadow: 12,
	p: 2,
}

type ModelFormType = {
	open: number
	handleClose: () => void
	handleDelete: () => void
}

export default function ModalForm({
	open,
	handleClose,
	handleDelete,
}: ModelFormType) {
	return (
		<>
			{createPortal(
				<Modal
					open={Boolean(open)}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Paper sx={modelStyle}>
						<Box sx={{ textAlign: 'center' }}>
							<Typography id="modal-modal-title" variant="h6" component="h2">
								<strong>You are about to promote an employee to client</strong>
							</Typography>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
								This will delete your employee from database permanently.
							</Typography>
							<Typography id="modal-modal-description">
								Are you sure?
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								mt: '20px',
							}}
						>
							<Button onClick={handleClose}>Cancel</Button>
							<Button
								sx={{ ml: '10px', background: 'red', color: 'black' }}
								onClick={handleDelete}
							>
								Delete
							</Button>
						</Box>
					</Paper>
				</Modal>,
				document.body
			)}
		</>
	)
}
