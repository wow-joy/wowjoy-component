import React, { PureComponent } from "react";
import style from "./Basic.scss";
import PropTypes from 'prop-types';

class Layout extends PureComponent {
  render() {
    const { className, header, asideLeft, main, asideRight, footer } = this.props;
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
  header: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node
  }),
  asideLeft: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node
  }),
  main: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node
  }),
  asideRight: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node
  }),
  footer: PropTypes.shape({
    className: PropTypes.string,
    content: PropTypes.node
  }),
}
export default Layout;
