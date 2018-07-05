import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Wrap = styled.main`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  & > header {
    height: 64px;
    line-height: 64px;
    width: 100%;
  }
  & > footer {
    height: 64px;
    line-height: 64px;
    width: 100%;
  }
  ${props => props.defaultStyles};
`;

const AsideLeft = styled.aside.attrs({
  position: "left"
})``;
const Main = styled.article``;
const AsideRight = styled.aside.attrs({
  position: "right"
})``;
class Layout extends PureComponent {
  render() {
    const {
      className,
      defaultStyles,
      header,
      asideLeft,
      main,
      asideRight,
      footer
    } = this.props;
    return (
      <Wrap defaultStyles={defaultStyles} className={className}>
        {header && <header>{header}</header>}
        {asideLeft && <AsideLeft>{asideLeft}</AsideLeft>}
        {main && <Main>{main}</Main>}
        {asideRight && <AsideRight>{asideRight}</AsideRight>}
        {footer && <footer>{footer}</footer>}
      </Wrap>
    );
  }
}

Layout.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  header: PropTypes.node,
  asideLeft: PropTypes.node,
  main: PropTypes.node,
  asideRight: PropTypes.node,
  footer: PropTypes.node
};
export default Layout;
