
console.log('jestem')
const createElement = ( element ) => document.createElement(element)
const appendChild = ( parent, element ) => parent.appendChild(element)
const querySelector = ( element ) => document.querySelector(element)
const getElementById = (element ) => document.getElementById(element)
const setListLength = (length) =>{
    const list_length = getElementById('list-length')
    list_length.innerText = `długość listy:${length}`
}
const filterData = ( clicked) =>{
    let newList
    fetch('/list')
    .then(res=>res.json())
    .then(data =>{
      let list = data
      clicked.toLowerCase() !== 'wszystko'?         //if clicked is 'wszystko' then return all list else filter and return only maching 
      newList = list.list.filter(product =>{
        return product.product_select.toLowerCase() === clicked.toLowerCase() 
      }):newList = list.list
      loadData('shopping-list', newList)
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