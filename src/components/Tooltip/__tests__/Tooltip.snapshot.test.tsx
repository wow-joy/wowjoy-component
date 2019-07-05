import * as React from "react";
import Tooltip, { SimpleTooltip } from "../index";
import { mount, configure } from "enzyme";
import * as adapter from "enzyme-adapter-react-16";
configure({ adapter: new (adapter as any).default() });

describe("Tooltip", () => {
  const complexTooltip = <Tooltip>Tooltip Content</Tooltip>;
  const simpleTooltip = <SimpleTooltip>Tooltip Content</SimpleTooltip>;
  it("renders correctly", () => {
    const tree1 = mount(complexTooltip).render();
    expect(tree1).toMatchSnapshot();
    const tree2 = mount(simpleTooltip).render();
    expect(tree2).toMatchSnapshot();
  });
});
