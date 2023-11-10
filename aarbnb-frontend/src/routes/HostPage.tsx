import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { useServicesContext } from '../context/ServicesContext';
import { AppRequest } from '../types';

export const HostPage: React.FC = () => {
    const { requestService } = useServicesContext();
    const [appRequests, setAppRequests] = useState<AppRequest[]>([]);

    useEffect(() => {
        requestService.getRequests().then(
            requests => setAppRequests(requests)
        )
            .catch(e => console.log(e))
    }, [requestService])

    return <>
        {appRequests.map(a => <div key={a.id}>
            <Card className='mbs'>
                <Card.Body>
                    <Card.Title>
                        {a.subject}
                    </Card.Title>
                    <Card.Subtitle>
                        {formatTimestamp(a.timestamp)}
                    </Card.Subtitle>
                    <Card.Text>
                        {a.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>)}
    </>
}

const formatTimestamp = (timestamp?: number): string => {
    return DateTime.fromMillis(timestamp ?? 0).toLocaleString(DateTime.DATETIME_MED)
}