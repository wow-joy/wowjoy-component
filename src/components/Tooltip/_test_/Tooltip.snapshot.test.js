import React from "react";
import Tooltip from "../index.js";
import renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from "react-dom";
configure({ adapter: new Adapter() });

const { renderIntoDocument } = TestUtils;

describe("Tooltip", () => {
  const reactObj = <Tooltip>Tooltip Content</Tooltip>;
  it("renders correctly", () => {
    const tree = mount(reactObj).render();
    expect(tree).toMatchSnapshot();
  });
});
