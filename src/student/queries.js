const getStudents = "SELECT * FROM student";
const addStudents =
  "INSERT INTO student(name,email,age,dob) VALUES ($1,$2,$3,$4)";
const getStudentsById = "SELECT * FROM student WHERE id = $1";
const updateStudent =
  "UPDATE student SET name=$1, email=$2, age=$3, dob=$4 WHERE id = $5";

const removeStudent = "DELETE FROM student WHERE id = $1";
const checkEmailExists = "SELECT s FROM student s WHERE s.email=$1";
module.exports = {
  getStudents,
  addStudents,
  getStudentsById,
  removeStudent,
  updateStudent,
  checkEmailExists,
};