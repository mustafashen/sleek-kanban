import { Stack, Card, Divider, Typography } from "@mui/joy";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useBoardContext } from "../contexts/useBoardContext";
import { useMemo } from "react";

type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}

type Props = {
	categoryData: {categoryID: string, categoryName: string, tasks: TaskType[]}
}


export default function Category(props: Props) {
	const {categoryData} = props
	useMemo(() => {return categoryData},[categoryData])

	// TODO: fix type warnings
	const {boardData, setBoardData} = useBoardContext()
	useMemo(() => {return {boardData, setBoardData}}, [boardData, setBoardData])

	function handleTaskDrag(prevCategoryID: string, draggedCategoryID: string, task: TaskType) {
		const boardCopy = [...boardData]

		if (prevCategoryID !== draggedCategoryID) { 
			boardCopy.map(category => {
				if (category.categoryID === draggedCategoryID) {
					category.tasks = [...category.tasks, task]
					return setBoardData(boardCopy)
				}
			})
	
			boardCopy.map(category => {
				if (category.categoryID === prevCategoryID) {
					category.tasks.map((prevTask: TaskType) => {
						if(prevTask.taskID === task.taskID) {
							category.tasks = category.tasks.filter((task: TaskType) => task.taskID !==  prevTask.taskID)
							return setBoardData(boardCopy)
						}
					})
				}
			})
		}

	}
	
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
								return <Task taskData={task} parentCategoryID={categoryData.categoryID} key={task.taskID}/>
							})
						}
			</Stack>
		</Card>
  )
}
