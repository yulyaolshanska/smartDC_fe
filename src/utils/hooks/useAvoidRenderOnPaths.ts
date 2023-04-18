import { useLocation } from 'react-router-dom';
import { Location } from 'history';

const useAvoidRenderOnPaths = (paths: string[]): boolean => {
  const location: Location = useLocation();
  return paths.some((path) => location.pathname.startsWith(path));
};

export default useAvoidRenderOnPaths;
