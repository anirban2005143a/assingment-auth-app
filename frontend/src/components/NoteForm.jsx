import React, { useState, useEffect } from "react";
import { X, Plus } from "lucide-react";
import { motion } from "framer-motion";
import CustomDropdown from "./CustomDropdown";

const NoteForm = ({ note, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "personal",
    priority: "medium",
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (note) {
      setFormData({
        title: note.title,
        description: note.description,
        category: note.category,
        priority: note.priority,
        tags: note.tags || [],
      });
    }
  }, [note]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim().toLowerCase()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  return (
    <motion.div
    //   initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    //   onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          scrollbarWidth: "none",
        }}
        className="bg-slate-800 border border-slate-700 rounded-xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white">
            {note ? "Edit Note" : "Create Note"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 cursor-pointer text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Custom Dropdowns */}
          <div className="grid grid-cols-2 gap-4">
            <CustomDropdown
              label="Category"
              value={formData.category}
              setValue={(val) =>
                setFormData((prev) => ({ ...prev, category: val }))
              }
              options={[
                { label: "Personal", value: "personal" },
                { label: "Work", value: "work" },
                { label: "Urgent", value: "urgent" },
                { label: "Idea", value: "idea" },
                { label: "Other", value: "other" },
              ]}
            />

            <CustomDropdown
              label="Priority"
              value={formData.priority}
              setValue={(val) =>
                setFormData((prev) => ({ ...prev, priority: val }))
              }
              options={[
                { label: "Low", value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High", value: "high" },
              ]}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">
              Tags
            </label>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag"
                className="flex-1 px-3 py-2 text-sm bg-slate-700 border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-2 text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-slate-700 text-slate-300 px-2.5 py-1 rounded-md text-xs"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="text-slate-400 hover:text-red-400"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 cursor-pointer text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-md transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 disabled:cursor-not-allowed cursor-pointer text-sm bg-indigo-500 hover:bg-indigo-600 text-white rounded-md transition"
            >
              {isSubmitting
                ? "Saving..."
                : note
                  ? "Update Note"
                  : "Create Note"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NoteForm;
