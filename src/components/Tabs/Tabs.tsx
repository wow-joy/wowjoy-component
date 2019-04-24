import * as React from "react";
import styled from "styled-components";
interface WrapProps {
  defaultStyles?: string;
}
const Wrap = styled.div<WrapProps>`
  width: 100%;
  height: 100%;
  ${props => props.defaultStyles};
`;
export interface Props {
  className: string;
  defaultStyles: string;
  controllers: Array<React.ReactNode>;
  useHover: boolean;
  hideOthers: boolean;
  initValue: number;
  value: number;
  onChange: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    tabIndex: number
  ) => void;
}
interface State {
  currentTab: number;
}
class Tabs extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentTab: props.initValue
    };
  }

  changeTab = (tabIndex: number) => (
    event?: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const { onChange } = this.props;
    this.setState({ currentTab: tabIndex });
    onChange && onChange(event, tabIndex);
  };

  componentWillReceiveProps(nextProps: Props) {
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
          {children instanceof Array &&
            (children as React.ReactNodeArray).map((ele, index) => {
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

export default Tabs;
