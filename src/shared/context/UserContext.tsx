import * as React from 'react';

export const USER_CONTEXT_ACTIONS = {
  SET_AUTHENTICATED_USER: 'SET_AUTHENTICATED_USER',
};

type UserState = {
  firstName: string | null;
  lastName: string | null;
};

type UserContextAction = {
  type: (typeof USER_CONTEXT_ACTIONS)[keyof typeof USER_CONTEXT_ACTIONS];
  payload: {
    firstName: string;
    lastName: string;
  };
};

type UserContextProps = {
  state: UserState;
  dispatch: React.Dispatch<UserContextAction>;
};

const UserContext = React.createContext<UserContextProps | undefined>(undefined);

const userContextReducer = (state: UserState, action: UserContextAction): UserState => {
  switch (action.type) {
    case USER_CONTEXT_ACTIONS.SET_AUTHENTICATED_USER:
      return {
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
      };
    default:
      return { ...state };
  }
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(userContextReducer, { firstName: null, lastName: null });

  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUserContext must be used within a LayoutProvider');
  }
  return context;
};
