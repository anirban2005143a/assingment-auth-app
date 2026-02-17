const noteModel = require('../model/noteModel');

module.exports.createNote = async (data) => {
    const note = await noteModel.create(data);
    return note;
};

module.exports.getUserNotes = async (userId, query = {}) => {
    const notes = await noteModel.find({ userId, ...query }).sort({ createdAt: -1 });
    return notes;
};

module.exports.getNoteById = async (noteId, userId) => {
    const note = await noteModel.findOne({ _id: noteId, userId });
    return note;
};

module.exports.updateNote = async (noteId, userId, data) => {
    const note = await noteModel.findOneAndUpdate(
        { _id: noteId, userId },
        data,
        { new: true, runValidators: true }
    );
    return note;
};

module.exports.deleteNote = async (noteId, userId) => {
    const note = await noteModel.findOneAndDelete({ _id: noteId, userId });
    return note;
};

module.exports.searchNotes = async (userId, searchTerm) => {
    const notes = await noteModel.find({
        userId,
        $or: [
            { title: { $regex: searchTerm, $options: 'i' } },
            { description: { $regex: searchTerm, $options: 'i' } },
            { tags: { $regex: searchTerm, $options: 'i' } }
        ]
    }).sort({ createdAt: -1 });
    return notes;
};

module.exports.filterNotes = async (userId, filters = {}) => {
    const query = { userId };
    
    if (filters.category) query.category = filters.category;
    if (filters.priority) query.priority = filters.priority;
    if (typeof filters.isCompleted === 'boolean') query.isCompleted = filters.isCompleted;
    
    const notes = await noteModel.find(query).sort({ createdAt: -1 });
    return notes;
};
