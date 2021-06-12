import {
  SET_LOADING,
  SET_ERRORS,
  SET_TODAY,
  SET_TOMORROW,
  GET_TODAY,
  GET_TOMORROW,
  SET_EDIT,
  CLEAR_EDIT,
  FETCH_OTHER_TASK,
  CHANGE_TASK,
  DELETE_TASK,
  GET_TASK,
  CHANGE_STATUS,
  EDIT_TASK,
} from "./types";

const taskReducer = (state, action) => {
  switch (action.name) {
    case SET_TODAY:
      return {
        ...state,
        today: [...state.today, action.value],
        loading: false,
        errors: false,
      };

    case GET_TODAY:
      return {
        ...state,
        today: [action.value],
        loading: false,
        errors: false,
      };
    case CHANGE_STATUS:
      return {
        ...state,
        today: state.today.map((task) =>
          task.id === action.value.id ? action.value : task
        ),
        loading: false,
        errors: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        today: state.today.filter((task) =>
          task.id === action.value ? null : task
        ),
        loading: false,
        errors: false,
      };
    case SET_EDIT:
      return {
        ...state,
        toEdit: action.value,
        loading: false,
        errors: false,
      };
    case CLEAR_EDIT:
      return {
        ...state,
        toEdit: null,
        loading: false,
        errors: false,
      };
    case EDIT_TASK:
      return {
        ...state,
        today: state.today.map((task) =>
          task.id === action.value.id ? action.value : task
        ),
        loading: false,
        errors: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: true,
        loading: false,
      };
    default:
      return state;
  }
};

export default taskReducer;
