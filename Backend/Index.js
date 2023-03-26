var express = require("express");
var Sequelize = require("sequelize");
var db = require("./db.config");
var cors = require("cors");
var nodemailer = require("nodemailer");
var app = express();
app.use(cors());
app.use(express.json());

// Logic for Sending Mail to the Specified Email
var transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sujitkumarverma1230@gmail.com",
    pass: "Papa@7941",
  },
});

var mailOptions = {
  from: "sujitkumarverma1230@gmail.com",
  to: "sujitkumarverma1226@gmail.com",
  subject: "Congratulations Order Placed",
  text: `
     Hi Customer

     Your Order is Placed Successfully.
     Thank you for Shopping with us.

     Thanks and Regards 
     Flipkart
     `,
};

// Creating Sequelize Refernece
const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
  host: db.HOST,
  dialect: db.dialect,
  pool: {
    max: db.pool.max,
    min: db.pool.min,
    acquire: db.pool.acquire,
    idle: db.pool.idle,
  },
});

// Defining User Table Schema for Storing Users Details
let userTable = sequelize.define(
  "User",
  {
    name: Sequelize.STRING,
    email: {
      primaryKey: true,
      type: Sequelize.STRING,
    },
    mobileNo: Sequelize.STRING,
    address: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

userTable
  .sync()
  .then(() => {
    console.log("Created/Connected  UserTable");
  })
  .catch((err) => {
    console.log("Unable to Create/Connect with the UserTable ");
  });

//Defining NewProducts Table for Products Details
let productsTable = sequelize.define(
  "NewProducts",
  {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: Sequelize.STRING,
    price: Sequelize.FLOAT,
    description: Sequelize.STRING,
    category: Sequelize.STRING,
    image: Sequelize.STRING,
    rating: Sequelize.FLOAT,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

productsTable
  .sync()
  .then(() => {
    console.log("Created/Connected  ProductsTable");
  })
  .catch((err) => {
    console.log("Unable to Create/Connect with the ProductsTable ");
  });

const work = () => {
  return "It is Working";
};

//Fetching Product Details
app.get("/productsitems", (req, res) => {
  productsTable
    .findAll({ raw: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      strErr = "Error in Fetching Details from EmployeeTable" + err;
      res.send(strErr);
    });
});

//Fetching Indivisual Product Details
app.get("/productsitems/:productId", (req, res) => {
  const prodId = req.params.productId;
  productsTable
    .findAll({ raw: true, where: { id: prodId } })
    .then((data) => {
      res.send(data[0]);
    })
    .catch((err) => {
      strErr = "Error in Fetching Details from EmployeeTable" + err;
      res.send(strErr);
    });
});

//Pushing Users Details into the User Table while registeration
app.post("/customers", (req, res) => {
  names = req.body.name;
  email = req.body.email;
  mobileNo = req.body.mobileNo;
  address = req.body.address;
  password = req.body.password;

  let UserOj = userTable.build({
    name: names,
    email: email,
    mobileNo: mobileNo,
    address: address,
    password: password,
  });
  UserOj.save()
    .then((data) => {
      strResult = "Records Inserted Succesfully";
      res.send(strResult);
    })
    .catch((err) => {
      strErr = "Unable to Insert Record" + err;
      res.send(strErr);
    });
});

// Fetching Users Details for Login
app.get("/customers", (req, res) => {
  userTable
    .findAll({ raw: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      strErr = "Error in Fetching Details from EmployeeTable" + err;
      res.send(strErr);
    });
});

// Making get Request for Sending Mail
app.get("/order", (req, res) => {
  transport
    .sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail Sent " + info.response);
        return info.response;
      }
    })
    .then((data) => {
      console.log(data);
      res.status(200).send("Order Placed");
    });
});

app.listen(3000, () => {
  console.log("Server Started at Port 3000");
});
