import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../../components/Modal";
import {
  LuPlus,
  LuSearch,
  LuPencil,
  LuTrash2,
  LuX,
  LuCalendarDays,
  LuUsers,
  LuFileText,
  LuExternalLink,
  LuTag,
  LuStar,
} from "react-icons/lu";

const Assignments = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    title: "",
    description: "",
    dueDate: "",
    driveLink: "",
    assignedTo: [],
    tags: "",
    points: 100,
  };

  const [form, setForm] = useState(emptyForm);
  
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user")) || {};
    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];

    setUser(currentUser);
    setAssignments(
      allAssignments.filter((item) => item.creatorId === currentUser.id),
    );
    setStudents(allStudents);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const saveAssignments = (updated) => {
    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];

    const otherAssignments = allAssignments.filter(
      (item) => item.creatorId !== user.id,
    );

    const newAssignments = [...otherAssignments, ...updated];

    localStorage.setItem("assignments", JSON.stringify(newAssignments));
    setAssignments(updated);
  };

  const getSubmittedCount = (item) =>
    Object.values(item.submissions || {}).filter(
      (submission) => submission.submitted,
    ).length;

  const getProgress = (item) => {
    const total = item.assignedTo?.length || 0;
    return total ? Math.round((getSubmittedCount(item) / total) * 100) : 0;
  };

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      ...emptyForm,
      assignedTo: students.map((student) => student.id),
    });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      dueDate: item.dueDate,
      driveLink: item.driveLink,
      assignedTo: item.assignedTo || [],
      tags: item.tags?.join(", ") || "",
      points: item.points || 100,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleStudent = (id) => {
    setForm((prev) => ({
      ...prev,
      assignedTo: prev.assignedTo.includes(id)
        ? prev.assignedTo.filter((studentId) => studentId !== id)
        : [...prev.assignedTo, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.assignedTo.length) {
      alert("Please select at least one student.");
      return;
    }

    const existing = assignments.find((item) => item.id === editingId);

    const assignment = {
      ...existing,
      id: editingId || `asg-${Date.now()}`,
      creatorId: user.id,
      title: form.title.trim(),
      description: form.description.trim(),
      dueDate: form.dueDate,
      driveLink: form.driveLink.trim(),
      assignedTo: form.assignedTo,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      points: Number(form.points),
      createdAt: existing?.createdAt || new Date().toISOString(),
      submissions: existing?.submissions || {},
    };

    const updated = editingId
      ? assignments.map((item) => (item.id === editingId ? assignment : item))
      : [assignment, ...assignments];

    saveAssignments(updated);
    setShowModal(false);
    setForm(emptyForm);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) {
      return;
    }
    saveAssignments(assignments.filter((item) => item.id !== id));
  };

  const filteredAssignments = useMemo(() => {
    return assignments.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const progress = getProgress(item);

      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && progress === 100) ||
        (filter === "In Progress" && progress > 0 && progress < 100) ||
        (filter === "Not Started" && progress === 0);

      return matchesSearch && matchesFilter;
    });
  }, [assignments, search, filter]);

  const totalSubmissions = assignments.reduce(
    (sum, item) => sum + getSubmittedCount(item),
    0,
  );

  const totalAssigned = assignments.reduce(
    (sum, item) => sum + (item.assignedTo?.length || 0),
    0,
  );

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 p-3 pt-25 md:ml-56 md:w-[calc(100%-14rem)] lg:ml-[252px] lg:w-[calc(100%-252px)]">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Assignments
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, manage and track your student assignments.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="flex items-center cursor-pointer justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <LuPlus size={19} />
          Create Assignment
        </button>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          {
            title: "Total Assignments",
            value: assignments.length,
            icon: LuFileText,
            color: "blue",
          },
          {
            title: "Total Submissions",
            value: totalSubmissions,
            icon: LuUsers,
            color: "green",
          },
          {
            title: "Pending Submissions",
            value: totalAssigned - totalSubmissions,
            icon: LuCalendarDays,
            color: "orange",
          },
        ].map((card) => {
          const Icon = card.icon;
          const colors = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            orange: "bg-orange-50 text-orange-600",
          };

          return (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{card.title}</p>
                <div className={`rounded-lg p-3 ${colors[card.color]}`}>
                  <Icon size={21} />
                </div>
              </div>
              <h2 className="mt-3 text-3xl font-bold text-slate-800">
                {card.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-800">All Assignments</h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage assignments created by you.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assignments..."
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-56"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg cursor-pointer border border-slate-200 px-3 py-2.5 text-sm outline-none"
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Not Started">Not Started</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 xl:grid-cols-2">
          {filteredAssignments.map((item) => {
            const progress = getProgress(item);
            const submitted = getSubmittedCount(item);
            const overdue =
              new Date(item.dueDate) < new Date() && progress < 100;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 p-5 transition hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                      <LuFileText size={22} />
                    </div>
                    <div>
                      <h3 className="font-semibold leading-6 text-slate-800">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">{item.id}</p>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditModal(item)}
                      title="Edit"
                      className="rounded-lg cursor-pointer p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <LuPencil size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      title="Delete"
                      className="rounded-lg cursor-pointer p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <LuTrash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-y border-slate-100 py-4">
                  <div>
                    <p className="text-xs text-slate-400">Due date</p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <LuCalendarDays size={15} />
                      {new Date(item.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Students</p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <LuUsers size={15} />
                      {item.assignedTo?.length || 0} assigned
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Points</p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <LuStar size={15} />
                      {item.points} points
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Submissions</p>
                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {submitted} / {item.assignedTo?.length || 0}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      overdue
                        ? "bg-red-50 text-red-600"
                        : progress === 100
                          ? "bg-green-50 text-green-600"
                          : progress === 0
                            ? "bg-slate-100 text-slate-600"
                            : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {overdue
                      ? "Overdue"
                      : progress === 100
                        ? "Completed"
                        : progress === 0
                          ? "Not Started"
                          : "In Progress"}
                  </span>

                  <a
                    href={item.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 cursor-pointer text-xs font-semibold text-blue-600 hover:text-blue-800"
                  >
                    Drive Link <LuExternalLink size={14} />
                  </a>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-xs text-slate-400">
                  {progress}% completed
                </p>
              </div>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="px-5 py-16 text-center">
            <LuFileText size={35} className="mx-auto text-slate-300" />
            <h3 className="mt-3 font-semibold text-slate-800">
              No assignments found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Create an assignment or change your search filter.
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingId ? "Edit Assignment" : "Create New Assignment"}
          description="Fill in the assignment details below."
        >
          <form onSubmit={handleSubmit} className="space-y-5 p-5">
            {/* Assignment Title */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Assignment Title *
              </label>
              <input
                required
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter assignment title"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Description *
              </label>
              <textarea
                required
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the assignment..."
                className="w-full resize-none rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Due Date and Points */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Due Date *
                </label>
                <input
                  required
                  type="date"
                  name="dueDate"
                  value={form.dueDate?.slice(0, 10) || ""}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Points *
                </label>
                <input
                  required
                  type="number"
                  min="1"
                  name="points"
                  value={form.points}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Google Drive Link */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Google Drive Link *
              </label>
              <input
                required
                type="url"
                name="driveLink"
                value={form.driveLink}
                onChange={handleChange}
                placeholder="https://drive.google.com/..."
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Tags (comma separated)
              </label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="React, JavaScript, Frontend"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Student Selection */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Assign to Students *
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      assignedTo:
                        prev.assignedTo.length === students.length
                          ? []
                          : students.map((student) => student.id),
                    }))
                  }
                  className="text-xs cursor-pointer font-semibold text-blue-600"
                >
                  {form.assignedTo.length === students.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>

              <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-slate-200 p-3">
                {students.map((student) => (
                  <label
                    key={student.id}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={form.assignedTo.includes(student.id)}
                      onChange={() => toggleStudent(student.id)}
                      className="h-4 w-4 accent-blue-600"
                    />

                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {student.name}
                      </p>
                      <p className="text-xs text-slate-400">{student.email}</p>
                    </div>
                  </label>
                ))}

                {students.length === 0 && (
                  <p className="py-4 text-center text-sm text-slate-400">
                    No students available.
                  </p>
                )}
              </div>

              <p className="mt-2 text-xs text-slate-400">
                {form.assignedTo.length} students selected
              </p>
            </div>

            {/* Form Buttons */}
            <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-lg cursor-pointer border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-lg cursor-pointer bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingId ? "Save Changes" : "Create Assignment"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Assignments;
