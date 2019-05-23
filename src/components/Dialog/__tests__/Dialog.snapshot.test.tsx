import * as React from "react";
import Dialog from "../index";
import * as renderer from "react-test-renderer";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("Dialog", () => {
  const reactObj = <Dialog>Dialog Content</Dialog>;
  it("renders correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
