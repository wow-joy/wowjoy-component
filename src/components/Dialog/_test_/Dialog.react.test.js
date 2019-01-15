import React from "react";
import Dialog from "../index.js";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument } = TestUtils;
describe("Dialog", () => {
  const reactObj = <Dialog>Dialog Content</Dialog>;
  it("render children correctly", () => {
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-content").textContent).toEqual(
      "Dialog Content"
    );
  });
  it("should pass class `.wjc-dialog` to the Dialog", () => {
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.className).toEqual(expect.stringMatching(/wjc-dialog/));
  });
  it("should allow pass className to the Dialog", () => {
    const reactObj = <Dialog className="class-test">Dialog Content</Dialog>;
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.className).toEqual(expect.stringMatching(/class-test/));
  });
  it("should render header", () => {
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-header")).not.toEqual(null);
  });
  it("should render content", () => {
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-content")).not.toEqual(null);
  });
  it("should render btns", () => {
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-btns")).not.toEqual(null);
  });
  it("should render btns's default textContent as `提交` & `取消` ", () => {
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(
      dom.querySelector(".wjc-dialog-btns").children[0].textContent
    ).toEqual("提交");
    expect(
      dom.querySelector(".wjc-dialog-btns").children[1].textContent
    ).toEqual("取消");
  });
  it("should render close btn", () => {
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-btn__close")).not.toEqual(null);
  });
  // header
  it("should render default header dom when `header` is empty", () => {
    const reactObj = <Dialog header={""} />;
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-header")).not.toEqual(null);
  });
  it("should render header as prop.header's return when `header` is a function", () => {
    const reactObj = <Dialog header={() => <div className="test-header" />} />;
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".test-header")).not.toEqual(null);
    expect(dom.querySelector(".wjc-dialog-header")).toEqual(null);
  });
  it("should not render header when `header` is a false", () => {
    const reactObj = <Dialog header={false} />;
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-header")).toEqual(null);
  });
  // headerText
  it("should pass headerText into header", () => {
    const reactObj = <Dialog headerText={"test content"} />;
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-header").textContent).toEqual(
      "test content"
    );
  });
  // btns
  it("should pass btns cover default btns", () => {
    const reactObj = (
      <Dialog
        btns={[
          props => <div {...props} className={"test-btn test-btn1"} />,
          props => <div {...props} className={"test-btn test-btn2"} />
        ]}
      />
    );
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelectorAll(".test-btn").length).toEqual(2);
    expect(dom.querySelector(".test-btn1")).not.toEqual(null);
    expect(dom.querySelector(".test-btn2")).not.toEqual(null);
  });
  // btnsText
  it("should cover default btns text", () => {
    const reactObj = <Dialog btnsText={["test-1", "test-2"]} />;
    const dialog = renderIntoDocument(reactObj);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(
      dom.querySelector(".wjc-dialog-btns").children[0].textContent
    ).toEqual("test-1");
    expect(
      dom.querySelector(".wjc-dialog-btns").children[1].textContent
    ).toEqual("test-2");
  });
  // onClick
  it("should has click event on btns and pass `(event,index)` as params", done => {
    let count = 0;
    const clickHandle = (event, index) => {
      expect(event.constructor.name).toEqual("SyntheticEvent");
      expect(index).toEqual(count);
      count++;
      if (count === 2) {
        reactDom.unmount();
        done();
      }
    };
    const reactDom = mount(
      <Dialog onClick={clickHandle}>Dialog Content</Dialog>
    );
    reactDom
      .find(".wjc-dialog-btns")
      .hostNodes()
      .childAt(0)
      .simulate("click");
    reactDom
      .find(".wjc-dialog-btns")
      .hostNodes()
      .childAt(1)
      .simulate("click");
  });
  // onClose
  it("should trigger close event on click closeBtn and pass `event` as params", done => {
    const closeHandle = event => {
      expect(event.constructor.name).toEqual("SyntheticEvent");
      reactDom.unmount();
      done();
    };
    const reactDom = mount(
      <Dialog onClose={closeHandle}>Dialog Content</Dialog>
    );
    reactDom
      .find(".wjc-dialog-btn__close")
      .hostNodes()
      .simulate("click");
  });
  it("should trigger close event after click event ", done => {
    const closeHandle = event => {
      expect(event.constructor.name).toEqual("SyntheticEvent");
      reactDom.unmount();
      done();
    };
    const reactDom = mount(
      <Dialog onClose={closeHandle} onClick={() => {}}>
        Dialog Content
      </Dialog>
    );
    reactDom
      .find(".wjc-dialog-btns")
      .hostNodes()
      .childAt(0)
      .simulate("click");
  });
  it("should not trigger close event after click event when click event return false", done => {
    let closeTriggered = false;
    const closeHandle = () => {
      closeTriggered = true;
    };
    const clickHandle = () => {
      setTimeout(() => {
        expect(closeTriggered).toEqual(false);
        reactDom.unmount();
        done();
      });
      return false;
    };
    const reactDom = mount(
      <Dialog onClose={closeHandle} onClick={clickHandle}>
        Dialog Content
      </Dialog>
    );
    reactDom
      .find(".wjc-dialog-btns")
      .hostNodes()
      .childAt(0)
      .simulate("click");
  });
  // showCloseBtn
  it("should not render close btn when showCloseBtn is false", () => {
    const dialog = renderIntoDocument(<Dialog showCloseBtn={false} />);
    const dom = ReactDOM.findDOMNode(dialog);
    expect(dom.querySelector(".wjc-dialog-btn__close")).toEqual(null);
  });
});
