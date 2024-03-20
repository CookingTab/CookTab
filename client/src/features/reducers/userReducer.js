// reducers/userReducer.js

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    console.log("ACTION", action, "STATE", state);
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: {...action.payload},
            };
        default:
            return state;
    }
};

export default userReducer;
