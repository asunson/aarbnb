import React, { useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { useServicesContext } from "../context/ServicesContext";
import { useSessionContext } from "../context/SessionContext";
import { TokenRequest, UserRequest } from "../types";

export const LoginPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);

  // TODO: add loading state
  return showLogin ? (
    <LoginView setShowLogin={setShowLogin} />
  ) : (
    <SignUpView setShowLogin={setShowLogin} />
  );
};

interface LoginViewProps {
  setShowLogin: (value: boolean) => void;
}

const LoginView: React.FC<LoginViewProps> = (props) => {
  const { setShowLogin } = props;
  const { tokenService } = useServicesContext();
  const { saveToken, setUser } = useSessionContext();
  const form = useForm<TokenRequest>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const login = useCallback(
    (tokenRequest: TokenRequest) => {
      tokenService
        .getToken(tokenRequest)
        .then((response) => {
          saveToken(response.token);
          setUser(response?.user ?? null);
        })
        .catch((e) => console.error(e));
    },
    [saveToken, setUser, tokenService]
  );
  const onSubmit: SubmitHandler<TokenRequest> = login;

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
        <Button onClick={() => setShowLogin(false)}>Sign-up</Button>
      </form>
    </Form>
  );
};

const SignUpView: React.FC<{ setShowLogin: (value: boolean) => void }> = (
  props
) => {
  const { setShowLogin } = props;
  const { userService } = useServicesContext();

  const form = useForm<UserRequest>({
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      code: "",
      isHost: false,
    },
  });

  const signUp = useCallback(
    (request: UserRequest) => {
      userService
        .createUser(request)
        .then((_) => {
          setShowLogin(true);
        })
        .catch((e) => console.error(e));
    },
    [userService, setShowLogin]
  );

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(signUp)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="Need an email to contact you at"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Who are you?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="XXX-XXX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="PLEASE do not use a real password. I'm not doing anything smart with these"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="Text me for the code to create a new account (if you forgot)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
