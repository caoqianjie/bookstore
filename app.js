var express = require('express');
var books = [
    {name:'nodejs',price:20,id:1,count:1},
    {name:'angularjs',price:40,id:2,count:1},
    {name:'vuejs',price:30,id:3,count:1},
    {name:'reactjs',price:100,id:4,count:1},
    {name:'bootstrapjs',price:55,id:5,count:1}
];
var app = express();
app.listen(process.env.PORT || 3000);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.get('/',function (req, res) {
    res.sendFile('./bookStore.html',{root:__dirname});
});
app.route('/book').get(function (req, res) {
    res.send(books)
}).post(function (req, res) {
    var newBook = req.body;
    newBook.id = books[books.length-1].id+1;
    newBook.count = 1;
    books.push(newBook);
    res.send({});
});
app.route('/book/:id').get(function (req, res) {
    var id = req.params.id;
    var book = books.find(function (item) {
        if(item.id == id) {
            return item;
        }
    });
    res.send(book);
}).put(function (req, res) {
    var id= req.params.id;
    var newBook = req.body;
    books = books.map(function (item) {
        if(item.id == id) {
            return newBook
        }
        return item;
    });
    res.send(newBook);
}).delete(function (req,res) {
    var id = req.params.id;
    books = books.filter(function (item) {
        return item.id!=id;
    });
    res.send({});
});
module.exports = app;
