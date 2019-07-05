import * as React from "react";
import Badge from "../index";
import { mount, configure } from "enzyme";
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
  it("badge is a dot", () => {
    const badge = mount(<Badge count={10} dot />);
    expect(badge.find(".wjc-badge-count").length).toBe(1);
  });
});
