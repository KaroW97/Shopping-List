
console.log('jestem')
const createElement = ( element ) => document.createElement(element)
const appendChild = ( parent, element ) => parent.appendChild(element)
const querySelector = ( element ) => document.querySelector(element)
const getElementById = (element ) => document.getElementById(element)
const setListLength = (length) =>{
    const list_length = getElementById('list-length')
    list_length.innerText = `długość listy:${length}`
}
const filterData = ( clicked) =>{                           //filter data if there is a mach return if == 'wszystko' return whole list
    let newList
    fetch('/list')
    .then(res=>res.json())
    .then(data =>{
      let list = data
      clicked.toLowerCase() !== 'wszystko'?         
      newList = list.list.filter(product =>{
        return product.product_select.toLowerCase() === clicked.toLowerCase() 
      }):newList = list.list
      loadData('shopping-list', newList)
    })
   
}
const deteltePost = (id) =>{
    'use strict'
    let httpreq = new XMLHttpRequest()
    httpreq.open('DELETE','/delete-post')
    httpreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    let params ='id='+id;
    httpreq.send(params);
    fetch('/list')                               //fetching shopping list from get('/list)
     .then((res) => res.json())
     .then(data=>{
      let list = data
      loadData('shopping-list', list.list)      //invoke function, and pass shopping list 
  
    })
}
const loadData = (shopping_list_name, list ) =>{             //load data from server and attach it to HTML
    const shopping_list = getElementById(shopping_list_name)
    shopping_list.innerHTML = '';
    setListLength(list.length)
    
    const list_length = getElementById('list-length')     //length of the list with subcategory filtering. 
    list_length.innerText = `długość listy:${list.length}`
    
    list.forEach( ( product, index )=>{                  //list item styling
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
            console.log(detele.id)
           deteltePost(detele.id)
      }
    })
}
window.onload = () =>{
    fetch('/list')
    .then(res=>res.json())
    .then(data=>{
      let arr = data
  
      const section = getElementById('section');
      const header_article = getElementById('header-article')
      arr.categories.forEach( (item) => {         //filtering categories
        if( item != 'Wszystko') {                 //adding categories to select, if item is different then 'wszystko' add it as option
          const option = createElement('option');
          option.text = item
          getElementById('product_select').add(option);
        }
      
        const p = createElement('p');             //creating headers
        p.textContent = item;
        p.classList.add("space-category-article");
        p.onclick = () =>{
          filterData( p.innerText)
        }
        appendChild(header_article,p)             //append header to article and then to the section
        section.prepend(header_article)
        setListLength(arr.length)                 //set list lenght
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
  
    //send to node js
    function sendForm(event){
      event.preventDefault()
  
      let httpreq = new XMLHttpRequest()
      //params passed to express as req.body.[something]
      let params ='product_name='+name.value+'&product_amount='+
          product_amount.value + '&kg='+kg.checked + '&szt='+szt.checked +'&product_select='+product_select.value
  
      httpreq.open('POST','/cos')
      httpreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
      httpreq.onreadystatechange = function () {
        //if(httpreq.status === 200 & httpreq.readyState === 4){
        //  console.log(httpreq.responseText)
        //}
       
      }
        httpreq.send(params);
    }
    form.addEventListener('submit', sendForm, false)
  
  })(window, document)
function observe_list_changes (event){                      //when form submited fetch new data
    fetch('/list')
     .then((res) => res.json())
     .then(data=>{
      let list = data
      //invoke function, and pass shopping list 
      loadData('shopping-list', list.list)
   
     })
} 
//if form submited call function 
let form = querySelector('#form')
form.addEventListener("submit", observe_list_changes, false);