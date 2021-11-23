import {useContext} from 'react'
import { FolderContext } from '../../state/folderContext';
import Dialog from '../dialog/Dialog';

export  function ConfirmDeleteFolderDialog() {
  const { state, dispatch } = useContext(FolderContext);

  return (
    <Dialog title="Delete Folder" show={state.showDialog}>
      <p>Are you sure you want to delete the folder:</p>
      <p>{state.selectedFolder?.name}</p>
      <div className="dialog__buttons">
        <button
          className="btn dialog__btn"
          onClick={() => dispatch({ type: "HIDE_DIALOG" })}
        >
          no
        </button>
        <button
          className="btn dialog__btn"
          onClick={() =>
            dispatch({ type: "DELETE_FOLDER", payload: state.selectedFolder})
          }
        >
          Yes
        </button>
      </div>
    </Dialog>
  );
}
