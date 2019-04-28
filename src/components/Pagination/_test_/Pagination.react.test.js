import React from "react";
import Pagination from "../index.js";
import renderer from "react-test-renderer";
import ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

const { renderIntoDocument, scryRenderedDOMComponentsWithClass } = TestUtils;
describe("Pagination", () => {
  const getReactObj = props => (
    <Pagination
      pageSizeList={[10, 20, 30]}
      total={100}
      pageSize={10}
      {...props}
    />
  );

  it("should pass class `.wjc-pagination` to the Pagination", () => {
    const reactObj = getReactObj();
    const pagination = renderIntoDocument(reactObj);
    scryRenderedDOMComponentsWithClass(pagination, "wjc-pagination");
  });
  it("should allow pass className to the Pagination", () => {
    const reactObj = getReactObj({ className: "class-test" });
    const pagination = renderIntoDocument(reactObj);
    scryRenderedDOMComponentsWithClass(pagination, "class-test");
  });

  // it("should render component as `props.viewAble`'s config", () => {
  //   const components = [
  //     "prevNext",
  //     "pageList",
  //     "total",
  //     "pageSizeSelect",
  //     "jumpTo",
  //     "submit"
  //   ];
  //   components.forEach((ele, index) => {
  //     const viewAbleComponents = components.filter(
  //       component => component !== ele
  //     );
  //     const reactObj = getReactObj({
  //       viewAble: viewAbleComponents
  //     });
  //     const pagination = renderIntoDocument(reactObj);
  //     const dom = ReactDOM.findDOMNode(pagination);
  //     viewAbleComponents.forEach(viewAbleComponent=>{
  //       expect(dom.querySelector());
  //     })
  //   });
  // });
});
