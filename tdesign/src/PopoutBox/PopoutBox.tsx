// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

export interface IRenderPopoutButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export type PopoutAnchorPosition =
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft';

export interface IPopoutBoxProps {
  renderButton: (opts: IRenderPopoutButtonProps) => React.ReactNode;
  children?: React.ReactNode;
  popoutContainerStyle?: SystemStyleObject;
  anchorPosition?: PopoutAnchorPosition;
}

const getAnchorPositionStyle = (
  pos?: PopoutAnchorPosition
): SystemStyleObject => {
  const style = {} as SystemStyleObject;

  if (pos === 'topLeft') {
    style.bottom = '100%';
    style.right = '100%';
  } else if (pos === 'topRight') {
    style.bottom = '100%';
    style.left = '100%';
  } else if (pos === 'bottomRight') {
    style.top = '100%';
    style.left = '100%';
  } else if (pos === 'bottomLeft') {
    style.top = '100%';
    style.right = '100%';
  }

  return style;
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
