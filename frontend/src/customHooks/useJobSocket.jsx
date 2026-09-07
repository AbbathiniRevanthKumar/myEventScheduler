import { useEffect } from "react";

export const useJobSocket = (setJobs) => {
  useEffect(() => {
    let reconnectTimeOut;
    let connection;
    const connect = () => {
      connection = new WebSocket("ws://localhost:9002");
      connection.onmessage = (event) => {
        // console.log(event);
        try {
          const data = JSON.parse(event.data);
          if (data.type === "JOB_STATUS_CHANGE") {
            setJobs((prev) =>
              prev.map((job) =>
                job.id === data.payload.jobId
                  ? { ...job, status: data.payload.status }
                  : job,
              ),
            );
          }
          if (data.type === "JOB_CREATED") {
            setJobs((prev) => {
                const prevJobs = [...prev];
                prevJobs.unshift(data.payload);
                return prevJobs;
            });
          }
        } catch (error) {
          console.log("Error at parsing job data", error);
          setJobs((prev) => prev);
          return;
        }
      };

      connection.onclose = () => {
        console.log("ws disconnected , reconnecting in 3s...");
        reconnectTimeOut = setTimeout(connect, 3000);
      };
    };
    connect();
    return () => {
      clearTimeout(reconnectTimeOut);
      connection.onclose = null;
      connection.close();
    };
  }, []);
};
