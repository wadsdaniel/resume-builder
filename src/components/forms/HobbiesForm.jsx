import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const hobbySchema = z.object({
  hobby: z.string().min(1, "Hobby is required"),
});

export default function HobbiesForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(hobbySchema),
  });

  const [hobbies, setHobbies] = useState([]);

  const addHobby = (data) => {
    setHobbies((prev) => [...prev, data.hobby]);
    reset();
  };

  const handleDelete = (index) => {
    setHobbies((prev) => prev.filter((_, i) => i !== index));
  };

  const submitHobbies = () => {
    if (onSubmit) {
      onSubmit(hobbies);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold mb-4">Hobbies</h2>
      <form onSubmit={handleSubmit(addHobby)} className="space-y-4 p-4">
        <div>
          <label htmlFor="hobby" className="block text-sm font-medium">
            Hobby
          </label>
          <input
            id="hobby"
            type="text"
            {...register("hobby")}
            className="mt-1 w-full border px-3 py-2 rounded"
          />
          {errors.hobby && (
            <p className="text-red-600 text-sm mt-1">{errors.hobby.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Hobby
        </button>

        <ul className="list-disc pl-5">
          {hobbies.map((hobby, i) => (
            <li key={i} className="flex items-center justify-between mt-1">
              <span>{hobby}</span>
              <button
                type="button"
                className="text-red-500 text-xs"
                onClick={() => handleDelete(i)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={submitHobbies}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Hobbies
        </button>
      </form>
    </>
  );
}
