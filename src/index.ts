import express from "express";
import cors from "cors";
import "dotenv/config";
import connectMongoDB from "./database/mongodb";
import cookieParser from "cookie-parser";

// Connect to mongoDB
connectMongoDB();
// Import routes
import yachtsRouter from "./routes/yachts.router";
import yachtBrandsRouter from "./routes/brands.router";
import userRouter from "./routes/user.router";
import countriesRouter from "./routes/country.router";
import sailingAreaRouter from "./routes/sailing-area.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/", userRouter);
app.use("/api/v1/yachts/", yachtsRouter);
app.use("/api/v1/brands/", yachtBrandsRouter);
app.use("/api/v1/countries", countriesRouter);
app.use("/api/v1/sailing-area", sailingAreaRouter);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
