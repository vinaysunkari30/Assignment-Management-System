import { Link } from "react-router-dom";
import { LuArrowLeft, LuHouse, LuSearchX } from "react-icons/lu";

const NotFound = () => {

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-lg text-center">

        <div className="relative mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-blue-50">
          <LuSearchX className="text-7xl text-blue-600" />

          <span className="absolute -right-2 top-3 rounded-full bg-amber-400 px-3 py-1 text-sm font-bold text-white shadow-md">
            404
          </span>
        </div>

        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
          Oops! The page you're looking for doesn't exist,
          may have been moved, or is temporarily unavailable.
          Let's get you back on track.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            <LuArrowLeft size={18} />
            Go Back
          </button>

          <Link
            to={user.role==="admin" ? '/admin/dashboard': '/student/dashboard' }
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-blue-700"
          >
            
            Back to Dashboard
          </Link>
        </div>

        <p className="mt-12 text-xs font-medium text-slate-400">
          Assignment Tracker • Keep learning, keep growing.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
