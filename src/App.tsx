import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import ToastAlert from "./utils/ToastAlert";
import Landing from "./pages/Landing.page";
import Signin from "./pages/Signin.page";
import Signup from "./pages/Signup.page";
import Dashboard from "./pages/Dashboard.page";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastAlert />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
