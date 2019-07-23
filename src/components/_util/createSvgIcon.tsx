import * as React from "react";
import SvgIcon from "../SvgIcon";

interface Props {
  children: React.ReactNode;
  style: { [key: string]: string };
  [key: string]: any;
}

export default function createSvgIcon(
  path: React.ReactElement,
  displayName: string
) {
  const Component = React.forwardRef((props: Props, ref) => (
    <SvgIcon {...props} ref={ref}>
      {path}
    </SvgIcon>
  ));
  if (process.env.NODE_ENV !== "production") {
    Component.displayName = `${displayName}Icon`;
  }
  return Component;
}
