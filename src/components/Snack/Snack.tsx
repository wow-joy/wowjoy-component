import * as React from "react";
import styled, { keyframes } from "styled-components";
import { CheckCircle, CloseCircle, InfoCircle, WarningCircle } from "../Icon";
import { tuple } from "../_util/type";

const Types = tuple("success", "error", "info", "warning");

export type SnackType = (typeof Types)[number];

const TypeIcons = {
  success: {
    icon: CheckCircle,
    color: "#3ac9a8"
  },
  error: {
    icon: CloseCircle,
    color: "#f36969"
  },
  info: {
    icon: InfoCircle,
    color: "#45a8e6"
  },
  warning: {
    icon: WarningCircle,
    color: "#ff9b54"
  }
};

interface Props {
  msg: string;
  type: SnackType;
  duration?: number;
  onClose?: () => void;
  [key: string]: any;
}

const fadeIn = keyframes`
  from{
    transform: translateY(-10px);
    opacity: 0;
  }
  to{
    transform: translateY(0px);
    opacity: 1;
  }
`;
const fadeOut = keyframes`
  from{
    transform: translateY(0px);
    opacity: 1;
  }
  to{
    transform: translateY(-10px);
    opacity: 0;
  }
`;
const Wrap = styled.div<{ visible: boolean; type: SnackType }>`
  background: ${props => TypeIcons[props.type].color};
  padding: 10px 20px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  animation: ${props => (props.visible ? fadeIn : fadeOut)} 1s ease;
`;

class Snack extends React.Component<Props> {
  state = {
    visible: true
  };
  componentDidMount() {
    const { duration } = this.props;
    duration > 0 &&
      setTimeout(() => {
        this.setState({ visible: false });
      }, duration);
  }
  handleAnimationEnd = () => {
    !this.state.visible && this.props.onClose();
  };
  render() {
    const { msg, type } = this.props;
    const { visible } = this.state;
    const Icon = TypeIcons[type].icon;
    return (
      <Wrap
        type={type}
        onAnimationEnd={this.handleAnimationEnd}
        visible={visible}
      >
        <Icon style={{ color: "#fff", marginRight: 10 }} />
        <span>{msg}</span>
      </Wrap>
    );
  }
}
export default Snack;
