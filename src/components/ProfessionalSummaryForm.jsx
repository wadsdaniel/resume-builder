// src/components/ProfessionalSummaryForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  professionalSummary: z
    .string()
    .min(10, "Summary must be at least 10 characters")
    .max(1000, "Summary must be at most 1000 characters"),
});

export default function ProfessionalSummaryForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
      noValidate
    >
      <label htmlFor="professionalSummary" className="block font-semibold mb-1">
        Professional Summary
      </label>
      <textarea
        id="professionalSummary"
        {...register("professionalSummary")}
        rows={5}
        className={`w-full p-2 border ${
          errors.professionalSummary ? "border-red-500" : "border-gray-300"
        } rounded`}
        placeholder="Write a short professional summary..."
      />
      {errors.professionalSummary && (
        <p className="text-red-500 mt-1 text-sm">
          {errors.professionalSummary.message}
        </p>
      )}
      <button
        type="submit"
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Save Summary
      </button>
    </form>
  );
}
