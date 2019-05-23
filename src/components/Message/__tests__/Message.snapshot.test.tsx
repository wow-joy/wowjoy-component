import * as React from "react";
import Message from "../index";
import * as renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("Message", () => {
  const reactObj = <Message>Message Content</Message>;
  it("renders correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("render icon correctly", () => {
    const reactObj = <Message icon={<span className="icon">icon</span>} />;
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("render i.wjc-message-close correctly", () => {
    const reactObj = <Message onClose={() => {}} />;
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
