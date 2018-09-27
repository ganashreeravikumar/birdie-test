import getSelectedColumnData from '../apis/CensusAPI';

const ActionTypes = {
  UPDATE_COL_NAME: 'UPDATE_COL_NAME',
  FETCH_DATA: 'FETCH_DATA',
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  FETCH_DATA_ERROR: 'FETCH_DATA_ERROR',
};

const fetchDataForCol = () => ({ type: 'FETCH_DATA' });

const updateSelectedCol = col => ({ type: 'UPDATE_COL_NAME', payload: { col } });

const onFetchSuccess = data => ({ type: 'FETCH_DATA_SUCCESS', payload: { data } });

const onFetchError = err => ({ type: 'FETCH_DATA_ERROR', payload: { err } });


const fetchData = (col) => async dispatch => {
  try {
    dispatch(fetchDataForCol())
    const response = await getSelectedColumnData(col);

    if(response.status === 200) {
      const res = await response.json();
      dispatch(onFetchSuccess(res));
    } 

    if(response.status === 500) {
      throw Error(response.statusText);
    }

  } catch(err) {
    console.log(err.message);
    dispatch(onFetchError(err.message));
  }
};

export { 
  fetchDataForCol, 
  ActionTypes, 
  updateSelectedCol, 
  fetchData, 
  onFetchError, 
  onFetchSuccess 
};