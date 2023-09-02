import {Stack, Card, Sheet, Button, Typography, Divider, Input, Modal, ModalClose} from '@mui/joy'
import Category from './Category'
import {useBoardContext} from '../contexts/useBoardContext'
import { Add } from '@mui/icons-material';
import { useState } from 'react';

type TaskType = {taskID: string, taskName: string, taskDesc: string, isComplete: boolean}
type CategoryType = {categoryID: string, categoryName: string, tasks: TaskType[]}
type BoardType = CategoryType[]

export default function DragField() {
  // TODO: fix type warnings
  const {boardData, setBoardData}: any = useBoardContext()
  const [open, setOpen] = useState<boolean>(false)
	const [newCategoryInput, setNewCategoryInput] = useState<{name: string}>({name: ''})

	function handleInputChange(event: {target: {name: string, value: string}}) {
		if (event.target.name  === 'name') {
			setNewCategoryInput({
				...newCategoryInput,
				name: event.target.value
			})
		}
	}

  function handleAddCategory() {
    const arbitaryID = boardData.length + 1

    const newCategory = {categoryID: arbitaryID, categoryName: newCategoryInput.name, tasks: []}
    setBoardData((currentState: BoardType) => [...currentState, newCategory])
    setOpen(false)
  }

  return (
      <Sheet>
        <Stack direction="row" spacing={2}>
                        {boardData.map((category: CategoryType) => {
                            return <Category categoryData={category} key={category.categoryID}/>
                        })}
          <Card>
            <Button onClick={() => setOpen(true)} startDecorator={<Add/>}>New Category</Button>
            <Modal 
              open={open}
              onClose={() => setOpen(false)}>
              <Card 
                sx={{marginTop: '30vh', marginX: 'auto', width: '400px'}}>
                <Typography component={'h3'}> New Task</Typography>
                <ModalClose/>
                <Divider/>
                <Input placeholder="Category Name" name="name" onChange={handleInputChange}/>
                <Button onClick={handleAddCategory} startDecorator={<Add/>}>Add Category</Button>
              </Card>
            </Modal>
          </Card>
        </Stack>
      </Sheet>
  )
}
