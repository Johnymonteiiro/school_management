import { StudentFormData } from "@/app/dashboard/students/create-student";
import { useFormContext } from "react-hook-form";

type InputFieldProps = {
  id: keyof StudentFormData;
  label: string;
  placeholder: string;
  mask?: string;
};

export function InputField({ id, label, placeholder, mask }: InputFieldProps) {
  const { register, formState } = useFormContext<StudentFormData>();
  const error = formState.errors[id];

  return (
    <div className="flex flex-col w-full mb-3">
      <label htmlFor={id} className="mb-2 text-base">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        id={id}
        {...register(id)}
        placeholder={placeholder}
        className={`border p-2 rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && (
        <span className="text-red-500 pt-1 text-xs">{error.message}</span>
      )}
    </div>
  );
}
