import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material"

export default function Banner() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    
    return(
        <h1>Banner</h1>
    )
}