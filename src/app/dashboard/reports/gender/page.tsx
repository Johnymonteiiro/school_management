import { ChartArea } from "lucide-react";
import { Chart } from "./chart";

export default async function Reports() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <ChartArea className="stroke-blue-500" />
            <strong className="ml-2">Student Metrics</strong>
          </div>
        </div>

        <div className="flex justify-center items-center min-h-[300px]">
          <Chart />
        </div>
      </div>
    </div>
  );
}
