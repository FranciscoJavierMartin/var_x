import React, { useEffect, useState } from 'react';

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);
  const key = isClient ? 'client' : 'server';

  useEffect(() => {
    setIsClient(true);
  }, []);

  return { isClient, key };
};
