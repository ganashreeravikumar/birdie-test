module.exports = connection => (col, cb) => {

  // This query was taking more time to get the results from db.
  // const query = `SELECT \`${col}\`, COUNT(*), AVG(age) FROM census_learn_sql GROUP BY \`${col}\` ORDER BY \`${col}\` DESC LIMIT 10`;
  const query = `SELECT \`${col}\`, age  FROM census_learn_sql`;
  connection.query(query, cb);
};