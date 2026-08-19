import { useEffect, useMemo, useRef, useState } from "react";
import { COLORS, statusBgClass, statusColorClass } from "./theme";
import JobRow from "./JobRow";
import { Radio } from "lucide-react";
import DepthRow from "./DepthRow";
import BootSequence from "./BootSequence";

function App() {
  const [jobs, setJobs] = useState([
    { id: "a1x9f", name: "send-welcome-email", status: "active", progress: 40 },
    { id: "b2y10", name: "resize-thumbnail", status: "waiting", progress: 0 },
    { id: "c3z21", name: "sync-crm-contact", status: "failed", progress: 30 },
    {
      id: "d4a33",
      name: "generate-invoice-pdf",
      status: "active",
      progress: 20,
    },
    {
      id: "e5b44",
      name: "backup-database",
      status: "completed",
      progress: 100,
    },
  ]);

  const status = [
    {
      id: 1,
      name: "waiting",
      key: "waiting",
    },
    {
      id: 2,
      name: "active",
      key: "active",
    },
    {
      id: 3,
      name: "done",
      key: "completed",
    },
    {
      id: 4,
      name: "failed",
      key: "failed",
    },
  ];

  const [clock, setClock] = useState(Date.now());
  const [logs, setLogs] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const jobRef = useRef(jobs);
  const total = jobs.length;

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newLogs = [];
      const nextJobs = () => {
        const current = jobRef.current;
        const activeJobs = current.filter((job) => job.status === "active");
        if (activeJobs.length === 0) return current;
        const nextActiveJob =
          activeJobs[Math.floor(Math.random() * activeJobs.length)];
        const next = current.map((job) => {
          if (job.id !== nextActiveJob.id) return job;

          const updatedJob = { ...job, progress: job.progress + 25 };
          if (updatedJob.progress >= 100) {
            newLogs.push({
              id: crypto.randomUUID(),
              text: `job.completed ${nextActiveJob.name} id=${nextActiveJob.id}`,
              time: Date.now(),
            });
            updatedJob.status = "completed";
            updatedJob.progress = 100;
          }

          return updatedJob;
        });

        if (activeJobs.length > 1) return next;

        const waitingJobs = next.filter((job) => job.status === "waiting");
        if (waitingJobs.length === 0) return next;
        const oldestWaitingJob = waitingJobs.shift();

        newLogs.push({
          id: crypto.randomUUID(),
          text: `job.started ${oldestWaitingJob.name} id=${oldestWaitingJob.id}`,
          time: Date.now(),
        });

        const updatedJobs = next.map((job) => {
          if (job.id !== oldestWaitingJob.id) return job;
          return { ...job, status: "active", progress: 5 };
        });
        return updatedJobs;
      };
      setJobs(nextJobs());
      if (newLogs.length) setLogs((prev) => [...prev, ...newLogs]);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  if(isLoading){
    return <BootSequence onDone={()=>setIsLoading(false)}/>
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
      <div className="flex flex-col mb-6 rounded overflow-hidden border border-border">
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
