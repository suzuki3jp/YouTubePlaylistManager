import { Link as MuiLink, type LinkProps as MuiLinkProps } from "@mui/material";
import type React from "react";
import type { PropsWithChildren } from "react";

/**
 * A styled link component.
 * @param param0
 * @returns
 */
export const Link: React.FC<LinkProps> = ({ href, children, sx }) => {
    return (
        <MuiLink
            href={href}
            color="text.secondary"
            sx={{
                "&:hover": { color: "primary.main", cursor: "pointer" },
                ...sx,
            }}
        >
            {children}
        </MuiLink>
    );
};

export type LinkProps = Readonly<
    PropsWithChildren<{ href: string; sx?: MuiLinkProps["sx"] }>
>;
