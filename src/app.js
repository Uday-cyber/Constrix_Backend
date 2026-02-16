import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const rawCorsOrigin = process.env.CORS_ORIGIN?.trim();
const corsOrigin = !rawCorsOrigin || rawCorsOrigin === "*"
    ? true
    : rawCorsOrigin.includes(",")
        ? rawCorsOrigin.split(",").map((origin) => origin.trim()).filter(Boolean)
        : rawCorsOrigin;

app.use(cors(
    {
        origin: corsOrigin,
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
