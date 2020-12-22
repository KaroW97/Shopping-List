import "../sass/style.scss";
const createElement = ( element ) => document.createElement(element)
const appendChild = ( parent, element ) => parent.appendChild(element)
const querySelector = ( element ) => document.querySelector(element)
const getElementById = (element ) => document.getElementById(element)
const setListLength = (length, weight, pice) =>{
    const list_length = getElementById('list-length')
    list_length.querySelector('#length').innerText = `długość listy: ${length!== undefined ? length: 0}`
    list_length.querySelector('#list-weight').innerText = `waga: ${!isNaN(weight) ? weight: '0'}kg`
    list_length.querySelector('#list-pice').innerText = `sztuk: ${!isNaN(pice) ? pice: '0'}`
}
const deteltePost = (id) =>{
    'use strict'
    let httpreq = new XMLHttpRequest()
    httpreq.open('DELETE','/delete-post')
    httpreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    let params ='id='+id;
    httpreq.send(params);
    loadData('shopping-list')                   //invoke loading shopping list , and pass name of the article 
}
const loadData = (shopping_list_name, list_filter = null, clicked ='') =>{             
  const shopping_list = getElementById(shopping_list_name)
    fetch('/list')
    .then(res=>res.json())
    .then(data =>{
      let list = data
      if(list_filter === null){
        getData(list.list, shopping_list)
      }else{
        let newList 
        clicked.toLowerCase() !== 'wszystko'?         
          newList = list.list.filter(product =>{
            return product.product_select.toLowerCase() === clicked.toLowerCase() 
          }):
          newList = list.list
        getData(newList, shopping_list)
      }
    })
  
}
const getData = (data, shopping_list) =>{             //load data from server and attach it to HTML
  shopping_list.innerHTML = '';
  let weight = 0,  pice = 0;
  data.forEach( ( product, index )=>{                  //list item styling
    product.kg === 'true' ?
      weight += parseInt(product.product_amount) : 
      pice += parseInt(product.product_amount)

    const shopping_item = createElement('article')
    shopping_item.classList.add('shopping-list-element')
    shopping_item.innerHTML = `
      <label>
        Nazwa
        <p>${product.product_name}</p>
      </label>
      <label>
        Ilość/Waga
        <p>${product.product_amount}${product.kg =='true' ? 'kg': 'szt'}</p>
      </label>
      <label>
        Kategoria
        <p>${product.product_select}</p>
      </label>
      <p class="delete-styling" id=${product.id}>
        &#xd7
      </p>
    `
    shopping_list.append(shopping_item)
  })
    querySelector('.center-shopping-list').querySelectorAll(".shopping-list-element").forEach(item=>{
      let detele = item.querySelector('.delete-styling')
      detele.onclick = () =>{
          deteltePost(detele.id)
      }
    })
   setListLength(data.length, weight, pice)
}
const reloadData = () =>{
  loadData('shopping-list')
}
let form = querySelector('#form')                                       //if form submited call function 
form.addEventListener("submit", reloadData  , false);    //when form submited fetch new data

window.onload = () =>{
    loadData('shopping-list') 
    fetch('/list')
    .then(res=>res.json())
    .then(data=>{
      let arr = data
      const section = getElementById('section');
      const header_article = getElementById('header-article') 
      arr.categories.forEach( (item) => {                 //filtering categories
        if( item != 'Wszystko') {                         //adding categories to select, if item is different then 'wszystko' add it as option
          const option = createElement('option');
          option.text = item
          getElementById('product_select').add(option);
        }
        const p = createElement('p');                       //creating headers
        p.textContent = item;
        p.classList.add("space-category-article");
        p.onclick = () =>{
          loadData('shopping-list', 1, p.innerText )      //call load data and set list_filter on 1 to find only matching data
        }
        appendChild(header_article,p)                     //append header to article and then to the section
        section.prepend(header_article)
      })
    })
}
(function readyJs(win, doc){
    'use strict'
    let form = querySelector('#form')
    let name = querySelector('#product_name')
    let product_amount =querySelector('#product_amount')
    let kg = getElementById('choice-1') 
    let szt =  getElementById('choice-2')
    let product_select = querySelector('#product_select')
    let response = querySelector('.response')

    function sendForm(event){                                               //send to express
      event.preventDefault()
      let httpreq = new XMLHttpRequest()
      let params ='product_name='+name.value+'&product_amount='+            //params passed to express as req.body.[something]
          product_amount.value + '&kg='+kg.checked + '&szt='+szt.checked +'&product_select='+product_select.value
  
      httpreq.open('POST','/add-data')
      httpreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      httpreq.onreadystatechange = function () {
        //if(httpreq.status === 200 & httpreq.readyState === 4){
        //  console.log(httpreq.responseText)
        //}
       
      }
        httpreq.send(params);
        getElementById('form').reset()
    }
    form.addEventListener('submit', sendForm, false)
})(window, document)

const convert = () =>{                                                  //convert into pdf or print it 
    var win = window.open('', '', 'height=700,width=700')
    win.document.write('<html><head>')
    win.document.close(); 
    win.print();
}
let button =  getElementById('button')
button.addEventListener("click", convert, false);