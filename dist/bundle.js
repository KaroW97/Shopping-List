/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/style.scss */ \"./src/sass/style.scss\");\n\n\nvar createElement = function createElement(element) {\n  return document.createElement(element);\n};\n\nvar appendChild = function appendChild(parent, element) {\n  return parent.appendChild(element);\n};\n\nvar querySelector = function querySelector(element) {\n  return document.querySelector(element);\n};\n\nvar getElementById = function getElementById(element) {\n  return document.getElementById(element);\n};\n\nvar setListLength = function setListLength(length, weight, pice) {\n  var list_length = getElementById('list-length');\n  list_length.querySelector('#length').innerText = \"d\\u0142ugo\\u015B\\u0107 listy: \".concat(length !== undefined ? length : 0);\n  list_length.querySelector('#list-weight').innerText = \"waga: \".concat(!isNaN(weight) ? weight : '0', \"kg\");\n  list_length.querySelector('#list-pice').innerText = \"sztuk: \".concat(!isNaN(pice) ? pice : '0');\n};\n\nvar deteltePost = function deteltePost(id) {\n  'use strict';\n\n  var httpreq = new XMLHttpRequest();\n  httpreq.open('DELETE', '/delete-post');\n  httpreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');\n  var params = 'id=' + id;\n  httpreq.send(params);\n  loadData('shopping-list'); //invoke loading shopping list , and pass name of the article \n};\n\nvar loadData = function loadData(shopping_list_name) {\n  var list_filter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  var clicked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';\n  var shopping_list = getElementById(shopping_list_name);\n  fetch('/list').then(function (res) {\n    return res.json();\n  }).then(function (data) {\n    var list = data;\n\n    if (list_filter === null) {\n      getData(list.list, shopping_list);\n    } else {\n      var newList;\n      clicked.toLowerCase() !== 'wszystko' ? newList = list.list.filter(function (product) {\n        return product.product_select.toLowerCase() === clicked.toLowerCase();\n      }) : newList = list.list;\n      getData(newList, shopping_list);\n    }\n  });\n};\n\nvar getData = function getData(data, shopping_list) {\n  //load data from server and attach it to HTML\n  shopping_list.innerHTML = '';\n  var weight = 0,\n      pice = 0;\n  data.forEach(function (product, index) {\n    //list item styling\n    product.kg === 'true' ? weight += parseInt(product.product_amount) : pice += parseInt(product.product_amount);\n    var shopping_item = createElement('article');\n    shopping_item.classList.add('shopping-list-element');\n    shopping_item.innerHTML = \"\\n      <label>\\n        Nazwa\\n        <p>\".concat(product.product_name, \"</p>\\n      </label>\\n      <label>\\n        Ilo\\u015B\\u0107/Waga\\n        <p>\").concat(product.product_amount).concat(product.kg == 'true' ? 'kg' : 'szt', \"</p>\\n      </label>\\n      <label>\\n        Kategoria\\n        <p>\").concat(product.product_select, \"</p>\\n      </label>\\n      <p class=\\\"delete-styling\\\" id=\").concat(product.id, \">\\n        &#xd7\\n      </p>\\n    \");\n    shopping_list.append(shopping_item);\n  });\n  querySelector('.center-shopping-list').querySelectorAll(\".shopping-list-element\").forEach(function (item) {\n    var detele = item.querySelector('.delete-styling');\n\n    detele.onclick = function () {\n      deteltePost(detele.id);\n    };\n  });\n  setListLength(data.length, weight, pice);\n};\n\nvar reloadData = function reloadData() {\n  loadData('shopping-list');\n};\n\nvar form = querySelector('#form'); //if form submited call function \n\nform.addEventListener(\"submit\", reloadData, false); //when form submited fetch new data\n\nwindow.onload = function () {\n  loadData('shopping-list');\n  fetch('/list').then(function (res) {\n    return res.json();\n  }).then(function (data) {\n    var arr = data;\n    var section = getElementById('section');\n    var header_article = getElementById('header-article');\n    arr.categories.forEach(function (item) {\n      //filtering categories\n      if (item != 'Wszystko') {\n        //adding categories to select, if item is different then 'wszystko' add it as option\n        var option = createElement('option');\n        option.text = item;\n        getElementById('product_select').add(option);\n      }\n\n      var p = createElement('p'); //creating headers\n\n      p.textContent = item;\n      p.classList.add(\"space-category-article\");\n\n      p.onclick = function () {\n        loadData('shopping-list', 1, p.innerText); //call load data and set list_filter on 1 to find only matching data\n      };\n\n      appendChild(header_article, p); //append header to article and then to the section\n\n      section.prepend(header_article);\n    });\n  });\n};\n\n(function readyJs(win, doc) {\n  'use strict';\n\n  var form = querySelector('#form');\n  var name = querySelector('#product_name');\n  var product_amount = querySelector('#product_amount');\n  var kg = getElementById('choice-1');\n  var szt = getElementById('choice-2');\n  var product_select = querySelector('#product_select');\n  var response = querySelector('.response');\n\n  function sendForm(event) {\n    //send to express\n    event.preventDefault();\n    var httpreq = new XMLHttpRequest();\n    var params = 'product_name=' + name.value + '&product_amount=' + //params passed to express as req.body.[something]\n    product_amount.value + '&kg=' + kg.checked + '&szt=' + szt.checked + '&product_select=' + product_select.value;\n    httpreq.open('POST', '/add-data');\n    httpreq.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');\n\n    httpreq.onreadystatechange = function () {//if(httpreq.status === 200 & httpreq.readyState === 4){\n      //  console.log(httpreq.responseText)\n      //}\n    };\n\n    httpreq.send(params);\n    getElementById('form').reset();\n  }\n\n  form.addEventListener('submit', sendForm, false);\n})(window, document);\n\nvar convert = function convert() {\n  //convert into pdf or print it \n  var win = window.open('', '', 'height=700,width=700');\n  win.document.write('<html><head>');\n  win.document.close();\n  win.print();\n};\n\nvar button = getElementById('button');\nbutton.addEventListener(\"click\", convert, false);\n\n//# sourceURL=webpack://rekrutacja-4/./src/js/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _font_Montserrat_Regular_ttf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../font/Montserrat-Regular.ttf */ \"./src/font/Montserrat-Regular.ttf\");\n// Imports\n\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_1___default()(_font_Montserrat_Regular_ttf__WEBPACK_IMPORTED_MODULE_2__.default);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"@font-face {\\n  font-family: \\\"Montserrat\\\";\\n  src: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n}\\nbody, select, input {\\n  font-family: \\\"Montserrat\\\";\\n}\\n\\n.center-page {\\n  margin-top: 3rem;\\n  display: flex;\\n  justify-content: center;\\n}\\n.center-page .form {\\n  width: 200px;\\n  border-radius: 10px;\\n  padding: 2rem 1.8rem;\\n  -webkit-box-shadow: 1px 10px 19px -1px rgba(0, 0, 0, 0.3);\\n  box-shadow: 1px 10px 19px -1px rgba(0, 0, 0, 0.3);\\n}\\n.center-page .form .block-order {\\n  flex-direction: column;\\n  justify-content: start;\\n  margin: 1.4rem 0;\\n}\\n.center-page .form .flex-order, .center-page .form .block-order {\\n  text-align: left;\\n  display: flex;\\n  margin: 1.4rem 0;\\n}\\n.center-page .form .flex-order {\\n  justify-content: space-around;\\n}\\n.center-page .form .block-order input,\\n.center-page .form .select-styling,\\n.center-page .form .button {\\n  border: none;\\n  outline: none;\\n}\\n.center-page .form .block-order input {\\n  border-bottom: 1px solid #a3a3a3;\\n  transition: all 0.5s linear;\\n}\\n.center-page .form .block-order input:focus {\\n  border-bottom: 1px solid #1de9a5;\\n}\\n.center-page .form .select-styling {\\n  width: 100%;\\n}\\n.center-page .form .button {\\n  margin-top: 1rem;\\n  background-color: #36929b;\\n  color: white;\\n  border: none;\\n  padding: 0.4rem 0;\\n  width: 100%;\\n  border-radius: 0.2rem;\\n  transition: transform 0.3s linear;\\n}\\n.center-page .form .button:hover {\\n  transform: scale(1.04);\\n  background-color: #82badb;\\n}\\n\\n.article-category {\\n  display: flex;\\n  justify-content: space-around;\\n}\\n\\n.flex-column {\\n  margin: 0 auto;\\n  width: 800px;\\n}\\n.flex-column .list-length {\\n  display: flex;\\n}\\n.flex-column .list-length p {\\n  margin-right: 1rem;\\n}\\n.flex-column .flex-start-order,\\n.flex-column .center-shopping-list {\\n  display: flex;\\n}\\n.flex-column .flex-start-order {\\n  justify-content: center;\\n}\\n.flex-column .flex-start-order .space-category-article {\\n  cursor: pointer;\\n  padding: 1.8rem;\\n  margin-bottom: 2rem;\\n  border-radius: 5px;\\n  transition: all 0.4s ease-out;\\n}\\n.flex-column .flex-start-order .space-category-article:hover {\\n  color: #45abb4;\\n}\\n.flex-column .center-shopping-list {\\n  flex-wrap: wrap;\\n  justify-content: start;\\n  align-items: center;\\n}\\n.flex-column .center-shopping-list .shopping-list-element {\\n  display: flex;\\n  position: relative;\\n  margin: 0 0.2rem 0.2rem 0;\\n  width: 49%;\\n  background-color: rgba(83, 200, 211, 0.25);\\n  box-shadow: 1px 10px 19px -6px rgba(119, 118, 118, 0.4);\\n}\\n.flex-column .center-shopping-list .shopping-list-element label {\\n  font-size: 0.8rem;\\n  margin: 1rem;\\n}\\n.flex-column .center-shopping-list .shopping-list-element label p {\\n  margin-top: 0.5rem;\\n  font-size: 1rem;\\n}\\n.flex-column .center-shopping-list .shopping-list-element .delete-styling {\\n  cursor: pointer;\\n  top: 0;\\n  margin: 0;\\n  font-size: 1.4rem;\\n  right: 0.5rem;\\n  position: absolute;\\n  transition: transform 0.15s ease-in-out;\\n}\\n.flex-column .center-shopping-list .shopping-list-element .delete-styling:hover {\\n  color: #002fff;\\n  transform: scale(1.2);\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://rekrutacja-4/./src/sass/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://rekrutacja-4/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = url && url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n'), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack://rekrutacja-4/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./src/font/Montserrat-Regular.ttf":
/*!*****************************************!*\
  !*** ./src/font/Montserrat-Regular.ttf ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__webpack_require__.p + \"fonts/Montserrat-Regular.ttf\");\n\n//# sourceURL=webpack://rekrutacja-4/./src/font/Montserrat-Regular.ttf?");

/***/ }),

/***/ "./src/sass/style.scss":
/*!*****************************!*\
  !*** ./src/sass/style.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/style.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://rekrutacja-4/./src/sass/style.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://rekrutacja-4/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/";
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/js/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;