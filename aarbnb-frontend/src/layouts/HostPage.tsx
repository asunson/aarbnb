import React, { useEffect, useState } from 'react';
import { AppRequest, RequestService } from '../types';

interface HostPageProps {
    requestService: RequestService
}

export const HostPage: React.FC<HostPageProps> = (props) => {
    const { requestService } = props;

    const [requests, setRequests] = useState<AppRequest[]>([]);


    useEffect(() => {
        requestService.getRequests()
            .then(setRequests)

    }, [requestService]);

    return <>
        {
            requests.map((request) => {
                return <div key={request.id} className="flex">
                    <div>{request.subject}</div>
                    <div>{request.description}</div>
                    <div>{request.timestamp}</div>
                    <div>{request.user}</div>
                </div>
            })
        }
    </>
}