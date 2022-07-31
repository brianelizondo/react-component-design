import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

// Smoke Tests
it("'Board' component renders without crashing", function() {
    render(<Board />);
});

// Snapshot Tests
it("'Board' matches snapshot with light start off", function() {
    const {asFragment} = render(<Board chanceLightStartsOn={ false } />);
    expect(asFragment()).toMatchSnapshot();
});

// check handling cell-clicking
it("works when click on a cell", function() {
    const { queryByTestId } = render(<Board chanceLightStartsOn={ false } />);
  
    expect(queryByTestId("0-0")).toBeInTheDocument();
    expect(queryByTestId("0-0")).not.toHaveClass("Cell-lit");
  
    // click on cell coord "1-1"
    const clickCell = queryByTestId("1-1");
    fireEvent.click(clickCell);
    
    expect(queryByTestId("0-1")).toHaveClass("Cell-lit");
    expect(queryByTestId("1-0")).toHaveClass("Cell-lit");
    expect(queryByTestId("1-1")).toHaveClass("Cell-lit");
    expect(queryByTestId("1-2")).toHaveClass("Cell-lit");
    expect(queryByTestId("2-1")).toHaveClass("Cell-lit");
});