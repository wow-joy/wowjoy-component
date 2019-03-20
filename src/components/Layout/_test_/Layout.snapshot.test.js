import React from "react";
import Layout from "../index.js";
import renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument } = TestUtils;
const rendersCorrectly = propName => {
  it(`renders ${propName} correctly`, () => {
    const reactObj = <Layout {...{ [propName]: propName + " content" }} />;
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
};
describe("Layout", () => {
  const reactObj = <Layout>Layout Content</Layout>;
  it("renders correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
  ["header", "asideLeft", "children", "asideRIght", "footer"].forEach(ele => {
    rendersCorrectly(ele);
  });
});
