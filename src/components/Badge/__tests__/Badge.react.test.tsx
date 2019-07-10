import * as React from "react";
import Badge from "../index";
import { mount, configure } from "enzyme";
import * as renderer from "react-test-renderer";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("Badge", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("over 99 show 99+", () => {
    const badge = mount(<Badge count={100} />);
    const dom = badge.getDOMNode();
    expect(dom.querySelector(".wjc-badge-count").innerHTML).toBe("99+");
  });

  it("badge is a dot", () => {
    const badge = mount(<Badge count={10} dot />);
    const dom = badge.getDOMNode();
    expect(dom.querySelector(".wjc-badge-count").innerHTML).toBe("");
  });

  it("badge not show when count == 0", () => {
    const badge = mount(<Badge count={0} />);
    expect(badge.find(".wjc-badge-count")).toHaveLength(0);
  });

  it("should have an overriden title attribute", () => {
    const badge = mount(<Badge count={10} title="Number 10" />);
    expect(
      badge
        .find(".wjc-badge-count")
        .at(2)
        .getDOMNode()
        .attributes.getNamedItem("title").value
    ).toEqual("Number 10");
  });
});
