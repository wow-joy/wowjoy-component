import React from "react";
import Template from "../index.js";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument } = TestUtils;
describe("Template", () => {
  const reactObj = <Template>Template Content</Template>;
  it("render children correctly", () => {
    const template = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(template);
    expect(dom.textContent).toEqual("Template Content");
  });
  it("should pass class `.wj-template` to the Template", () => {
    const template = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(template);
    expect(dom.className).toEqual(expect.stringMatching(/wj-template/));
  });
  it("should allow pass className to the Template", () => {
    const reactObj = <Template className="class-test">Template Content</Template>;
    const template = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(template);
    expect(dom.className).toEqual(expect.stringMatching(/class-test/));
  });
});
