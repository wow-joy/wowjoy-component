import React, { PureComponent } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const statusStyles = {
  finish: { color: "#1890ff", borderColor: "#1890ff", backgroundColor: "#fff" },
  process: {
    color: "#fff",
    borderColor: "#1890ff",
    backgroundColor: "#1890ff"
  },
  wait: {
    color: "rgba(0, 0, 0, 0.25)",
    borderColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fff"
  },
  error: { color: "#f5222d", borderColor: "#f5222d", backgroundColor: "#fff" }
};
const Title = styled.div``;
const Description = styled.div``;
const Icon = styled.div`
  width: 32px;
  height: 32px;
  margin-right: 8px;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  border-radius: 32px;
  transition: background-color 0.3s, border-color 0.3s;
  border: 1px solid #1890ff;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Content = styled.div`
  ${props => props.stepDirection === "horizontal" && `min-height: 48px;`}
  ${Title} {
    ${props => props.isError && `color:#f5222d;`}
  }
  ${Description} {
    ${props => props.isError && `color:#f5222d;`}
  }
`;
const ProgressDot = styled.div`
  display: block;
  width: 8px;
  height: 8px;
  background-color: #1890ff;
  border-radius: 4px;
`;
const Wrap = styled.div`
  ${props => props.defaultStyles};
  position: relative;
  display: inline-block;
  flex: 1;
  display: flex;
  border-radius: 1px;
  flex-direction: ${props =>
    props.labelPlacement === "vertical" ? "column" : "row"};
  overflow: ${props =>
    props.stepDirection === "horizontal" && props.labelPlacement === "vertical"
      ? "visible"
      : "hidden"};
  margin-right: 16px;
  &:last-child {
    flex: none;
    margin-right: 0px;
  }
  ${Icon} {
    ${props => props.status && statusStyles[props.status]}
    ${props =>
      props.stepDirection === "horizontal" &&
      props.labelPlacement === "vertical" &&
      `margin-left: 36px;`}
    ${props =>
      props.progressDot &&
      `border:none;background-color:transparent;color:unset;`}
  }
  ${Content} {
    display: flex;
    flex-direction: column;
    ${props =>
      props.stepDirection === "horizontal" &&
      props.labelPlacement === "vertical" &&
      `display: block;
      width: 104px;
      margin-top: 8px;
      text-align: center;`}
      ${props => props.stepDirection === "vertical" && `min-height: 48px;`}
    ${Title} {
      position: relative;
      font-size: 16px;
      line-height: 32px;
      padding-right: ${props =>
        props.stepDirection === "horizontal" &&
        props.labelPlacement === "vertical"
          ? `0px`
          : "16px"};
      width: ${props =>
        props.stepDirection === "horizontal" &&
        props.labelPlacement === "vertical"
          ? `auto`
          : "min-content"};
    }
    ${Description} {
      color: rgba(0, 0, 0, 0.45);
      max-width: 140px;
      ${props => props.stepDirection === "vertical" && `padding-bottom: 10px;`}
    }
  }
  &:not(:last-child) {
    ${props =>
      props.stepDirection === "vertical" &&
      `&::before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 15px;
        background-color: #1890ff;
        background-clip: content-box;
        padding: 36px 0 4px 0;
        background-color: ${
          props.nextStatus
            ? statusStyles[props.nextStatus].borderColor
            : "#e8e8e8"
        };
      }`}
    ${props =>
      props.stepDirection === "horizontal" &&
      props.labelPlacement === "vertical" &&
      `&::before{
        content: '';
        display: inline-block;
        width: 100%;
        height: 1px;
        border-radius: 1px;
        top: 16px;
        position: absolute;
        margin-left: ${props.progressDot ? "68px" : "84px"};
        padding-right: ${props.progressDot ? "18px" : "48px"};
        background-clip: content-box;
        background-color: ${
          props.nextStatus
            ? statusStyles[props.nextStatus].borderColor
            : "#e8e8e8"
        };
      }`}
    ${Title} {
      ${props =>
        props.stepDirection === "horizontal" &&
        props.labelPlacement === "horizontal" &&
        `&::after {
          content: '';
          position: absolute;
          top: 16px;
          left: 100%;
          display: block;
          width: 9999px;
          height: 1px;
          background-color: ${
            props.nextStatus
              ? statusStyles[props.nextStatus].borderColor
              : "#e8e8e8"
          };
        }`}
    }
  }
`;

class Step extends PureComponent {
  render() {
    const {
      className,
      defaultStyles,
      title,
      description,
      stepNumber,
      icon,
      status,
      nextStatus,
      direction,
      labelPlacement,
      progressDot,
      ...restProps
    } = this.props;
    const CurrentIcon =
      status === "process" || status === "wait"
        ? stepNumber
        : require(`@media/steps_${status}.svg`).ReactComponent;
    const iconNode =
      typeof CurrentIcon === "number" ? (
        CurrentIcon
      ) : (
        <CurrentIcon
          fill={
            statusStyles[status] ? statusStyles[status].color : "currentColor"
          }
        />
      );
    const DotNode =
      typeof progressDot === "function" ? (
        progressDot(<ProgressDot className="wjc-steps-progressDot" />, {
          index: stepNumber,
          status,
          title,
          description
        })
      ) : (
        <ProgressDot />
      );
    return (
      <Wrap
        {...restProps}
        defaultStyles={defaultStyles}
        className={`wjc-steps-item ${className || ""}`}
        stepDirection={direction}
        status={status}
        nextStatus={nextStatus}
        labelPlacement={labelPlacement}
        progressDot={progressDot}
      >
        <Icon className="wjc-steps-icon">
          {icon || (progressDot ? DotNode : iconNode)}
        </Icon>
        <Content className="wjc-steps-content" isError={status === "error"}>
          <Title className="wjc-steps-title">{title}</Title>
          {description && (
            <Description className="wjc-steps-description">
              {description}
            </Description>
          )}
        </Content>
      </Wrap>
    );
  }
}

Step.propTypes = {
  stepNumber: PropTypes.number,
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  status: PropTypes.oneOf(["finish", "process", "wait", "error"]),
  nextStatus: PropTypes.oneOf(["finish", "process", "wait", "error"]),
  description: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
};
export default Step;
