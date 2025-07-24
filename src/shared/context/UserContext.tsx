import * as React from 'react';
import { User } from 'src/modules/Users/models';

export const USER_CONTEXT_ACTIONS = {
  SET_AUTHENTICATED_USER: 'SET_AUTHENTICATED_USER',
};

type UserContextAction = {
  type: (typeof USER_CONTEXT_ACTIONS)[keyof typeof USER_CONTEXT_ACTIONS];
  payload: User | null;
};

type UserContextProps = {
  state: User | null;
  dispatch: React.Dispatch<UserContextAction>;
};

const UserContext = React.createContext<UserContextProps | undefined>(undefined);

const userContextReducer = (state: User | null, action: UserContextAction): User | null => {
  switch (action.type) {
    case USER_CONTEXT_ACTIONS.SET_AUTHENTICATED_USER:
      return action.payload ? { ...action.payload } : null;
    default:
      return state ? { ...state } : null;
  }
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(userContextReducer, null);

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a LayoutProvider');
  }
  return context;
};
