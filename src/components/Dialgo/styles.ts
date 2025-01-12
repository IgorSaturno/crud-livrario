import * as Dialog from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";

export const overlayShow = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const contentShow = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const DialogOverlay = styled(Dialog.Overlay)`
  background-color: var(--black-a9);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const DialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90vw;
  max-width: 450px;
  max-height: 85vh;
  padding: 25px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  &:focus {
    outline: none;
  }
`;

export const DialogTitle = styled(Dialog.Title)`
  margin: 0;
  font-weight: 500;
  color: #6550b9;
  font-size: 24px;
`;

export const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: #65636d;
  font-size: 17px;
  line-height: 1.5;
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: none;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  &.violet {
    background-color: white;
    color: #6550b9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    &:hover {
      background-color: #f2eff3;
    }
    &:focus {
      box-shadow: 0 0 0 2px black;
    }
  }
  &.green {
    background-color: #d6f1df;
    color: #218358;
    &:hover {
      background-color: #c4e8d1;
    }
    &:focus {
      box-shadow: 0 0 0 2px #8eceaa;
    }
  }
`;

export const IconButton = styled.button`
  font-family: inherit;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  position: absolute;
  top: 10px;
  right: 10px;
  &:hover {
    background-color: #ebe4ff;
  }
  &:focus {
    box-shadow: 0 0 0 2px #c2b5f5;
  }
`;

export const Fieldset = styled.fieldset`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 15px;
  border: none;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #6550b9;
  width: 90px;
  text-align: right;
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 1;
  color: #6550b9;
  border: none;
  box-shadow: 0 0 0 1px #c2b5f5;
  height: 35px;
  &:focus {
    box-shadow: 0 0 0 2px #aa99ec;
  }
`;
