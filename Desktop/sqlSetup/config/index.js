const config={
    serverPort: 5113,
    dbUser:  "postgres",
    database:  "school_db ",
    dbPassword:  "Deepak@123",
    dbPort:  5432,
    max:  10,
    idleTimeoutMillis: process.env.IDLE_TIMEOUT || 30000,
    connectionTimeoutMillis: process.env.CONNECTION_TIMEOUT ||2000,
}

export default config;