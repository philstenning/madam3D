import {join,format} from './join'

interface IPath {
  join: (...paths: string[]) => string;
  format: (string: string, keepTrailingSlash? :boolean) => string;
}


const path: IPath = { join , format};

export { join, format };

export default path;
