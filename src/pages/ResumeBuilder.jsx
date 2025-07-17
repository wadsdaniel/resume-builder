import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

import PersonalInfoForm from "../components/forms/PersonalInfoForm";
import ProfessionalSummaryForm from "../components/forms/ProfessionalSummaryForm";
import EducationForm from "../components/forms/EducationForm";
import ExperienceForm from "../components/forms/WorkExperienceForm";
import SkillsForm from "../components/forms/SkillsForm";
import HobbiesForm from "../components/forms/HobbiesForm";
import ResumePreview from "../components/ResumePreview";

export default function ResumeBuilder() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [summary, setSummary] = useState("");
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);

  const resumeRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
    documentTitle: "resume",
  });

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 space-y-6">
        <h1 className="text-2xl font-bold">Resume Builder</h1>

        <PersonalInfoForm
          onSubmit={setPersonalInfo}
          onChange={setPersonalInfo} // <-- live update on change!
        />
        <ProfessionalSummaryForm onSubmit={setSummary} />
        <EducationForm onSubmit={setEducation} />
        <ExperienceForm onSubmit={setExperience} />
        <SkillsForm onSubmit={setSkills} />
        <HobbiesForm onSubmit={setHobbies} />

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      {/* Right: Live Preview */}
      <div className="w-full md:w-1/2 border p-4 rounded shadow bg-white">
        <div ref={resumeRef}>
          <ResumePreview
            personalInfo={personalInfo}
            summary={summary}
            education={education}
            experience={experience}
            skills={skills}
            hobbies={hobbies}
          />
        </div>
      </div>
    </div>
  );
}
