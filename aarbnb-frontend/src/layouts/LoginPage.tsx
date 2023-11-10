import React, { useCallback, useState } from "react";
import { Button } from "react-bootstrap/lib/InputGroup";
import { useServicesContext } from "../context/ServicesContext";
import { useTokenContext } from "../context/TokenContext";
import { TokenRequest } from "../types";
import { TextInput } from "./Inputs";

export const LoginPage: React.FC = () => {
    const {tokenService} = useServicesContext();
    const {saveToken} = useTokenContext();
    const [loginForm, setLoginForm] = useState<TokenRequest>({email: '', password: ''});
    // TODO: add loading state
    const login = useCallback((tokenRequest: TokenRequest) => {
        tokenService.getToken(tokenRequest).then(response => {
            saveToken(response.token)
        }).catch((e) => console.error(e))
    }, [saveToken, tokenService]);

    return <>
        <TextInput
            value={loginForm.email}
            onChange={(email: string) => setLoginForm({
                ...loginForm,
                email
            })}
            label="E-mail"
        />
        <TextInput
            value={loginForm.password}
            onChange={(password: string) => setLoginForm({
                ...loginForm,
                password
            })}
            label="Password"
            type="password"
        />
        <Button type="submit" onClick={() => login(loginForm)}>
            Submit
        </Button>
    </>
}