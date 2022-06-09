import React, { useEffect, useRef, FC, ReactNode, MutableRefObject } from 'react';

interface IClickOutside {
  className?: string,
  onClose: () => void,
  children: ReactNode,
  visible: boolean,
  exceptRef?: MutableRefObject<HTMLElement> | MutableRefObject<HTMLElement>[] | null
}

const ClickOutside: FC<IClickOutside> = ({ className = '', onClose, children, visible, exceptRef }) => {
  const outside = useRef<HTMLDivElement>(null);

  const hidePopUp = (event: MouseEvent) => {
    if (outside.current !== null && event.target instanceof HTMLElement) {
      const cont = outside.current.contains(event.target);

      let isExecpted = false;

      if (exceptRef) {
        if (Array.isArray(exceptRef)) {
          // TODO create logic for Execept array
        } else {
          if (exceptRef.current.contains(event.target)) {
            isExecpted = true;
          }
        }
      }

      if (!cont && !isExecpted) {
        onClose();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('click', hidePopUp);

    return () => {
      document.removeEventListener('click', hidePopUp);
    };
  }, []);

  if (!visible) {
    return null
  }

  return (
    <div ref={outside} className={className + ' click-outside-wrap'}>
      {children}
    </div>
  );
};

export default ClickOutside;
