import { useContext } from "react";
import StateContext from "../context/StateProvider";

const useStateValue = () => {
  return useContext(StateContext);
};

export default useStateValue;
