
import DataVisualizationReducer from '../../reducers/DataVisualizationReducer';
import { ActionTypes } from '../../actions/DataVisulizationAction'; 

const initialState = {
    data: [],
    selectedCol: '',
    isFetching: false,
    errorMsg: '',
    remainingRecords: 0
};

const columnPayload = {
    payload: { col: 'age' },
    type: ActionTypes.UPDATE_COL_NAME,
};


const fetchError = {
    payload:{ err: 'Server Error'},
    type: ActionTypes.FETCH_DATA_ERROR,
};

const data = {
    30: {
        name: 30,
        value: '20',
        avg: '15.23'
    },
    70: {
        name: 70,
        value: '30',
        avg: '22.15'
    },
    50: {
        name: 50,
        value: '25',
        avg: '25.5'
    },
}

const fetchData = {
    payload:{ data: data },
    type: ActionTypes.FETCH_DATA_SUCCESS,
};

const expectedData = [
    {
        name: 70,
        value: '30',
        avg: '22.15'
    },
    {
        name: 50,
        value: '25',
        avg: '25.5'
    },
    {
        name: 30,
        value: '20',
        avg: '15.23'
    }
]

describe('DataVisualizationReducer Reducer', () => {
    it('should return the initial state', () => {
        expect(DataVisualizationReducer(undefined, { })).toEqual(initialState);
        expect(DataVisualizationReducer(initialState, {})).toEqual(initialState);
        expect(DataVisualizationReducer(undefined, { type: 'UPDATE'})).toEqual(initialState);
    });

    it('should update selected column name', () => {

        expect(DataVisualizationReducer(initialState, columnPayload)).toEqual({
            ...initialState,
            selectedCol: 'age'
        });

        expect(DataVisualizationReducer(undefined, columnPayload)).toEqual({
            ...initialState,
            selectedCol: 'age'
        });

        expect(DataVisualizationReducer(null, columnPayload)).toEqual({
            selectedCol: 'age'  
        });

    });

    it('should update isfetching', () => {

        expect(DataVisualizationReducer(initialState, {type: ActionTypes.FETCH_DATA})).toEqual({
           ...initialState,
           isFetching: true
        });

        expect(DataVisualizationReducer(undefined, {type: ActionTypes.FETCH_DATA})).toEqual({
           ...initialState,
           isFetching: true
        });

        expect(DataVisualizationReducer(null, {type: ActionTypes.FETCH_DATA})).toEqual({
           isFetching: true
        });

    });


    it('should update data on fetch success', () => {

        expect(DataVisualizationReducer(initialState, fetchData)).toEqual({
           ...initialState,
           data: expectedData
        });

        expect(DataVisualizationReducer(undefined, fetchData)).toEqual({
           ...initialState,
           data: expectedData
        });

        expect(DataVisualizationReducer(null, fetchData)).toEqual({
            data: expectedData,
            isFetching: false,
            remainingRecords: 0
        });

    });

    it('should update error message and isFetching on fetch success', () => {

        expect(DataVisualizationReducer(initialState, fetchError)).toEqual({
           ...initialState,
           errorMsg: 'Server Error'
        });

        expect(DataVisualizationReducer(undefined, fetchError)).toEqual({
           ...initialState,
           errorMsg: 'Server Error'
        });

        expect(DataVisualizationReducer(null, fetchError)).toEqual({
            errorMsg: 'Server Error',
            isFetching: false,
        });

    });
});