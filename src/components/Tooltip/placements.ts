import { ARROW_OFFSET, ARROW_WIDTH, ARROW_HEIGHT } from "./constant";

export interface triggerRect {
  scrollX: number;
  scrollY: number;
  width: number;
  height: number;
  x: number;
  y: number;
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

function formatPlacement(s: placement): [direction, direction?] {
  const m = s.match(/[A-Z]/);
  return m
    ? [
        s.slice(0, m.index) as direction,
        s.toLowerCase().slice(m.index) as direction
      ]
    : [s as direction];
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
        contentOffset: [
          scrollX - (cWidth - tWidth) / 2,
          scrollY - cHeight - ARROW_HEIGHT
        ],
        transformOrigin: [cWidth / 2, cHeight + ARROW_HEIGHT]
      };
    },
    topLeft() {
      return {
        arrowStyle: `
          top: 100%;
          left: ${
            arrowPointAtCenter ? tWidth / 2 - ARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [scrollX, scrollY - cHeight - ARROW_HEIGHT],
        transformOrigin: [
          arrowPointAtCenter ? tWidth / 2 : ARROW_OFFSET + ARROW_WIDTH,
          cHeight + ARROW_HEIGHT
        ]
      };
    },
    topRight() {
      return {
        arrowStyle: `
          top: 100%;
          right: ${
            arrowPointAtCenter
              ? tWidth / 2 - ARROW_WIDTH
              : ARROW_OFFSET - ARROW_WIDTH
          }px;
        `,
        contentOffset: [
          scrollX - (cWidth - tWidth),
          scrollY - cHeight - ARROW_HEIGHT
        ],
        transformOrigin: [
          arrowPointAtCenter
            ? cWidth - tWidth / 2
            : cWidth - ARROW_OFFSET - ARROW_WIDTH,
          cHeight + ARROW_HEIGHT
        ]
      };
    },
    bottom() {
      return {
        arrowStyle: `
          bottom: 100%;
          left: 50%;
          margin-left: -6px;
        `,
        contentOffset: [
          scrollX - (cWidth - tWidth) / 2,
          scrollY + tHeight + ARROW_HEIGHT
        ],
        transformOrigin: [cWidth / 2, -ARROW_HEIGHT]
      };
    },
    bottomLeft() {
      return {
        arrowStyle: `
          bottom: 100%;
          left: ${
            arrowPointAtCenter ? tWidth / 2 - ARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [scrollX, scrollY + tHeight + ARROW_HEIGHT],
        transformOrigin: [
          arrowPointAtCenter ? tWidth / 2 : ARROW_OFFSET + ARROW_WIDTH,
          -ARROW_HEIGHT
        ]
      };
    },
    bottomRight() {
      return {
        arrowStyle: `
          bottom: 100%;
          right: ${
            arrowPointAtCenter ? tWidth / 2 - ARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [
          scrollX - (cWidth - tWidth),
          scrollY + tHeight + ARROW_HEIGHT
        ],
        transformOrigin: [cWidth - ARROW_OFFSET - ARROW_WIDTH, -ARROW_HEIGHT]
      };
    },
    right() {
      return {
        arrowStyle: `
          right: 100%;
          top: 50%;
          margin-top: -6px;
        `,
        contentOffset: [
          scrollX + tWidth + ARROW_HEIGHT,
          scrollY - (cHeight - tHeight) / 2
        ],
        transformOrigin: [0, cHeight / 2 - ARROW_WIDTH]
      };
    },
    rightTop() {
      return {
        arrowStyle: `
          right: 100%;
          top: ${
            arrowPointAtCenter ? tHeight / 2 - ARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [scrollX + tWidth + ARROW_HEIGHT, scrollY],
        transformOrigin: [0, arrowPointAtCenter ? tHeight / 2 : ARROW_OFFSET]
      };
    },
    rightBottom() {
      return {
        arrowStyle: `
          right: 100%;
          bottom: ${
            arrowPointAtCenter ? tHeight / 2 - ARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [
          scrollX + tWidth + ARROW_HEIGHT,
          scrollY + tHeight - cHeight
        ],
        transformOrigin: [
          0,
          arrowPointAtCenter ? tHeight / 2 : cHeight - ARROW_OFFSET
        ]
      };
    },
    left() {
      return {
        arrowStyle: `
          left: 100%;
          top: 50%;
          margin-top: -6px;
        `,
        contentOffset: [
          scrollX - cWidth - ARROW_HEIGHT,
          scrollY + (tHeight - cHeight) / 2
        ],
        transformOrigin: [cWidth, cHeight / 2 - ARROW_WIDTH]
      };
    },
    leftTop() {
      return {
        arrowStyle: `
          left: 100%;
          top: ${
            arrowPointAtCenter ? tHeight / 2 - ARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [scrollX - cWidth - ARROW_HEIGHT, scrollY],
        transformOrigin: [
          cWidth,
          arrowPointAtCenter ? tHeight / 2 : ARROW_OFFSET
        ]
      };
    },
    leftBottom() {
      return {
        arrowStyle: `
          left: 100%;
          bottom: ${
            arrowPointAtCenter ? tHeight / 2 - ARROW_WIDTH : ARROW_OFFSET
          }px;
        `,
        contentOffset: [
          scrollX - cWidth - ARROW_HEIGHT,
          scrollY + tHeight - cHeight
        ],
        transformOrigin: [
          cWidth,
          arrowPointAtCenter ? tHeight / 2 : cHeight - ARROW_OFFSET
        ]
      };
    }
  };
};

enum gapMap {
  left = "left",
  right = "left",
  top = "top",
  bottom = "top"
}
const shadowOffset = {
  left: ["1px", 0],
  right: ["-1px", 0],
  top: [0, "1px"],
  bottom: [0, "-1px"]
};
enum reverse {
  left = "right",
  right = "left",
  top = "bottom",
  bottom = "top"
}

function reverseDirection(
  [direction, conetntDirection]: [direction, direction],
  {
    triggerRect,
    contentRect,
    triggerRect: { x, y, width: tWidth, height: tHeight },
    contentRect: { width: cWidth, height: cHeight }
  }: {
    triggerRect: triggerRect;
    contentRect: contentRect;
  }
) {
  if (!Object.values({ ...triggerRect, ...contentRect }).some(a => a !== 0)) {
    return [direction, conetntDirection];
  }
  if (
    (direction === "left" && cWidth > x - 10) ||
    (direction === "right" && cWidth + tWidth + x > window.innerWidth - 10) ||
    (direction === "top" && cHeight > y - 10) ||
    (direction === "bottom" && cHeight + tHeight + y > window.innerHeight - 10)
  ) {
    direction = reverse[direction];
  }
  if (
    (conetntDirection === "left" && cWidth + x > window.innerWidth - 10) ||
    (conetntDirection === "right" && cWidth > x + tWidth) ||
    (conetntDirection === "top" && cHeight + y > window.innerHeight) ||
    (conetntDirection === "bottom" && cHeight > tHeight + y)
  ) {
    conetntDirection = reverse[conetntDirection];
  }
  return [direction, conetntDirection];
}

export type getPlacement = (opt: {
  triggerRect: triggerRect;
  contentRect: contentRect;
}) => Omit<placementOpt, "transformOrigin"> & {
  popBoxStyle: string;
  borderDerectionClass: direction;
  transformOrigin: string;
};
type getPlacements = (
  placement: placement,
  opt: { autoAdjustOverflow: boolean; arrowPointAtCenter: boolean }
) => getPlacement;

const getPlacements: getPlacements = (
  placement,
  { autoAdjustOverflow, arrowPointAtCenter }
) => {
  let [direction, conetntDirection] = formatPlacement(placement);
  return ({ triggerRect, contentRect }) => {
    let newPlacement = placement;
    let newDirection = direction;
    let newConetntDirection = conetntDirection;
    if (autoAdjustOverflow) {
      [newDirection, newConetntDirection] = reverseDirection(
        [direction, conetntDirection],
        {
          triggerRect,
          contentRect
        }
      );
      newPlacement = `${newDirection}${
        newConetntDirection
          ? newConetntDirection.replace(/\w/, m => m.toUpperCase())
          : ""
      }` as placement;
    }
    const getPlacement = placementsMap({
      triggerRect,
      contentRect,
      arrowPointAtCenter
    })[newPlacement];
    const currentPlacement = getPlacement();
    const leftOrTop = newDirection === "left" || newDirection === "top";
    return {
      ...currentPlacement,
      borderDerectionClass: newDirection,
      arrowStyle: `${
        currentPlacement.arrowStyle
      }filter: drop-shadow(${shadowOffset[newDirection].join(
        " "
      )} 1px rgba(0, 0, 0, 0.1));`,
      popBoxStyle: `margin-${gapMap[newDirection]}: ${
        leftOrTop ? "-5px" : "5px"
      };`,
      transformOrigin: currentPlacement.transformOrigin
        .map(a => a + "px")
        .join(" ")
    };
  };
};

export default getPlacements;
