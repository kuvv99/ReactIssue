const createOperation = 'CREATE_ORGANISATION';
const updateOperation = 'UPDATE_ORGANISATION';
const removeOperation = 'REMOVE_ORGANISATION';

export const actionsCreators = {
    crateUser: () => ({ type: createOperation }),
    updateUser: () => ({ type: updateOperation }),
    removeUser: () => ({ type: removeOperation })
};

export const reducer = (state, action) => {
    state = state;

    if (action.type === createOperation) {
        console.log("CreateOrganisation");
    }

    if (action.type === updateOperation) {
        console.log("UpdateOrganisation");
    }

    if (action.type === removeOperation) {
        console.log("RemoveOrganisation");
    }

    return state;
};
