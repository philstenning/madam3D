import {useAppSelector, useAppDispatch} from '../../app/hooks'
import { hideDeleteFolderDialog } from "../../features/folderSlice";
import Dialog from '../dialog/Dialog';
import { ICurrentFolder } from "../../db/db";
import {
  deleteFolderAsync,
  
} from "../../features/folderSlice";
interface IFolderDialogProps {
  folder: ICurrentFolder | null;
}

export  function ConfirmDeleteFolderDialog({folder}:IFolderDialogProps) {
  const data = useAppSelector(state=>state.folderReducer)
  const dispatch = useAppDispatch()
 const handleDelete = () => {
   if (folder?.id) dispatch(deleteFolderAsync(folder.id));
 };
  return (
    <Dialog title="Delete Folder" show={data.showDialog}>
      <p>Are you sure you want to delete the folder:</p>
      <p>{data.currentFolder?.name}</p>
      <div className="dialog__buttons">
        <button
          className="btn dialog__btn"
          onClick={() => dispatch(hideDeleteFolderDialog())}
        >
          no
        </button>
        <button
          className="btn dialog__btn"
          // TODO: add delete button function.
          onClick={ handleDelete}
        >
          Yes
        </button>
      </div>
    </Dialog>
  );
}
