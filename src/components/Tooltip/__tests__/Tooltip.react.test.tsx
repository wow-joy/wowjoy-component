import * as React from "react";
import Tooltip, { SimpleTooltip } from "../index";
import * as renderer from "react-test-renderer";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure, shallow, render } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const { renderIntoDocument } = TestUtils;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Tooltip", () => {
  describe("complex Tooltip", () => {
    const reactObj = <Tooltip>Tooltip Content</Tooltip>;
    it("render children correctly", () => {
      const tooltip = mount(reactObj);
      const dom = tooltip.getDOMNode();
      expect(dom.textContent).toEqual("Tooltip Content");
    });
    it("should pass class `.wjc-tooltip` to the Tooltip", () => {
      const tooltip = mount(reactObj);
      const dom = tooltip.getDOMNode();
      expect(dom.className).toEqual(expect.stringMatching(/wjc-tooltip/));
    });
    it("should render wrap while children were more than 2 node2", () => {
      const reactObj = <Tooltip>{["Tooltip Content", "Tooltip Content2"]}</Tooltip>;
      const tooltip = mount(reactObj);
      const dom = tooltip.getDOMNode();
      expect(dom.className).toEqual(expect.stringMatching(/wjc-tooltip-triggerbox/));
    });
    it("should render wrap while children were only one textNode", () => {
      const reactObj = <Tooltip>Tooltip Content</Tooltip>;
      const tooltip = mount(reactObj);
      const dom = tooltip.getDOMNode();
      expect(dom.className).toEqual(expect.stringMatching(/wjc-tooltip-triggerbox/));
    });
    it("shouldn't render wrap while children were a dom element not a textNode", () => {
      const reactObj = (
        <Tooltip>
          <span className="dom">Tooltip Content</span>
        </Tooltip>
      );
      const tooltip = mount(reactObj);
      const dom = tooltip.getDOMNode();
      expect(dom.className).toEqual("dom");
    });
    it("should show layer while children onMouseEnter", () => {
      const visibleChangeHandle = (visible: boolean) => {
        expect(visible).toEqual(true);
      };
      const reactObj = <Tooltip onVisibleChange={visibleChangeHandle}>Tooltip Content</Tooltip>;
      const reactDom = mount(reactObj);

      reactDom.simulate("mouseenter");
    });
    it("should show layer while children onMouseOut", () => {
      const visibleChangeHandle = (visible: boolean) => {
        expect(visible).toEqual(false);
      };
      const reactObj = <Tooltip onVisibleChange={visibleChangeHandle}>Tooltip Content</Tooltip>;
      const reactDom = mount(reactObj);

      reactDom.simulate("mouseleave");
    });
  });
  describe("simple Tooltip", () => {
    const reactObj = <SimpleTooltip>Tooltip Content</SimpleTooltip>;
    it("render children correctly", () => {
      const tooltip = mount(reactObj);
      const dom = tooltip.getDOMNode();
      expect(dom.textContent).toEqual("Tooltip Content");
    });
    it("should pass class `.wjc-tooltip` to the Tooltip", () => {
      const tooltip = mount(reactObj);
      const dom = tooltip.getDOMNode();
      expect(dom.className).toEqual(expect.stringMatching(/wjc-tooltip/));
    });
    it("should display tipcontent when mouseEnter", async () => {
      const reactDom = mount(reactObj);
      const triggerDom = reactDom
        .find(".wjc-tooltip-triggerbox")
        .hostNodes()
        .at(0);
      triggerDom.simulate("mouseenter");
      expect(
        getComputedStyle(reactDom.getDOMNode().querySelector(".wjc-tooltip-content")).display
      ).toEqual(`none`);
      await sleep(100);
      expect(
        getComputedStyle(reactDom.getDOMNode().querySelector(".wjc-tooltip-content")).display
      ).toEqual(`block`);
    });
  });
});
