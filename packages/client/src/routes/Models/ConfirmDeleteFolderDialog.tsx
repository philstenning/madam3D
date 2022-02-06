import {useAppSelector, useAppDispatch} from '../../app/hooks'
import { hideDeleteFolderDialog } from "../../features/folderSlice";
import Dialog from '../../components/dialog/Dialog';
import { ICurrentFolder } from "../../db";
import {
  deleteFolderAsync,
  
} from "../../features/folderSlice";

export  function ConfirmDeleteFolderDialog() {
  const data = useAppSelector(state=>state.folderReducer)
  const dispatch = useAppDispatch()
 const handleDelete = () => {
   if (data.currentFolder?.id)
     dispatch(deleteFolderAsync(data.currentFolder?.id));
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
