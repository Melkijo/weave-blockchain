import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";

describe("Register Page", () => {
  it("should render loading screen", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
    expect(screen.getByText("Actor Register Page")).toBeInTheDocument();
  });
});
