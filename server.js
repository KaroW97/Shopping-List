const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser')
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname + '/dist'));
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
    'Słodycze'
  ];
  
  let products = [
  ]
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});
//List of categories and products
app.get('/list', (req,res) => {
    console.log(products)
    res.send({
        categories:categoryTypes,
        list:products
    })
})
app.post('/cos', (req,res)=>{ 
    const {product_name, product_amount, kg, szt, product_select} = req.body
    const list = {
         id:1,
         product_name,
         product_amount,
         kg,
         szt,
         product_select
    }
     products.push(list) 
   })

app.listen(port);