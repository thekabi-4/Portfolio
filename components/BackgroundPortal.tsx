import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface BackgroundPortalProps {
  children: React.ReactNode;
}

const BackgroundPortal: React.FC<BackgroundPortalProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(children, document.body);
};

export default BackgroundPortal;
