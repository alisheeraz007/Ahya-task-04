import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 16px;
  width: 100%;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
`;

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ error }) => (error ? "#ff4d4f" : "#d9d9d9")};
  border-radius: 6px;
  padding: 8px 10px;
  transition: border 0.2s;

  &:focus-within {
    border-color: ${({ error }) => (error ? "#ff4d4f" : "#1677ff")};
  }
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-size: 14px;
  background: transparent;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const HelperText = styled.p`
  margin-top: 4px;
  font-size: 12px;
  color: ${({ error }) => (error ? "#ff4d4f" : "#888")};
`;

export default function Input({
  label,
  helperText,
  error,
  icon,
  className,
  id,
  ...props
}) {
  const inputId = id || `input-${Math.random()}`;

  return (
    <Wrapper className={className}>
      {label && <Label htmlFor={inputId}>{label}</Label>}

      <FieldWrapper error={error}>
        {icon && <IconWrapper>{icon}</IconWrapper>}

        <StyledInput
          id={inputId}
          aria-invalid={!!error}
          {...props}
        />
      </FieldWrapper>

      {(helperText || error) && (
        <HelperText error={error}>
          {error || helperText}
        </HelperText>
      )}
    </Wrapper>
  );
}