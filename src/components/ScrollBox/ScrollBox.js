import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const Wrap = styled.div`
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
  padding-bottom: ${p => (p.showX ? "12px" : 0)};
  padding-right: ${p => (p.showY ? "12px" : 0)};
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
const ContentBox = styled.div``;
const Content = styled.div`
  display: inline-block;
`;

const ScrollBarX = styled.aside`
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
const SliderX = styled.span`
  display: ${p => (p.width - 0 === 0 ? "none" : " inline-block")};
  background: #c1c1c1;
  border-radius: 3px;
  height: 6px;
  width: ${p => p.width + "px"};
  cursor: pointer;
`;

const ScrollBarY = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 12px;
  overflow: hidden;
  background: #fff;
  border-left: 1px solid #dcdcdc;
  border-right: 1px solid #dcdcdc;
  text-align: center;
  display: ${p => (p.visible ? "block" : "none")};
  padding: 3px 0;
  &:hover > span {
    width: 10px;
    background: #999;
    border-radius: 5px;
  }
`;
const SliderY = styled.span`
  display: ${p => (p.height - 0 === 0 ? "none" : " inline-block")};
  background: #c1c1c1;
  border-radius: 3px;
  width: 6px;
  height: ${p => p.height + "px"};
  cursor: pointer;
`;

class ScrollBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderWidth: 0,
      sliderHeight: 0
    };
    this.axisX = {};
    this.axisY = {};
  }

  componentDidMount() {
    this.reset();
  }
  componentDidUpdate() {
    if (this.props.dynamic) {
      this.reset();
    }
  }
  render() {
    const { className, defaultStyles, style, children } = this.props;
    const showX = (this.state.sliderWidth || 0 - 0) !== 0;
    const showY = (this.state.sliderHeight || 0 - 0) !== 0;
    return (
      <Wrap
        ref={el => {
          this.wrapNode = el;
        }}
        defaultStyles={defaultStyles}
        className={className}
        style={style}
        showX={showX}
        showY={showY}
      >
        <ContentBox>
          <Content ref={el => (this.contentNode = el)}>{children}</Content>

          <ScrollBarX
            className={"wjc-scroll-bar wjc-scroll-bar-axis__x"}
            visible={showX}
            onClick ={this.axisX.clickTo}
          >
            <SliderX
              ref={el => (this.slideNodeX = el)}
              width={this.state.sliderWidth || 0}
              onMouseDown={this.axisX.startSlide}
            />
          </ScrollBarX>

          <ScrollBarY
            className={"wjc-scroll-bar wjc-scroll-bar-axis__y"}
            visible={showY}
            onClick ={this.axisY.clickTo}
          >
            <SliderY
              ref={el => (this.slideNodeY = el)}
              height={this.state.sliderHeight || 0}
              onMouseDown={this.axisY.startSlide}
            />
          </ScrollBarY>
        </ContentBox>
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
      slideNode: this.slideNodeY
    });
    this.addScrollLisenter();
  };

  slideNodeY;
  wrapNode;
  contentNode;
  addScrollLisenter = () => {
    this.contentNode.parentNode.addEventListener("scroll", (...args) => {
      this.axisX.scrolling(...args);
      this.axisY.scrolling(...args);
    });
  };

  wrapNodeRect = {};
  contentNodeRect = {};
  setRect = () => {
    const { wrapNode, contentNode } = this;
    // get rect
    let {
      width: wrapWidth,
      height: wrapHeight
    } = wrapNode.getBoundingClientRect();
    console.log(contentNode);
    const contentScrollWidth = contentNode.scrollWidth;
    const contentScrollHeight = contentNode.scrollHeight;
    // expect padding
    const showX = contentScrollWidth >= wrapWidth;
    const showY = contentScrollHeight >= wrapHeight;
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
    console.log(contentScrollWidth, wrapWidth);
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
  slideTo = (x, y) => {
    this.slideNodeX.style.transform = `translateX(${x})`;
    this.slideNodeY.style.transform = `translateY(${y})`;
  };
}
function initAxis({
  contentNode,
  slideNode,
  wrapSize,
  contentSize,
  sliderSize,
  isY = true
}) {
  let startPosition = null;
  let initPosition = {
    x: 0,
    y: 0
  };
  function startSlide(event) {
    const {pageY, pageX } = event;
    startPosition = {
      x: pageX,
      y: pageY
    };
    window.addEventListener("mousemove", sliding);
    window.addEventListener("mouseup", endSlide);
    setInitPosition();
  }
  function setInitPosition(){
    const { transform } = window.getComputedStyle(slideNode);
    const matrix = transform.match(/[\.\d]+/g) || [];
    initPosition = {
      x: +matrix[4] || 0,
      y: +matrix[5] || 0
    };
  }

  function endSlide() {
    startPosition = {};
    window.removeEventListener("mousemove", sliding);
    window.removeEventListener("mouseup", endSlide);
  }
  function sliding(event) {
    const { x: initX, y: initY } = initPosition;
    if (isY) {
      let delta = event.pageY - startPosition.y + initY;
      scrollTo(delta)
    } else {
      let delta = event.pageX - startPosition.x + initX;
      scrollTo(delta)
    }
  }
  function scrollTo (delta){
    if (isY) {
      console.log('delta', delta)
      const max = wrapSize - sliderSize;
      delta = Math.max(0, Math.min(max, delta));
      slide(`${delta}px`);
      const { parentNode } = contentNode;
      parentNode.scrollTo(
        parentNode.scrollLeft,
        (delta / wrapSize) * contentSize
      );
    } else {
      const max = wrapSize - sliderSize;
      delta = Math.max(0, Math.min(max, delta));
      slide(`${delta}px`);
      const { parentNode } = contentNode;
      parentNode.scrollTo(
        (delta / wrapSize) * contentSize,
        parentNode.scrollTop
      );
    }
  }
  function scrolling() {
    if (isY) {
      const delta = (contentNode.parentNode.scrollTop / contentSize) * wrapSize;
      slide(`${delta}px`);
    } else {
      const delta =
        (contentNode.parentNode.scrollLeft / contentSize) * wrapSize;
      slide(`${delta}px`);
    }
  }
  function slide(delta) {
    if (isY) {
      slideNode.style.transform = `translateY(${delta})`;
    } else {
      slideNode.style.transform = `translateX(${delta})`;
    }
  }

  function clickTo(event){
    if(event.target.className.indexOf('wjc-scroll-bar')<0){
      return 
    }
    setInitPosition()
    let position, _initPosition;
    if(isY){
      position =event.nativeEvent.offsetY;
      _initPosition = initPosition.y
    } else {
      position =event.nativeEvent.offsetX;
      _initPosition = initPosition.x
    }
    if(position > _initPosition + sliderSize){
      scrollTo(position - sliderSize)
    }else {
      scrollTo(position)
    }
  }

  return { startSlide, scrolling, clickTo};
}
ScrollBox.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  style: PropTypes.object,
  dynamic: PropTypes.bool
};
export default ScrollBox;
