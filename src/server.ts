import { app } from "./app";
import { sequelize } from "./config/database";
import { env } from "./config/env";
import { defineAssociations } from "./models/associations";

// Import models so Sequelize registers them.
import "./modules/bicycles/bicycle.model";
import "./modules/brands/brand.model";
import "./modules/bicycle-details/bicycle-detail.model";
import "./modules/customers/customer.model";
import "./modules/orders/order.model";

async function startServer() {
  try {

    defineAssociations();

    await sequelize.authenticate();

    console.log("MySQL connection established.");

    // Synchronize the models with the database.
    await sequelize.sync();

    // await sequelize.sync({ force: true }).then(() => {
    //   console.log("Database synchronized.");
    // });

    console.log("Models synchronized.");

    app.listen(env.PORT, () => {
      console.log(
        `Server running at http://localhost:${env.PORT}`
      );
    });

  } catch (error) {

    console.error(
      "Failed to start the application:",
      error
    );

    process.exit(1);
  }
}

startServer();