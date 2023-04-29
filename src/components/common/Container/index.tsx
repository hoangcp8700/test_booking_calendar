import clsx from 'clsx';
import React from 'react';

interface ContainerProps {
  children?: React.ReactNode;
  fullScreen?: boolean;
  className?: string;
  noPaddingMobile?: boolean;
  noPaddingTopBottom?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  fullScreen,
  noPaddingTopBottom,
  noPaddingMobile,
  className,
  children,
}) => (
  <section
    className={clsx(
      'mx-auto xl:px-6 2xl:px-28 2xl:max-w-screen-2xl',
      noPaddingMobile ? 'sm:px-4' : 'px-4',
      !noPaddingTopBottom && 'pt-10 pb-28',
      fullScreen && 'px-0',
      className,
    )}
  >
    {children}
  </section>
);

export default Container;
