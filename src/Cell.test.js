import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

// Smoke Tests
it("'Cell' component renders without crashing", function() {
    render(<Cell />);
});

// Snapshot Tests
it("'Cell' matches snapshot", function() {
    const {asFragment} = render(<Cell />);
    expect(asFragment()).toMatchSnapshot();
});