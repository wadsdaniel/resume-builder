import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import ProfessionalSummaryForm from "../components/ProfessionalSummaryForm";

describe("ProfessionalSummaryForm with RHF + Zod", () => {
  test("allows entering and submitting professional summary", async () => {
    const mockOnSubmit = vi.fn();

    render(<ProfessionalSummaryForm onSubmit={mockOnSubmit} />);

    const textarea = screen.getByLabelText(/Professional Summary/i);
    fireEvent.change(textarea, {
      target: {
        value: "Experienced Product Manager with a passion for users.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /Save Summary/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        professionalSummary:
          "Experienced Product Manager with a passion for users.",
      });
    });
  });
});
