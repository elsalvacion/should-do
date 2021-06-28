import {
  SET_LOADING,
  SET_ERRORS,
  SET_TODAY,
  SET_TOMORROW,
  SET_EDIT,
  CLEAR_EDIT,
  DELETE_TASK,
  GET_TASK,
  CHANGE_STATUS,
  EDIT_TASK,
  SET_FILTER,
  CLEAR_FILTER,
  SET_HISTORY,
  SET_HISTORY_TASK,
  GET_HISTORY_TASK,
  // SET_YESTERDAY,
} from "./types";

const taskReducer = (state, action) => {
  switch (action.name) {
    case GET_TASK:
      return {
        ...state,
        allTasks: action.value,
        loading: false,
        errors: false,
      };

    case CHANGE_STATUS:
      return {
        ...state,
        allTasks: state.allTasks.map((task) =>
          task.id === action.value.id ? action.value : task
        ),
        loading: false,
        errors: false,
      };
    case DELETE_TASK:
      return {
        ...state,
        allTasks: state.allTasks.filter((task) =>
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
        allTasks: state.allTasks.map((task) =>
          task.id === action.value.id ? action.value : task
        ),
        loading: false,
        errors: false,
      };
    case SET_FILTER:
      return {
        ...state,
        filtered: action.value,
        loading: false,
        errors: false,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
        loading: false,
        errors: false,
      };
    case SET_TODAY:
      return {
        ...state,
        today: true,
        tomorrow: false,
        history: false,
        loading: false,
        errors: false,
      };
    case SET_TOMORROW:
      return {
        ...state,
        today: false,
        tomorrow: true,
        history: false,
        loading: false,
        errors: false,
      };
    case SET_HISTORY:
      return {
        ...state,
        today: false,
        tomorrow: false,
        history: true,
        loading: false,
        errors: false,
      };

    case SET_HISTORY_TASK:
      return {
        ...state,
        historyTask: [...state.historyTask, action.value],
        loading: false,
        errors: false,
      };

    case GET_HISTORY_TASK:
      return {
        ...state,
        historyTask: action.value,
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
