import * as React from "react";
import Pagination from "../index";
import * as renderer from "react-test-renderer";
import * as ReactDOM from "react-dom";
import * as TestUtils from "react-dom/test-utils";
import { mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
const adapter = ReactSixteenAdapter as any;
configure({ adapter: new adapter.default() });

const { renderIntoDocument } = TestUtils;
const getReactObj = (props?: object) => (
  <Pagination
    pageSizeList={[10, 20, 30]}
    total={100}
    pageSize={10}
    {...props}
  />
);
describe("Pagination", () => {
  it("should pass class `.wjc-pagination` to the Pagination", () => {
    const reactObj = getReactObj();
    const pagination = mount(reactObj);
    const dom = pagination.getDOMNode();
    expect(dom.className).toEqual(expect.stringMatching(/wjc-pagination/));
  });
  it("should allow pass className to the Pagination", () => {
    const reactObj = getReactObj({ className: "class-test" });
    const pagination = mount(reactObj);
    const dom = pagination.getDOMNode();
    expect(dom.className).toEqual(expect.stringMatching(/class-test/));
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
