import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const skillSchema = z.object({
  skill: z.string().min(1, "Skill is required"),
});

export default function SkillsForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(skillSchema),
  });

  const [skills, setSkills] = useState([]);

  const addSkill = (data) => {
    setSkills((prev) => [...prev, data.skill]);
    reset();
  };

  const handleDelete = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const submitSkills = () => {
    if (onSubmit) {
      onSubmit(skills);
    }
  };

  return (
    <form onSubmit={handleSubmit(addSkill)} className="space-y-4 p-4">
      <div>
        <label htmlFor="skill" className="block text-sm font-medium">
          Skill
        </label>
        <input
          id="skill"
          type="text"
          {...register("skill")}
          className="mt-1 w-full border px-3 py-2 rounded"
        />
        {errors.skill && (
          <p className="text-red-600 text-sm mt-1">{errors.skill.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Skill
      </button>

      <ul className="list-disc pl-5">
        {skills.map((skill, i) => (
          <li key={i} className="flex items-center justify-between mt-1">
            <span>{skill}</span>
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
        onClick={submitSkills}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit Skills
      </button>
    </form>
  );
}
