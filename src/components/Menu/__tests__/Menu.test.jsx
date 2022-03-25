import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";

import Menu from "../index";

it("renders correctly", () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
