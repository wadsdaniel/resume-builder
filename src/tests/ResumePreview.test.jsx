import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResumePreview from "../components/ResumePreview";

describe("ResumePreview Layout", () => {
  test("renders personal info and skills in left column", () => {
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

    render(<ResumePreview personalInfo={personalInfo} skills={skills} />);

    // Check full name and title
    expect(screen.getByText(/Daniel Waduka/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Manager/i)).toBeInTheDocument();

    // Check contacts with textContent includes matcher
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

    // Check skills
    expect(screen.getByText("Leadership")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Product Strategy")).toBeInTheDocument();
  });
});
