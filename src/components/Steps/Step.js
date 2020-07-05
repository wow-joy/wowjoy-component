import React, { PureComponent } from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import Arrow from "./Arrow";

const THEME = {
  default: "#06AEA6",
};

const statusStyles = {
  finish: {
    color: THEME.default,
    borderColor: THEME.default,
    backgroundColor: "#fff",
  },
  process: {
    color: "#fff",
    borderColor: THEME.default,
    backgroundColor: THEME.default,
  },
  wait: {
    color: "rgba(0, 0, 0, 0.25)",
    borderColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: "#fff",
  },
  error: { color: "#f5222d", borderColor: "#f5222d", backgroundColor: "#fff" },
};
const Title = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  white-space: nowrap;
  justify-content: center;
  > span {
    font-family: "STHeitiSC-Light";
    font-size: 14px;
    color: #303233;
    letter-spacing: 0.7px;
    line-height: 14px;
  }
`;
const Description = styled.div`
  font-family: "STHeitiSC-Light";
  font-size: 12px;
  color: #9b9b9b;
  letter-spacing: 0.6px;
  line-height: 14px;
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.45);
  max-width: 177px;
  display: flex;
  justify-content: center;
`;
const Icon = styled.div`
  margin-right: 8px;
  text-align: center;
  transition: background-color 0.3s, border-color 0.3s;
  border: 1px solid #1890ff;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: "HelveticaNeueDeskInterface-Regular";
  font-size: 10px;
  letter-spacing: 0;
  line-height: 14px;
`;
const Content = styled.div`
  ${(props) => props.stepDirection === "horizontal" && `min-height: 48px;`}
  ${Title} {
    ${(props) => props.isError && `color:#f5222d;`}
  }
  ${Description} {
    ${(props) => props.isError && `color:#f5222d;`}
  }
`;
const ProgressDot = styled.div`
  display: block;
  width: 10px;
  height: 10px;
  background-color: #1890ff;
  border-radius: 5px;
`;
const Wrap = styled.div`
  ${(props) => props.defaultStyles};
  position: relative;
  display: inline-block;
  flex: 1;
  display: flex;
  border-radius: 1px;
  flex-direction: ${(props) => (props.isContentVertical ? "column" : "row")};
  overflow: ${(props) =>
    (props.stepDirection === "vertical" && props.stepType === "dot") ||
    (props.stepDirection === "horizontal" && props.isContentVertical)
      ? "visible"
      : "hidden"};
  margin-right: 9px;
  &:last-child {
    ${(props) =>
      props.stepType !== "arrow" &&
      ` flex: none;
      margin-right: 0px;`}
  }
  ${Icon} {
    width: ${(props) => props.themeSize}px;
    height: ${(props) => props.themeSize}px;
    line-height: ${(props) => props.themeSize}px;
    border-radius: ${(props) => props.themeSize}px;
    ${(props) => props.status && statusStyles[props.status]}
    ${(props) =>
      props.stepDirection === "horizontal" &&
      props.isContentVertical &&
      `margin-left: 18px;`}
    ${(props) =>
      props.stepType === "dot" &&
      `border:none;background-color:transparent;color:unset;`}
  }
  ${Content} {
    display: flex;
    flex-direction: column;
    ${(props) =>
      props.labelPlacement === "upAndDown" &&
      `position: absolute;
      height: 68px;
      top: -34px;
      justify-content: space-between;`}
    ${(props) =>
      props.stepDirection === "horizontal" &&
      props.isContentVertical &&
      `width: ${props.themeSize + 36}px;
      margin-top: ${props.stepType === "dot" ? "5px" : "8px"};
      text-align: center;`}
      ${(props) => props.stepDirection === "vertical" && `min-height: 48px;`}
    ${Title} {
      height: ${(props) => props.themeSize}px;
      ${(props) =>
        props.stepDirection === "horizontal" && props.isContentVertical
          ? `padding-right: 0px;
          width: auto;
          display: flex;
          justify-content: center;
          font-family: "STHeitiSC-Light";
          font-size: 12px;
          color: #999999;
          letter-spacing: 0.6px;
          line-height: 14px;`
          : `padding-right: 9px;
          width: min-content;`}
    }
    ${Description} {
      ${(props) =>
        props.stepDirection === "vertical" && `padding-bottom: 10px;`}
      ${(props) =>
        props.stepDirection === "horizontal" &&
        props.isContentVertical &&
        `font-family: STHeitiSC-Light;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0.6px;
        line-height: 14px;`}
    }
  }
  &:not(:last-child) {
    ${(props) =>
      props.stepType !== "arrow" &&
      props.stepDirection === "vertical" &&
      `&::before {
        content: '';
        display: inline-block;
        width: 1px;
        height: 100%;
        position: absolute;
        top: 0;
        left: ${
          props.stepType === "dot"
            ? `${props.themeSize / 2 - 1}px`
            : `${props.themeSize / 2}px`
        };
        background-color: #1890ff;
        background-clip: content-box;
        ${
          props.stepType === "dot"
            ? `padding: ${props.themeSize / 2 + 12}px 0 0px 0;
                margin-top: 3px;`
            : `padding: ${props.themeSize + 10}px 0 10px 0;`
        }
        background-color: ${
          props.nextStatus
            ? statusStyles[props.nextStatus].borderColor
            : "#e8e8e8"
        };
      }`}
    ${(props) =>
      props.stepType !== "arrow" &&
      props.stepDirection === "horizontal" &&
      props.isContentVertical &&
      `&::before{
        content: '';
        display: inline-block;
        width: 100%;
        height: 1px;
        border-radius: 1px;
        top: ${props.themeSize / 2}px;
        position: absolute;
        margin-left: ${
          props.stepType === "dot"
            ? `${props.themeSize / 2 + 29}px`
            : `${props.themeSize + 28}px`
        };
        padding-right: ${
          props.stepType === "dot" ? "16px" : `${props.themeSize + 11}px`
        };
        background-clip: content-box;
        background-color: ${
          props.nextStatus
            ? statusStyles[props.nextStatus].borderColor
            : "#e8e8e8"
        };
      }`}
    ${Title} {
      ${(props) =>
        props.stepType !== "arrow" &&
        props.stepDirection === "horizontal" &&
        !props.isContentVertical &&
        `&::after {
          content: '';
          position: absolute;
          top: ${props.themeSize / 2}px;
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
  wrapIconProps = (icon) => {
    const { stepNumber, title, status, description } = this.props;
    return typeof icon === "function"
      ? icon(this.currentIcon, {
          index: stepNumber,
          status,
          title,
          description,
        })
      : icon;
  };

  get currentIcon() {
    const { type, status, stepNumber } = this.props;
    const StatusIcon =
      status === "process" || status === "wait"
        ? stepNumber
        : require(`../Icon/Step${status[0].toUpperCase() + status.substr(1)}`)
            .default;
    const currentIcon =
      typeof StatusIcon === "number" ? (
        StatusIcon
      ) : (
        <StatusIcon
          fill={
            statusStyles[status] ? statusStyles[status].color : "currentColor"
          }
        />
      );
    return type === "dot" ? (
      <ProgressDot className="wjc-steps-progressDot" />
    ) : (
      currentIcon
    );
  }

  render() {
    const {
      className,
      defaultStyles,
      type,
      title,
      description,
      stepNumber,
      defaultIcon,
      icon,
      status,
      nextStatus,
      direction,
      labelPlacement,
      color,
      current,
      size,
      ...restProps
    } = this.props;

    return type === "arrow" ? (
      <Arrow
        {...{ defaultStyles, className, description, color, current, status }}
      />
    ) : (
      <Wrap
        {...restProps}
        defaultStyles={defaultStyles}
        className={`wjc-steps-item wjc-steps-${status} ${className || ""}`}
        stepDirection={direction}
        status={status}
        nextStatus={nextStatus}
        labelPlacement={labelPlacement}
        isContentVertical={
          labelPlacement === "upAndDown" || labelPlacement === "vertical"
        }
        stepType={type}
        themeSize={size}
      >
        <Icon className="wjc-steps-icon">
          {icon
            ? this.wrapIconProps(icon)
            : this.wrapIconProps(defaultIcon) || this.currentIcon}
        </Icon>
        <Content className="wjc-steps-content" isError={status === "error"}>
          <Title className="wjc-steps-title">
            <span>{title}</span>
          </Title>
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
  type: PropTypes.oneOf(["basic", "dot", "arrow"]),
  stepNumber: PropTypes.number,
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  status: PropTypes.oneOf(["finish", "process", "wait", "error"]),
  nextStatus: PropTypes.oneOf(["finish", "process", "wait", "error"]),
  description: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.func]),
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};
export default Step;
