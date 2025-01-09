import * as Select from "@radix-ui/react-select";
import styled from "styled-components";

export const SelectTrigger = styled(Select.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px;
  border-radius: 4px;
  background-color: white;
  width: 100%;
  color: #6550b9;
  box-shadow: 0 0 0 1px #c2b5f5;
  height: 35px;
  &:focus {
    box-shadow: 0 0 0 2px #aa99ec;
  }
`;

export const SelectContent = styled(Select.Content)`
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  max-height: 200px;
  overflow-y: auto;
`;

export const StyledItem = styled(Select.Item)`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
`;

export const Form = styled.form`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const Label = styled.label`
  font-size: 15px;
  color: #6550b9;
  width: 90%;
  display: flex;
  align-items: center;
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
