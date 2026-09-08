import { useEffect, useMemo, useRef, useState } from "react";
import { COLORS, statusBgClass, statusColorClass } from "./theme";
import JobRow from "./JobRow";
import { Radio } from "lucide-react";
import DepthRow from "./DepthRow";
import BootSequence from "./BootSequence";
import axios from "axios";
import { useJobSocket } from "./customHooks/useJobSocket";

function App() {
  const [jobs, setJobs] = useState([]);

  const status = [
    {
      id: 1,
      name: "waiting",
      key: "PENDING",
    },
    {
      id: 2,
      name: "active",
      key: "RUNNING",
    },
    {
      id: 3,
      name: "done",
      key: "COMPLETED",
    },
    // {
    //   id: 4,
    //   name: "failed",
    //   key: "FAILED",
    // },
    {
      id: 5,
      name: "dead_letter",
      key: "DEAD_LETTER",
    },
  ];

  const [clock, setClock] = useState(Date.now());
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const jobRef = useRef(jobs);
  const total = jobs.length;

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_SCHEDULER_SERVICE_URL}/scheduler-service/api/v1/jobs`,
      );
      const jobs = response.data.data ?? [];
      setJobs(jobs);
      setIsLoading(false);
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    jobRef.current = jobs;
  }, [jobs]);

  useEffect(() => {
    const timeId = setInterval(() => {
      setClock(Date.now());
    }, 1000);

    return () => {
      clearInterval(timeId);
    };
  }, []);

  useJobSocket(setJobs);

  if (isLoading) {
    return <BootSequence onDone={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen p-8 font-mono text-sm bg-bg text-text">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-6">
        <div className="tracking-wider">$ myEventScheduler</div>
        <div className="flex items-center justify-between gap-4 ">
          <div className="flex items-center gap-2  text-active animate-pulse">
            <span>
              <Radio size={16} />
            </span>
            <span>live</span>
          </div>
          <div className="text-text-dim">
            {new Date(clock).toLocaleTimeString()}
          </div>
        </div>
      </div>
      {/* Stat Strip  */}
      <div className="bg-panel border border-border p-4 mb-6 rounded">
        <div className="grid grid-cols-4 gap-4 mb-6">
          {status.map((stat) => (
            <DepthRow
              key={stat.id}
              label={stat.name}
              statusKey={stat.key}
              count={jobs.filter((j) => j.status === stat.key).length}
              total={total}
            />
          ))}
        </div>
        <div className="flex rounded overflow-hidden ">
          {status.map((stat) => {
            const percentage =
              (jobs.filter((j) => j.status === stat.key).length / total) * 100;
            return (
              <div
                className={`h-2 transition-[width] duration-500 ease-in-out ${statusBgClass[stat.key]}`}
                key={stat.id}
                style={{
                  width: `${percentage}%`,
                }}
              ></div>
            );
          })}
        </div>
      </div>
      {/* job list  */}
      <div className="flex flex-col mb-6 rounded overflow-y-auto scrollbar-thin scroll-smooth scrollbar-thumb-text scrollbar-track-bg  border border-border h-100 ">
        {jobs.map((job) => (
          <JobRow key={job.id} job={job} />
        ))}
      </div>

      {/* log panel */}
      <div className="border rounded flex flex-col items-start justify-center gap-4 p-4 mb-6 bg-panel border-border">
        <div className="text-xs uppercase tracking-wider text-text-dim">
          EVENT LOG
        </div>
        <div className="flex flex-col text-xs  tracking-wider ">
          {logs.slice(logs.length - 6).map((log, index) => (
            <div className="flex gap-4 mb-1 " key={log.id}>
              <div className="text-text-dim">
                {new Date(log.time).toLocaleTimeString()}
              </div>
              <div className="text-active/60">{log.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
