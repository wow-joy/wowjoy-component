import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Wrap = styled.table`
  ${props => props.defaultStyles};
  border: 1px solid #000;
  td{
    border: 1px solid #000;
  }
`;
class Table extends PureComponent {
  render() {
    const {
      className,
      defaultStyles,
      data,
      columnRenders,
      keyStr
    } = this.props;

    return (
      <Wrap defaultStyles={defaultStyles} className={className}>
        <tbody>
          {data.map((trEle, index) => (
            <tr key={keyStr + "-" + index}>
              {columnRenders.map((tdEle, index2) =>
                tdEle(trEle, index2, keyStr + "-" + index + "-" + index2)
              )}
            </tr>
          ))}
        </tbody>
      </Wrap>
    );
  }
}

Table.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  data: PropTypes.array,
  columnRenders: PropTypes.array,
  keyStr: PropTypes.string,
};
export default Table;
