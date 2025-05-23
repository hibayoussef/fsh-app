import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../store/useAuthStore";
import { _AuthApi } from "../services/auth.service";
import type { ILoginDTO, ILoginRequest } from "../types/auth";
import { useSignInValidation } from "../pages/AuthPages/validations/useAuthValidation";
import { AxiosResponse } from "axios";

export const useLogin = () => {
  const { signInSchema } = useSignInValidation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const { register, handleSubmit, formState } = useForm<ILoginRequest>({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors } = formState;

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (input: ILoginRequest) => {
      const res = await _AuthApi.login(input);
      return res;
    },
    onSuccess: (response: AxiosResponse<ILoginDTO>) => {
      login(response.data, response.headers.token);
      navigate("/home");
    },
    onError: (error) => {
      console.error("Error logging in:", error);
    },
  });

  const onSubmit: SubmitHandler<ILoginRequest> = (input) => {
    mutate(input);
  };

  return {
    errors,
    isPending,
    error,
    onSubmit,
    register,
    handleSubmit,
  };
};
