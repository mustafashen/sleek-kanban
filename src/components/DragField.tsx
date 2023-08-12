import {Stack, Card} from '@mui/joy'
import Category from './Category'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {useBoardContext} from '../contexts/useBoardContext'

type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}
type CategoryType = {categoryID: string, categoryName: string, tasks: TaskType[]}
type BoardType = CategoryType[]

export default function DragField() {
  
  // TODO: fix type warnings
  const {boardData}: {boardData: BoardType} = useBoardContext()
  return (
    <DndProvider backend={HTML5Backend}>
        <Card>
            <Stack direction="row" spacing={2}>
                            {boardData.map((category: CategoryType) => {
                                return <Category categoryData={category} key={category.categoryID}/>
                            })}
            </Stack>
        </Card>
    </DndProvider>
  )
}
