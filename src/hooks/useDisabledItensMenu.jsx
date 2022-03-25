import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function useDisabledItensMenu() {
  const userPermissions = useSelector((state) => state.User.user);
  const [disabledItens, setDisabledItens] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleDisabledMenus = useCallback(() => {
    if (userPermissions) {
      const { admin } = userPermissions;
      if (admin) {
        setIsAdmin(true);
      }
      if (process.env.REACT_APP_DASHBOARD_LIMITED_GROUP) {
        const isValid = userPermissions?.groups.filter(
          (elem) => elem.id
            === parseInt(process.env.REACT_APP_DASHBOARD_LIMITED_GROUP, 10),
        );
        if (isValid?.length > 0 && !admin) {
          setDisabledItens(true);
        } else if (isValid?.length > 0 && admin) {
          setDisabledItens(false);
        }
      }
    }
  }, [userPermissions]);

  useEffect(() => {
    handleDisabledMenus();
  }, [userPermissions]);

  return { disabledItens, isAdmin };
}

export default useDisabledItensMenu;
