// StatusDot.jsx
import { statusBgClass } from "./theme";

const dotPulseClass = {
  RUNNING: "bg-active/60",
  PENDING: "bg-waiting/60",
  COMPLETED: "bg-completed/60",
  FAILED: "bg-failed/60",
};

const StatusDot = ({ status }) => {
  return (
    <span className="relative inline-flex w-2 h-2">
      {status === "active" && (
        <span className={`absolute inset-0 rounded-full animate-ping ${dotPulseClass[status]}`} />
      )}
      <span className={`relative w-2 h-2 rounded-full ${statusBgClass[status]}`} />
    </span>
  );
};

export default StatusDot;