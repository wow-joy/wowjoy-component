import * as React from "react";
import styled from "styled-components";

interface WrapProps {
  defaultStyles?: string;
}

const Wrap = styled.div<WrapProps>`
  overflow: hidden;
  ${p => p.defaultStyles}
`;

interface ContentProps {
  showOuterBorder?: boolean;
}
const Content = styled.div<ContentProps>`
  display: inline-block;
  width: 100%;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    cursor: pointer;
    background: #fff;
    overflow: hidden;
    &:vertical {
      width: 12px;
      box-shadow: -1px 0 0px #dcdcdc;
      ${p =>
        p.showOuterBorder && `box-shadow: -1px 0 0px #dcdcdc,1px 0 0px #dcdcdc`}
    }
    &:horizontal {
      height: 12px;
      box-shadow: 0 -1px 0px #dcdcdc;
      ${p =>
        p.showOuterBorder && `box-shadow: 0 -1px 0px #dcdcdc,0 1px 0px #dcdcdc`}
    }
  }
  &::-webkit-scrollbar-corner {
    ${p =>
      p.showOuterBorder && `box-shadow: 0 1px 0px #dcdcdc,1px 0 0px #dcdcdc`}
  }

  &::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 612px;
    border: 3px solid #fff;
    &:vertical {
      border-left: 3px solid #fff;
      border-right: 3px solid #fff;
    }
    &:vertical:hover {
      border-left: 0px solid #fff;
      border-right: 0px solid #fff;
      border-top: 3px solid #fff;
      border-bottom: 3px solid #fff;
    }
    &:horizontal:hover {
      border-top: 0px solid #fff;
      border-bottom: 0px solid #fff;
      border-left: 3px solid #fff;
      border-right: 3px solid #fff;
    }
  }
`;

export interface Props {
  className?: string;
  defaultStyles?: string;
  maxHeight?: string;
  maxWidth?: string;
  dynamic?: boolean;
  style?: object;
  cover?: boolean;
  showOuterBorder?: boolean;
}
class ChromeScroll extends React.PureComponent<Props> {
  contentNode: HTMLElement;
  render() {
    const {
      defaultStyles,
      className,
      style,
      children,
      showOuterBorder
    } = this.props;
    console.log(showOuterBorder);
    return (
      <Wrap
        defaultStyles={defaultStyles}
        style={style}
        className={"wjc-scroll-wrap " + className}
      >
        <Content
          className={"wjc-scroll-content"}
          ref={el => (this.contentNode = el)}
          showOuterBorder={showOuterBorder}
        >
          {children}
        </Content>
      </Wrap>
    );
  }
  // method
  scrollTo = (x: number, y: number) => {
    this.contentNode.scrollTo(x, y);
  };
}

export default ChromeScroll;
