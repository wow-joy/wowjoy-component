import * as React from "react";
import Layout from "../index";
import * as renderer from "react-test-renderer";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });
const shouldRenderRight = (
  propName: string,
  tagName: string,
  className: string
) => {
  const selector = tagName + "." + className;
  it(`should render ${selector} when \`${propName}\` is not empty`, () => {
    const reactObj = <Layout {...{ [propName]: `this is a ${propName}` }} />;
    const layout = mount(reactObj);
    const dom = layout.getDOMNode().querySelector(selector);
    expect(dom).not.toEqual(null);
    expect(dom.textContent).toEqual(`this is a ${propName}`);
  });
  it(`should not render ${className} when there is no \`${propName}\``, () => {
    const reactObj1 = <Layout {...{ [propName]: false }} />;
    const reactObj2 = <Layout {...{ [propName]: "" }} />;
    const reactObj3 = <Layout />;
    const checkObj = (reactObj: JSX.Element) => {
      const layout = mount(reactObj);
      const dom = layout.getDOMNode();
      expect(dom.querySelector(className)).toEqual(null);
    };
    checkObj(reactObj1);
    checkObj(reactObj2);
    checkObj(reactObj3);
  });
};
describe("Layout", () => {
  const reactObj = <Layout>Layout Content</Layout>;
  it("should pass class `.wjc-layout` to the Layout", () => {
    const layout = mount(reactObj);
    const dom = layout.getDOMNode();
    expect(dom.className).toEqual(expect.stringMatching(/wjc-layout/));
  });
  it("should allow pass className to the Layout", () => {
    const reactObj = <Layout className="class-test">Layout Content</Layout>;
    const layout = mount(reactObj);
    const dom = layout.getDOMNode();
    expect(dom.className).toEqual(expect.stringMatching(/wjc-layout/));
    expect(dom.className).toEqual(expect.stringMatching(/class-test/));
  });
  shouldRenderRight("header", "header", "wjc-layout-header");
  shouldRenderRight("asideLeft", "aside", "wjc-layout-aside__left");
  shouldRenderRight("asideRight", "aside", "wjc-layout-aside__right");
  shouldRenderRight("children", "article", "wjc-layout-center");
  shouldRenderRight("footer", "footer", "wjc-layout-footer");
});
