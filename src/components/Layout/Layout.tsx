import * as React from "react";
import styled from "styled-components";
const Wrap = styled.div`
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
  ${(props: { defaultStyles?: string }) => props.defaultStyles};
`;

const AsideLeft = styled.aside``;
const Main = styled.main``;
const Center = styled.article``;
const AsideRight = styled.aside``;

export interface Props {
  className?: string;
  defaultStyles?: string;
  header?: React.ReactNode;
  asideLeft?: React.ReactNode;
  children?: React.ReactNode;
  asideRight?: React.ReactNode;
  footer?: React.ReactNode;
}
class Layout extends React.PureComponent<Props, {}> {
  render() {
    const {
      className,
      defaultStyles,
      header,
      asideLeft,
      children,
      asideRight,
      footer
    } = this.props;
    return (
      <Wrap
        defaultStyles={defaultStyles}
        className={"wjc-layout " + className || ""}
      >
        {header && <header className={"wjc-layout-header"}>{header}</header>}
        <Main>
          {asideLeft && (
            <AsideLeft className={"wjc-layout-aside__left"}>
              {asideLeft}
            </AsideLeft>
          )}
          {children && (
            <Center className={"wjc-layout-center"}>{children}</Center>
          )}
          {asideRight && (
            <AsideRight className={"wjc-layout-aside__right"}>
              {asideRight}
            </AsideRight>
          )}
        </Main>
        {footer && <footer className={"wjc-layout-footer"}>{footer}</footer>}
      </Wrap>
    );
  }
}

export default Layout;
