const groupRows = (rows, col) => {
    let map = {};

    rows.forEach(row => {
        let val = row[col];

        if (!map[val]) { // nothing is in the map
            map[val] = { name: val, count: 1, ageSum: row['age'] }
        } else { // already in the map
            map[val].count += 1;
            map[val].ageSum = map[val].ageSum + row['age'];
        }
    });

    Object.keys(map).forEach(colName => {
        map[colName].avg = (map[colName].ageSum / map[colName].count).toFixed(2);
    });

    return map;
};

module.exports = (DAO) => (req, res) => {
    const col = req.query.column;

    DAO(col, (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            // Added this js code inorder to group the results.
            let groupedRes = groupRows(rows, col);

            res.json(groupedRes); // Replace this with res.json(rows) when the commented query is used.
        }
    });
};
