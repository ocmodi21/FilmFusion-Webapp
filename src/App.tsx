import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import ToastAlert from "./utils/ToastAlert";
import Landing from "./pages/Landing.page";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastAlert />
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
};

export default App;
