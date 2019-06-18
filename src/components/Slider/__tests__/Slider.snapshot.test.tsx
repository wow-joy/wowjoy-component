import * as React from "react";
import Slider from "..";
import { mount, configure } from "enzyme";
import * as adapter from "enzyme-adapter-react-16";
configure({ adapter: new (adapter as any).default() });

describe("Slider", () => {
  const reactObj = (
    <Slider
      min={20}
      max={100}
      step={5}
      defaultValue={[10, 30, 60]}
      marks={{ 33: "33°C", 44: "44°C", 66: "66°C" }}
      tipFormatter={(v: number) => `${v}%`}
    />
  );
  it("renders correctly", () => {
    const tree = mount(reactObj).render();
    expect(tree).toMatchSnapshot();
  });
});
