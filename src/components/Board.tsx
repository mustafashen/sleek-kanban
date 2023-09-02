import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragField from './DragField'
import { BoardContextProvider } from '../contexts/useBoardContext';


export default function Board() {

  return (
		<BoardContextProvider>
			<DndProvider backend={HTML5Backend}>
				<DragField/>
			</DndProvider>
		</BoardContextProvider>
  )
}
