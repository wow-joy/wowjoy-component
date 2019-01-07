import React from "react";
import Btn from "../Btn.js";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";

describe("Btn", () => {
  const reactObj = <Btn>Btn Content</Btn>;
  it("renders correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("mount correctly", () => {
    const btn = TestUtils.renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(btn)
    expect(dom.textContent).toEqual("Btn Content");
  });
});
