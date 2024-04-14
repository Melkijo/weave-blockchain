import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./Home";
import React from "react";
import { BrowserRouter } from "react-router-dom";

describe("Home Page", () => {
  it("should render loading screen", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
