import React from "react";
import { Button } from "@mui/material";
import { HIRING_FORM_DATA } from "@/src/constants/Hiring";

const Submit = () => {
    return (
        <>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
            >
                {HIRING_FORM_DATA.submit}</Button>
        </>
    );
}
export default Submit;