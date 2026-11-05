import { useEffect, useMemo, useState } from "react";

import { GoCheckCircleFill } from "react-icons/go";
import Modal from "../../components/Modal";
import {
  LuSearch,
  LuUsers,
  LuClock,
  LuMail,
  LuBookOpen,
  LuArrowUpRight,
} from "react-icons/lu";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    const allStudents = JSON.parse(localStorage.getItem("students")) || [];
    const allAssignments =
      JSON.parse(localStorage.getItem("assignments")) || [];

    setStudents(allStudents);
    setAssignments(allAssignments.filter((item) => item.creatorId === user.id));
  }, []);

   useEffect(() => {
      document.body.style.overflow = selectedStudent ? "hidden" : "auto";
  
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [selectedStudent]);

  // Get individual student statistics
  const getStudentStats = (studentId) => {
    const assigned = assignments.filter((item) =>
      item.assignedTo?.includes(studentId),
    );

    const submitted = assigned.filter(
      (item) => item.submissions?.[studentId]?.submitted,
    );

    const pending = assigned.length - submitted.length;

    return {
      total: assigned.length,
      submitted: submitted.length,
      pending,
      progress: assigned.length
        ? Math.round((submitted.length / assigned.length) * 100)
        : 0,
    };
  };

  const filteredStudents = useMemo(() => {
    return students.filter((student) =>
      `${student.name} ${student.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [students, search]);

  const totalSubmitted = students.reduce(
    (sum, student) => sum + getStudentStats(student.id).submitted,
    0,
  );

  const totalPending = students.reduce(
    (sum, student) => sum + getStudentStats(student.id).pending,
    0,
  );

  const summary = [
    {
      title: "Total Students",
      value: students.length,
      icon: LuUsers,
      color: "blue",
    },
    {
      title: "Total Submissions",
      value: totalSubmitted,
      icon: GoCheckCircleFill,
      color: "green",
    },
    {
      title: "Pending Submissions",
      value: totalPending,
      icon: LuClock,
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen min-w-0 bg-slate-50 p-3 pt-25 md:ml-56 md:w-[calc(100%-14rem)] lg:ml-[252px] lg:w-[calc(100%-252px)]">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
          Students
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          View your students and monitor their academic activity.
        </p>
      </div>

      {/* Summary */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summary.map((card) => {
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

      {/* Student Directory */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-800">Student Directory</h2>
            <p className="mt-1 text-sm text-slate-500">
              {students.length} registered students
            </p>
          </div>

          <div className="relative">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={17}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-blue-500 sm:w-72"
            />
          </div>
        </div>

        {filteredStudents.length > 0 ? (
          <div className="w-full max-w-full overflow-x-auto scroll rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[750px] text-left">
              <thead className="bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Assignments</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4">Pending</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student) => {
                  const stats = getStudentStats(student.id);

                  return (
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
                            <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                              <LuMail size={13} />
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {stats.total}
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                          {stats.submitted}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
                          {stats.pending}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="w-28">
                          <p className="mb-2 text-sm font-semibold text-slate-700">
                            {stats.progress}%
                          </p>
                          <div className="h-2 rounded-full bg-slate-100">
                            <div
                              className="h-2 rounded-full bg-blue-600"
                              style={{ width: `${stats.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="flex items-center gap-1 text-sm cursor-pointer font-semibold text-blue-600 hover:text-blue-800"
                        >
                          View <LuArrowUpRight size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <LuUsers size={35} className="mx-auto text-slate-300" />
            <h3 className="mt-3 font-semibold text-slate-800">
              No students found
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Try another search term.
            </p>
          </div>
        )}
      </div>

      {/* Student Details Modal */}
      {selectedStudent && (
        <Modal
          isOpen={Boolean(selectedStudent)}
          onClose={() => setSelectedStudent(null)}
          title="Student Details"
        >
          <div className="p-5">
            {/* Student Information */}
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-2xl font-bold text-blue-600">
                {selectedStudent?.name?.charAt(0).toUpperCase()}
              </div>

              <div className="min-w-0">
                <h3 className="break-words text-xl font-bold text-slate-800">
                  {selectedStudent?.name}
                </h3>
                <p className="break-all text-sm text-slate-500">
                  {selectedStudent?.email}
                </p>
              </div>
            </div>

            {/* Student Statistics */}
            {(() => {
              const stats = getStudentStats(selectedStudent.id);

              return (
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Assigned", value: stats.total },
                    { label: "Submitted", value: stats.submitted },
                    { label: "Pending", value: stats.pending },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl bg-slate-50 p-3 text-center"
                    >
                      <h3 className="text-xl font-bold text-slate-800">
                        {item.value}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Assignment Activity */}
            <h3 className="mb-3 mt-7 font-semibold text-slate-800">
              Assignment Activity
            </h3>

            <div className="space-y-3">
              {assignments
                .filter((item) => item.assignedTo?.includes(selectedStudent.id))
                .map((item) => {
                  const submitted =
                    item.submissions?.[selectedStudent.id]?.submitted;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-slate-100 p-3"
                    >
                      <div className="min-w-0">
                        <p className="break-words text-sm font-medium text-slate-700">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Due {new Date(item.dueDate).toLocaleDateString()}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                          submitted
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {submitted ? "Submitted" : "Pending"}
                      </span>
                    </div>
                  );
                })}

              {assignments.every(
                (item) => !item.assignedTo?.includes(selectedStudent.id),
              ) && (
                <p className="py-5 text-center text-sm text-slate-400">
                  No assignments assigned.
                </p>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedStudent(null)}
              className="mt-6 w-full rounded-lg cursor-pointer bg-blue-600 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Students;
