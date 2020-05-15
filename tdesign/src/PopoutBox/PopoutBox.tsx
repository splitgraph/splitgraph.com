// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

export interface IRenderPopoutButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export type PopoutAnchorPositionString =
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomRight'
  | 'bottomLeft';

export type PopoutAnchorPosition =
  | PopoutAnchorPositionString
  | [
      PopoutAnchorPositionString,
      PopoutAnchorPositionString,
      PopoutAnchorPositionString
    ];

export interface IPopoutBoxProps {
  renderButton: (opts: IRenderPopoutButtonProps) => React.ReactNode;
  children?: React.ReactNode;
  popoutContainerStyle?: SystemStyleObject;
  anchorPosition?: PopoutAnchorPosition;
}

const getAnchorPositionStyle = (
  pos?: PopoutAnchorPosition
): SystemStyleObject => {
  const posInitial = {
    top: 'initial',
    bottom: 'initial',
    left: 'initial',
    right: 'initial',
  };

  const posMap = {
    topLeft: {
      ...posInitial,
      bottom: '100%',
      right: '100%',
    },
    topRight: {
      ...posInitial,
      bottom: '100%',
      left: '100%',
    },
    bottom: {
      ...posInitial,
      top: '100%',
    },
    bottomRight: {
      ...posInitial,
      top: '100%',
      left: '100%',
    },
    bottomLeft: {
      ...posInitial,
      top: '100%',
      right: '100%',
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
    } as SystemStyleObject;
  } else if (pos) {
    return posMap[pos] as SystemStyleObject;
  }

  return posInitial as SystemStyleObject;
};

const containerStyle = {
  display: 'inline',
  position: 'relative',
} as SystemStyleObject;

export default ({
  children,
  renderButton,
  popoutContainerStyle = {},
  anchorPosition,
}: IPopoutBoxProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const anchorPositionStyle = getAnchorPositionStyle(anchorPosition);

  const mergedPopoutContainerStyle = {
    zIndex: 10,
    position: 'absolute',
    boxShadow: 'hovering',
    ...anchorPositionStyle,
    ...popoutContainerStyle,
  } as SystemStyleObject;

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
    if (typeof window === 'undefined') {
      return;
    }

    if (!isOpen) {
      return;
    }

    document.addEventListener('mousedown', handleDocumentClick);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [isOpen, handleDocumentClick]);

  const mainButton = renderButton({
    isOpen,
    onClick: () => {
      setIsOpen(!isOpen);
    },
  });

  return (
    <Box ref={containerRef} sx={containerStyle}>
      {mainButton}
      {isOpen && <Box sx={mergedPopoutContainerStyle}>{children}</Box>}
    </Box>
  );
};
