import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { GoCheckCircleFill } from "react-icons/go";
import {
  LuTrendingUp,
  LuClock,
  LuSearch,
  LuClipboardList,
  LuExternalLink,
  LuCalendarDays,
  LuUsers,
  LuCircleAlert,
} from "react-icons/lu";

const Progress = () => {
  const location = useLocation();

  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];

    const myAssignments = allAssignments.filter(
      (item) => item.creatorId === user.id,
    );

    setAssignments(myAssignments);
    setStudents(allStudents);

    const requestedId = location.state?.assignmentId;

    setSelectedId(
      myAssignments.some((item) => item.id === requestedId)
        ? requestedId
        : myAssignments[0]?.id || "",
    );
  }, [location.state]);

  const selectedAssignment = assignments.find((item) => item.id === selectedId);

  const getStudentRows = (assignment) => {
    if (!assignment) return [];

    return (assignment.assignedTo || [])
      .map((id) => {
        const student = students.find((item) => item.id === id);

        if (!student) return null;

        const submission = assignment.submissions?.[id] || {};
        const submitted = Boolean(submission.submitted);
        const overdue = !submitted && new Date(assignment.dueDate) < new Date();

        return {
          ...student,
          submitted,
          overdue,
          submittedAt: submission.submittedAt,
          note: submission.note,
          driveLink: submission.driveLink,
        };
      })
      .filter(Boolean);
  };

  const rows = selectedAssignment ? getStudentRows(selectedAssignment) : [];

  const filteredRows = useMemo(() => {
    return rows.filter((student) => {
      const matchesSearch = `${student.name} ${student.email}`
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Submitted" && student.submitted) ||
        (filter === "Pending" && !student.submitted) ||
        (filter === "Overdue" && student.overdue);

      return matchesSearch && matchesFilter;
    });
  }, [rows, search, filter]);

  const submitted = rows.filter((item) => item.submitted).length;
  const pending = rows.length - submitted;
  const overdue = rows.filter((item) => item.overdue).length;

  const percentage = rows.length
    ? Math.round((submitted / rows.length) * 100)
    : 0;

  // Overall progress across all assignments
  const overall = assignments.reduce(
    (result, item) => {
      const assigned = getStudentRows(item);
      result.total += assigned.length;
      result.submitted += assigned.filter(
        (student) => student.submitted,
      ).length;
      result.overdue += assigned.filter((student) => student.overdue).length;
      return result;
    },
    { total: 0, submitted: 0, overdue: 0 },
  );

  const overallPercentage = overall.total
    ? Math.round((overall.submitted / overall.total) * 100)
    : 0;

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 p-3 pt-25 md:ml-56 md:w-[calc(100%-14rem)] lg:ml-[252px] lg:w-[calc(100%-252px)]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Student Progress
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Monitor assignment completion and identify students who need
          attention.
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Overall Progress",
            value: `${overallPercentage}%`,
            icon: LuTrendingUp,
            color: "blue",
          },
          {
            title: "Total Submissions",
            value: overall.submitted,
            icon: GoCheckCircleFill,
            color: "green",
          },
          {
            title: "Pending",
            value: overall.total - overall.submitted,
            icon: LuClock,
            color: "orange",
          },
          {
            title: "Overdue",
            value: overall.overdue,
            icon: LuCircleAlert,
            color: "red",
          },
        ].map((card) => {
          const Icon = card.icon;

          const colors = {
            blue: "bg-blue-50 text-blue-600",
            green: "bg-green-50 text-green-600",
            orange: "bg-orange-50 text-orange-600",
            red: "bg-red-50 text-red-600",
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

      {/* Assignment Selector */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
        <div className="mb-3 flex items-center gap-2">
          <LuClipboardList className="text-blue-600" size={20} />
          <h2 className="font-semibold text-slate-800">Select Assignment</h2>
        </div>

        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
        >
          {assignments.length === 0 && (
            <option value="">No assignments available</option>
          )}

          {assignments.map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
        </select>
      </div>

      {selectedAssignment && (
        <>
          {/* Selected Assignment Progress */}
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-lg font-bold text-slate-800">
                  {selectedAssignment.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {selectedAssignment.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-2">
                    <LuCalendarDays size={16} />
                    Due{" "}
                    {new Date(selectedAssignment.dueDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-2">
                    <LuUsers size={16} />
                    {rows.length} Students
                  </span>
                </div>
              </div>

              <a
                href={selectedAssignment.driveLink}
                target="_blank"
                rel="noreferrer"
                className="flex shrink-0 items-center justify-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-100"
              >
                Open Assignment Drive
                <LuExternalLink size={16} />
              </a>
            </div>

            <div className="mt-7 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Completion Rate
                </p>
                <h2 className="mt-2 text-4xl font-bold text-slate-800">
                  {percentage}%
                </h2>
              </div>
              <p className="text-sm text-slate-500">
                {submitted} of {rows.length} submitted
              </p>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-5 text-sm">
              <span className="text-green-600">✓ Submitted: {submitted}</span>
              <span className="text-orange-600">● Pending: {pending}</span>
              <span className="text-red-600">● Overdue: {overdue}</span>
            </div>
          </div>

          {/* Student Submission Table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center">
              <div>
                <h2 className="font-semibold text-slate-800">
                  Student Submissions
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Individual submission details and status.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative">
                  <LuSearch
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    size={17}
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search students..."
                    className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-52"
                  />
                </div>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none"
                >
                  <option value="All">All Students</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            {filteredRows.length > 0 ? (
              <div className="overflow-x-auto scroll">
                <table className="w-full min-w-[800px] text-left">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Submission Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Submission Note</th>
                      <th className="px-6 py-4">Drive Link</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredRows.map((student) => (
                      <tr key={student.id} className="hover:bg-slate-50">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600">
                              {student.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">
                                {student.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-sm text-slate-600">
                          {student.submittedAt
                            ? new Date(student.submittedAt).toLocaleString()
                            : "—"}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                              student.submitted
                                ? "bg-green-50 text-green-600"
                                : student.overdue
                                  ? "bg-red-50 text-red-600"
                                  : "bg-orange-50 text-orange-600"
                            }`}
                          >
                            {student.submitted
                              ? "Submitted"
                              : student.overdue
                                ? "Overdue"
                                : "Pending"}
                          </span>
                        </td>

                        <td className="max-w-56 px-6 py-5 text-sm text-slate-500">
                          <p className="line-clamp-2">
                            {student.note || "No submission note"}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          {student.driveLink ? (
                            <a
                              href={student.driveLink}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                            >
                              View <LuExternalLink size={15} />
                            </a>
                          ) : (
                            <span className="text-sm text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-14 text-center">
                <LuUsers size={35} className="mx-auto text-slate-300" />
                <h3 className="mt-3 font-semibold text-slate-800">
                  No students found
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>
        </>
      )}

      {assignments.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
          <LuClipboardList size={35} className="mx-auto text-slate-300" />
          <h3 className="mt-3 font-semibold text-slate-800">
            No assignments available
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Create an assignment to start tracking student progress.
          </p>
        </div>
      )}
    </div>
  );
};

export default Progress;
