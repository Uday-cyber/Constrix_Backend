import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// app.use('/', (req, res) => { res.send('Server is live') });

//Routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/users", userRoutes);


//Error Middleware
import errorMiddleware from "../src/middlewares/error.middleware.js";

app.use(errorMiddleware);


export default app;