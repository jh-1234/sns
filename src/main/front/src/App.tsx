import "./App.css";
import SessionFilter from "./filters/SessionFilter";
import ModalProvider from "./provider/ModalProvider";
import RootRoute from "./RootRoute";

function App() {
  return (
    <SessionFilter>
      <ModalProvider>
        <RootRoute />
      </ModalProvider>
    </SessionFilter>
  );
}

export default App;
