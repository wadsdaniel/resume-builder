import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const educationSchema = z.object({
  graduationDate: z.string().min(1, "Graduation Date is required"),
  award: z.string().min(1, "Award is required"),
  institution: z.string().min(1, "Institution is required"),
});

export default function EducationForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(educationSchema),
  });

  const [educationList, setEducationList] = useState([]);

  const addEducation = (data) => {
    setEducationList((prev) => [...prev, data]);
    reset();
    onSubmit?.(data);
  };

  const handleDelete = (index) => {
    setEducationList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit(addEducation)} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium" htmlFor="graduationDate">
          Graduation Date
        </label>
        <input
          id="graduationDate"
          type="month"
          {...register("graduationDate")}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.graduationDate && (
          <p className="text-red-600">{errors.graduationDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="award">
          Award
        </label>
        <input
          id="award"
          {...register("award")}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.award && <p className="text-red-600">{errors.award.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="institution">
          Institution
        </label>
        <input
          id="institution"
          {...register("institution")}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.institution && (
          <p className="text-red-600">{errors.institution.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Education
      </button>

      <ul className="mt-4 space-y-2">
        {educationList.map((edu, i) => (
          <li key={i} className="border p-3 rounded">
            <strong>{edu.award}</strong>
            <br />
            {edu.institution}
            <br />
            <span>{edu.graduationDate}</span>
            <br />
            <button
              type="button"
              onClick={() => handleDelete(i)}
              className="text-red-500 text-sm mt-1"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </form>
  );
}
