import React from "react";
//https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052
//https://www.youtube.com/watch?v=eBYJ7O482Dc&ab_channel=LogRocket

export function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) {
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState; // we never actually use this

  const ctx = React.createContext({
    state: initialState,
    dispatch: defaultDispatch, // just to mock out the dispatch type and make it not optional
  });

  function Provider(props: React.PropsWithChildren<{}>) {
    const [state, dispatch] = React.useReducer<
      React.Reducer<StateType, ActionType>
    >(reducer, initialState);
    return <ctx.Provider value={{ state, dispatch }} {...props} />;
  }
  return [ctx, Provider] as const;
}

/////////////////////////////////////////////////

const initialState = {
  rating: 3,
  price: 4,
};

type AppState = typeof initialState;

// const actions = {
//   SET_RATING: "SET_RATING",
//   SET_PRICE: "SET_PRICE",
//   RESET: "RESET",
// };

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


// const ctx = React.createContext(initialState);

// function Provider({ children }: React.PropsWithChildren<{}>) {
//   const [state, dispatch] = React.useReducer(reducer, initialState);

//   const value = {
//     rating: state.rating,
//     price: state.price,
//     setRating: (value: number) => {
//       dispatch({ type: actions.SET_RATING, value });
//     },
//     setPrice: (value: number) => {
//       dispatch({ type: actions.SET_PRICE, value });
//     },
//     reset: () => {
//       dispatch({ type: actions.RESET });
//     },
//   };

//   return <ctx.Provider value={{ state, dispatch }}>{children}</ctx.Provider>;
// }
