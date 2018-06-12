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
    if (onClick&&onClick(e, index) === false) {
      return;
    }
    this.closeHandle();
  };
  render() {
    const { className, header, children, btnText, btnEle } = this.props;
    // 检测是否为React element,并返回
    const returnReactEle = input => {
      if (input && input.$$typeof === Symbol.for("react.element")) {
        return input;
      } else {
        return false;
      }
    };

    if (!this.state.visible) {
      return null;
    }
    const Btn_default = [Btn_1, Btn_3];

    return (
      <div className={`${style.wrap} ${className}`}>
        <div className={style.closeBtn} onClick={this.closeHandle}>
          X
        </div>
        {returnReactEle(header) || <div className={style.header}>{header}</div>}
        {/* {returnReactEle(content) || <span>{content}</span>} */}
        <section className={style.content}>{children}</section>
        <div className={style.btns}>
          {(btnText || ["提交", "取消"]).map((ele, index) => {
            const Btn = btnEle && btnEle[index] || Btn_default[index] || Btn_1;
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
  header: PropTypes.node,
  children: PropTypes.node,
  btnText: PropTypes.array,
  btnEle: PropTypes.array
};
export default Dialog;
