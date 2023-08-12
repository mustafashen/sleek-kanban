import { createContext, useState, useContext } from "react"

type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}
type CategoryType = {categoryID: string, categoryName: string, tasks: TaskType[]}
type BoardType = CategoryType[]
type BoardContextStore = {
	boardData: BoardType,
	setBoardData: React.Dispatch<React.SetStateAction<BoardType>>,
}

const BoardContext = createContext<BoardContextStore | undefined>(undefined)

export function BoardContextProvider({children}: {children: React.ReactElement}) {

	const [boardData, setBoardData] = useState<BoardType>([
		{categoryID: '1', categoryName: 'A category', tasks: [{taskID: '1', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '7', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '2', categoryName: 'A category', tasks: [{taskID: '2', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '8', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '3', categoryName: 'A category', tasks: [{taskID: '3', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '9', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '4', categoryName: 'A category', tasks: [{taskID: '4', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '10', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '5', categoryName: 'A category', tasks: [{taskID: '5', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '11', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
		{categoryID: '6', categoryName: 'A category', tasks: [{taskID: '6', taskName: 'A task', taskDesc: 'About this task', isComplete: false},{taskID: '12', taskName: 'A task', taskDesc: 'About this task', isComplete: false}]},
	])
	
    const BoardContextStore = {
        boardData,
        setBoardData,
    }

	return (
		<BoardContext.Provider value={BoardContextStore}>
			{children}
		</BoardContext.Provider>
	)
}

export const useBoardContext = () => useContext(BoardContext)


