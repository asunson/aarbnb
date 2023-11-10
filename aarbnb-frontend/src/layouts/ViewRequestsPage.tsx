import React, { useEffect, useState } from "react";
import { RequestService } from "../services/restApplicationClient";
import { AppRequest } from "../types";

interface ViewRequestsPageProps {
  requestService: RequestService;
}

export const ViewRequestsPage: React.FC<ViewRequestsPageProps> = (props) => {
  const { requestService } = props;

  const [allRequests, setAllRequests] = useState<AppRequest[]>([]);

  useEffect(() => {
    requestService
      .getRequests()
      .then((requests) => setAllRequests(requests))
      .catch((e) => console.log(e));
  }, [requestService]);

  return (
    <>
      {allRequests.map((request) => (
        <div key={request.user + request.timestamp}></div>
      ))}
    </>
  );
};
