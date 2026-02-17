import React from "react";
import { Trash2, Edit2, Check, Loader } from "lucide-react";
import { motion } from "framer-motion";

const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onToggleComplete,
  isDeleting,
  isToggling,
}) => {
  const getCategoryColor = (category) => {
    const colors = {
      personal: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      work: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      urgent: "bg-red-500/10 text-red-400 border-red-500/30",
      idea: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
      other: "bg-slate-500/10 text-slate-400 border-slate-500/30",
    };
    return colors[category] || colors.other;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: "text-emerald-400",
      medium: "text-yellow-400",
      high: "text-rose-400",
    };
    return colors[priority] || colors.medium;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col shadow-md hover:shadow-lg "
    >
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          {/* Category & Priority */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getCategoryColor(
                note.category,
              )}`}
            >
              {note.category}
            </span>

            <span
              className={`text-[11px] font-medium uppercase tracking-wide ${getPriorityColor(
                note.priority,
              )}`}
            >
              {note.priority}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`text-base font-semibold ${
              note.isCompleted ? "text-slate-400 line-through" : "text-white"
            }`}
          >
            {note.title}
          </h3>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onEdit}
            className="p-2 text-slate-400 hover:text-indigo-400 transition"
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onDelete}
            disabled={isDeleting}
            className="p-2 text-slate-400 disabled:cursor-not-allowed cursor-pointer hover:text-rose-400 transition"
          >
            {isDeleting ? (
              <Loader size={15} className=" animate-spin mx-auto" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <p className="text-sm text-slate-400 mb-4 flex-grow leading-relaxed line-clamp-3">
        {note.description}
      </p>

      {/* ================= TAGS ================= */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[11px] bg-slate-700 text-slate-300 px-2 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="flex justify-between items-center pt-3 border-t border-slate-700">
        <span className="text-[11px] text-slate-500">
          {formatDate(note.createdAt)}
        </span>

        <motion.button
          whileTap={{ scale: 0.9 }}
          disabled={isToggling}
          onClick={onToggleComplete}
          className={`px-3 py-1.5 text-xs disabled:cursor-not-allowed cursor-pointer rounded-md transition ${
            note.isCompleted
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          {isToggling && <Loader size={15} className="animate-spin mx-auto" />}
          {!isToggling && note.isCompleted ? "Completed" : "Mark Done"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NoteCard;
