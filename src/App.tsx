// src/App.tsx
import { ScrollToTop } from "./components/common/ScrollToTop";
import { useAxiosInterceptors } from "./hooks/useAxiosInterceptors";
import RoutesComponent from "./routes/Routes";

export default function App() {
  useAxiosInterceptors();
  return (
    <>
      <ScrollToTop />
      <RoutesComponent />
    </>
  );
}
