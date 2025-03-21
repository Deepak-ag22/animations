import pool from "../../db/index.js";

// 1. Get all students (Read)
const getAllStudents = async () => {
    try {
        const result = await pool.query('SELECT * FROM students', []);
        console.log('query response', result);

        return {
            success: true,
            data: result.rows,
        };
    } catch (err) {
        console.log('error in select query catch>', err);

        return {
            success: false,
            error: err,
        };
    }
};

// 2. Create a new student (Create)
const createStudent = async (name, age, grade) => {
    try {
        const result = await pool.query(
            'INSERT INTO students (name, age, grade) VALUES ($1, $2, $3)',
            [name, age, grade]
        );

        return {
            success: true,
            data: result.rows[0],
        };
    } catch (err) {
        console.log('Error in insert query catch>', err);

        return {
            success: false,
            error: err,
        };
    }
};

// 3. Update student's grade by id (Update)
const updateStudentGrade = async (id, grade) => {
    try {
        const result = await pool.query(
            'UPDATE students SET grade = $1 WHERE id = $2',
            [grade, id]
        );

        if (result.rowCount === 0) {
            return {
                success: false,
                message: "Student not found",
            };
        }

        console.log('Updated student:', result.rows[0]);

        return {
            success: true,
            data: result.rows[0],
        };
    } catch (err) {
        console.log('Error in update query catch>', err);

        return {
            success: false,
            error: err,
        };
    }
};

// 4. Delete a student by id (Delete)
const deleteStudent = async (id) => {
    try {
        const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return {
                success: false,
                message: "Student not found",
            };
        }

        console.log('Deleted student:', result.rows[0]);

        return {
            success: true,
            data: result.rows[0],
        };
    } catch (err) {
        console.log('Error in delete query catch>', err);

        return {
            success: false,
            error: err,
        };
    }
};

export { getAllStudents, createStudent, updateStudentGrade, deleteStudent };
