import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";

const BootSequence = ({ onDone }) => {
  const bootLines = [
    "connecting to redis://localhost:6379...",
    "queue.ready name=default",
    "worker.connected pool=default concurrency=5",
    "syncing job history...",
    "myEventScheduler ready",
  ];

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= bootLines.length) {
      const t = setTimeout(onDone, 1000); // brief pause on the final line before switching
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleCount((v) => v + 1), 1000);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div className="fixed inset-0 bg-panel flex items-center justify-center flex-col ">
      <div className="flex flex-col items-start">
        {bootLines.slice(0, visibleCount).map((line, i) => (
          <div
            className="font-mono text-active text-sm flex  items-center gap-2"
            key={i}
          >
            <div>{line}</div>
            {i === visibleCount - 1 && visibleCount < bootLines.length && (
              <Loader className="animate-spin" size={16} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BootSequence;
