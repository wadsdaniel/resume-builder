import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PersonalInfoForm from "../components/PersonalInfoForm";

describe("PersonalInfoForm with RHF + Zod", () => {
  test("submits valid personal info", async () => {
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

    fireEvent.click(screen.getByRole("button", { name: /next/i }));

    // Expect the button click to not show validation errors (meaning form was valid)
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });
});
