import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../app/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { message, type } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "1.2rem",
        right: "1.2rem",
        minWidth: "220px",
        padding: "0.75rem 1rem",
        borderRadius: "12px",
        fontSize: "0.9rem",
        fontWeight: "500",
        color: "#ffffff",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        background:
          type === "success"
            ? "linear-gradient(135deg, #059669, #047857)"
            : type === "warning"
              ? "linear-gradient(135deg, #f59e0b, #d97706)"
              : "linear-gradient(135deg, #dc2626, #b91c1c)",
        animation: "slideIn 0.3s ease",
      }}
    >
      {message}
    </div>
  );

};

export default Notification;
