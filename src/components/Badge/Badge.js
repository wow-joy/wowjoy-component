import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrap = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  line-height: 1.5;
  list-style: none;
  position: relative;
  display: inline-block;
  color: unset;
  line-height: 1;
  ${props => props.defaultStyles};
`;

const statusColor = {
  success: "#52c41a",
  error: "#f5222d",
  processing: "#1890ff",
  warning: "#faad14",
  default: "#d9d9d9"
};

const StatusDot = styled.div`
  position: relative;
  top: -1px;
  display: inline-block;
  width: 6px;
  height: 6px;
  vertical-align: middle;
  border-radius: 50%;
  background-color: ${props => statusColor[props.status || "default"]};
`;

const StatusText = styled.span`
  margin-left: 8px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
`;

const Count = styled.div`
  background-color: ${props => (props.color ? props.color : "#f5222d")};
  ${props =>
    props.dot
      ? `width: 6px;
  height: 6px;
  border-radius: 100%;`
      : `min-width: 20px;
  height: 20px;
  border-radius: 10px;
  padding: 0 6px;`}
  z-index: 10;
  color: #fff;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  white-space: nowrap;
  text-align: center;
  position: absolute;
  ${props =>
    props.offset
      ? `top:${props.offset[1]}px;right:-${props.offset[0]}px;`
      : `top: 0;right: 0;`}
  transform: translate(50%, -50%);
  transform-origin: 100% 0%;
  cursor: pointer;
`;
const BaseCount = ({ color, dot, offset, count, title, children }) => (
  <Count
    className="wjc-badge-count"
    color={color}
    dot={dot}
    offset={offset}
    count={count}
    title={title}
  >
    {children}
  </Count>
);
const StatusNode = ({ status, text }) => (
  <React.Fragment>
    <StatusDot className="badge-status-dot" status={status} />
    <StatusText className="badge-status-text">{text}</StatusText>
  </React.Fragment>
);
class Badge extends PureComponent {
  render() {
    const {
      className,
      defaultStyles,
      children,
      count,
      overflowCount,
      color,
      dot,
      offset,
      showZero,
      title,
      status,
      text
    } = this.props;
    const countNode = (showZero || count !== 0) && (
      <BaseCount {...{ color, dot, offset, count, title }}>
        {!dot && (count > overflowCount ? `${overflowCount}+` : count)}
      </BaseCount>
    );

    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={`wjc-badge ${status ? ` wjc-status` : ""} ${className ||
          ""}`}
      >
        {!status && children}
        {status ? <StatusNode status={status} text={text} /> : countNode}
      </Wrap>
    );
  }
}

Badge.defaultProps = {
  overflowCount: 99,
  dot: false,
  showZero: false
};

Badge.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  color: PropTypes.string,
  count: PropTypes.number,
  dot: PropTypes.bool,
  showZero: PropTypes.bool,
  offset: PropTypes.arrayOf(function(
    propValue,
    key,
    componentName,
    location,
    propFullName
  ) {
    if (key > 1) {
      return new Error(
        `offset should be an Array like [ number, number ], but length > 2`
      );
    }
    if (typeof propValue[key] !== "number") {
      return new Error(
        "Invalid prop `" +
          propFullName +
          "` supplied to" +
          " `" +
          componentName +
          "`. offset should be an Array like [ number, number ]."
      );
    }
  }),
  status: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string
};
export default Badge;
