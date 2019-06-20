import * as React from "react";

interface RequiredProps {
  value: number | number[];
  min: number;
}

export default <P extends object>(OldComponent: React.ComponentType<P>) => {
  return ({ value, min, ...restProps }: RequiredProps) => {
    const v = Array.isArray(value) ? value : [value];
    return <OldComponent value={v.map(a => a || min || 0)} min={min} {...restProps as P} />;
  };
};
