import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PersonalInfoForm from "../components/forms/PersonalInfoForm";

describe("PersonalInfoForm with RHF + Zod", () => {
  test("submits valid personal info with LinkedIn and DOB", async () => {
    render(<PersonalInfoForm />);

    fireEvent.input(screen.getByLabelText(/First Name/i), {
      target: { value: "Daniel" },
    });
    fireEvent.input(screen.getByLabelText(/Last Name/i), {
      target: { value: "Waduka" },
    });
    fireEvent.input(screen.getByLabelText(/Email/i), {
      target: { value: "daniel@example.com" },
    });
    fireEvent.input(screen.getByLabelText(/Phone/i), {
      target: { value: "+256123456789" },
    });
    fireEvent.input(screen.getByLabelText(/Location/i), {
      target: { value: "Kampala" },
    });
    fireEvent.input(screen.getByLabelText(/Nationality/i), {
      target: { value: "Ugandan" },
    });
    fireEvent.input(screen.getByLabelText(/LinkedIn/i), {
      target: { value: "https://linkedin.com/in/daniel" },
    });
    fireEvent.input(screen.getByLabelText(/Date of Birth/i), {
      target: { value: "1995-01-01" },
    });

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    // If the form is valid, there should be no validation messages
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });
});
