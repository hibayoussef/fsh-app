import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../interceptor";

export const useAxiosInterceptors = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);
};
