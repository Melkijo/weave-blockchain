import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";
import { Web3Provider } from "../components/Web3Provider";

describe("Register Page", () => {
  it("should correctly render after loading", async () => {
    render(
      <BrowserRouter>
        <Web3Provider>
          <Register />
        </Web3Provider>
      </BrowserRouter>
    );

    // Wait for the loading to complete
    await waitFor(() => {
      expect(screen.getByTestId("registration-test")).toBeInTheDocument();
    });

    // Assert the text content of the element
    expect(screen.getByTestId("registration-test")).toHaveTextContent(
      "Actor Register Pag"
    );
  });
});
