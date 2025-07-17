import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkillsForm from "../components/forms/SkillsForm";

describe("SkillsForm with RHF + Zod", () => {
  test("allows adding multiple skills and submitting", async () => {
    render(<SkillsForm onSubmit={() => {}} />);

    const input = screen.getByLabelText(/Skill/i);
    const addButton = screen.getByRole("button", { name: /Add Skill/i });

    // First skill
    fireEvent.input(input, { target: { value: "React" } });
    fireEvent.click(addButton);
    await waitFor(() => expect(screen.getByText("React")).toBeInTheDocument());

    // Second skill
    fireEvent.input(input, { target: { value: "Tailwind CSS" } });
    fireEvent.click(addButton);
    await waitFor(() =>
      expect(screen.getByText("Tailwind CSS")).toBeInTheDocument()
    );

    // Submit
    fireEvent.click(screen.getByRole("button", { name: /Submit Skills/i }));
    expect(screen.queryByText(/required/i)).not.toBeInTheDocument();
  });
});
