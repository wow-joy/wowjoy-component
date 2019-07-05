import { ARROW_HEIGHT, ARROW_OFFSET, ARROW_WIDTH } from "./constant";

export interface triggerRect {
  scrollX: number;
  scrollY: number;
  width: number;
  height: number;
  left: number;
  top: number;
}
export interface contentRect {
  width: number;
  height: number;
}

export type placement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "leftTop"
  | "rightTop"
  | "topRight"
  | "leftBottom"
  | "bottomLeft"
  | "bottomRight"
  | "rightBottom";

export type direction = "left" | "right" | "top" | "bottom";

export function formatPlacement(s: placement): [direction, direction?] {
  const m = s.match(/[A-Z]/);
  return m
    ? [s.slice(0, m.index) as direction, s.toLowerCase().slice(m.index) as direction]
    : [s as direction];
}

export function convertToPlacement(dirs: [direction, direction?]): placement {
  return `${dirs[0]}${dirs[1] ? dirs[1].replace(/\w/, m => m.toUpperCase()) : ""}` as placement;
}

type placementOpt = {
  arrowStyle: string;
  contentOffset: [number, number];
  transformOrigin: [number, number];
};
type placementsMap = (opt: {
  triggerRect: triggerRect;
  contentRect: contentRect;
  arrowPointAtCenter: boolean;
}) => Record<placement, () => placementOpt>;

const placementsMap: placementsMap = ({
  triggerRect: { scrollX, scrollY, width: tWidth, height: tHeight },
  contentRect: { width: cWidth, height: cHeight },
  arrowPointAtCenter
}) => {
  return {
    top() {
      return {
        arrowStyle: `
          top: 100%;
          left: 50%;
          margin-left: -6px;
        `,
        contentOffset: [scrollX - (cWidth - tWidth) / 2, scrollY - cHeight],
        transformOrigin: [cWidth / 2, cHeight]
      };
    },
    topLeft() {
      return {
        arrowStyle: `
          top: 100%;
          left: ${ARROW_OFFSET}px;
        `,
        contentOffset: [
          arrowPointAtCenter ? scrollX + tWidth / 2 - ARROW_OFFSET - ARROW_WIDTH : scrollX,
          scrollY - cHeight
        ],
        transformOrigin: [ARROW_OFFSET + ARROW_WIDTH, cHeight]
      };
    },
    topRight() {
      return {
        arrowStyle: `
          top: 100%;
          right: ${ARROW_OFFSET}px;
        `,
        contentOffset: [
          arrowPointAtCenter
            ? scrollX + tWidth / 2 - cWidth / 2 - ARROW_OFFSET - ARROW_WIDTH
            : scrollX - (cWidth - tWidth),
          scrollY - cHeight
        ],
        transformOrigin: [cWidth - ARROW_OFFSET - ARROW_WIDTH, cHeight]
      };
    },
    bottom() {
      return {
        arrowStyle: `
          bottom: 100%;
          left: 50%;
          margin-left: -6px;
        `,
        contentOffset: [scrollX - (cWidth - tWidth) / 2, scrollY + tHeight],
        transformOrigin: [cWidth / 2, 0]
      };
    },
    bottomLeft() {
      return {
        arrowStyle: `
          bottom: 100%;
          left: ${ARROW_OFFSET}px;
        `,
        contentOffset: [
          arrowPointAtCenter ? scrollX + tWidth / 2 - ARROW_OFFSET - ARROW_WIDTH : scrollX,
          scrollY + tHeight
        ],
        transformOrigin: [ARROW_OFFSET + ARROW_WIDTH, 0]
      };
    },
    bottomRight() {
      return {
        arrowStyle: `
          bottom: 100%;
          right: ${ARROW_OFFSET}px;
        `,
        contentOffset: [
          arrowPointAtCenter
            ? scrollX + tWidth / 2 - cWidth / 2 - ARROW_OFFSET - ARROW_WIDTH
            : scrollX - (cWidth - tWidth),
          scrollY + tHeight
        ],
        transformOrigin: [cWidth - ARROW_OFFSET - ARROW_WIDTH, 0]
      };
    },
    right() {
      return {
        arrowStyle: `
          right: 100%;
          top: 50%;
          margin-top: -6px;
        `,
        contentOffset: [scrollX + tWidth, scrollY - (cHeight - tHeight) / 2],
        transformOrigin: [0, cHeight / 2 - ARROW_WIDTH]
      };
    },
    rightTop() {
      return {
        arrowStyle: `
          right: 100%;
          top: ${ARROW_OFFSET}px;
        `,
        contentOffset: [
          scrollX + tWidth,
          arrowPointAtCenter ? scrollY + tHeight / 2 - ARROW_OFFSET : scrollY
        ],
        transformOrigin: [0, ARROW_WIDTH + ARROW_OFFSET]
      };
    },
    rightBottom() {
      return {
        arrowStyle: `
          right: 100%;
          bottom: ${ARROW_OFFSET}px;
        `,
        contentOffset: [
          scrollX + tWidth,
          arrowPointAtCenter
            ? scrollY + tHeight / 2 + ARROW_OFFSET - cHeight
            : scrollY - cHeight + tHeight
        ],
        transformOrigin: [0, cHeight - ARROW_OFFSET]
      };
    },
    left() {
      return {
        arrowStyle: `
          left: 100%;
          top: 50%;
          margin-top: -6px;
        `,
        contentOffset: [scrollX - cWidth, scrollY + (tHeight - cHeight) / 2],
        transformOrigin: [cWidth, cHeight / 2 - ARROW_WIDTH]
      };
    },
    leftTop() {
      return {
        arrowStyle: `
          left: 100%;
          top: ${ARROW_OFFSET}px;
        `,
        contentOffset: [
          scrollX - cWidth,
          arrowPointAtCenter ? scrollY + tHeight / 2 - ARROW_OFFSET : scrollY
        ],
        transformOrigin: [cWidth, ARROW_WIDTH + ARROW_OFFSET]
      };
    },
    leftBottom() {
      return {
        arrowStyle: `
          left: 100%;
          bottom: ${ARROW_OFFSET}px;
        `,
        contentOffset: [
          scrollX - cWidth,
          arrowPointAtCenter
            ? scrollY + tHeight / 2 + ARROW_OFFSET - cHeight
            : scrollY - cHeight + tHeight
        ],
        transformOrigin: [cWidth, cHeight - ARROW_WIDTH - ARROW_OFFSET]
      };
    }
  };
};

export enum gapMap {
  left = "left",
  right = "left",
  top = "top",
  bottom = "top"
}
export const shadowOffset = {
  left: ["1px", 0],
  right: ["-1px", 0],
  top: [0, "1px"],
  bottom: [0, "-1px"]
};
export enum reverse {
  left = "right",
  right = "left",
  top = "bottom",
  bottom = "top"
}

export function reverseDirection(
  [direction, conetntDirection]: [direction, direction?],
  {
    triggerRect: { left, top, width: tWidth, height: tHeight },
    contentRect: { width: cWidth, height: cHeight }
  }: {
    triggerRect: triggerRect;
    contentRect: contentRect;
  }
): [direction, direction?] {
  const outerWidth = window.innerWidth;
  const outerHeight = window.innerHeight;
  // if (getContainer) {
  //   const { left, top } = getContainer().getBoundingClientRect();
  //   left = left - left;
  //   top = top - top;
  // }
  // if (!Object.values({ ...triggerRect, ...contentRect }).some(a => a !== 0)) {
  //   return [direction, conetntDirection];
  // }
  if (
    (direction === "left" && cWidth > left - 10) ||
    (direction === "right" && cWidth + tWidth + left > outerWidth - 10) ||
    (direction === "top" && cHeight > top - 10) ||
    (direction === "bottom" && cHeight + tHeight + top > outerHeight - 10)
  ) {
    direction = reverse[direction];
  }
  if (
    (conetntDirection === "left" && cWidth + left > outerWidth - 10) ||
    (conetntDirection === "right" && cWidth > left + tWidth) ||
    (conetntDirection === "top" && cHeight + top > outerHeight - 10) ||
    (conetntDirection === "bottom" && cHeight > tHeight + top)
  ) {
    conetntDirection = reverse[conetntDirection];
  }
  return [direction, conetntDirection];
}

export type CurrentPlace = Omit<placementOpt, "transformOrigin"> & {
  popBoxStyle: string;
  borderDerectionClass: direction;
  transformOrigin: string;
};
export type GetPlacement = (opt: {
  triggerRect: triggerRect;
  contentRect: contentRect;
  outerWidth?: number;
  outerHeight?: number;
  getContainer?: () => HTMLElement;
}) => CurrentPlace;
type getPlacements = (
  placement: placement,
  opt?: {
    arrowPointAtCenter?: boolean;
    arrowMargin?: number;
  }
) => GetPlacement;

const getPlacements: getPlacements = (placement, { arrowPointAtCenter, arrowMargin } = {}) => {
  let [direction] = formatPlacement(placement);
  return ({ triggerRect, contentRect }) => {
    const getPlacement = placementsMap({
      triggerRect,
      contentRect,
      arrowPointAtCenter
    })[placement];
    const currentPlacement = getPlacement();
    const leftOrTop = direction === "left" || direction === "top";
    return {
      ...currentPlacement,
      borderDerectionClass: direction,
      arrowStyle: `${currentPlacement.arrowStyle}filter: drop-shadow(${shadowOffset[direction].join(
        " "
      )} 1px rgba(0, 0, 0, 0.1));`,
      popBoxStyle: `margin-${gapMap[direction]}: ${
        leftOrTop ? `-${ARROW_HEIGHT + arrowMargin}px` : `${ARROW_HEIGHT + arrowMargin}px`
      };`,
      transformOrigin: currentPlacement.transformOrigin.map(a => a + "px").join(" ")
    };
  };
};

export default getPlacements;
