import express from 'express';
import http from 'http';
import api from './api/index.js';
import session from 'express-session';
import passport from "./api/v1/services/passportService.js";
const app = express();

app.use(express.json());
app.use(
    session({
        secret:"abcdef",
        resave:false,
        saveUninitialized:false,
    })
)
app.use(express.urlencoded({ extended: false }));
const server = http.createServer(app);

app.use(passport.initialize());
app.use(passport.session());

const PORT = 5113;
app.use('/api', api);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});