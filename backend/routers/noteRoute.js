const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const noteController = require('../controllers/noteController');
const authMiddleware = require('../middlewares/auth');

// Create Note
router.post(
    '/',
    authMiddleware.authUser,
    [
        body('title')
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        body('description')
            .trim()
            .isLength({ min: 5 })
            .withMessage('Description must be at least 5 characters long'),
        body('category')
            .optional()
            .isIn(['personal', 'work', 'urgent', 'idea', 'other'])
            .withMessage('Invalid category'),
        body('priority')
            .optional()
            .isIn(['low', 'medium', 'high'])
            .withMessage('Invalid priority')
    ],
    noteController.createNote
);

// Get all notes for a user
router.get(
    '/',
    authMiddleware.authUser,
    noteController.getUserNotes
);

// Get single note by ID
router.get(
    '/:noteId',
    authMiddleware.authUser,
    noteController.getNoteById
);

// Update note
router.put(
    '/:noteId',
    authMiddleware.authUser,
    [
        body('title')
            .optional()
            .trim()
            .isLength({ min: 3, max: 100 })
            .withMessage('Title must be between 3 and 100 characters'),
        body('description')
            .optional()
            .trim()
            .isLength({ min: 5 })
            .withMessage('Description must be at least 5 characters long'),
        body('category')
            .optional()
            .isIn(['personal', 'work', 'urgent', 'idea', 'other'])
            .withMessage('Invalid category'),
        body('priority')
            .optional()
            .isIn(['low', 'medium', 'high'])
            .withMessage('Invalid priority')
    ],
    noteController.updateNote
);

// Delete note
router.delete(
    '/:noteId',
    authMiddleware.authUser,
    noteController.deleteNote
);

// Search notes
router.get(
    '/search/query',
    authMiddleware.authUser,
    noteController.searchNotes
);

// Filter notes
router.get(
    '/filter/options',
    authMiddleware.authUser,
    noteController.filterNotes
);

module.exports = router;
