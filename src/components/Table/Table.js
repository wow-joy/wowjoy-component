import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Wrap = styled.table`
  ${props => props.defaultStyles};
`;
class Table extends PureComponent {
  get viewData() {
    const { data, page, pageSize } = this.props;
    if (!page && !pageSize) {
      return data;
    }
    return data.slice(page * pageSize, page * pageSize + pageSize);
  }
  onRowClick = (rowEle, rowIndex) => () => {
    const { onRowClick } = this.props;
    onRowClick && onRowClick(rowEle, rowIndex);
  };
  render() {
    let { className, defaultStyles, columns, onRowClick } = this.props;
    return (
      <Wrap defaultStyles={defaultStyles} className={className}>
        <thead>
          <tr>{columns.map(ele => <th key={ele.id}>{ele.title}</th>)}</tr>
        </thead>
        <tbody>
          {this.viewData.map((rowEle, rowIndex) => (
            <tr key={rowEle.id} onClick={this.onRowClick(rowEle, rowIndex)}>
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
  pageSize: PropTypes.number,
  onRowClick: PropTypes.func
};
export default Table;
