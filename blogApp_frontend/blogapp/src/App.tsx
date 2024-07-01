import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
//import AllBlogs from "./pages/AllBlogs";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Provider store={store}>
        {/* <AllBlogs /> */}
        <Signup/>
      </Provider>
      
    </>
  );
}

export default App;
