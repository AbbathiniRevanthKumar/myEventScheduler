import { statusColorClass } from "./theme";

function blockBar(count, total, size = 24) {
  const filled = total === 0 ? 0 : Math.round((count / total) * size);
  return "▓".repeat(filled) + "░".repeat(size - filled);
}
const DepthRow = ({ label, statusKey, count, total }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-xs">
      <span className="uppercase tracking-wider text-text-dim">{label}</span>
      <span className={`font-semibold text-lg ${statusColorClass[statusKey]}`}>
        {count}
      </span>
    </div>
    <div
      className={`text-xs leading-none tracking-widest overflow-hidden whitespace-nowrap ${statusColorClass[statusKey]}`}
    >
      {blockBar(count, total)}
    </div>
  </div>
);

export default DepthRow;
