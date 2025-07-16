import React from "react";

export default function ResumePreview({ personalInfo, skills }) {
  const {
    firstName,
    lastName,
    professionalTitle,
    phone,
    email,
    location,
    dateOfBirth,
    nationality,
    linkedin,
  } = personalInfo || {};

  return (
    <div className="flex min-h-screen border rounded overflow-hidden">
      {/* Left Column */}
      <div className="w-1/3 bg-gray-100 text-black p-6 space-y-6">
        {/* Name & Title */}
        <div>
          <h1 className="text-2xl font-bold uppercase">
            {firstName} {lastName}
          </h1>
          <h2 className="text-sm font-semibold uppercase text-gray-700">
            {professionalTitle}
          </h2>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="uppercase font-semibold text-sm mb-2">Contact</h3>
          <hr className="mb-2" />
          <ul className="text-sm space-y-1">
            <li>📞 {phone}</li>
            <li>📧 {email}</li>
            <li>📍 {location}</li>
            <li>🎂 {dateOfBirth}</li>
            <li>🌍 {nationality}</li>
            <li>
              🔗{" "}
              <a href={linkedin} target="_blank" rel="noreferrer">
                {linkedin}
              </a>
            </li>
          </ul>
        </div>

        {/* Skills Section */}
        <div>
          <h3 className="uppercase font-semibold text-sm mb-2">Skills</h3>
          <hr className="mb-2" />
          <ul className="text-sm list-disc list-inside">
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-2/3 bg-white p-6">
        {/* We'll add Professional Summary, Experience, Education, Hobbies here later */}
        <p className="text-gray-400 italic">
          Right column content coming soon…
        </p>
      </div>
    </div>
  );
}
