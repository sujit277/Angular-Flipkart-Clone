var express = require("express");
var Sequelize = require("sequelize");
var db = require("./db.config");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize(db.DB, db.USER, db.PASSWORD, {
    host: db.HOST,
    dialect: db.dialect,
    pool: {
        max: db.pool.max,
        min: db.pool.min,
        acquire: db.pool.acquire,
        idle: db.pool.idle
    }
});

let productsTable = sequelize.define('NewProducts', {
    id: {
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    title: Sequelize.STRING,
    price: Sequelize.FLOAT,
    description: Sequelize.STRING,
    category: Sequelize.STRING,
    image:Sequelize.STRING,
    rating:Sequelize.FLOAT,
}, {
    timestamps: false,
    freezeTableName: true
});

app.post("/insertProduct",(req,res)=>{
    id = req.body.id;
    title = req.body.title;
    price = req.body.price;
    description = req.body.description;
    category = req.body.category;
    image = req.body.image;
    rating = req.body.rating;

    let ProOj = productsTable.build({id:id,title:title,price:price,description:description,category:category,image:image,rating:rating});
    ProOj.save().then((data)=>{
        strResult = "Records Inserted Succesfully";
        res.status(201).send(strResult);
    }).catch((err)=>{
        strResult = ("Unable to Insert Record"+err);
        res.send(strErr);
    })
})

productsTable.sync().then(() => {
    console.log("Created/Connected  ProductsTable");
}).catch((err) => {
    console.log("Unable to Create/Connect with the ProductsTable ");
})

app.listen(3000,()=>{
    console.log("Server is Started at Port 3000");
})