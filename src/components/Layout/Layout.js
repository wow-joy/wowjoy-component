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

const AsideLeft = styled.aside``;
const Main = styled.main``;
const Center = styled.article``;
const AsideRight = styled.aside``;
class Layout extends PureComponent {
  render() {
    const {
      className,
      defaultStyles,
      header,
      asideLeft,
      center,
      asideRight,
      footer
    } = this.props;
    return (
      <Wrap defaultStyles={defaultStyles} className={className}>
        {header && <header>{header}</header>}
        <Main>
          {asideLeft && (
            <AsideLeft className={"wj-aside__left"}>{asideLeft}</AsideLeft>
          )}
          {center && <Center>{center}</Center>}
          {asideRight && (
            <AsideRight className={"wj-aside__right"}>{asideRight}</AsideRight>
          )}
        </Main>
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
  center: PropTypes.node,
  asideRight: PropTypes.node,
  footer: PropTypes.node
};
export default Layout;
