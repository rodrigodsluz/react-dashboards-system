import { useState } from 'react';

const useChangeComponent = () => {
  const [isShown, setIsShown] = useState(false);
  const toggle = () => setIsShown(!isShown);
  return {
    isShown,
    toggle,
  };
};

export default useChangeComponent;
