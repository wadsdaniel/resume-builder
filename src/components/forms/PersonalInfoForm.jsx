import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  professionalTitle: z.string().optional(),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Phone is required"),
  location: z.string().min(1, "Location is required"),
  nationality: z.string().min(1, "Nationality is required"),
  linkedIn: z.string().url("Must be a valid URL").optional(),
  dob: z.string().min(1, "Date of birth is required"),
});

export default function PersonalInfoForm({ onSubmit, onChange }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Subscribe to input changes, and call onChange prop with current form values
  React.useEffect(() => {
    const subscription = watch((value) => {
      if (onChange) onChange(value);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const internalSubmit = (data) => {
    if (onSubmit) onSubmit(data);
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <form
        onSubmit={handleSubmit(internalSubmit)}
        role="form"
        className="space-y-4 p-4"
      >
        {[
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "professionalTitle", label: "Professional Title" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "tel" },
          { name: "location", label: "Location" },
          { name: "nationality", label: "Nationality" },
          { name: "linkedIn", label: "LinkedIn", type: "url" },
          { name: "dob", label: "Date of Birth", type: "date" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label htmlFor={name} className="block text-sm font-medium">
              {label}
            </label>
            <input
              id={name}
              type={type}
              {...register(name)}
              name={name}
              className="mt-1 w-full border px-3 py-2 rounded"
            />
            {errors[name] && (
              <p className="text-sm text-red-500">{errors[name].message}</p>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </form>
    </>
  );
}
