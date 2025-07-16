import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EducationForm from "../components/EducationForm";

describe("EducationForm with RHF + Zod", () => {
  test("allows adding an education entry", async () => {
    render(<EducationForm onSubmit={() => {}} />);

    fireEvent.input(screen.getByLabelText(/Graduation Date/i), {
      target: { value: "2023-05" },
    });

    fireEvent.input(screen.getByLabelText(/Award/i), {
      target: { value: "Bachelor of Computer Science" },
    });

    fireEvent.input(screen.getByLabelText(/Institution/i), {
      target: { value: "Makerere University" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Education/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/Bachelor of Computer Science/i)
      ).toBeInTheDocument()
    );
  });
});
