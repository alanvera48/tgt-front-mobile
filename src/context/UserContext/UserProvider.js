import React, {createContext, useContext} from 'react';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = props => {
  const {children, ...rest} = props;
  return <UserContext.Provider value={rest}>{children}</UserContext.Provider>;
};
