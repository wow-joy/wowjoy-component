import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrap = styled.div`
  ${props => props.defaultStyles};
  display: flex;
  ${props =>
    props.stepDirection === "horizontal"
      ? "flex-direction: row"
      : props.stepDirection === "vertical" && "flex-direction: column"};
  ${props => props.labelPlacement === "upAndDown" && `padding: 22px 0px`}
`;

class Steps extends PureComponent {
  getStatus(current, i) {
    let status;
    switch (true) {
      case i - current < 0:
        status = "finish";
        break;
      case i - current === 0:
        status = "process";
        break;
      case i - current > 0:
        status = "wait";
        break;
      default:
        break;
    }

    return status;
  }

  render() {
    const {
      className,
      defaultStyles,
      children,
      direction,
      labelPlacement,
      initial,
      current,
      type,
      status,
      size,
      ...restProps
    } = this.props;
    const child = React.Children.map(children, (child, i) => {
      return child
        ? React.cloneElement(child, {
            ...child.props,
            type,
            size,
            direction,
            labelPlacement:
              direction === "vertical"
                ? "horizontal"
                : type === "dot"
                ? "vertical"
                : labelPlacement,
            stepNumber: initial + i + 1,
            current: current === i,
            status:
              child.props.status ||
              (status && current === i ? status : this.getStatus(current, i)),
            nextStatus:
              (children[i + 1] && children[i + 1].props.status) ||
              this.getStatus(current, i + 1)
          })
        : child;
    });

    return (
      <Wrap
        {...restProps}
        defaultStyles={defaultStyles}
        className={`wjc-steps ${className || ""}`}
        stepDirection={type === "arrow" ? "horizontal" : direction}
        labelPlacement={labelPlacement}
      >
        {child}
      </Wrap>
    );
  }
}

Steps.defaultProps = {
  initial: 0,
  current: 0,
  size: 24,
  type: "basic",
  direction: "horizontal",
  labelPlacement: "horizontal"
};

Steps.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  size: PropTypes.number,
  type: PropTypes.oneOf(["basic", "dot", "arrow"]),
  initial: PropTypes.number,
  current: PropTypes.number,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  labelPlacement: PropTypes.oneOf(["horizontal", "vertical", "upAndDown"]),
  progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

export default Steps;
