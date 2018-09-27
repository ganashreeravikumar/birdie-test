import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock';

import { 
    fetchDataForCol,
    ActionTypes,
    updateSelectedCol,
    fetchData,
    onFetchSuccess,
    onFetchError 
} from '../../actions/DataVisulizationAction';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const data = [
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
];

describe('DataVisualization action', () => {

    it('should create an action to update selected column name', () => {
        expect(updateSelectedCol('age')).toEqual({ type: ActionTypes.UPDATE_COL_NAME, payload: { col: 'age'}});
        expect(updateSelectedCol('')).toEqual({ type: ActionTypes.UPDATE_COL_NAME, payload: { col: ''}});
        expect(updateSelectedCol(undefined)).toEqual({ type: ActionTypes.UPDATE_COL_NAME, payload: { col: undefined}});
    });

    it('should create an action to fetch the data', () => {
        expect(fetchDataForCol('age')).toEqual({ type: ActionTypes.FETCH_DATA });
        expect(fetchDataForCol('')).toEqual({ type: ActionTypes.FETCH_DATA });
        expect(fetchDataForCol(undefined)).toEqual({ type: ActionTypes.FETCH_DATA});
    });

    it('should create an action for fetch success', () => {
        expect(onFetchSuccess(data)).toEqual({ type: ActionTypes.FETCH_DATA_SUCCESS, payload: { data }});
        expect(onFetchSuccess({})).toEqual({ type: ActionTypes.FETCH_DATA_SUCCESS, payload: { data: {} }});
        expect(onFetchSuccess(undefined)).toEqual({ type: ActionTypes.FETCH_DATA_SUCCESS, payload: { data: undefined }});
    });

    it('should create an action for fetch error', () => {
        expect(onFetchError('Server Error')).toEqual({ type: ActionTypes.FETCH_DATA_ERROR, payload: { err: 'Server Error' }});
        expect(onFetchError('')).toEqual({ type: ActionTypes.FETCH_DATA_ERROR, payload: { err: '' }});
        expect(onFetchError(undefined)).toEqual({ type: ActionTypes.FETCH_DATA_ERROR, payload: { err: undefined }});
    });

})

describe('Async Action', () => {
    const dataRes = {
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
    };

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });


    it('creates FETCH_DATA_SUCCESS and FETCH_DATA when fetching data has been done', async () => {
        const store = mockStore({ data: [] })

        fetchMock.get('http://localhost:3000/getdataForSelctedCol?column=age', 
            dataRes
        );
        
        expect.assertions(1);
        const data = await fetchData('age');

        const expectedActions = [
            { type: ActionTypes.FETCH_DATA },
            { type: ActionTypes.FETCH_DATA_SUCCESS, payload: { data: dataRes } }
          ]

        return store.dispatch(data).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });

    });


    it('creates FETCH_DATA_ERROR on fetch error', async () => {

        const store = mockStore({ data: [] })

        fetchMock.get('http://localhost:3000/getdataForSelctedCol?column=undefined', 500, 
            {throw: new Error('Internal Server Error')}
        );
        
        expect.assertions(1);
        const data = await fetchData(undefined);

        const expectedActions = [
            { type: ActionTypes.FETCH_DATA },
            { type: ActionTypes.FETCH_DATA_ERROR, payload: { err: 'Internal Server Error' }}
          ];

        return store.dispatch(data).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        });
    })
})