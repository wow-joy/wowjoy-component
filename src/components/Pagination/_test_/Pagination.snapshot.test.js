import React from "react";
import Pagination from "../index.js";
import renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Pagination", () => {
  const reactObj = (
    <Pagination pageSizeList={[10, 20, 30]} total={100} pageSize={10} />
  );
  it("renders correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
