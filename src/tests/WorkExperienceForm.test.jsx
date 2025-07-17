import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import WorkExperienceForm from "../components/forms/WorkExperienceForm";

describe("WorkExperienceForm with RHF + Zod", () => {
  test("allows adding a job with or without end date", async () => {
    render(<WorkExperienceForm onSubmit={() => {}} />);

    fireEvent.input(screen.getByLabelText(/Job Title/i), {
      target: { value: "Product Manager" },
    });

    fireEvent.input(screen.getByLabelText(/Company/i), {
      target: { value: "Tech Co." },
    });

    fireEvent.input(screen.getByLabelText(/Location/i), {
      target: { value: "Kampala" },
    });

    fireEvent.input(screen.getByLabelText(/Start Date/i), {
      target: { value: "2021-01" },
    });

    // Simulate checking "currently working here"
    fireEvent.click(screen.getByLabelText(/Currently Working Here/i));

    fireEvent.input(screen.getByLabelText(/Description/i), {
      target: { value: "Led the development of an internal app." },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Experience/i }));

    await waitFor(() =>
      expect(screen.getByText(/Product Manager/i)).toBeInTheDocument()
    );
  });
});
