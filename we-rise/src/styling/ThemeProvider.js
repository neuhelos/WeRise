import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    fontSize: '16px',
                    margin: 0,
                    padding: 0,
                    height: '100vh',
                },
                body: {
                    height: '100%',
                    fontFamily: 'audiowide',
                    fontSize: '1rem',
                    fontWeight: 400,
                    lineHeight: '1.5rem',
                    backgroundColor: '#121212',
                    color: '#FFFFFF'
                }
            },
        },
    },
});