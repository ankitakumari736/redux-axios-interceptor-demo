import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WARNING_TIME = 60 * 1000; 

const SessionManager = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("sessionExpiry");
    navigate("/login");
  };

  useEffect(() => {
    const expiry = localStorage.getItem("sessionExpiry");
    if (!expiry) return;

    const expiryTime = Number(expiry);
    const now = Date.now();
    const remaining = expiryTime - now;

    if (remaining <= 0) {
      logout();
      return;
    }

    const warningDelay = Math.max(remaining - WARNING_TIME, 0);

    const warningTimer = setTimeout(() => {
      setShowModal(true);
    }, warningDelay);

    const logoutTimer = setTimeout(() => {
      logout();
    }, remaining);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
    };
  }, []);

  return (
    <>
      {showModal && (
        <div className="session-backdrop">
          <div className="session-modal">
            <h3>Session Expiring</h3>
            <p>Your session will expire in 1 minute.</p>
            <button onClick={logout}>OK</button>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionManager;