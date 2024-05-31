import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useNavigate } from "react-router-dom";
import ToastAlert from "./utils/ToastAlert";
import Landing from "./pages/Landing.page";
import Signin from "./pages/Signin.page";
import Signup from "./pages/Signup.page";
import Dashboard from "./pages/Dashboard.page";
import { createTheme, ThemeProvider } from "@mui/material";
import useStorage from "./hooks/useStorage";
import { useEffect } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Urbanist", "sans-serif"].join(","),
  },
});

const queryClient = new QueryClient();

const App = () => {
  const { getDataFromStorage } = useStorage();
  const navigate = useNavigate();

  useEffect(() => {
    const token = getDataFromStorage("userToken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastAlert />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Signin />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
