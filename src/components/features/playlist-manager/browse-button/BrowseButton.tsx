"use client";
import type { Playlist } from "@/actions";
import { NonUpperButton } from "@/components";
import { useT } from "@/hooks";
import { Search as BrowseIcon } from "@mui/icons-material";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";

/**
 * The browse button component in PlaylistController.
 * @param param0
 * @returns
 */
export const BrowseButton: React.FC<BrowseButtonProps> = ({
	selectedItems,
}) => {
	const { t } = useT();

	const oldQuery = useSearchParams();
	const router = useRouter();

	const handleOnClick = async () => {
		const newQuery = new URLSearchParams(oldQuery);
		const targetIds = selectedItems.slice(0, 3).map((p) => p.id);
		newQuery.set("id", targetIds.join(","));

		router.push(`?${newQuery.toString()}`);
	};

	return (
		<NonUpperButton
			variant="contained"
			startIcon={<BrowseIcon />}
			onClick={handleOnClick}
		>
			{t("button.browse")}
		</NonUpperButton>
	);
};

export type BrowseButtonProps = Readonly<{
	selectedItems: Playlist[];
}>;
