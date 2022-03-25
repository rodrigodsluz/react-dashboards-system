/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

export const useAttachModal = () => {
  const [isShownAttachModal, setIsAttachShownModal] = useState(false);
  const toggleAttachModal = () => setIsAttachShownModal(!isShownAttachModal);
  return {
    isShownAttachModal,
    toggleAttachModal,
  };
};
