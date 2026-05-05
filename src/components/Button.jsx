import React from "react";
import styled, { css, keyframes } from "styled-components";

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledButton = styled.button`
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  ${({ size }) => {
    if (size === "sm") return "padding: 6px 12px; font-size: 12px;";
    if (size === "lg") return "padding: 12px 20px; font-size: 16px;";
    return "padding: 8px 16px; font-size: 14px;";
  }}

  ${({ variant }) => {
    switch (variant) {
      case "secondary":
        return "background: #eee; color: #333;";
      case "ghost":
        return "background: transparent; border: 1px solid #ccc;";
      case "danger":
        return "background: #ff4d4f; color: white;";
      default:
        return "background: #1677ff; color: white;";
    }
  }}

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

const Spinner = styled.div`
  width: 14px;
  height: 14px;
  border: 2px solid white;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export default function Button({
  children,
  loading,
  disabled,
  className,
  ...props
}) {
  return (
    <StyledButton
      {...props}
      className={className}
      disabled={disabled || loading}
    >
      {loading && <Spinner />}
      {children}
    </StyledButton>
  );
}