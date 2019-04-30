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
      progressDot,
      status,
      ...restProps
    } = this.props;
    const child = React.Children.map(children, (child, i) => {
      return child
        ? React.cloneElement(child, {
            ...child.props,
            direction,
            progressDot,
            labelPlacement:
              direction === "vertical"
                ? "horizontal"
                : progressDot
                ? "vertical"
                : labelPlacement,
            stepNumber: initial + i + 1,
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
        stepDirection={direction}
      >
        {child}
      </Wrap>
    );
  }
}

Steps.defaultProps = {
  initial: 0,
  current: 0,
  progressDot: false,
  direction: "horizontal",
  labelPlacement: "horizontal"
};

Steps.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  initial: PropTypes.number,
  current: PropTypes.number,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
  labelPlacement: PropTypes.oneOf(["horizontal", "vertical"]),
  progressDot: PropTypes.oneOfType([PropTypes.bool, PropTypes.func])
};

export default Steps;
