import * as React from "react";
import styled from "styled-components";
interface WrapProps {
  maxHeight: string;
  maxWidth?: string;
  hoverControl: boolean;
  defaultStyles: string;
}
const Wrap = styled.div<WrapProps>`
  overflow: hidden;
  position: relative;
  user-select: none;
  & > div {
    width: 100%;
    height: 100%;
    max-height: ${p => (p.maxHeight !== undefined ? p.maxHeight : "300px")};
    overflow: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  ${p =>
    p.hoverControl &&
    ` &>div>.wjc-scroll-bar{
        opacity: 0;
        pointer-events: none;
        transition: 0.3s;
        background: rgba(222,222,222,0.3);
        border-radius: 3px;
        box-shadow: inset 0 0 3px rgba(150,150,150,0.1);
      }
      &:hover{
        &>div>.wjc-scroll-bar{
          opacity: 1;
          pointer-event: all;
        }
      }
    `}
  ${p => p.defaultStyles}
`;
const Content = styled.div``;
const ScrollBar = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 6px;
  overflow: hidden;
  display: ${(p: { visible?: boolean }) => (p.visible ? "block" : "none")};
`;
const Slider = styled.span`
  display: ${(p: { height: number }) =>
    p.height - 0 === 0 ? "none" : " inline-block"};
  background: #ccc;
  border-radius: 3px;
  width: 6px;
  height: ${p => p.height + "px"};
  cursor: pointer;
`;

const ChromeScroll = styled.div<WrapProps>`
  overflow: hidden;
  position: relative;
  user-select: none;
  & > div {
    width: 100%;
    height: 100%;
    max-height: ${p => (p.maxHeight !== undefined ? p.maxHeight : "300px")};
    max-width: ${p => (p.maxWidth !== undefined ? p.maxWidth : "100%")};
    overflow: auto;
    &::-webkit-scrollbar {
      transition: 0.3s;
      border-radius: 3px;
      background: rgba(222, 222, 222, 0.3);
      box-shadow: inset 0 0 3px rgba(150, 150, 150, 0.1);
      width: 6px;
      transition: 0.3s;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(204, 204, 204, 1);
      border-radius: 3px;
      width: 6px;
      cursor: pointer;
      transition: 0.3s;
    }
  }
  ${p =>
    p.hoverControl &&
    `& > div {
      &::-webkit-scrollbar {
        background: rgba(222, 222, 222, 0);
        box-shadow: inset 0 0 3px rgba(150, 150, 150, 0);
      }
      &::-webkit-scrollbar-thumb {
        background: rgba(204, 204, 204, 0);
      }
    }
    &:hover {
      & > div::-webkit-scrollbar {
        background: rgba(222, 222, 222, 0.3);
        box-shadow: inset 0 0 3px rgba(150, 150, 150, 0.1);
      }
      & > div::-webkit-scrollbar-thumb {
        background: rgba(204, 204, 204, 1);
      }
    }
  `};
  ${p => p.defaultStyles};
`;
export interface Props {
  className?: string;
  defaultStyles?: string;
  visible?: boolean;
  hoverControl?: boolean;
  maxHeight?: string;
  maxWidth?: string;
}
interface State {
  sliderHeight: number;
}
const isChrome = /(Chrome|Safari)/i.test(window.navigator.userAgent);
class ScrollBox extends React.PureComponent<Props, State> {
  state = {
    sliderHeight: 0
  };

  componentWillReceiveProps(nextProps: Props) {
    if (!isChrome) {
      if (nextProps.visible) {
        this.setHeight();
        this.addScrollLisenter();
      }
    }
  }
  componentDidMount() {
    if (!isChrome) {
      this.setHeight();
      this.addScrollLisenter();
    }
  }

  render() {
    const {
      className,
      defaultStyles,
      children,
      maxHeight,
      maxWidth,
      hoverControl = false
    } = this.props;
    if (isChrome) {
      return (
        <ChromeScroll
          defaultStyles={defaultStyles}
          className={className}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          hoverControl={hoverControl}
        >
          <div>{children}</div>
        </ChromeScroll>
      );
    }
    return (
      <Wrap
        ref={el => {
          this.wrapNode = el;
        }}
        defaultStyles={defaultStyles}
        className={className}
        maxHeight={maxHeight}
        hoverControl={hoverControl}
      >
        <div>
          <Content ref={el => (this.contentNode = el)}>{children}</Content>
          <ScrollBar
            className={"wjc-scroll-bar"}
            visible={(this.state.sliderHeight || 0 - 0) !== 0}
          >
            <Slider
              ref={el => (this.slideNode = el)}
              height={this.state.sliderHeight || 0}
              onMouseDown={this.startSlide}
            />
          </ScrollBar>
        </div>
      </Wrap>
    );
  }
  slideNode: HTMLElement;
  wrapNode: HTMLElement;
  wrapNodeHeight: number;
  contentNode: HTMLElement;
  contentNodeHeight: number;
  addScrollLisenter = () => {
    this.contentNode.parentNode.addEventListener("scroll", this.scrolling);
  };
  setHeight = () => {
    this.contentNodeHeight = this.contentNode.scrollHeight;
    this.wrapNodeHeight = this.wrapNode.clientHeight;
    const height =
      (this.wrapNodeHeight * this.wrapNodeHeight) / this.contentNodeHeight;
    this.setState({
      sliderHeight: height >= this.wrapNodeHeight ? 0 : height || 0
    });
  };

  startPosition: {
    x?: number;
    y?: number;
  } = {};
  initPosition: boolean | number;
  startSlide = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.slideNode = e.target as HTMLElement;
    this.startPosition = {
      x: e.pageX,
      y: e.pageY
    };
    window.addEventListener("mousemove", this.sliding);
    window.addEventListener("mouseup", this.endSlide);
    this.initPosition =
      this.slideNode.style.transform &&
      this.slideNode.style.transform.match(/[\.\d]+/g) &&
      +this.slideNode.style.transform.match(/[\.\d]+/g)[0];
  };
  endSlide = () => {
    this.startPosition = {};
    window.removeEventListener("mousemove", this.sliding);
    window.removeEventListener("mouseup", this.endSlide);
  };
  sliding = (e: MouseEvent) => {
    let delta =
      e.pageY - Number(this.startPosition.y) + Number(this.initPosition);
    const maxHeight = this.wrapNodeHeight - this.state.sliderHeight;
    delta = Math.min(maxHeight, delta);
    delta = Math.max(0, delta);
    this.slideNode.style.transform = `translateY(${delta}px)`;
    (this.contentNode.parentNode as HTMLElement).scrollTo(
      0,
      (delta / this.wrapNodeHeight) * this.contentNodeHeight
    );
  };
  scrolling = () => {
    const delta =
      ((this.contentNode.parentNode as HTMLElement).scrollTop /
        this.contentNodeHeight) *
      this.wrapNodeHeight;
    this.slideNode.style.transform = `translateY(${delta}px)`;
  };
}

export default ScrollBox;
