const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title must not exceed 100 characters']
    },
    description: {
        type: String,
        required: true,
        minlength: [5, 'Description must be at least 5 characters long']
    },
    category: {
        type: String,
        enum: ['personal', 'work', 'urgent', 'idea', 'other'],
        default: 'personal'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    tags: [{
        type: String,
        lowercase: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
noteSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const noteModel = mongoose.model('note', noteSchema);

module.exports = noteModel;
