import * as React from 'react';

export const LAYOUT_ACTION = {
  TOGGLE_SIDE_MENU: 'TOGGLE_SIDE_MENU',
};

type LayoutState = {
  isSideMenuCollapsed: boolean;
};

type LayoutAction = {
  type: (typeof LAYOUT_ACTION)[keyof typeof LAYOUT_ACTION];
};

type LayoutContextProps = {
  state: LayoutState;
  dispatch: React.Dispatch<LayoutAction>;
};

const LayoutContext = React.createContext<LayoutContextProps | undefined>(undefined);

const layoutReducer = (state: LayoutState, action: LayoutAction): LayoutState => {
  switch (action.type) {
    case LAYOUT_ACTION.TOGGLE_SIDE_MENU:
      return { ...state, isSideMenuCollapsed: !state.isSideMenuCollapsed };
    default:
      return state;
  }
};

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(layoutReducer, { isSideMenuCollapsed: false });

  return <LayoutContext.Provider value={{ state, dispatch }}>{children}</LayoutContext.Provider>;
};

export const useLayout = () => {
  const context = React.useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
