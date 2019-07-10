import * as React from "react";
import Badge from "../index";
import * as renderer from "react-test-renderer";
import * as TestUtils from "react-dom/test-utils";
import { MemoryRouter, Route } from "react-router-dom";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const { renderIntoDocument } = TestUtils;

describe("Badge", () => {
  const reactObj = <Badge count={10} dot />;
  it("renders as dot correctly", () => {
    const tree = renderer.create(reactObj).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should add defaultStyles", () => {
    const tree = renderer
      .create(
        <Badge
          count={9}
          defaultStyles={`
      border: 1px dashed red;
    `}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
