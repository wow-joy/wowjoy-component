import * as React from "react";
import styled from "styled-components";
import initAxis from "./initAxis";
interface WrapProps {
  defaultStyles?: string;
  cover?: boolean;
  showX?: boolean;
  showY?: boolean;
}
const Wrap = styled.div<WrapProps>`
  overflow: hidden;
  position: relative;
  user-select: none;
  & > div {
    width: 100%;
    height: 100%;
    overflow: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ${p =>
    !p.cover &&
    `padding-bottom: ${p.showX ? "12px" : 0};
      padding-right: ${p.showY ? "12px" : 0};`}

  ${p =>
    p.showX &&
    p.showY &&
    `
    &::after{
      content : '';
      display: block;
      position: absolute;
      right: 0px;
      bottom: 0px;
      height: 12px;
      width: 12px;
      background:#fff;
      z-index: 1;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
    }
  `}
  ${p => p.defaultStyles};
`;
const Content = styled.div`
  display: inline-block;
`;
interface ScrollBarProps {
  visible?: boolean;
}
const ScrollBarX = styled.aside<ScrollBarProps>`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 12px;
  overflow: hidden;
  background: #fff;
  border-top: 1px solid #dcdcdc;
  border-bottom: 1px solid #dcdcdc;
  display: ${p => (p.visible ? "flex" : "none")};
  align-items: center;
  padding: 0 3px;
  &:hover > span {
    height: 10px;
    background: #999;
    border-radius: 5px;
  }
`;
interface SliderXProps {
  width?: number;
  onMouseDown: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
const SliderX = styled.span<SliderXProps>`
  display: ${p => (p.width - 0 === 0 ? "none" : " inline-block")};
  background: #c1c1c1;
  border-radius: 3px;
  height: 6px;
  width: ${p => p.width + "px"};
  cursor: pointer;
`;

const ScrollBarY = styled.aside<ScrollBarProps>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 12px;
  overflow: hidden;
  background: #fff;
  border-left: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
  display: ${p => (p.visible ? "flex" : "none")};
  justify-content: center;
  padding: 3px 0;
  &:hover > span {
    width: 10px;
    background: #999;
    border-radius: 5px;
  }
`;
interface SliderYProps {
  height?: number;
  onMouseDown: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}
const SliderY = styled.span<SliderYProps>`
  display: ${p => (p.height - 0 === 0 ? "none" : " inline-block")};
  background: #c1c1c1;
  border-radius: 3px;
  width: 6px;
  height: ${p => p.height + "px"};
  cursor: pointer;
`;
export interface Props {
  className?: string;
  defaultStyles?: string;
  maxHeight?: string;
  maxWidth?: string;
  dynamic?: boolean;
  style?: object;
  cover?: boolean;
}
interface State {
  sliderWidth: number;
  sliderHeight: number;
}

interface Axis {
  startSlide: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
  scrollTo: (delta: number) => void;
  scrolling: () => void;
  clickTo: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

class ScrollBox extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sliderWidth: 0,
      sliderHeight: 0
    };
    this.axisX = {
      startSlide: null,
      scrollTo: null,
      scrolling: null,
      clickTo: null
    };
    this.axisY = {
      startSlide: null,
      scrollTo: null,
      scrolling: null,
      clickTo: null
    };
  }
  axisX: Axis;
  axisY: Axis;
  componentDidMount() {
    this.reset();
    window.addEventListener("resize", this.reset);
  }
  reseted = false;
  componentDidUpdate() {
    if (this.props.dynamic) {
      if (!this.reseted) {
        this.reseted = true;
        this.reset();
      } else {
        this.reseted = false;
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.reset);
  }

  render() {
    const { className, defaultStyles, style, children, cover } = this.props;
    const showX = (this.state.sliderWidth || 0 - 0) !== 0;
    const showY = (this.state.sliderHeight || 0 - 0) !== 0;
    return (
      <Wrap
        ref={el => {
          this.wrapNode = el;
        }}
        defaultStyles={defaultStyles}
        className={"wjc-scroll-wrap " + className}
        style={style}
        showX={showX}
        showY={showY}
        cover={cover}
      >
        <Content
          className={"wjc-scroll-content"}
          ref={el => (this.contentNode = el)}
        >
          {children}
        </Content>
        <ScrollBarX
          className={"wjc-scroll-bar wjc-scroll-bar-axis__x"}
          visible={showX}
          onClick={this.axisX.clickTo}
        >
          <SliderX
            className={"wjc-scroll-slider wjc-scroll-slider-axis__x"}
            ref={el => (this.slideNodeX = el)}
            width={this.state.sliderWidth || 0}
            onMouseDown={this.axisX.startSlide}
          />
        </ScrollBarX>

        <ScrollBarY
          className={"wjc-scroll-bar wjc-scroll-bar-axis__y"}
          visible={showY}
          onClick={this.axisY.clickTo}
        >
          <SliderY
            className={"wjc-scroll-slider wjc-scroll-slider-axis__y"}
            ref={el => (this.slideNodeY = el)}
            height={this.state.sliderHeight || 0}
            onMouseDown={this.axisY.startSlide}
          />
        </ScrollBarY>
      </Wrap>
    );
  }

  reset = () => {
    const nextState = this.setRect();
    this.axisX = new initAxis({
      contentNode: this.contentNode,
      sliderSize: nextState.sliderWidth,
      wrapSize: this.wrapNodeRect.width,
      contentSize: this.contentNodeRect.width,
      slideNode: this.slideNodeX,
      isY: false
    });
    this.axisY = new initAxis({
      contentNode: this.contentNode,
      sliderSize: nextState.sliderHeight,
      wrapSize: this.wrapNodeRect.height,
      contentSize: this.contentNodeRect.height,
      slideNode: this.slideNodeY,
      isY: true
    });
    this.addScrollLisenter();
  };

  slideNodeX: HTMLElement;
  slideNodeY: HTMLElement;
  wrapNode: HTMLElement;
  contentNode: HTMLElement;
  addScrollLisenter = () => {
    this.contentNode.addEventListener("scroll", (...args: []) => {
      this.axisX.scrolling(...args);
      this.axisY.scrolling(...args);
    });
  };

  wrapNodeRect: { width: number; height: number } = { width: 0, height: 0 };
  contentNodeRect: { width: number; height: number } = { width: 0, height: 0 };
  setRect = () => {
    const { wrapNode, contentNode } = this;
    // get rect
    let {
      width: wrapWidth,
      height: wrapHeight
    } = wrapNode.getBoundingClientRect();
    const contentScrollWidth = contentNode.scrollWidth;
    const contentScrollHeight = contentNode.scrollHeight;
    // expect padding
    const showX = contentScrollWidth > wrapWidth;
    const showY = contentScrollHeight > wrapHeight;
    if (showX && showY) {
      wrapHeight -= 18;
      wrapWidth -= 18;
    } else {
      wrapHeight -= 6;
      wrapWidth -= 6;
    }

    // compute slider size
    const width = (wrapWidth * wrapWidth) / contentScrollWidth;
    const height = (wrapHeight * wrapHeight) / contentScrollHeight;
    const nextState = {
      sliderWidth: showX ? width : 0,
      sliderHeight: showY ? height : 0
    };

    // set rect to cache
    this.wrapNodeRect = { width: wrapWidth, height: wrapHeight };
    this.contentNodeRect = {
      width: contentScrollWidth,
      height: contentScrollHeight
    };

    this.setState(nextState);
    return nextState;
  };

  // method
  scrollTo = (x: number, y: number) => {
    this.contentNode.scrollTo(x, y);
  };
  rerender = () => {
    this.reset();
  };
}

export default ScrollBox;
