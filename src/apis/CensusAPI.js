const BASE_URL = 'http://localhost:3000'

export default (col) => fetch(`${BASE_URL}/getdataForSelctedCol?column=${col}`, { mode: 'cors' });