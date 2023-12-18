import { HIRING_FORM_DATA } from "@/app/constants/Hiring";
import { Button } from "@mui/material";
import React from "react";

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