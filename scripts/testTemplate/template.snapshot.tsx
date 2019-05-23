import * as React from "react";
import Template from "../index";
import * as renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const { renderIntoDocument } = TestUtils;

describe("Template", () => {
  const reactObj = <Template>Template Content</Template>;
  it("renders correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
