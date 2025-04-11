import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll to the top only when the pathname changes
// (i.e., when navigating to a new page), not on every render or state change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
