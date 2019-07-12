import * as React from "react";
import * as Icon from "../index";
import * as renderer from "react-test-renderer";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("Icon", () => {
  it("color should apply svg path", () => {
    const CheckCircle = mount(<Icon.CheckCircle style={{ color: "red" }} />);
    expect(
      CheckCircle.find("svg")
        .getDOMNode()
        .attributes.getNamedItem("style").value
    ).toMatch(/color:\sred/);
  });
});
