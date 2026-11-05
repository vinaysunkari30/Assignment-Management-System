const FormField = ({label, type = "text", placeholder, register, error,...rest}) => {
  return (
    <div className="mb-3.5">
      <label className="mb-1 block font-medium font-syne text-lg tracking-[0.4px]">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-600 p-[10px] outline-none focus:border-blue-500 placeholder-slate-400"
        {...register}
        {...rest}
      />

      {error && (
        <p className="mt-0.5 text-sm text-red-500 ml-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;