const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const dotenv = require("dotenv");
const pino = require("pino");
dotenv.config({ path: "./config.env" });
// import routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const stripeRoutes = require("./routes/stripe");
const orderRoutes = require("./routes/order");

const PATH_PREFIX = process.env.PREFIX ? `/${process.env.PREFIX}/` : "/";

// app
const app = express();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
    },
  },
  // Path to the API DOCS
  apis: [
    "./routes/auth.js",
    "./routes/category.js",
    "./routes/order.js",
    "./routes/product.js",
    "./routes/stripe.js",
    "./routes/user.js",
  ],
};

const logger = pino({
  level: 'info',
  timestamp: () => `,"time":"${new Date().toISOString()}"`
});


const swaggerSpec = swaggerJSDoc(options);

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => logger.info("DB Connected"));

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// routes middleware
app.use(PATH_PREFIX + "api", authRoutes);
app.use(PATH_PREFIX + "api", userRoutes);
app.use(PATH_PREFIX + "api", categoryRoutes);
app.use(PATH_PREFIX + "api", productRoutes);
app.use(PATH_PREFIX + "api", stripeRoutes);
app.use(PATH_PREFIX + "api", orderRoutes);
app.use(PATH_PREFIX + "docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = process.env.PORT;

logger.info('hello elastic world');
logger.info('This is some great stuff');
logger.info('Some more entries for our logging');
logger.info('another line');
logger.info('This never stops');
logger.info('Logging logging all the way');
logger.info('I think this is enough');
logger.info('nope, one more!');


app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
