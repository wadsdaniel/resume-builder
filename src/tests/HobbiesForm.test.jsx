// src/tests/HobbiesForm.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import HobbiesForm from "../components/HobbiesForm";

describe("HobbiesForm with RHF + Zod", () => {
  test("allows adding and deleting hobbies, then submitting the list", async () => {
    const mockOnSubmit = vi.fn();

    render(<HobbiesForm onSubmit={mockOnSubmit} />);

    const input = screen.getByLabelText(/Hobby/i);
    const addButton = screen.getByRole("button", { name: /Add Hobby/i });
    const submitButton = screen.getByRole("button", {
      name: /Submit Hobbies/i,
    });

    // Add first hobby
    fireEvent.change(input, { target: { value: "Reading" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Reading")).toBeInTheDocument();
    });

    // Add second hobby
    fireEvent.change(input, { target: { value: "Cooking" } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText("Cooking")).toBeInTheDocument();
    });

    // Delete first hobby (Reading)
    const deleteButtons = screen.getAllByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText("Reading")).not.toBeInTheDocument();
      expect(screen.getByText("Cooking")).toBeInTheDocument();
    });

    // Submit remaining hobbies
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(["Cooking"]);
    });
  });

  test("shows validation error if hobby input is empty", async () => {
    render(<HobbiesForm onSubmit={() => {}} />);

    const addButton = screen.getByRole("button", { name: /Add Hobby/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Hobby is required/i)).toBeInTheDocument();
    });
  });
});
