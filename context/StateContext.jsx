import { createContext, useReducer, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Flatted from "flatted";
import reducer, { initialState } from "./StateReducers";
import { reducerCases } from "./constants";

//state context provider
export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchState = async () => {
      const fetchedState = await AsyncStorage.getItem("chatin:state");
      if (fetchedState !== undefined) {
        dispatch({
          type: reducerCases.SET_STATE,
          state: await JSON.parse(fetchedState),
        });
      }else{
        console.log("fetched state is undefined","fetchedState");
      }
      console.log("fetched state is\n\n\n\n\n",JSON.parse(fetchedState));
    };
    fetchState();
  }, []);

  useEffect(() => {
    if (state != initialState && state !== undefined) {
      AsyncStorage.setItem("chatin:state", JSON.stringify(state));
    } else {
      console.log("state not needed to change,", state);
    }
  }, [state]);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

//socket provider
export const GlobalSocket = createContext();

export const GlobalSocketProvider = ({ children }) => {
  const initialSocketState = {
    socket: undefined,
  };
  const [state, dispatch] = useReducer(reducer, initialSocketState);
  return (
    <GlobalSocket.Provider value={{ state, dispatch }}>
      {children}
    </GlobalSocket.Provider>
  );
};

export const useGlobalSocket = () => useContext(GlobalSocket);
