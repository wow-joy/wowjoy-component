import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Wrap = styled.div`
  width: 100%;
  height: 100%;
  ${props => props.defaultStyles};
`;
class Tabs extends PureComponent {
  state = {
    currentTab: this.props.initValue
  };

  changeTab = tabIndex => event => {
    const { onChange } = this.props;
    this.setState({ currentTab: tabIndex });
    onChange && onChange(event, tabIndex);
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.value !== this.props.value &&
      nextProps.value !== this.state.currentTab
    ) {
      this.changeTab(nextProps.value)();
    }
  }

  render() {
    let {
      className,
      defaultStyles,
      controllers = [],
      children = [],
      useHover,
      hideOthers
    } = this.props;

    const currentIndex = this.state.currentTab;

    if (children.constructor.name !== "Array") {
      children = [children];
    }

    return (
      <Wrap defaultStyles={defaultStyles} className={className}>
        <nav>
          {controllers.map((ele, index) => (
            <span
              onClick={!useHover && this.changeTab(index)}
              onMouseEnter={useHover && this.changeTab(index)}
              key={`tabNav${index}`}
              className={currentIndex - index === 0 ? "active" : undefined}
            >
              {ele}
            </span>
          ))}
        </nav>
        <section>
          {children.constructor.name === "Array" &&
            children.map((ele, index) => {
              if (!hideOthers && currentIndex - index !== 0) {
                return null;
              }
              return (
                <div
                  key={`tab${index}`}
                  className={currentIndex - index === 0 ? "active" : undefined}
                >
                  {ele}
                </div>
              );
            })}
        </section>
      </Wrap>
    );
  }
}

Tabs.propTypes = {
  className: PropTypes.string,
  defaultStyles: PropTypes.string,
  controllers: PropTypes.array,
  useHover: PropTypes.bool,
  hideOthers: PropTypes.bool,
  initValue: PropTypes.number,
  value: PropTypes.number,
  onChange: PropTypes.func
};
export default Tabs;
