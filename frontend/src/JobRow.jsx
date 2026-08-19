// JobRow.jsx
import { CheckCircle2, Clock3, Loader, XCircle } from "lucide-react";
import { statusColorClass, statusBgClass } from "./theme";
import StatusDot from "./StatusDot";

const statusIcons = {
  active: <Loader size={16} className="animate-spin"/>,
  waiting: <Clock3 size={16} className="animate-spin" />,
  completed: <CheckCircle2 size={16}  />,
  failed: <XCircle size={16} />,
};

const JobRow = ({ job }) => {
  return (
    <div className="flex flex-1 items-center gap-2 p-2 px-4 border-b bg-panel border-border">
      <div className="shrink-0">
        <StatusDot status={job.status} />
      </div>
      <div className="basis-1/6 min-w-0 truncate px-1">{job.name}</div>
      <div className="basis-1/6 min-w-0 truncate text-text-dim">#{job.id}</div>

      <div
        className={`flex items-center gap-2 basis-1/6 min-w-0 ${statusColorClass[job.status]}`}
      >
        <div className="shrink-0">{statusIcons[job.status]}</div>
        <div className="truncate">{job.status}</div>
      </div>

      <div className="overflow-hidden h-1 rounded basis-3/6 min-w-0 bg-border">
        <div
          className={`h-1 rounded transition-[width] duration-500 ease-in-out ${statusBgClass[job.status]}`}
          style={{ width: `${job.progress}%` }}
        ></div>
      </div>

      <div
        className={`text-sm font-semibold shrink-0 ${statusColorClass[job.status]}`}
      >
        {job.progress}%
      </div>
    </div>
  );
};

export default JobRow;
