import { Button } from "@mui/material";
import { Link } from "react-router";
import styled from "styled-components";

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const IconWrap = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #999;
`;

export const Label = styled.label`
  position: absolute;
  top: 6px;
  left: 40px;
  font-size: 16px;
  color: #999;
  pointer-events: none;
  transition:
    top 0.4s ease,
    bottom 0.4s ease,
    font-size 0.4s ease;
`;

export const Underline = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 0;
  background-color: #4284ff;
  transition: width 0.3s ease;
`;

export const Input = styled.input`
  padding: 10px 10px 10px 40px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #333;
  background-color: transparent;
  outline: none;
  position: relative;
  width: 300px;

  &:focus {
    border-bottom: none;
  }

  &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
    top: -10px;
    font-size: 10px;
    color: #2b87ff;
  }

  &:focus ~ ${Underline} {
    width: 100%;
  }

  &:-webkit-autofill {
    transition: background-color 7200s ease-in-out 7200s;
  }
`;

export const StyleButton = styled(Button)`
  && {
    background-color: #67c2ff;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #2d70ff;
      color: #fff;
    }
  }
`;

export const UserNavigationWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

export const UserNavigation = styled(Link)`
  font-size: small;
  color: var(--muted-foreground);

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
