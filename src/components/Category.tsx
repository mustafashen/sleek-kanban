import { Stack, Card, Divider, Typography, Button, Modal, Input, ModalClose, Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy";
import Task from "./Task";
import { useDrop } from "react-dnd";
import { useBoardContext } from "../contexts/useBoardContext";
import { useMemo, useState } from "react";
import { Add, Delete, DeleteForever, MoreVert } from "@mui/icons-material";

type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}
type CategoryType = {categoryID: string, categoryName: string, tasks: TaskType[]}

type Props = {
	categoryData: CategoryType
}


export default function Category(props: Props) {
	const {categoryData} = props
	useMemo(() => {return categoryData},[categoryData])
	const [open, setOpen] = useState<boolean>(false)
	const [newTaskInput, setNewTaskInput] = useState<{name: string, desc: string}>({name: '', desc: ''})
	// TODO: fix type warnings
	const {boardData, setBoardData}: any = useBoardContext()
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

	function handleInputChange(event: {target: {name: string, value: string}}) {
		if (event.target.name  === 'name') {
			setNewTaskInput({
				...newTaskInput,
				name: event.target.value
			})
		} else if (event.target.name  === 'desc') {Delete
			setNewTaskInput({
				...newTaskInput,
				desc: event.target.value
			})
		}
	}

	function handleTaskCreate() {
		const newBoardData = [...boardData]

		newBoardData.forEach((category: CategoryType, index) => {
			if (category.categoryID === categoryData.categoryID) {
				const newTask = {taskID: `${category.categoryID}.${index}`, taskName: newTaskInput.name, taskDesc: newTaskInput.name, isComplete: false}
				category.tasks.push(newTask)
			}
		})

		setBoardData(newBoardData)
		setOpen(false)
	}

	function handleCategoryDelete() {
		let [newState] = [boardData]
		newState = newState.filter((el: CategoryType) => {return el.categoryID !== categoryData.categoryID})

		setBoardData(newState)
		
	}

  return (
		<Card sx={{position: "relative"}}>
			<Dropdown>
				<MenuButton sx={{position: "absolute", top: "0", right: "0", width: '0', height: '0', border: 'none'}}>
					<MoreVert/>
				</MenuButton>
				<Menu>
				<MenuItem 
					onClick={handleCategoryDelete}><DeleteForever/> Delete Category</MenuItem>
				</Menu>
			</Dropdown>
			<Typography alignSelf="center" level="h4">{categoryData.categoryName}</Typography>
			<Divider/>
			<Stack direction={"column"} spacing={2} height={'100%'} ref={drop}>
						{
							categoryData.tasks.map((task: TaskType) => {
								return <Task taskData={task} parentCategoryID={categoryData.categoryID} key={task.taskID}/>
							})
						}
			</Stack>
			<Card>
				<Button onClick={() => setOpen(true)} startDecorator={<Add/>}>
					Add Task
				</Button>
				<Modal 
					sx={{marginTop: '30vh', marginX: 'auto', width: '400px'}}
					open={open}
					onClose={() => setOpen(false)}>
					<Card>
						<Typography component={'h3'}> New Task</Typography>
						<ModalClose/>
						<Divider/>
						<Input placeholder="Task Name" name="name" value={newTaskInput.name} onChange={handleInputChange}/>
						<Input placeholder="Task Description" name="desc" value={newTaskInput.desc} onChange={handleInputChange}/>
						<Button onClick={handleTaskCreate} startDecorator={<Add/>}>Add Task</Button>
					</Card>
				</Modal>
			</Card>
		</Card>
  )
}
