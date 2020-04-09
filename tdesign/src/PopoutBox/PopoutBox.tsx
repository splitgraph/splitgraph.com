// @jsx jsx
// @ts-ignore
import { jsx, Box, SystemStyleObject } from 'theme-ui';
import * as React from 'react';

export interface IRenderButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export type PopoutAnchorPosition =
  | 'topLeft'
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft';

export interface IPopoutBoxProps {
  renderButton: (opts: IRenderButtonProps) => React.ReactNode;
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

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (!isOpen) {
      return;
    }

    document.addEventListener('mousedown', handleDocumentClick);

    return () => {
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
