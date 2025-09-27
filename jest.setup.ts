import "@testing-library/jest-dom";
import { act } from "react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the Redux store hooks and the login thunk
import { login } from "@/reduxStore/authSlice";
const mockDispatch = jest.fn();
jest.mock("@/reduxStore/store", () => ({
  ...jest.requireActual("@/reduxStore/store"),
  useAppDispatch: () => mockDispatch,
}));

jest.mock("@/reduxStore/authSlice", () => ({
  login: jest.fn(),
}));

// Mock the toast library
jest.mock("react-hot-toast", () => ({
  error: jest.fn(),
  success: jest.fn(),
  Toaster: () => null, // Provide a mock Toaster component
}));
