import * as React from "react";
import Tooltip from "../index";
import { mount, configure } from "enzyme";
import * as adapter from "enzyme-adapter-react-16";
configure({ adapter: new (adapter as any).default() });

describe("Tooltip", () => {
  const reactObj = <Tooltip>Tooltip Content</Tooltip>;
  it("renders correctly", () => {
    const tree = mount(reactObj).render();
    expect(tree).toMatchSnapshot();
  });
});
