import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap/lib/InputGroup';
import { useServicesContext } from '../context/ServicesContext';
import { useTokenContext } from '../context/TokenContext';

export const Header: React.FC = () => {
    const {tokenService} = useServicesContext();
    const {removeToken} = useTokenContext();

    const logout = useCallback(() => {
        tokenService.removeToken().then(_ => {
            removeToken();
        })
        .catch(e => console.error(e))
    }, [tokenService, removeToken])

    return <div className="App-header">
        <div>
            Aarbnb
        </div>
        <Button onClick={logout}>Logout</Button>
    </div>
}