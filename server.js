const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser')
var uniqid = require('uniqid');
app.use(express.static(__dirname + '/dist'));       // the __dirname is the current directory from where the script is running
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({    
    extended: false
}));
const categoryTypes = [
    'Wszystko',
    'Warzywa', 
    'Owoce', 
    'Nabiał', 
    'Pieczywo', 
    'Snaksy',
    'Napoje'
];
  
let products = [
]
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
app.get('/list', (req,res) => {             //List of categories and products
    res.send({
        categories:categoryTypes,
        list:products
    })
})
app.post('/add-data', (req,res)=>{          //Add data to product list nad git it unique id 
    const {product_name, product_amount, kg, szt, product_select} = req.body
    const list = {
         id:uniqid(),
         product_name,
         product_amount,
         kg,
         szt,
         product_select
    }
     products.push(list) 
})
app.delete('/delete-post', (req,res) => {   // Return only those information which id is not equal to req.body.id 
    products = products.filter(product => product.id !== req.body.id)
    res.send({
        categories:categoryTypes,
        list:products
    })
})
app.listen(port);