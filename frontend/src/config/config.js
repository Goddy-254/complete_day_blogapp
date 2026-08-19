const config = {
    development: {
        apiUrl: "http://localhost:3003"
    },
    production: {
        apiUrl: import.meta.env.VITE_API_URL || ""
    }
};

export default config;