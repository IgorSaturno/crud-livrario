import styled from "styled-components";
import * as Tabs from "@radix-ui/react-tabs";

export const TabsContent = styled(Tabs.Content)`
  flex-grow: 1;
  padding: 20px;
  background-color: white;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  outline: none;
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

export const TabsRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
  min-width: 480px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
`;

export const TabsList = styled(Tabs.List)`
  flex-shrink: 0;
  display: flex;
  border-bottom: 1px solid #dbd8e0;
`;

export const TabsTrigger = styled(Tabs.Trigger)`
  all: unset;
  font-family: inherit;
  background-color: white;
  padding: 0 20px;
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 1;
  color: #65636d;
  user-select: none;
  &:first-child {
    border-top-left-radius: 6px;
  }
  &:last-child {
    border-top-right-radius: 6px;
  }
  &:hover {
    background-color: #f2eff3;
  }
  &[data-state="active"] {
    color: #6550b9;
    font-weight: 500;
    background: #f2eff3;
    box-shadow: inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor;
  }
  &:focus {
    position: relative;
    box-shadow: 0 0 0 2px black;
  }
`;
