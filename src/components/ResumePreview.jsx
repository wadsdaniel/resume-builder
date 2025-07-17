import React from "react";

export default function ResumePreview({
  personalInfo,
  skills,
  professionalSummary,
  workExperience = [],
  education = [],
  hobbies = [],
}) {
  return (
    <div className="flex w-full">
      {/* Left Column */}
      <div className="w-1/3 bg-gray-100 p-4 space-y-4">
        <div>
          <h2 className="text-lg font-bold">
            {personalInfo.firstName} {personalInfo.lastName}
          </h2>
          <p className="text-sm italic">{personalInfo.professionalTitle}</p>
        </div>

        <div className="text-sm space-y-1">
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
          <p>{personalInfo.location}</p>
          <p>{personalInfo.dateOfBirth}</p>
          <p>{personalInfo.nationality}</p>
          <p>{personalInfo.linkedin}</p>
        </div>

        <div>
          <h3 className="font-semibold mt-4">Skills</h3>
          <ul className="list-disc ml-5 text-sm">
            {skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>

        {hobbies.length > 0 && (
          <div>
            <h3 className="font-semibold mt-4">Hobbies</h3>
            <ul className="list-disc ml-5 text-sm">
              {hobbies.map((hobby, idx) => (
                <li key={idx}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-4 space-y-6">
        {/* Professional Summary */}
        {professionalSummary && (
          <section>
            <h3 className="text-lg font-semibold">Professional Summary</h3>
            <p className="text-sm">{professionalSummary}</p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold">Work Experience</h3>
            <ul className="space-y-4">
              {workExperience.map((job, index) => (
                <li key={index}>
                  <p className="font-bold">{job.jobTitle}</p>
                  <p className="italic text-sm">
                    {job.employer} ({job.startDate} - {job.endDate})
                  </p>
                  <p className="text-sm">{job.description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold">Education</h3>
            <ul className="space-y-4">
              {education.map((edu, index) => (
                <li key={index}>
                  <p className="font-bold">{edu.degree}</p>
                  <p className="italic text-sm">
                    {edu.institution} ({edu.startDate} - {edu.endDate})
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
