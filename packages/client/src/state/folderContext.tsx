import { createCtx } from "./contextFactory";
import { IFolder, db } from "../db/db";

// interface
// const placeholder: IFolder = {}
const initialState = {
  selectedFolder:  null,
  showDialog: true,
  folders: [] as IFolder[],
};

type FolderPageState = {
  selectedFolder: IFolder | null;
  showDialog: boolean;
  folders: IFolder[];
};

type Action =
  | { type: "SET_CURRENT_FOLDER"; payload: IFolder}
  | { type: "SHOW_DIALOG" }
  | { type: "HIDE_DIALOG" }
  | { type: "SET_FOLDERS"; payload: IFolder[] }
  | { type: "ADD_FOLDER"; payload: IFolder }
  | { type: "DELETE_FOLDER"; payload: IFolder }
  | { type: "UPDATE_FOLDER"; payload: IFolder }
  | {
      type: "MOVE_FOLDER";
      payload: { oldParent: IFolder; newParent: IFolder };
    };

function reducer(state: FolderPageState, action: Action): FolderPageState {
  switch (action.type) {
    case "SET_CURRENT_FOLDER":
    //   if (!action.payload) {
    //     return { ...state, selectedFolder: null };
    //   }
      return {
        ...state,
        selectedFolder: action.payload,
      };
    case "SHOW_DIALOG":
      return {
        ...state,
        showDialog: true,
      };
    case "HIDE_DIALOG":
      return {
        ...state,
        showDialog: false,
      };
    case "SET_FOLDERS":
      // TODO: add to db
      return {
        ...state,
        folders: action.payload,
      };
    case "ADD_FOLDER":
      //TODO: add folder to db
      // check if already exists first.
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    case "DELETE_FOLDER":
      // check for id
      const id = action.payload.id;
      if (id) {
        // delete folder from db
        db.folders
          .delete(id)
          .then(() => {
            return {
              ...state,
              folders: state.folders.filter(
                (folder) => folder.id !== action.payload.id
              ),
            };
          })
          .catch((e) => {
            console.log(`Error deleting folder:${action.payload.name}`);
          });
      }
      console.log("you should not see mee. folderContext.tsx ln77");
      return {
        ...state,
      };
    default:
      return state;
  }
}

const [ctx, Provider] = createCtx(reducer, initialState);
const FolderContext = ctx;
const FolderProvider = Provider;
export { FolderContext, FolderProvider };
