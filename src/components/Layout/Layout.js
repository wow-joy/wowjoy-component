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
  ${props => props.styles};
`;

const Header = styled.header`
  ${props => props.styles};
`;
const AsideLeft = styled.aside`
  ${props => props.styles};
`;
const Main = styled.article`
  ${props => props.styles};
`;
const AsideRight = styled.aside`
  ${props => props.styles};
`;
const Footer = styled.footer`
  ${props => props.styles};
`;
class Layout extends PureComponent {
  render() {
    const {
      styles,
      header,
      asideLeft,
      main,
      asideRight,
      footer
    } = this.props;
    return (
      <Wrap styles={styles}>
        {header && <Header styles={header.styles}>{header.content}</Header>}
        {asideLeft && (
          <AsideLeft styles={asideLeft.styles}>
            {asideLeft.content}
          </AsideLeft>
        )}
        {main && <Main styles={main.styles}>{main.content}</Main>}
        {asideRight && (
          <AsideRight styles={asideRight.styles}>
            {asideRight.content}
          </AsideRight>
        )}
        {footer && (
          <Footer styles={footer.styles}>{footer.content}</Footer>
        )}
      </Wrap>
    );
  }
}

Layout.propTypes = {
  styles: PropTypes.string,
  header: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  asideLeft: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  main: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  asideRight: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  footer: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
};
export default Layout;
