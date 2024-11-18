"use client";
import { ProgressBar } from "@/components";
import { Grid2 as Grid } from "@mui/material";

export const OperationProgress = ({ tasks }: OperationProgressProps) => {
	const taskArray = Array.from(tasks.entries());
	if (taskArray.length === 0) return <></>;

	return (
		<Grid container spacing={2} size={12}>
			{taskArray.map(([id, data]) => (
				<ProgressBar
					key={id}
					message={data.message}
					completed={data.completed}
					total={data.total}
				/>
			))}
		</Grid>
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
