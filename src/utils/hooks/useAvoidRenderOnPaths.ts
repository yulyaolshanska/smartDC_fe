import { useLocation } from 'react-router-dom';
import { Location } from 'history';

const useAvoidRenderOnPaths = (
  pathsStart: string[],
  pathsExact: string[]
): boolean => {
  const location: Location = useLocation();
  return pathsStart.some((path) => location.pathname.startsWith(path));
};

export default useAvoidRenderOnPaths;
