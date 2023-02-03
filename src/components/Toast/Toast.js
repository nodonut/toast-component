import React from "react";
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from "react-feather";

import { ToastContext } from "../ToastProvider/ToastProvider";
import VisuallyHidden from "../VisuallyHidden";

import styles from "./Toast.module.css";

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, message, id }) {
  const Icon = ICONS_BY_VARIANT[variant];
  const dismissToastButtonRef = React.useRef();
  const { dismissToast } = React.useContext(ToastContext);

  React.useEffect(() => {
    dismissToastButtonRef.current.focus();
  }, []);

  return (
    <div className={`${styles.toast} ${styles[variant]}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant}</VisuallyHidden>
        {message}
      </p>
      <button
        ref={dismissToastButtonRef}
        className={styles.closeButton}
        onClick={() => dismissToast(id)}
        aria-label="Dismiss message"
        aria-live="off"
      >
        <X size={24} aria-hidden />
      </button>
    </div>
  );
}

export default Toast;
