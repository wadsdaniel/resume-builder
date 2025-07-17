import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const workSchema = z.object({
  jobTitle: z.string().min(1, "Job Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  startDate: z.string().min(1, "Start Date is required"),
  endDate: z.string().optional(),
  currentlyWorking: z.boolean().optional(),
  description: z.string().min(1, "Description is required"),
});

export default function WorkExperienceForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workSchema),
    defaultValues: {
      currentlyWorking: false,
    },
  });

  const [jobs, setJobs] = useState([]);
  const currentlyWorking = watch("currentlyWorking");

  const addExperience = (data) => {
    const entry = {
      ...data,
      endDate: data.currentlyWorking ? "Current" : data.endDate,
    };
    setJobs((prev) => [...prev, entry]);
    reset();
  };

  const handleDelete = (index) => {
    setJobs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Work Experience</h2>
      <form onSubmit={handleSubmit(addExperience)} className="space-y-4 p-4">
        <div>
          <label className="block text-sm font-medium" htmlFor="jobTitle">
            Job Title
          </label>
          <input
            id="jobTitle"
            {...register("jobTitle")}
            className="mt-1 w-full border px-3 py-2 rounded"
          />
          {errors.jobTitle && (
            <p className="text-red-600">{errors.jobTitle.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="company">
            Company
          </label>
          <input
            id="company"
            {...register("company")}
            className="mt-1 w-full border px-3 py-2 rounded"
          />
          {errors.company && (
            <p className="text-red-600">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            {...register("location")}
            className="mt-1 w-full border px-3 py-2 rounded"
          />
          {errors.location && (
            <p className="text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="startDate">
            Start Date
          </label>
          <input
            id="startDate"
            type="month"
            {...register("startDate")}
            className="mt-1 w-full border px-3 py-2 rounded"
          />
          {errors.startDate && (
            <p className="text-red-600">{errors.startDate.message}</p>
          )}
        </div>

        {!currentlyWorking && (
          <div>
            <label className="block text-sm font-medium" htmlFor="endDate">
              End Date
            </label>
            <input
              id="endDate"
              type="month"
              {...register("endDate")}
              className="mt-1 w-full border px-3 py-2 rounded"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <input
            id="currentlyWorking"
            type="checkbox"
            {...register("currentlyWorking")}
          />
          <label htmlFor="currentlyWorking" className="text-sm">
            Currently Working Here
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            {...register("description")}
            className="mt-1 w-full border px-3 py-2 rounded"
          />
          {errors.description && (
            <p className="text-red-600">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Experience
        </button>

        <ul className="mt-4 space-y-2">
          {jobs.map((job, i) => (
            <li key={i} className="border p-3 rounded">
              <strong>{job.jobTitle}</strong> @ {job.company} — {job.location}
              <br />
              {job.startDate} to {job.endDate}
              <br />
              <em>{job.description}</em>
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
    </>
  );
}
