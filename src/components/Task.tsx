import { Typography, Card, Checkbox, Menu, Dropdown, MenuButton, MenuItem, Button, Modal, Input, Divider, ModalClose, FormControl, FormHelperText} from '@mui/joy'
import { useDrag } from 'react-dnd'
import { useBoardContext } from '../contexts/useBoardContext'
import { DeleteForever, Edit, MoreVert } from '@mui/icons-material'
import { useState } from 'react'

type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}

type Props = {
	parentCategoryID: string,
	taskData: {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}
}

export default function Task(props: Props) {
	const {parentCategoryID, taskData} = props
	const {taskID, taskName, taskDesc, isComplete} = taskData

	const [open, setOpen] = useState<boolean>(false)
	const [updateTaskInput, setupdateTaskInput] = useState<{name: string, desc: string}>({name: '', desc: ''})

	// TODO: fix type warnings
	const {boardData, setBoardData}: any =  useBoardContext()

	const [{ isDragging }, drag, dragPreview] = useDrag({
		type: 'TASK',
		item: {parentCategoryID, taskData},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	})


	function handleComplete(id: string) {
		const boardCopy = [...boardData]

		boardCopy.forEach(category => {
			const {tasks} = category
			tasks.forEach((task: TaskType) => {
				if ( task.taskID === id) {
					task.isComplete = !task.isComplete
				}
			})
		})
		setBoardData(boardCopy)
	}

	function handleCheckboxChange() {
		handleComplete(taskID)
	}

	function handleDelete(id: string) {
		const boardCopy = [...boardData]

		boardCopy.forEach(category => {
			const tasks: TaskType[] = category.tasks
			tasks.map((task: TaskType, index) => {
				if (task.taskID === id) {
					console.log('anyone here?')
					return tasks.splice(index, 1)
				}
			})
			console.log(tasks)
		})
		setBoardData(boardCopy)
	}

	function handleInputChange(event: {target: {name: string, value: string}}) {
		if (event.target.name  === 'name') {
			setupdateTaskInput({
				...updateTaskInput,
				name: event.target.value
			})
		} else if (event.target.name  === 'desc') {
			setupdateTaskInput({
				...updateTaskInput,
				desc: event.target.value
			})
		}
	}

	function handleTaskUpdate(id: string) {
		const boardCopy = [...boardData]

		boardCopy.forEach(category => {
			const {tasks} = category
			tasks.forEach((task: TaskType) => {
				if ( task.taskID === id) {
					task.taskName = updateTaskInput.name
					task.taskDesc = updateTaskInput.desc
				}
			})
		})
		setBoardData(boardCopy)
	}

  return (
	<div ref={dragPreview}>
		<Card
			ref={drag} 
			style={{ opacity: isDragging ? 0.5 : 1}}
			sx={{position: 'relative', padding: '20px'}}>
			<FormControl>
				<Checkbox color='success' label={taskName} onChange={handleCheckboxChange} checked={isComplete}/>
				<FormHelperText>{taskDesc}</FormHelperText>
			</FormControl>
			<Dropdown>
				<MenuButton sx={{position: 'absolute', top: '0', right: '0', border: 'none', zIndex: '1', width: '30px', height: '0', padding: '0'}}>
					<MoreVert/>
				</MenuButton>
				<Menu>
					<MenuItem onClick={() => {handleDelete(taskID)}}><Typography startDecorator={<DeleteForever/>}>Delete Task</Typography></MenuItem>
					<MenuItem onClick={() => setOpen(true)}><Typography startDecorator={<Edit/>}>Edit Task</Typography></MenuItem>
				</Menu>	
			</Dropdown>
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				sx={{width: '600px', margin: '400px auto 0 auto'}}>
				<Card>
					<Typography component={'h3'}> Update Task</Typography>
					<ModalClose/>
					<Divider/>
					<Input name="name" value={updateTaskInput.name} onChange={handleInputChange}/>
					<Input name="desc" value={updateTaskInput.desc} onChange={handleInputChange}/>
					<Button onClick={() => handleTaskUpdate(taskID)} startDecorator={<Edit/>}>Update Task</Button>
				</Card>
			</Modal>
		</Card>
	</div>
  )
}
