import {TypedUseSelectorHook,useDispatch,useSelector } from 'react-redux'
import {RootState,AppDispatch} from './store'

// use throughout you app instead of plain 'useDispatch' and 'useSelector'
// we then benefit from full typed results/actions.
export const useAppDispatch=()=> useDispatch<AppDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;