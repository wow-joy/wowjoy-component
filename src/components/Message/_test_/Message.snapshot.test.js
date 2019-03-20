import React from "react";
import Message from "../index.js";
import renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument } = TestUtils;

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
