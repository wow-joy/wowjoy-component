import * as React from "react";
import Template from "../index";
import * as renderer from "react-test-renderer";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const { renderIntoDocument } = TestUtils;
describe("Template", () => {
  const reactObj = <Template>Template Content</Template>;
  it("render children correctly", () => {
    const template = mount(reactObj);
    const dom = template.getDOMNode();
    expect(dom.textContent).toEqual("Template Content");
  });
  it("should pass class `.wjc-template` to the Template", () => {
    const template = mount(reactObj);
    const dom = template.getDOMNode();
    expect(dom.className).toEqual(expect.stringMatching(/wjc-template/));
  });
  it("should allow pass className to the Template", () => {
    const reactObj = (
      <Template className="class-test">Template Content</Template>
    );
    const template = mount(reactObj);
    const dom = template.getDOMNode();
    expect(dom.className).toEqual(expect.stringMatching(/class-test/));
  });
});
