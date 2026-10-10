import { app } from "./app.js";
import { sequelize } from "./config/database.js";
import { env } from "./config/env.js";
import { defineAssociations } from "./models/associations.js";

// Import models so Sequelize registers them.
import "./modules/bicycles/bicycle.model.js";
import "./modules/brands/brand.model.js";
import "./modules/bicycle-details/bicycle-detail.model.js";
import "./modules/customers/customer.model.js";
import "./modules/orders/order.model.js";
import "./modules/order-items/order-item.model.js";

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