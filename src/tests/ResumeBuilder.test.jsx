// src/tests/ResumeBuilder.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResumeBuilder from "../pages/ResumeBuilder";

describe("ResumeBuilder Integration Test", () => {
  test("renders all form sections and the preview", () => {
    render(<ResumeBuilder />);

    // Check form section headings
    expect(screen.getByText("Personal Information")).toBeInTheDocument();

    const ProfessionalSkillsMatch = screen.queryAllByText((_, el) =>
      el.textContent.includes("Skills")
    );
    expect(ProfessionalSkillsMatch.length).toBeGreaterThan(0);

    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Work Experience")).toBeInTheDocument();

    const skillsMatch = screen.queryAllByText((_, el) =>
      el.textContent.includes("Skills")
    );
    expect(skillsMatch.length).toBeGreaterThan(0);

    expect(screen.getByText("Hobbies")).toBeInTheDocument();

    // Check print/download button
    expect(
      screen.getByRole("button", { name: /Download PDF/i })
    ).toBeInTheDocument();
  });

  test("updates preview when personal info is filled", () => {
    render(<ResumeBuilder />);

    const firstNameInput = screen.getByLabelText(/First Name/i);
    const lastNameInput = screen.getByLabelText(/Last Name/i);
    const titleInput = screen.getByLabelText(/Professional Title/i);

    fireEvent.change(firstNameInput, { target: { value: "Daniel" } });
    fireEvent.change(lastNameInput, { target: { value: "Waduka" } });
    fireEvent.change(titleInput, { target: { value: "Full Stack Developer" } });

    expect(screen.getByText("Daniel Waduka")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Developer")).toBeInTheDocument();
  });
});
