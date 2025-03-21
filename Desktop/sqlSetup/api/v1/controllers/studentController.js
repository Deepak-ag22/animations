import express from 'express';
import { getAllStudents, createStudent, updateStudentGrade, deleteStudent } from '../services/studentService.js';

const router = express.Router();

// Get all students (Read)
router.get('/', async (req, res) => {
    try {
        const response = await getAllStudents();
        
        if (response.success) {
            return res.status(200).send({ data: response.data });
        } else {
            throw new Error("Error in get API");
        }
    } catch (err) {
        console.log('Get API controller catch', err);
        return res.status(400).send({ message: err.message || '' });
    }
});

// Add a new student (Create)
router.post('/', async (req, res) => {
    const { name, age, grade } = req.body;
    try {
        const response = await createStudent(name, age, grade);

        if (response.success) {
            return res.status(201).send({ data: response.data });
        } else {
            throw new Error("Error in creating student");
        }
    } catch (err) {
        console.log('Post API controller catch', err);
        return res.status(400).send({ message: err.message || '' });
    }
});

// Update student's grade (Update)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { grade } = req.body;
    try {
        const response = await updateStudentGrade(id, grade);

        if (response.success) {
            return res.status(200).send({ data: response.data });
        } else {
            return res.status(404).send({ message: response.message || 'Student not found' });
        }
    } catch (err) {
        console.log('Put API controller catch', err);
        return res.status(400).send({ message: err.message || '' });
    }
});

// Delete student by ID (Delete)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await deleteStudent(id);

        if (response.success) {
            return res.status(200).send({ data: response.data });
        } else {
            return res.status(404).send({ message: response.message || 'Student not found' });
        }
    } catch (err) {
        console.log('Delete API controller catch', err);
        return res.status(400).send({ message: err.message || '' });
    }
});

export default router;
