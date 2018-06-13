import React, { PureComponent } from "react";
import style from "./Dialog.scss";
import PropTypes from "prop-types";
import { Type1 as Btn_1, Type3 as Btn_3 } from "../Btn";
class Dialog extends PureComponent {
  state = {
    visible: true
  };
  closeHandle = () => {
    this.setState({ visible: false });
  };
  clickHandle = (e, index) => {
    const { onClick } = this.props;
    if (onClick && onClick(e, index) === false) {
      return;
    }
    this.closeHandle();
  };
  render() {
    const {
      className,
      header,
      headerText,
      children,
      btnsText,
      btns,
      showCloseBtn = true
    } = this.props;
    if (!this.state.visible) {
      return null;
    }
    const Header =
      header && header !== true
        ? header
        : () => <div className={style.header} />;

    const Btn_default = [Btn_1, Btn_3];

    return (
      <div className={`${style.wrap} ${className}`}>
        {showCloseBtn && (
          <div className={style.closeBtn} onClick={this.closeHandle}>
            X
          </div>
        )}
        {header !== false && <Header>{headerText}</Header>}

        <section className={style.content}>{children}</section>
        <div className={style.btns}>
          {(btnsText || ["提交", "取消"]).map((ele, index) => {
            const Btn = (btns && btns[index]) || Btn_default[index] || Btn_1;
            return (
              <Btn
                className={style.btnItem}
                key={index}
                onClick={e => this.clickHandle(e, index)}
              >
                {ele}
              </Btn>
            );
          })}
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  className: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  headerText: PropTypes.string,
  children: PropTypes.node,
  btnsText: PropTypes.array,
  btns: PropTypes.array,
  onClick: PropTypes.func,
  showCloseBtn: PropTypes.bool
};
export default Dialog;
