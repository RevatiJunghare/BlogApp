import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import AllBlogs from "./pages/AllBlogs";

function App() {
  return (
    <>
      <Provider store={store}>
        <AllBlogs />
      </Provider>
      
    </>
  );
}

export default App;
