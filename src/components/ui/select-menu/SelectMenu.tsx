import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from "@mui/material";
import type React from "react";

/**
 * A select menu component.
 * @param param0
 * @returns
 */
export const SelectMenu: React.FC<SelectMenuProps> = ({
    label,
    value,
    items,
    onChange,
}) => {
    const handleOnChange = (event: SelectChangeEvent<string>) => {
        const item = items.find((item) => item.value === event.target.value);
        if (item) {
            onChange(item);
        }
    };

    return (
        <FormControl size="small" fullWidth>
            {label ? <InputLabel>{label}</InputLabel> : null}
            <Select value={value} onChange={handleOnChange}>
                {items.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export type SelectMenuProps = Readonly<{
    /**
     * The label that display when the select menu items are not selected.
     */
    label?: string;

    /**
     * The value of the selected item.
     */
    value: string;

    /**
     * The items that can be selected.
     */
    items: SelectMenuItem[];

    /**
     * The callback function that is called when the selected item is changed.
     */
    onChange: (value: SelectMenuItem) => void;
}>;

export type SelectMenuItem = Readonly<{
    value: string;
    label: string;
}>;
