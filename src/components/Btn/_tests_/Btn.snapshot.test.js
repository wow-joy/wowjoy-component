import React from "react";
import Btn from "../Btn.js";
import renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument } = TestUtils;

describe("Btn", () => {
  const reactObj = <Btn>Btn Content</Btn>;
  it("renders correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
  it("should not use `to` outside a `Router`", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    const reactObj = <Btn to="https://wow-joy.github.io">this is a link</Btn>;
    expect(()=>mount(reactObj)).toThrow(
      /.*/
    );
  });
  it("should render link when `to` has a value not equal false", () => {
    const reactDom = mount(
      <MemoryRouter>
        <Route pathname="/">
          <Btn to="https://wow-joy.github.io">this is a link</Btn>
        </Route>
      </MemoryRouter>
    );
    expect(reactDom.render()).toMatchSnapshot();
  });
  it("should not render as link when `to` equal false", () => {
    const reactObj = renderer.create(<Btn to={false}>this is not a link</Btn>);
    expect(reactObj.toJSON()).toMatchSnapshot();
  });
});
