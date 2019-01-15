import React from "react";
import Btn from "../Btn.js";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument, Simulate } = TestUtils;
describe("Btn", () => {
  const reactObj = <Btn>Btn Content</Btn>;
  it("render children correctly", () => {
    const btn = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(btn);
    expect(dom.textContent).toEqual("Btn Content");
  });
  it("should pass class `.wjc-btn` to the Btn", () => {
    const btn = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(btn);
    expect(dom.className).toEqual(expect.stringMatching(/wjc-btn/));
  });
  it("should allow pass className to the Btn", () => {
    const reactObj = <Btn className="class-test">Btn Content</Btn>;
    const btn = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(btn);
    expect(dom.className).toEqual(expect.stringMatching(/class-test/));
  });
  it("should has click event and pass `event` as params", done => {
    const clickHandle = event => {
      expect(event.constructor.name).toEqual("SyntheticEvent");
      reactDom.unmount();
      done();
    };
    const reactDom = mount(<Btn onClick={clickHandle}>Btn Content</Btn>);
    reactDom.simulate("click");
  });
});
