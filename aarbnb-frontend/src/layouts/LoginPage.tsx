import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap";
import { useServicesContext } from "../context/ServicesContext";
import { useSessionContext } from "../context/SessionContext";
import { TokenRequest, UserRequest } from "../types";
import { Chainable } from "../utils/chainable";
import { TextInput } from "./Inputs";

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
  const [loginForm, setLoginForm] = useState<TokenRequest>({
    email: "",
    password: "",
  });
  const { tokenService } = useServicesContext();
  const { saveToken, setUser } = useSessionContext();

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

  return (
    <>
      <TextInput
        value={loginForm.email}
        onChange={(email: string) =>
          setLoginForm({
            ...loginForm,
            email,
          })
        }
        label="E-mail"
      />
      <TextInput
        value={loginForm.password}
        onChange={(password: string) =>
          setLoginForm({
            ...loginForm,
            password,
          })
        }
        label="Password"
        type="password"
      />
      <Button type="submit" onClick={() => login(loginForm)}>
        Log-in
      </Button>
      <Button onClick={() => setShowLogin(false)}>Sign-up</Button>
    </>
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
    <>
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
      <Button type="submit" onClick={() => signUp(signupForm)}>
        Submit
      </Button>
    </>
  );
};
