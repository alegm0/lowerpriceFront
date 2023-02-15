import { LOGIN } from "./types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN:
            return {
                ...state,
                user: payload,
            };
        default:
            return state;
    }
};
