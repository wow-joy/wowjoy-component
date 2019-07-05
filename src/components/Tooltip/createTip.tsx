import * as React from "react";
import * as ReactDOM from "react-dom";
import ControllSwitchHoc from "../../tools/Hoc/ControllSwitchHoc";
import { placement, formatPlacement, convertToPlacement, reverseDirection } from "./placements";
import { TriggerRect, contentRect } from "./tooltip";

interface RequiredProps {
  visible?: boolean;
  autoAdjustOverflow?: boolean;
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
  onVisibleChange?: (visible: boolean) => void;
  placement: placement;
  getContainer?: () => HTMLElement;
}
interface State {
  display: "none" | "block";
  contentRect: contentRect;
  triggerRect: TriggerRect;
  placement: placement;
}

export default <P extends object>(OldCpmponent: React.ComponentType<P>) => {
  class Tooltip extends React.PureComponent<RequiredProps, State> {
    static defaultProps = {
      autoAdjustOverflow: true,
      mouseEnterDelay: 0.1,
      mouseLeaveDelay: 0.1,
      duration: 0.3,
      defaultVisible: false,
      placement: "top" as placement,
      arrowMargin: 4,
      theme: "dark"
    };
    constructor(props: RequiredProps) {
      super(props);
      this.contentRef = React.createRef();
      this.state = {
        display: props.visible ? "block" : "none",
        contentRect: { width: 0, height: 0 },
        triggerRect: { left: 0, top: 0, width: 0, height: 0, scrollX: 0, scrollY: 0 },
        placement: props.placement
      };
    }
    contentRef: React.RefObject<HTMLDivElement>;
    triggerRef: HTMLElement;
    leaveTimer: number;
    enterTimer: number;

    componentDidMount() {
      if (!this.triggerRect || !this.contentRect) return;
      this.setState({
        triggerRect: this.triggerRect,
        contentRect: this.contentRect
      });
    }

    componentWillReceiveProps(nextProps: RequiredProps) {
      if (nextProps.visible !== this.props.visible) {
        if (nextProps.visible) {
          this.setState({ display: "block" }, () => {
            const triggerRect = this.triggerRect;
            if (!triggerRect) return;
            const contentRect = this.contentRect;
            if (!contentRect) return;
            let placement = this.props.placement;
            if (nextProps.autoAdjustOverflow) {
              const directions = formatPlacement(placement);
              const newDrections = reverseDirection(directions, { triggerRect, contentRect });
              placement = convertToPlacement(newDrections);
            }
            this.setState({ triggerRect, contentRect, placement });
          });
        }
      }
    }

    get triggerRect() {
      if (!this.triggerRef) return false;
      const { height, width, left, top } = (ReactDOM.findDOMNode(
        this.triggerRef
      ) as HTMLElement).getBoundingClientRect();
      const scrollX = left + (document.documentElement.scrollLeft || document.body.scrollLeft);
      const scrollY = top + (document.documentElement.scrollTop || document.body.scrollTop);
      return { scrollX, scrollY, left, top, height, width };
    }

    get contentRect() {
      if (!this.contentRef.current) return false;
      const width = this.contentRef.current.offsetWidth;
      const height = this.contentRef.current.offsetHeight;
      // console.log("=====", width, height);
      return { width, height };
    }

    setTriggerRect = () => {
      if (!this.triggerRect) return;
      this.setState({ triggerRect: this.triggerRect });
    };

    setContentRect = () => {
      if (!this.contentRect) return;
      this.setState({ contentRect: this.contentRect });
    };

    saveTriggerRef = (node: any) => {
      this.triggerRef = node;
      const { ref } = this.props.children as { ref: any };
      if (typeof ref === "function") {
        ref(node);
      }
    };

    tipMouseEnter = () => {
      this.leaveTimer && clearTimeout(this.leaveTimer);
    };

    tipMouseLeave = () => {
      this.enterTimer && clearTimeout(this.enterTimer);
      this.props.onVisibleChange && this.props.onVisibleChange(false);
    };

    onAnimationEnd = () => {
      if (!this.contentRef.current) return;
      if (!this.props.visible) {
        this.setState({ display: "none" });
      }
    };

    childrenMouseEnter = () => {
      clearTimeout(this.leaveTimer);
      this.enterTimer = setTimeout(() => {
        this.props.onVisibleChange && this.props.onVisibleChange(true);
        this.enterTimer = null;
      }, this.props.mouseEnterDelay * 1000);
    };

    childrenMouseLeave = () => {
      clearTimeout(this.enterTimer);
      this.leaveTimer = setTimeout(() => {
        this.props.onVisibleChange && this.props.onVisibleChange(false);
        this.leaveTimer = null;
      }, this.props.mouseLeaveDelay * 1000);
    };

    render() {
      const {
        contentRef,
        saveTriggerRef,
        tipMouseEnter,
        tipMouseLeave,
        onAnimationEnd,
        childrenMouseEnter,
        childrenMouseLeave,
        setTriggerRect,
        setContentRect
      } = this;
      const { display, contentRect, triggerRect, placement } = this.state;
      return (
        <OldCpmponent
          {...this.props as P}
          {...{
            contentRef,
            triggerRef: saveTriggerRef,
            tipMouseEnter,
            tipMouseLeave,
            onAnimationEnd,
            childrenMouseEnter,
            childrenMouseLeave,
            contentDisplay: display,
            contentRect,
            triggerRect,
            placement,
            setTriggerRect,
            setContentRect
          }}
        />
      );
    }
  }
  return ControllSwitchHoc({
    value: "visible",
    defaultValue: "defaultVisible",
    onChange: "onVisibleChange"
  })(Tooltip);
};
