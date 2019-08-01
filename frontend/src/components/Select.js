import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

// Styling parameters
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

/**
 * Use to wrap MenuItem components.
 * Requires a onChange (function), value (array of value to show), disabled (boolean), label (string) props.
 * onChange should edit value through the use of the event parameter (ie. e.target.value).
 * Optional prop of required (boolean).
 */
export const MultiSelect = (props) => {
    return (
        <FormControl style={{ minWidth: 120, maxWidth: 500 }}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                multiple
                renderValue={(selected) => {
                    return (
                        <Box display="flex" flexWrap="wrap">
                            {selected.map((value) => {
                                return <Chip key={value} label={value} color="primary" style={{ margin: 2 }} />;
                            })}
                        </Box>
                    );
                }}
                MenuProps={MenuProps}
                {...props}
            />
        </FormControl>
    );
};

/**
 * Use to wrap MenuItem components.
 * Requires a onChange (function), value (string to show), disabled (boolean), label (string) props.
 * onChange should edit value through the use of the event parameter (ie. e.target.value).
 * Optional prop of required (boolean).
 */
export const SingleSelect = (props) => {
    return (
        <FormControl style={{ minWidth: 120, maxWidth: 500 }}>
            <InputLabel>{props.label}</InputLabel>
            <Select
                renderValue={(selected) => {
                    return <Chip color="primary" label={selected} />;
                }}
                {...props}
            />
        </FormControl>
    );
};
