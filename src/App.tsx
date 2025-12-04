import { Home } from "./pages/Home";

import "./Styles/theme.css";
import "./Styles/global.css";
import { TaskContextProvider } from "./contexts/TaskContext/TaskContextProvider";

export function App() {
  return (
    <TaskContextProvider>
      <Home />
    </TaskContextProvider>
  );
}
