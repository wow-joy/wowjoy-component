import * as React from "react";
import { Pagination } from "@src";
class Demo extends React.PureComponent {
  render() {
    return (
      <div>
        <Pagination pageSize={10} total={300} pageSizeList={[10, 20, 30]} />
      </div>
    );
  }
}

export default Demo;
