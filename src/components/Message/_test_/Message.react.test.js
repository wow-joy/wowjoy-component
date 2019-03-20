import React from "react";
import Message from "../index.js";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument } = TestUtils;
describe("Message", () => {
  const reactObj = <Message>Message Content</Message>;
  it("render children correctly", () => {
    const message = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(message);
    expect(dom.textContent).toEqual("Message Content");
  });
  it("should pass class `.wjc-message` to the Message", () => {
    const message = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(message);
    expect(dom.className).toEqual(expect.stringMatching(/wjc-message/));
  });
  it("should allow pass className to the Message", () => {
    const reactObj = <Message className="class-test">Message Content</Message>;
    const message = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(message);
    expect(dom.className).toEqual(expect.stringMatching(/class-test/));
  });
  it("render icon correctly", () => {
    const reactObj = <Message icon={<span className="icon">icon</span>} />;
    const message = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(message);
    expect(dom.querySelector("span.icon").textContent).toEqual("icon");
  });
  it("should render i.wjc-message-close when onClose is a function", () => {
    const reactObj = <Message onClose={() => {}} />;
    const message = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(message);
    expect(dom.querySelector("i.wjc-message-close")).not.toEqual(null);
  });
  it("should render run onClose handle when i.wjc-message-close was clicked", done => {
    const clickHandle = event => {
      expect(event.constructor.name).toEqual("SyntheticEvent");
      reactDom.unmount();
      done();
    };
    const reactObj = <Message onClose={clickHandle} />;
    const reactDom = mount(reactObj);
    reactDom.find("i.wjc-message-close").simulate("click");
  });
});
