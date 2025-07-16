// src/components/ResumePreview.jsx
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
    <div style={{ display: "flex", gap: "2rem" }}>
      {/* Left Column */}
      <div
        style={{
          flexBasis: "30%",
          backgroundColor: "#f4f4f4",
          padding: "1rem",
          color: "#222",
        }}
        data-testid="left-column"
      >
        <h1 style={{ textTransform: "uppercase", fontWeight: "bold" }}>
          {firstName} {lastName}
        </h1>
        <h2 style={{ textTransform: "uppercase", marginBottom: "1rem" }}>
          {professionalTitle}
        </h2>

        <section>
          <h3>Contact</h3>
          <p>{phone}</p>
          <p>{email}</p>
          <p>{location}</p>
          <p>{dateOfBirth}</p>
          <p>{nationality}</p>
          <p>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </p>
        </section>

        <section style={{ marginTop: "1rem" }}>
          <h3>Skills</h3>
          <ul>
            {skills &&
              skills.map((skill, index) => (
                <li
                  key={index}
                  style={{ listStyleType: "disc", marginLeft: "1rem" }}
                >
                  {skill}
                </li>
              ))}
          </ul>
        </section>
      </div>

      {/* Right Column */}
      <div
        style={{
          flexBasis: "65%",
          backgroundColor: "white",
          padding: "1rem",
          color: "#222",
        }}
        data-testid="right-column"
      >
        {/* Will implement right column later */}
      </div>
    </div>
  );
}
