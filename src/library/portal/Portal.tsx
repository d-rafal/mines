import { useEffect, useLayoutEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Portal.module.scss";

interface PortalProps {
  children: React.ReactNode;
  setIsPortalAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

const Portal = ({ children, setIsPortalAdded }: PortalProps) => {
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null
  );

  useEffect(() => {
    if (portalContainer) {
      setIsPortalAdded(true);
    }
  }, [portalContainer, setIsPortalAdded]);

  useLayoutEffect(() => {
    const container = document.createElement("div");
    container.classList.add(styles.root);

    document.body.appendChild(container);

    setPortalContainer(container);

    return () => {
      setIsPortalAdded(false);
      document.body.removeChild(container);
    };
  }, [setIsPortalAdded]);

  if (portalContainer === null) {
    return null;
  }

  return ReactDOM.createPortal(children, portalContainer);
};

export default Portal;
