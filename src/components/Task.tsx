import { Typography, Card, Checkbox} from '@mui/joy'
import { useDrag } from 'react-dnd'
import { useBoardContext } from '../contexts/useBoardContext'

type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}

type Props = {
	parentCategoryID: string,
	taskData: {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}
}

export default function Task(props: Props) {
	const {parentCategoryID, taskData} = props
	const {taskID, taskName, taskDesc, isComplete} = taskData
	// TODO: fix type warnings
	const {boardData, setBoardData} =  useBoardContext()

	const [{ isDragging }, drag, dragPreview] = useDrag({
		type: 'TASK',
		item: {parentCategoryID, taskData},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	})


	function handleComplete(id: string) {
		console.log(id)
		const boardCopy = [...boardData]

		boardCopy.map(category => {
			const {tasks} = category
			tasks.map((task: TaskType) => {
				if ( task.taskID === id) {
					task.isComplete = !task.isComplete
					return setBoardData(boardCopy)
				}
			})
		})
	}

	function handleCheckboxChange() {
		handleComplete(taskID)
	}

  return (
	<div ref={dragPreview}>
		<Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1}}>
			<Checkbox label={taskName} onChange={handleCheckboxChange} checked={isComplete}/>
			<Typography>{taskDesc}</Typography>
		</Card>
	</div>
  )
}
