import React, { createContext, useContext, useState } from "react";
import styled, { keyframes } from "styled-components";

const ToastContext = createContext();

const slide = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
`;

const ToastBox = styled.div`
  background: white;
  border-left: 4px solid ${({ type }) => {
    switch (type) {
      case "error": return "red";
      case "warning": return "orange";
      case "success": return "green";
      default: return "blue";
    }
  }};
  padding: 10px 14px;
  margin-bottom: 10px;
  border-radius: 6px;
  animation: ${slide} 0.3s ease;
  min-width: 220px;
`;

const Progress = styled.div`
  height: 3px;
  background: #1677ff;
  width: 100%;
  animation: progress linear forwards;
  animation-duration: ${({ duration }) => duration}ms;

  @keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
  }
`;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (text, type = "info", duration = 3000) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, text, type, duration }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      <Container>
        {toasts.map((t) => (
          <ToastBox key={t.id} type={t.type} onClick={() => removeToast(t.id)}>
            {t.text}
            <Progress duration={t.duration} />
          </ToastBox>
        ))}
      </Container>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);