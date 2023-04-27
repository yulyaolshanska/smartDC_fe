import { useLocation } from 'react-router-dom';
import { Location } from 'history';

const useAvoidRenderOnPaths = (
  pathsStart: string[],
  pathsExact: string[],
): boolean => {
  const location: Location = useLocation();
  if (
    pathsStart.some((path) => location.pathname.startsWith(path))
    || pathsExact.some((path) => location.pathname === path)
  ) { return true; }

  return false;
};

export default useAvoidRenderOnPaths;
