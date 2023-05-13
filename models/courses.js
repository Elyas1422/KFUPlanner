var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./db/courses.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
    }
});

function getAllCourses() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM course';
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

function getCourse(code) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM course WHERE code = "' + code + '"';
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
module.exports = {getAllCourses, getCourse};