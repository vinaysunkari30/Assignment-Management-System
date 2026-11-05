// useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.key === 'Escape') {
//         onClose();
//       }
//     };

//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//       window.addEventListener('keydown', handleKeyDown);
//     }

//     return () => {
//       document.body.style.overflow = 'unset';
//       window.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;



import { LuX } from "react-icons/lu";

const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = "max-w-lg",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[90vh] w-full ${maxWidth} flex-col overflow-hidden rounded-2xl bg-white shadow-xl`}
      >
        {/* Modal Header */}
        <div className="sticky top-0 flex shrink-0 items-center justify-between border-b border-slate-100 bg-white p-5">
          <div>
            <h2
              id="modal-title"
              className="text-lg font-bold text-slate-800"
            >
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-xs text-slate-500">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg cursor-pointer p-2 text-slate-500 transition hover:bg-slate-100"
          >
            <LuX size={21} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
