import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResumePreview from "../components/ResumePreview";

describe("ResumePreview Layout", () => {
  test("renders personal info, skills, and professional summary correctly", () => {
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

    render(
      <ResumePreview
        personalInfo={personalInfo}
        skills={skills}
        professionalSummary={professionalSummary}
      />
    );

    // Check full name and title
    expect(screen.getAllByText(/Daniel Waduka/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Product Manager/i).length).toBeGreaterThan(0);

    // Contact info matchers
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
  });
});
