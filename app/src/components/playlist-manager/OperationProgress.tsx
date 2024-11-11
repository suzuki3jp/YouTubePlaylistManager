"use client";
import { ProgressBar } from "@/components";

export const OperationProgress = ({ tasks }: OperationProgressProps) => {
	const taskArray = Array.from(tasks.entries());
	if (taskArray.length === 0) return <></>;

	return (
		<>
			{taskArray.map(([id, data]) => (
				<ProgressBar
					key={id}
					message={data.message}
					completed={data.completed}
					total={data.total}
				/>
			))}
		</>
	);
};

export interface OperationProgressData {
	message: string;
	completed: number;
	total: number;
}

export interface OperationProgressProps {
	tasks: Map<string, OperationProgressData>;
}
