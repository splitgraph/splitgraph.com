import * as React from "react";
import { Box } from "@material-ui/core";
import type { SxProps } from "@material-ui/system";
import type { Theme } from "@material-ui/core/styles";

export interface IRenderPopoutButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export type PopoutAnchorPositionString =
  | "topLeft"
  | "topRight"
  | "bottom"
  | "bottomRight"
  | "bottomLeft";

export type PopoutAnchorPosition =
  | PopoutAnchorPositionString
  | [
      PopoutAnchorPositionString,
      PopoutAnchorPositionString,
      PopoutAnchorPositionString
    ];

export interface IPopoutBoxRef {
  toggleOpen: () => void;
}
export interface IPopoutBoxProps {
  renderButton: (opts: IRenderPopoutButtonProps) => React.ReactNode;
  children?: React.ReactNode;
  popoutContainerStyle?: SxProps<Theme>;
  anchorPosition?: PopoutAnchorPosition;
  buttonProps?: any;
  popoutBoxRef?: React.RefObject<IPopoutBoxRef>;
}

const getAnchorPositionStyle = (pos?: PopoutAnchorPosition): object => {
  const posInitial = {
    top: "initial",
    bottom: "initial",
    left: "initial",
    right: "initial",
  };

  const posMap = {
    topLeft: {
      ...posInitial,
      bottom: "100%",
      right: "100%",
    },
    topRight: {
      ...posInitial,
      bottom: "100%",
      left: "100%",
    },
    bottom: {
      ...posInitial,
      top: "100%",
    },
    bottomRight: {
      ...posInitial,
      top: "100%",
      left: "100%",
    },
    bottomLeft: {
      ...posInitial,
      top: "100%",
      right: "100%",
    },
  };

  if (Array.isArray(pos)) {
    return {
      top: [posMap[pos[0]].top, posMap[pos[1]].top, posMap[pos[2]].top],
      bottom: [
        posMap[pos[0]].bottom,
        posMap[pos[1]].bottom,
        posMap[pos[2]].bottom,
      ],
      left: [posMap[pos[0]].left, posMap[pos[1]].left, posMap[pos[2]].left],
      right: [posMap[pos[0]].right, posMap[pos[1]].right, posMap[pos[2]].right],
    };
  } else if (pos) {
    return posMap[pos];
  }

  return posInitial;
};

const containerStyle: SxProps<Theme> = {
  display: "inline",
  position: "relative",
};

const PopoutBox = ({
  children,
  renderButton,
  popoutContainerStyle = {},
  anchorPosition,
  buttonProps = {},
  popoutBoxRef,
}: IPopoutBoxProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<IPopoutBoxRef & HTMLDivElement>(null);

  React.useImperativeHandle(popoutBoxRef, () => ({
    toggleOpen: () => {
      setIsOpen(!isOpen);
    },
  }));

  const anchorPositionStyle = getAnchorPositionStyle(anchorPosition);

  const mergedPopoutContainerStyle: SxProps<Theme> = {
    zIndex: 10,
    position: "absolute",
    boxShadow: "0 0 1rem rgba(0, 0, 0, .5)",
    ...anchorPositionStyle,
    ...popoutContainerStyle,
  };

  // When user clicks outside of container, close the popout
  const handleDocumentClick = (e: any) => {
    if (containerRef.current && containerRef.current.contains(e.target)) {
      return;
    }

    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleEscapeKey = (e: any) => {
    if (!containerRef.current) {
      return;
    }

    // ESC key
    if (e.keyCode !== 27) {
      return;
    }

    if (isOpen) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    if (!isOpen) {
      return;
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isOpen, handleDocumentClick]);

  const mainButton = renderButton({
    isOpen,
    onClick: () => {
      setIsOpen(!isOpen);
    },
    ...buttonProps,
  });

  return (
    <Box ref={containerRef} sx={containerStyle}>
      {mainButton}
      {isOpen && <Box sx={mergedPopoutContainerStyle}>{children}</Box>}
    </Box>
  );
};

export default PopoutBox;
