import * as React from "react";
import * as Icon from "../index";
import * as renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const { renderIntoDocument } = TestUtils;

describe("Icon", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Icon.CheckCircle />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
