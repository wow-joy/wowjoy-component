import * as React from "react";
import Tooltip from "../index";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("Tooltip", () => {
  const reactObj = <Tooltip>Tooltip Content</Tooltip>;
  it("renders correctly", () => {
    const tree = mount(reactObj).render();
    expect(tree).toMatchSnapshot();
  });
});
