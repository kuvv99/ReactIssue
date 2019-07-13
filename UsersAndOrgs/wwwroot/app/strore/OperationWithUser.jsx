const createOperation = 'CREATE_USER';
const updateOperation = 'UPDATE_USER';
const removeOperation = 'REMOVE_USER';

export const actionsCreators = {
    crateUser: () => ({ type: createOperation }),
    updateUser: () => ({ type: updateOperation }),
    removeUser: () => ({ type: removeOperation })
};

export const reducer = (state, action) => {
    state = state;

    if (action.type === createOperation) {
        console.log("CreateUser");
    }

    if (action.type === updateOperation) {
        console.log("UpdateUser");
    }

    if (action.type === removeOperation) {
        console.log("RemoveUser");
    }

    return state;
};
