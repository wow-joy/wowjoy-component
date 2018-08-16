import React, { PureComponent } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
const Wrap = styled.div`
  overflow: hidden;
  position: relative;
  user-select: none;
  & > div {
    width: 100%;
    height: 100%;
    max-height: ${p => (p.height !== undefined ? p.height + "px" : "300px")};
    overflow: scroll;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const Content = styled.div``;
const SliderBar = styled.aside`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 6px;
  overflow: hidden;
`;
const Slider = styled.span`
  display: ${p => (p.height - 0 === 0 ? "none" : " inline-block")};
  background: #ccc;
  border-radius: 3px;
  width: 6px;
  height: ${p => p.height + "px"};
  cursor: pointer;
`;
class ScrollBox extends PureComponent {
  state = {
    sliderHeight: 0
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setHeight();
      this.addScrollLisenter();
    }
  }
  componentDidMount() {
    this.setHeight();
    this.addScrollLisenter();
  }
  render() {
    const { className, defaultStyles, children, height } = this.props;
    return (
      <Wrap
        innerRef={el => {
          this.wrapNode = el;
        }}
        defaultStyles={defaultStyles}
        className={className}
        height={height}
      >
        <div>
          <Content innerRef={el => (this.contentNode = el)}>{children}</Content>
          <SliderBar>
            <Slider
              innerRef={el => (this.slideNode = el)}
              height={this.state.sliderHeight || 0}
              onMouseDown={this.startSlide}
            />
          </SliderBar>
        </div>
      </Wrap>
    );
  }
  slideNode;
  wrapNode;
  wrapNodeHeight;
  contentNode;
  contentNodeHeight;
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

  startPosition = {};
  initPosition;
  startSlide = e => {
    this.slideNode = e.target;
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
  sliding = e => {
    let delta = e.pageY - this.startPosition.y + this.initPosition;
    const maxHeight = this.wrapNodeHeight - this.state.sliderHeight;
    delta = Math.min(maxHeight, delta);
    delta = Math.max(0, delta);
    this.slideNode.style.transform = `translateY(${delta}px)`;
    this.contentNode.parentNode.scrollTo(
      0,
      (delta / this.wrapNodeHeight) * this.contentNodeHeight
    );
  };
  scrolling = () => {
    const delta =
      (this.contentNode.parentNode.scrollTop / this.contentNodeHeight) *
      this.wrapNodeHeight;
    this.slideNode.style.transform = `translateY(${delta}px)`;
  };
}
ScrollBox.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  visible: PropTypes.bool,
  height: PropTypes.number
};
export default ScrollBox;
