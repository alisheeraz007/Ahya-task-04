import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  outline: none;
`;

const Header = styled.div`
  padding: 16px;
  border-bottom: 1px solid #eee;
  font-weight: 600;
`;

const Body = styled.div`
  padding: 16px;
`;

const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid #eee;
  text-align: right;
`;

export default function Modal({
  open,
  onClose,
  title,
  footer,
  children,
  className,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "Tab") {
        const focusable = modalRef.current.querySelectorAll(
          "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );

        if (!focusable.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    setTimeout(() => {
      const firstInput = modalRef.current.querySelector(
        "button, input, select, textarea"
      );
      firstInput?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <ModalBox
        ref={modalRef}
        className={className}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <Header>{title}</Header>}

        <Body>{children}</Body>

        {footer && <Footer>{footer}</Footer>}
      </ModalBox>
    </Overlay>
  );
}