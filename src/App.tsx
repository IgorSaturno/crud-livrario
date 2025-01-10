import { DialogAuthor, DialogBook } from "./components/Dialgo";
import Tabs from "./components/Tabs";
import { GlobalStyles } from "./styles/global";
import styled from "styled-components";
import { AppProvider } from "./Api/Context/AppContext";

const ContainerButton = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 10px;
`;

function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <ContainerButton>
        <DialogAuthor />
        <DialogBook />
      </ContainerButton>
      <Tabs />
    </AppProvider>
  );
}

export default App;
