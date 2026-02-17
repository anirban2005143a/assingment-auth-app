const noteModel = require('../model/noteModel');
const noteService = require('../services/noteService');
const { validationResult } = require('express-validator');

module.exports.createNote = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: errors.array()[0].msg
            });
        }

        const { title, description, category, priority, tags } = req.body;
        const userId = req.user._id;

        const noteData = {
            title,
            description,
            category: category || 'personal',
            priority: priority || 'medium',
            userId,
            tags: tags || []
        };

        const note = await noteService.createNote(noteData);
        
        res.status(201).json({
            message: 'Note created successfully',
            note
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

module.exports.getUserNotes = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { isCompleted } = req.query;

        let query = {};
        if (isCompleted !== undefined) {
            query.isCompleted = isCompleted === 'true';
        }

        const notes = await noteService.getUserNotes(userId, query);
        
        res.status(200).json({
            message: 'Notes fetched successfully',
            notes
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

module.exports.getNoteById = async (req, res, next) => {
    try {
        const { noteId } = req.params;
        const userId = req.user._id;

        const note = await noteService.getNoteById(noteId, userId);

        if (!note) {
            return res.status(404).json({
                error: true,
                message: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note fetched successfully',
            note
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

module.exports.updateNote = async (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: true,
                message: errors.array()[0].msg
            });
        }

        const { noteId } = req.params;
        const userId = req.user._id;
        const { title, description, category, priority, isCompleted, tags } = req.body;

        const updateData = {};
        if (title) updateData.title = title;
        if (description) updateData.description = description;
        if (category) updateData.category = category;
        if (priority) updateData.priority = priority;
        if (typeof isCompleted === 'boolean') updateData.isCompleted = isCompleted;
        if (tags) updateData.tags = tags;

        const note = await noteService.updateNote(noteId, userId, updateData);

        if (!note) {
            return res.status(404).json({
                error: true,
                message: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note updated successfully',
            note
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

module.exports.deleteNote = async (req, res, next) => {
    try {
        const { noteId } = req.params;
        const userId = req.user._id;

        const note = await noteService.deleteNote(noteId, userId);

        if (!note) {
            return res.status(404).json({
                error: true,
                message: 'Note not found'
            });
        }

        res.status(200).json({
            message: 'Note deleted successfully',
            note
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

module.exports.searchNotes = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { q } = req.query;

        if (!q || q.trim() === '') {
            return res.status(400).json({
                error: true,
                message: 'Search query is required'
            });
        }

        const notes = await noteService.searchNotes(userId, q);

        res.status(200).json({
            message: 'Notes searched successfully',
            notes
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};

module.exports.filterNotes = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { category, priority, isCompleted } = req.query;

        const filters = {};
        if (category) filters.category = category;
        if (priority) filters.priority = priority;
        if (isCompleted !== undefined) filters.isCompleted = isCompleted === 'true';

        const notes = await noteService.filterNotes(userId, filters);

        res.status(200).json({
            message: 'Notes filtered successfully',
            notes
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
};
