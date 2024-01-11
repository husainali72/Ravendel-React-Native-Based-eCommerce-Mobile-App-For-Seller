import { DASHBOARD_DATA, LOADING, LOADING_ERROR } from "../action/dashboardAction";

const initialState = {
    user_token: {},
    dashBoardData: '',
    loading: false,
};

export default (state = initialState, action) => {
switch (action.type) {
case LOADING:
    return {
        ...state,
        loading: true
    };
case LOADING_ERROR:
    return {
        ...state,
        loading: false
    }

case DASHBOARD_DATA:
    return {
        ...state,
        loading: false,
        dashBoardData:action.payload

    }
case "USER_LOGOUT":
    return { ...initialState };
default: {
    return state;
}
}
};
