import React, { useCallback, useState } from "react";
import { useServicesContext } from "../context/ServicesContext";
import { useSessionContext } from "../context/SessionContext";
import { TokenRequest, UserRequest } from "../types";
import { Chainable } from "../utils/chainable";
import { TextInput } from "./Inputs";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

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
  const [signupForm, setSignupForm] = useState<UserRequest>({
    email: "",
    name: "",
    phone: "",
    password: "",
    code: "",
    isHost: false,
  });

  const inputProps: Chainable<UserRequest> = new Chainable({
    value: signupForm,
    onChange: setSignupForm,
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
    <form>
      <TextInput
        {...inputProps.to("email").get()}
        label="E-mail"
        placeholderText="Need an email to contact you at"
      />
      <TextInput
        {...inputProps.to("name").get()}
        label="Name"
        placeholderText="Who are you"
      />
      <TextInput
        {...inputProps.to("phone").get()}
        label="Phone"
        placeholderText="XXX-XXX-XXXX"
      />
      <TextInput
        {...inputProps.to("password").get()}
        type="password"
        label="Password"
        placeholderText="PLEASE do not use a real password. I'm not doing anything smart with these"
      />
      <TextInput
        {...inputProps.to("code").get()}
        label="Code"
        placeholderText="Text me for the code to create a new account (if you forgot)"
      />
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          signUp(signupForm);
        }}
      >
        Submit
      </Button>
    </form>
  );
};
