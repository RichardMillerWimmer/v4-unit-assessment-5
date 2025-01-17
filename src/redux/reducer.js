const initialState = {
    username: '',
    profilePicture: ''
};


const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

export function updateUser(user) {
    console.log(user)
    return {
        type: UPDATE_USER,
        payload: user
    }
};

export function logoutUser() {
    return {
        type: LOGOUT
    }
};


export default function reducer(state = initialState, action) {
    // console.log(action);
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                username: action.payload.username,
                profilePicture: action.payload.profilePicture
            }
        case LOGOUT:
            return initialState;
        default: return state
    }
};