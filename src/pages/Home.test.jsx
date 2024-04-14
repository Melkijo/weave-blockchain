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

  it("should render hero section", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    // add delay to wait for the loading screen to disappear
    await new Promise((r) => setTimeout(r, 3000));

    expect(screen.getByTestId("hero-test")).toHaveTextContent("Art of Weaving");
  });
});
