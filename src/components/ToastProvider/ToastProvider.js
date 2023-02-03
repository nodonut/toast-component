import React from "react";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = React.createContext();

function ToastProvider({ children } = {}) {
  const [toasts, setToasts] = React.useState([]);
  const value = React.useMemo(
    () => ({ toasts, createToast, dismissToast }),
    [toasts]
  );

  const handleEscape = React.useCallback(() => {
    setToasts(() => []);
  }, []);

  useKeyDown("Escape", handleEscape);

  function dismissToast(id) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  function createToast(message, variant) {
    const nextToast = {
      id: crypto.randomUUID(),
      variant,
      message,
    };
    setToasts((prevToasts) => [...prevToasts, nextToast]);
  }

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
}

export default ToastProvider;
