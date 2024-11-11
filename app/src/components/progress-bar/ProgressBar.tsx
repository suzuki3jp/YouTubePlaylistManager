"use client";
import {
	Card,
	CardContent,
	Grid2 as Grid,
	LinearProgress,
	Typography,
} from "@mui/material";

export const ProgressBar = ({
	message,
	completed,
	total,
}: ProgressBarProps) => {
	return (
		<Grid container>
			<Grid size={12}>
				<Card
					sx={{
						bgcolor: "grey.900",
						border: "2px solid transparent",
						borderRadius: 4,
					}}
				>
					<CardContent>
						<Typography variant="h6">{message}</Typography>
						<LinearProgress
							color="primary"
							variant="determinate"
							value={(completed / total) * 100}
							sx={{
								height: 8,
								marginTop: "0.2%",
								backgroundColor: "rgba(255,255,255,0.1)",
							}}
						/>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export interface ProgressBarProps {
	message: string;
	completed: number;
	total: number;
}
