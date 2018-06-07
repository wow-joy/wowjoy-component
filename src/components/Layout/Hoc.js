import React, { PureComponent } from "react";
const Hoc = initSetting => OldComponent => {
  return class extends PureComponent {
    render() {
      let { className } = this.props;
      const initedProps = { className };
      ["header", "asideLeft", "main", "asideRight", "footer"].forEach(ele => {
        initedProps[ele] = this.props[ele]
          ? {
              className: this.props[ele].className||''+ ' ' + initSetting[ele].className||'',
              content: this.props[ele].content || initSetting[ele].content
            }
          : initSetting[ele];
      });
      return <OldComponent {...initedProps} />;
    }
  };
};
export default Hoc;
