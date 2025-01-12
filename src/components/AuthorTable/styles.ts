import styled, { keyframes } from "styled-components";

import * as Dialog from "@radix-ui/react-dialog";

const contentShow = keyframes`
  from { opacity: 0; transform: translate(-50%, -48%) scale(0.96); }
  to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
`;

export const Table = styled.table`
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;

  text-align: left;

  th,
  td {
    padding: 10px;
    border: none;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  td:last-child {
    text-align: center;
  }
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
  color: #211f26;
  font-size: 23px;
`;

export const DialogDescription = styled(Dialog.Description)`
  margin: 10px 0 20px;
  color: #65636d;
  font-size: 15px;
  line-height: 1.5;
`;

export const ContainerButtonAuthorTable = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

export const ButtonAuthorTable = styled.button`
  border: none;
  background: none;
`;
