const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipes-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made.
    // get an array of recipes here.
    const recipe = require("./data.json");

    // CREATE I.
    Recipe.create(recipe)
      .then((createDocument) => {
        console.log("Success!!");
        recipe.forEach((entry) => {
          console.log("createDocumented : ", entry.title);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    // CREATE II.
    Recipe.insertMany(recipe)
      .then((createDocument) => {
        console.log("Success!!");
        recipe.forEach((entry) => {
          console.log("createDocumented : ", entry.title);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    // UPDATE.
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    )
      .then((updateDocument) => {
        console.log("updated document ===>", updateDocument);
      })
      .catch((error) => {
        console.log(error);
      });

    // REMOVE DATA.
    Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {
      console.log("Delete the document !");
    });

    Recipe.remove({ title: "Carrot Cake" });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
