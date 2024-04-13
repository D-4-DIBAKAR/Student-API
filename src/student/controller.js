const pool = require("../student/db");
const queries = require("./queries");
//getStudents
const getStudents = (req, res) => {
  pool.query(queries.getStudents, (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};
//addStudents
const addStudents = (req, res) => {
  const { name, email, age, dob } = req.body;
  //check if email exists
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (results.rows.length) {
      res.send("Email already exists.");
    }

    //add student to db
    pool.query(
      queries.addStudents,
      [name, email, age, dob],
      (error, results) => {
        if (error) throw error;
        res.status(201).send("Student Created Successfully");
        //  console.log();
      }
    );
  });
};

//getStudentsById
const getStudentsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

//removeStudent
const removeStudent = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getStudentsById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) res.send("Student does not exists in the database.");
    pool.query(queries.removeStudent, [id], (error, results) => {
      if (error) throw error;
      res.status(200).send("Student Remove Successfully");
    });
  });
};

//updateStudent
const updateStudent = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;
  pool.query(queries.getStudentsById, [id], (error, results) => {
    const noStudentFound = !results.rows.length;
    if (noStudentFound) res.send("Student does not exists in the database.");

    pool.query(
      queries.updateStudent,
      [name, email, age, dob, id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send("Student Updated Successfully");
      }
    );
  });
};
//Exports
module.exports = {
  getStudents,
  addStudents,
  getStudentsById,
  removeStudent,
  updateStudent,
};