import React, { useReducer } from "react";
import Reducer from "./reducer";
import Context from "./context";
import axios from "axios";
import { LOGIN } from "./types";

const State = (props) => {
	const initialState = {
		user: {},
	};

	const [state, dispatch] = useReducer(Reducer, initialState);

	/* USER CONTEXT */
	const login = async () => {
		const response = await axios.get("https://reqres.in/api/users");
		dispatch({ type: LOGIN, payload: response.data });

		//response.status === 200 && 	
		//localStorage.setItem('TOKEN', response.status);
	};
	/* USER CONTEXT ENDS HERE */

	return (
		<Context.Provider
			value={{ user: state.user, login }}
		>
			{props.children}
		</Context.Provider>
	);
};

export default State;
