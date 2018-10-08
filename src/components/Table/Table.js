import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Wrap = styled.table`
  ${props => props.defaultStyles};
`;
class Table extends PureComponent {
  sliceData = data => {
    const { page, pageSize } = this.props;
    if (!page && !pageSize) {
      return data;
    }
    return data.slice(page * pageSize, page * pageSize + pageSize);
  };
  render() {
    let {
      className,
      defaultStyles,
      data,
      columns,
    } = this.props;
    return (
      <Wrap defaultStyles={defaultStyles} className={className}>
        <thead>
          <tr>{columns.map(ele => <th key={ele.id}>{ele.title}</th>)}</tr>
        </thead>
        <tbody>
          {this.sliceData(data).map((rowEle, rowIndex) => (
            <tr key={rowEle.id}>
              {columns.map(colEle => (
                <td key={rowEle.id + colEle.id}>
                  {colEle.render(rowEle, rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Wrap>
    );
  }
}
//TODO: 筛选。排序。固定。复杂表头
Table.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  page: PropTypes.number,
  pageSize: PropTypes.number
};
export default Table;
