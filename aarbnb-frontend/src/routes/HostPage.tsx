import React, { useEffect, useState } from 'react';
import { RestApplicationClient } from '../services/requestService';
import { AppRequest } from '../types/types';
import { Card } from 'react-bootstrap';
import { DateTime } from 'luxon';

interface HostPageProps {
    requestService: RestApplicationClient
}

export const HostPage: React.FC<HostPageProps> = (props) => {
    const { requestService } = props;
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