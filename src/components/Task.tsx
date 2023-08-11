import { Typography, Card, Checkbox} from '@mui/joy'
import { useDrag } from 'react-dnd'
type Props = {
	parentCategoryID: string,
	taskData: {taskID: string, taskName: string, taskDesc: string, isComplete: boolean},
	handleComplete: (id: string) => void
}

export default function Task(props: Props) {
	const {parentCategoryID, taskData, handleComplete} = props
	const {taskID, taskName, taskDesc, isComplete} = taskData

	const [{ isDragging }, drag, dragPreview] = useDrag({
		type: 'TASK',
		item: {parentCategoryID, taskData},
		collect: (monitor) => ({
			isDragging: monitor.isDragging()
		})
	})

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
