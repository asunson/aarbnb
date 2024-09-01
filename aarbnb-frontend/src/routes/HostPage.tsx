import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useServicesContext } from "../context/ServicesContext";
import { AppRequest } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export const HostPage: React.FC = () => {
  const { requestService } = useServicesContext();
  const [appRequests, setAppRequests] = useState<AppRequest[]>([]);

  useEffect(() => {
    requestService
      .getRequests()
      .then((requests) => setAppRequests(requests))
      .catch((e) => console.log(e));
  }, [requestService]);

  return (
    <div className="flex flex-col max-h-screen overflow-auto">
      {appRequests.map((a) => (
        <div key={a.id}>
          <Card>
            <CardHeader>
              <CardTitle>{a.subject}</CardTitle>
              <CardDescription>
                {a.user}-{formatTimestamp(a.timestamp)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{a.description}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

const formatTimestamp = (timestamp?: number): string => {
  return DateTime.fromMillis(timestamp ?? 0).toLocaleString(
    DateTime.DATETIME_MED
  );
};
