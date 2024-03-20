// actions/userActions.js

export const setUser = (user) => {
    console.log(user, "LOLOLO");
    return {
        type: "SET_USER",
        payload: user,
    };
};

