import dotenv from 'dotenv';

import app from './app.js';
import connectDB from './db/db.js';

dotenv.config();

connectDB()
.then( () => {
    app.on("err", (err) => {
        console.log("Error: ", err);
    });
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
})
.catch( (err) => {
    console.log('Database connection failed', err);
});