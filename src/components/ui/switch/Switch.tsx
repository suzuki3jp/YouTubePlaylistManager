import {
	FormControlLabel,
	Switch as MuiSwitch,
	type SwitchProps as MuiSwitchProps,
} from "@mui/material";
import type React from "react";

/**
 * A switch component.
 * It is a wrapper of the MuiSwitch component.
 * It is used to toggle the state of a single setting.
 * @param param0
 * @returns
 */
export const Switch: React.FC<SwitchProps> = ({
	label,
	checked,
	onChange,
	required,
	sx,
}) => {
	return (
		<FormControlLabel
			label={label}
			control={<MuiSwitch checked={checked} onChange={onChange} />}
			required={required}
			sx={sx}
		/>
	);
};

export type SwitchProps = Readonly<{
	/**
	 * The label of the switch.
	 * It will be displayed on the right side of the switch.
	 */
	label: string;

	/**
	 * The state of the switch.
	 * If `true`, the switch is checked.
	 */
	checked: MuiSwitchProps["checked"];

	/**
	 * The callback function that is called when the state of the switch is changed.
	 */
	onChange: MuiSwitchProps["onChange"];

	/**
	 * If `true`, the switch is required.
	 * The switch label will be displayed with "*" at the end.
	 */
	required?: boolean;

	sx?: MuiSwitchProps["sx"];
}>;
