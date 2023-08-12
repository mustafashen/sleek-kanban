import { BoardContextProvider, } from '../contexts/useBoardContext'
import DragField from './DragField'


export default function Board() {

  return (
	<BoardContextProvider>
		<DragField/>
	</BoardContextProvider>
  )
}
