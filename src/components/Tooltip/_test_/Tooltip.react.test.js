import React from "react";
import Tooltip from "../index.js";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure, shallow, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument } = TestUtils;
describe("Tooltip", () => {
  const reactObj = <Tooltip>Tooltip Content</Tooltip>;
  it("render children correctly", () => {
    const tooltip = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(tooltip);
    expect(dom.textContent).toEqual("Tooltip Content");
  });
  it("should pass class `.wjc-tooltip` to the Tooltip", () => {
    const tooltip = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(tooltip);
    expect(dom.className).toEqual(expect.stringMatching(/wjc-tooltip/));
  });
  it("should render wrap while children were more than 2 node2", () => {
    const reactObj = (
      <Tooltip>{["Tooltip Content", "Tooltip Content2"]}</Tooltip>
    );
    const tooltip = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(tooltip);
    expect(dom.className).toEqual(
      expect.stringMatching(/wjc-tooltip-triggerbox/)
    );
  });
  it("should render wrap while children were only one textNode", () => {
    const reactObj = <Tooltip>Tooltip Content</Tooltip>;
    const tooltip = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(tooltip);
    expect(dom.className).toEqual(
      expect.stringMatching(/wjc-tooltip-triggerbox/)
    );
  });
  it("shouldn't render wrap while children were a dom element not a textNode", () => {
    const reactObj = (
      <Tooltip>
        <span className="dom">Tooltip Content</span>
      </Tooltip>
    );
    const tooltip = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(tooltip);
    expect(dom.className).toEqual("dom");
  });
  it("should show layer while children onMouseEnter", () => {
    const visibleChangeHandle = visible => {
      expect(visible).toEqual(true);
    };
    const reactObj = (
      <Tooltip onVisibleChange={visibleChangeHandle}>Tooltip Content</Tooltip>
    );
    const reactDom = mount(reactObj);

    reactDom.simulate("mouseenter");
  });
  it("should show layer while children onMouseOut", () => {
    const visibleChangeHandle = visible => {
      expect(visible).toEqual(false);
    };
    const reactObj = (
      <Tooltip onVisibleChange={visibleChangeHandle}>Tooltip Content</Tooltip>
    );
    const reactDom = mount(reactObj);

    reactDom.simulate("mouseleave");
  });
});
