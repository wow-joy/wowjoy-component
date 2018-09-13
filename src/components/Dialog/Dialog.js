import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Type1 as Btn_1, Type3 as Btn_3 } from "../Btn";
import styled from "styled-components";

const Wrap = styled.div`
  width: 560px;
  position: relative;
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  padding-bottom: 24px;
  ${props => props.defaultStyles};
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  width: 38px;
  height: 38px;
  text-align: center;
  line-height: 38px;
  color: #909090;
  cursor: pointer;
  z-index: 2;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    right: 0;
    width: 1em;
    height: 2px;
    background: currentColor;
    transform: rotate(45deg);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    right: 0;
    width: 1em;
    height: 2px;
    background: currentColor;
    transform: rotate(-45deg);
  }
`;
const HeaderDom = styled.div`
  width: 100%;
  height: 38px;
  line-height: 38px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 10px;
  position: relative;
  &::after {
    content: "";
    height: 1px;
    background: #ebebeb;
    position: absolute;
    bottom: 0;
    left: 10px;
    right: 10px;
    transform: scaleY(0.5);
    transform-origin: 50% 100%;
  }
`;
const Content = styled.section`
  padding: 24px 20px;
`;

const Btns = styled.div`
  display: block;
  text-align: center;
`;

class Dialog extends PureComponent {
  closeHandle = e => {
    const { onClose } = this.props;
    onClose(e);
  };
  clickHandle = (e, index) => {
    const { onClick } = this.props;
    if (onClick && onClick(e, index) === false) {
      return;
    }
    this.closeHandle(e);
  };
  render() {
    const {
      defaultStyles,
      className,
      header,
      headerText,
      children,
      btnsText,
      btns,
      showCloseBtn = true
    } = this.props;
    // if (!this.state.visible) {
    //   return null;
    // }
    const Header =
      header && header !== true ? header : props => <HeaderDom {...props} />;

    const Btn_default = [Btn_1, Btn_3];

    return (
      <Wrap defaultStyles={defaultStyles} className={className}>
        {showCloseBtn && (
          <CloseBtn
            className={"wjc-dialog-btn__close"}
            onClick={this.closeHandle}
          />
        )}
        {header !== false && (
          <Header className={"wjc-dialog-header"}>{headerText}</Header>
        )}

        <Content className={"wjc-dialog-content"}>{children}</Content>
        <Btns className={"wjc-dialog-btns"}>
          {(btnsText || ["提交", "取消"]).map((ele, index) => {
            const Btn = (btns && btns[index]) || Btn_default[index] || Btn_1;
            return (
              <Btn
                key={index}
                onClick={e => this.clickHandle(e, index)}
                defaultStyles={`margin: 0 5px;min-width: 130px;`}
              >
                {ele}
              </Btn>
            );
          })}
        </Btns>
      </Wrap>
    );
  }
}

Dialog.propTypes = {
  defaultStyles: PropTypes.string,
  className: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  headerText: PropTypes.string,
  children: PropTypes.node,
  btnsText: PropTypes.array,
  btns: PropTypes.array,
  onClick: PropTypes.func,
  onClose: PropTypes.func,
  showCloseBtn: PropTypes.bool
};
export default Dialog;
