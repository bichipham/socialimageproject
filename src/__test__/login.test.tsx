/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/login/page";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/reduxStore/store";
import { login } from "@/reduxStore/authSlice";
import toast from "react-hot-toast";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@/reduxStore/store", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("@/reduxStore/authSlice", () => ({
  login: jest.fn(),
}));

jest.mock("react-hot-toast", () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
  Toaster: () => <div>Mock Toaster</div>,
}));

describe("Login Page", () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  it("should show validation error if username/password < 5 chars", async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/user name/i), {
      target: { value: "abc" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Username and password are required and length >=5",
        expect.any(Object)
      );
    });
  });

  it("should dispatch login and navigate on success", async () => {
    const fakeResult = {
      type: "auth/login/fulfilled",
      payload: {
        id: 1,
        username: "emilys",
        email: "emily.johnson@x.dummyjson.com",
        firstName: "Emily",
        lastName: "Johnson",
        gender: "female",
        image: "https://dummyjson.com/icon/emilys/128",
        accessToken: "jwt-access-token",
        refreshToken: "jwt-refresh-token",
      },
    };
    (login as jest.Mock).mockReturnValue({ type: "auth/login/pending" });
    mockDispatch.mockResolvedValue(fakeResult);

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/user name/i), {
      target: { value: "emilys" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "emilyspass" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: expect.stringContaining("auth/login"),
        })
      );
      expect(mockPush).toHaveBeenCalledWith("/newsfeed");
    });
  });

  it("should show error toast if login rejected", async () => {
    const fakeResult = { type: "auth/login/rejected" };
    (login as jest.Mock).mockReturnValue({ type: "auth/login/pending" });
    mockDispatch.mockResolvedValue(fakeResult);

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/user name/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid username or password!");
    });
  });
});
