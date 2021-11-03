import {createCtx}from './contextFactory'

const initialState = {
  rating: 66,
  price: 4,
};

type AppState = typeof initialState;

type Action =
  | { type: "SET_RATING"; payload: number }
  | { type: "SET_PRICE"; payload: number }
  | { type: "RESET"; payload: number };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case `SET_RATING`:
      return { ...state, rating: state.rating + action.payload };
    case `SET_PRICE`:
      return { ...state, price: action.payload };
    case `RESET`:
      return { ...state, ...initialState };
    default:
      return state;
  }
}

const [ctx, Provider] = createCtx(reducer, initialState);
export const MainContext = ctx;
export const MainProvider = Provider;

