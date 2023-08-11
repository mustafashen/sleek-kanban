import {Stack, Card} from '@mui/joy'
import Category from './Category'
import { useState } from 'react'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function Board() {
	type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}
	type CategoryType = {categoryID: string, categoryName: string, tasks: TaskType[]}
	type BoardType = CategoryType[]

	const [boardData, setBoardData] = useState<BoardType>([
		{categoryID: '1', categoryName: 'A category', tasks: [{taskID: '1', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '7', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '2', categoryName: 'A category', tasks: [{taskID: '2', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '8', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '3', categoryName: 'A category', tasks: [{taskID: '3', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '9', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '4', categoryName: 'A category', tasks: [{taskID: '4', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '10', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '5', categoryName: 'A category', tasks: [{taskID: '5', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '11', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '6', categoryName: 'A category', tasks: [{taskID: '6', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '12', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
	])

	function handleComplete(id: string) {
		console.log(id)
		const boardCopy = [...boardData]

		boardCopy.map(category => {
			const {tasks} = category
			tasks.map(task => {
				if ( task.taskID === id) {
					task.isComplete = !task.isComplete
					return setBoardData(boardCopy)
				}
			})
		})
	}

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
					category.tasks.map(prevTask => {
						if(prevTask.taskID === task.taskID) {
							category.tasks = category.tasks.filter(task => task.taskID !==  prevTask.taskID)
							return setBoardData(boardCopy)
						}
					})
				}
			})
		}

	}

  return (
    <DndProvider backend={HTML5Backend}>
		<Card>
			<Stack direction="row" spacing={2}>
							{boardData.map(category => {
								return <Category categoryData={category} handleComplete={handleComplete} handleTaskDrag={handleTaskDrag} key={category.categoryID}/>
							})}
			</Stack>
		</Card>
	</DndProvider>
  )
}
