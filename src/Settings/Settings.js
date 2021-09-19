import React from "react";
import Content from "../pages/dashboard/Content";
import Typography from "@material-ui/core/Typography";
import PalettePicker from "../theme/PalettePicker";

export default function ({currentTheme, setCurrentTheme}) {
    return (
        <Content>
            <Typography variant="h3"> Settings </Typography>
            <Typography variant="h6"> Theme Color </Typography>
            <PalettePicker
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
            />
        </Content>
    );
}
