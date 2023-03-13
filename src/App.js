import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Display from "./components/Display";
import Error from "./components/Error";
import FormComponent from "./components/FormComponent";

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<FormComponent />} errorElement={<Error />} />
        <Route path="/display" element={<Display />} errorElement={<Error />} />
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
