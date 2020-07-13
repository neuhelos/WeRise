import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    fontSize: '16px',
                    fontFamily: 'Roboto, sans-serif',
                    margin: 0,
                    padding: 0,
                    height: '100vh',
                },
                body: {
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.5rem',
                }
            },
        },
    },
    palette: {
        primary: {
            main: "#3f51b5",
        }
    }
});