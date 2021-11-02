import React from "react";
//https://gist.github.com/sw-yx/f18fe6dd4c43fddb3a4971e80114a052
//https://www.youtube.com/watch?v=eBYJ7O482Dc&ab_channel=LogRocket

export function createCtx<StateType, ActionType>(
  reducer: React.Reducer<StateType, ActionType>,
  initialState: StateType
) {
  // we never actually use this
  const defaultDispatch: React.Dispatch<ActionType> = () => initialState;

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
