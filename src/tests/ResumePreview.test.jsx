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

    // Check contacts
    expect(screen.getByText("+256700000000")).toBeInTheDocument();
    expect(screen.getByText("daniel@example.com")).toBeInTheDocument();
    expect(screen.getByText("Kampala")).toBeInTheDocument();
    expect(screen.getByText("1990-01-01")).toBeInTheDocument();
    expect(screen.getByText("Ugandan")).toBeInTheDocument();
    expect(screen.getByText(/linkedin/i)).toBeInTheDocument();

    // Check skills
    expect(screen.getByText("Leadership")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Product Strategy")).toBeInTheDocument();
  });
});
