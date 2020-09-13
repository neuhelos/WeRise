export const apiURL = () => {
    return window.location.hostname === "localhost" ? "http://localhost:3001" : "https://we-rise-app.herokuapp.com";
    };