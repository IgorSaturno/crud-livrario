import styled from "styled-components";

export const Form = styled.form`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #6550b9;
  width: 90%;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

export const Input = styled.input`
  width: 100%;
  flex: 1;
  padding: 0 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 12px;
  line-height: 1;
  color: #6550b9;
  border: none;
  box-shadow: 0 0 0 1px #c2b5f5;
  height: 35px;
  &:focus {
    box-shadow: 0 0 0 2px #aa99ec;
  }

  &::placeholder {
    color: #6550b9;
  }
`;

export const Textarea = styled.textarea`
  min-height: 120px;
  width: 100%;
  resize: vertical;
  border-radius: 4px;
  border: none;
  padding: 10px 10px;
  box-shadow: 0 0 0 1px #c2b5f5;
  outline: none;
  font-size: 12px;
  color: #6550b9;

  &:focus {
    border-color: #c4b5fd;
    box-shadow: 0 0 0 2px #aa99ec;
  }
`;
