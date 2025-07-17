import { render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResumePreview from "../components/ResumePreview";

describe("ResumePreview Layout", () => {
  test("renders personal info, skills, professional summary, work experience, education, and hobbies correctly", () => {
    const personalInfo = {
      firstName: "Daniel",
      lastName: "Waduka",
      professionalTitle: "Product Manager",
      phone: "+256700000000",
      email: "daniel@example.com",
      location: "Kampala",
      dateOfBirth: "1990-01-01",
      nationality: "Ugandan",
      linkedin: "https://linkedin.com/in/daniel",
    };

    const skills = ["Leadership", "React", "Product Strategy"];
    const professionalSummary =
      "Experienced product manager with a passion for user-centered design and AI-assisted development.";

    const workExperience = [
      {
        jobTitle: "Senior Product Manager",
        employer: "TechCorp",
        startDate: "2020-01",
        endDate: "2022-12",
        description:
          "Led product roadmap and shipped multiple AI-integrated features.",
      },
    ];

    const education = [
      {
        degree: "BSc in Computer Science",
        institution: "Makerere University",
        startDate: "2010-08",
        endDate: "2014-06",
      },
    ];

    const hobbies = ["Writing", "Piano", "Hiking"];

    render(
      <ResumePreview
        personalInfo={personalInfo}
        skills={skills}
        professionalSummary={professionalSummary}
        workExperience={workExperience}
        education={education}
        hobbies={hobbies}
      />
    );

    // Personal Info
    expect(screen.getAllByText(/Daniel Waduka/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Product Manager/i).length).toBeGreaterThan(0);

    expect(
      screen.queryAllByText((_, el) => el.textContent.includes("+256700000000"))
        .length
    ).toBeGreaterThan(0);

    expect(
      screen.queryAllByText((_, el) =>
        el.textContent.includes("daniel@example.com")
      ).length
    ).toBeGreaterThan(0);

    expect(
      screen.queryAllByText((_, el) => el.textContent.includes("Kampala"))
        .length
    ).toBeGreaterThan(0);

    expect(
      screen.queryAllByText((_, el) => el.textContent.includes("1990-01-01"))
        .length
    ).toBeGreaterThan(0);

    expect(
      screen.queryAllByText((_, el) => el.textContent.includes("Ugandan"))
        .length
    ).toBeGreaterThan(0);

    // Skills
    expect(screen.getByText("Leadership")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Product Strategy")).toBeInTheDocument();

    // Professional Summary
    expect(
      screen.getByText(/Experienced product manager with a passion/i)
    ).toBeInTheDocument();

    // Work Experience
    expect(screen.getByText("Senior Product Manager")).toBeInTheDocument();

    const workSection = screen
      .getByRole("heading", { name: /Work Experience/i })
      .closest("section");

    expect(
      within(workSection).getByText((content) => content.includes("TechCorp"))
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Led product roadmap and shipped multiple/i)
    ).toBeInTheDocument();

    // Education
    expect(screen.getByText("BSc in Computer Science")).toBeInTheDocument();

    const educationSection = screen
      .getByRole("heading", { name: /education/i })
      .closest("section");

    expect(
      within(educationSection).getByText((content) =>
        content.includes("Makerere University")
      )
    ).toBeInTheDocument();

    // Hobbies
    expect(screen.getByText("Writing")).toBeInTheDocument();
    expect(screen.getByText("Piano")).toBeInTheDocument();
    expect(screen.getByText("Hiking")).toBeInTheDocument();
  });
});
