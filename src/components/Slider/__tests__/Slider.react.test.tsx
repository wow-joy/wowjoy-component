import * as React from "react";
import Slider from "../Range";
import * as renderer from "react-test-renderer";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure, shallow, render } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";

const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const { renderIntoDocument } = TestUtils;
describe("Slider", () => {
  const reactObj = <Slider />;
  const marks = {
    26: "26°C",
    37: "37°C",
    55: "55°C",
    78: "78°C",
    100: {
      style: {
        color: "#f50"
      },
      label: <strong>100°C</strong>
    }
  };
  it("render children correctly", () => {
    const wrapper = mount(reactObj);
    expect(wrapper.exists(".wjc-slider")).toBe(true);
  });
  it("render children correctly when defaultValue is number", () => {
    const wrapper = mount(<Slider defaultValue={30} />);
    expect(wrapper.exists(".wjc-slider")).toBe(true);
  });
  it("render children correctly when defaultValue is array", () => {
    const wrapper = mount(<Slider defaultValue={[10, 50]} />);
    expect(wrapper.exists(".wjc-slider")).toBe(true);
  });
  it("render handler current position", () => {
    const wrapper = mount(<Slider defaultValue={[60]} min={20} max={200} step={10} />);
    expect(
      getComputedStyle(wrapper.getDOMNode().querySelector(".wjc-slider-handler").parentElement).left
    ).toEqual(expect.stringMatching(/22.2{1,}%/));
    const wrapper2 = mount(<Slider defaultValue={[20, 33]} />);
    expect(
      getComputedStyle(wrapper2.getDOMNode().querySelector(".wjc-slider-handler-1").parentElement)
        .left
    ).toEqual("20%");
    expect(
      getComputedStyle(wrapper2.getDOMNode().querySelector(".wjc-slider-handler-2").parentElement)
        .left
    ).toEqual("33%");
  });
  it("should render 1 hanler while defaultValue is number", () => {
    const wrapper = mount(<Slider defaultValue={10} />);
    expect(wrapper.find(".wjc-slider-handler").hostNodes()).toHaveLength(1);
  });
  it("should render n hanlers while defaultValue.length = n", () => {
    Array.from({ length: 5 }).forEach((_, i) => {
      const wrapper = mount(
        <Slider
          defaultValue={Array.from({ length: i + 1 }, () => Math.floor(Math.random() * 100))}
        />
      );
      expect(wrapper.find(".wjc-slider-handler").hostNodes()).toHaveLength(i + 1);
    });
  });
  it("should render current marks", () => {
    const wrapper = mount(<Slider marks={marks} />);
    expect(wrapper.find(".wjc-slider-dot").hostNodes()).toHaveLength(5);
    expect(getComputedStyle(wrapper.getDOMNode().querySelector(".wjc-slider-dot-1")).left).toEqual(
      `26%`
    );
    expect(getComputedStyle(wrapper.getDOMNode().querySelector(".wjc-slider-dot-2")).left).toEqual(
      `37%`
    );
  });
  it("render current disabled slider", () => {
    const wrapper = mount(<Slider disabled defaultValue={[10, 30]} marks={marks} />);
    expect(
      wrapper
        .find(".wjc-slider")
        .at(0)
        .hasClass("wjc-slider-disabled")
    ).toEqual(true);
    expect(
      getComputedStyle(wrapper.getDOMNode().querySelector(".wjc-slider-track")).backgroundColor
    ).toEqual("rgba(0, 0, 0, 0.25)");
  });
  it("render current while slider is vertival", () => {
    const wrapper = mount(<Slider vertical defaultValue={80} />);
    expect(
      wrapper
        .find(".wjc-slider")
        .at(0)
        .hasClass("wjc-slider-vertical")
    ).toBe(true);
    expect(
      getComputedStyle(wrapper.getDOMNode().querySelector(".wjc-slider-handler").parentElement)
        .bottom
    ).toEqual("80%");
  });
});
