import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LandingPage from "../../pages/LandingPage";

global.fetch = jest.fn();
global.structuredClone = (val) => JSON.parse(JSON.stringify(val));

afterEach(() => {
  jest.clearAllMocks();
});

test("Display Loading state initially", () => {
  fetch.mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue([]),
  });
  render(<LandingPage />);
  const loader = screen.getByText("Please wait while we fetch the records");
  expect(loader).toBeInTheDocument();
});

test("Test Headers and data after data is fetched", async () => {
  const mockCust = [
    {
      transaction_id: "A1B2C3",
      customer_id: 101,
      customer_name: "John Doe",
      purchase_date: "2024-12-01",
      price: 150.75,
    },
    {
      transaction_id: "D4E5F6",
      customer_id: 102,
      customer_name: "Jane Smith",
      purchase_date: "2025-01-19",
      price: 220.5,
    },
  ];
  fetch.mockResolvedValueOnce({
    ok: true,
    json: jest.fn().mockResolvedValue(mockCust)
  });
  render(<LandingPage />);
  await waitFor(() =>
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
  );
  await waitFor(() => expect(screen.getByText(/A1B2C3/i)).toBeInTheDocument());

  const rows = screen.getAllByRole("row");
  expect(rows[1]).toHaveTextContent("Jane Smith");
  expect(rows[2]).toHaveTextContent("John Doe");
});

test("Handle API failure", async () => {
  fetch.mockResolvedValueOnce(new Error("Failed to fetch records"));
  render(<LandingPage />);
  await waitFor(() =>
    expect(
      screen.queryByText("Please wait while we fetch the records")
    ).not.toBeInTheDocument()
  );
  expect(
    screen.getByText(
      "Please contact support, API call is failng to fetch the data"
    )
  ).toBeInTheDocument();
});
