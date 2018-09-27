import { ActionTypes } from '../actions/DataVisulizationAction';

const initialState = {
  data: [],
  selectedCol: '',
  isFetching: false,
  errorMsg: '',
  remainingRecords: 0
};

const sortByName = (a, b) => {
    let nameA = a.name; 
    let nameB = b.name;

    if (nameB < nameA) {
      return -1;
    }
    if (nameB > nameA) {
      return 1;
    }
      return 0;
};

const DataVisualizationReducer = (state = initialState, action) => {

  switch (action.type) {

    case ActionTypes.FETCH_DATA:
        return {
            ...state,
            isFetching: true
        }

    case ActionTypes.FETCH_DATA_SUCCESS:
        const { data } = action.payload;

        let values = Object.values(data);
        values.sort(sortByName)

        let dataToShow = values, remainingRecords = 0;
        if(values.length > 100) {
            dataToShow = values.slice(0, 100);
            remainingRecords = values.length - 100;
        } 

        return {
            ...state,
            isFetching: false,
            data: dataToShow,
            remainingRecords: remainingRecords
        }

    case ActionTypes.FETCH_DATA_ERROR:
        const { err } = action.payload;

        return {
            ...state,
            isFetching: false,
            errorMsg: err
        }

    case ActionTypes.UPDATE_COL_NAME:
        const { col } = action.payload;

        return {
            ...state,
            selectedCol: col,
        }


    default: return state;
  }
};

export default DataVisualizationReducer;