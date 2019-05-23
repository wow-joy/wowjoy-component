import * as React from "react";
import Pagination from "../index";
import * as renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

describe("Pagination", () => {
  const reactObj = (
    <Pagination pageSizeList={[10, 20, 30]} total={100} pageSize={10} />
  );
  it("renders correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
