import React, { PureComponent } from "react";
import style from "./Basic.scss";
import PropTypes from "prop-types";

class Layout extends PureComponent {
  render() {
    const {
      className,
      header,
      asideLeft,
      main,
      asideRight,
      footer
    } = this.props;
    return (
      <main className={`${style.wrap} ${className}`}>
        {header && (
          <header className={header.className}>{header.content}</header>
        )}
        {asideLeft && (
          <aside className={asideLeft.className}>{asideLeft.content}</aside>
        )}
        {main && <article className={main.className}>{main.content}</article>}
        {asideRight && (
          <aside className={asideRight.className}>{asideRight.content}</aside>
        )}
        {footer && (
          <footer className={footer.className}>{footer.content}</footer>
        )}
      </main>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string,
  header: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  asideLeft: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  main: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  asideRight: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
};
export default Layout;
