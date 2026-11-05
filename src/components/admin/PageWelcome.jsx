import { LuPlus } from "react-icons/lu";

const PageWelcome = () => (
  <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex min-w-0 flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-6xl sm:h-24 sm:w-24 sm:text-7xl">
          👨‍🏫
        </div>

        <div className="min-w-0 w-full">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 sm:text-xs">
              {/* {user.role === "admin" */}
              Professor Workspace
            </span>

            <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold text-amber-700 sm:text-xs">
              {/* {user.role === "admin" */}
              Assignment Mentor
            </span>
          </div>

          <h1 className="break-words text-2xl font-extrabold tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
            Welcome, {user.name || "User"}! 👋
          </h1>

          <p className="mt-2 break-words text-sm font-medium leading-relaxed text-slate-500 lg:text-base">
            Professor & Academic Administrator
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="block sm:inline">
              Computer Science & Engineering
            </span>
          </p>
        </div>
      </div>

      {/* {user.role === "admin" && ( */}
      <button
        onClick={() => navigate("/admin/assignments")}
        className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl cursor-pointer bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg sm:w-fit sm:self-start xl:self-center"
      >
        <LuPlus size={20} />
        <span>Create New Assignment</span>
      </button>
      {/* )} */}
    </div>
  </div>
);

export default PageWelcome;
