import { Stack, Card, Divider, Typography } from "@mui/joy";
import Task from "./Task";
import { useDrop } from "react-dnd";

type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}
type Props = {
	categoryData: {categoryID: string, categoryName: string, tasks: TaskType[]},
	handleComplete: (id: string) => void,
	handleTaskDrag: (parentCategoryID: string, categoryID: string, task: TaskType) => void
}

export default function Category(props: Props) {
	const {categoryData, handleComplete, handleTaskDrag} = props

	const [, drop] = useDrop({
		accept: 'TASK',
		drop: (item: {parentCategoryID: string, taskData: TaskType}) => {
			const {parentCategoryID, taskData} = item
			handleTaskDrag(parentCategoryID, categoryData.categoryID, taskData)
		}
	})
	
  return (
		<Card>
			<Typography alignSelf="center" level="h4">{categoryData.categoryName}</Typography>
			<Divider/>
			<Stack direction={"column"} spacing={2} height={'100%'} ref={drop}>
						{
							categoryData.tasks.map((task: TaskType) => {
								return <Task taskData={task} handleComplete={handleComplete} parentCategoryID={categoryData.categoryID} key={task.taskID}/>
							})
						}
			</Stack>
		</Card>
  )
}
