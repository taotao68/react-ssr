/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/entry.server.jsx":
/*!*************************************!*\
  !*** ./src/client/entry.server.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _router_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router/index */ \"./src/client/router/index.jsx\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ \"./src/client/store/index.jsx\");\n // ??????????????????????????????????????????\n\n // ???????????????????????????????????????????????????\n\n // ????????????????????????\n\n\n // ??????????????????????????????????????????????????????????????????????????????????????????\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ctx => {\n  return new Promise(resolve => {\n    // ??????promises???????????????????????????\n    const promises = []; // ???????????????????????????????????????????????????????????????\n\n    _router_index__WEBPACK_IMPORTED_MODULE_1__.routes.forEach(route => {\n      // ???????????????????????????????????????????????????????????????????????????\n      if (route.path === ctx.request.path && route.loadData) {\n        // ???????????????????????????\n        promises.push(route.loadData());\n      }\n    }); // ??????????????????????????????????????????????????????,??????Promise.all()?????????????????????????????????\n\n    Promise.all(promises).then(data => {\n      // ??????????????????????????????????????????????????????????????????????????????????????????\n      // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n      // ????????????redux?????????  vue?????????????????????vuex????????????\n      console.log(\"promise???all???????????????\", data[0]);\n      ctx.window = data.length && data[0].data.data; // promsie.all???????????????????????????????????????\n      // ??????????????????resolve???????????????????????????\n\n      resolve( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__.Provider, {\n        store: (0,_store__WEBPACK_IMPORTED_MODULE_4__.createServerStore)()\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.StaticRouter, {\n        location: ctx.req.url\n      }, (0,_router_index__WEBPACK_IMPORTED_MODULE_1__.RouteSwitch)())));\n    });\n  });\n});\n\n//# sourceURL=webpack://taotao-react-ssr/./src/client/entry.server.jsx?");

/***/ }),

/***/ "./src/client/pages/About/About.jsx":
/*!******************************************!*\
  !*** ./src/client/pages/About/About.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getUserInfo\": () => (/* binding */ getUserInfo)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _About_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./About.css */ \"./src/client/pages/About/About.css\");\n/* harmony import */ var _About_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_About_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ \"react-redux\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n // ???about???????????????redux????????????\n\n\nconst getUserInfo = () => {\n  return axios__WEBPACK_IMPORTED_MODULE_1___default().get('http://localhost:3000/api/getUserInfo');\n};\n\nconst About = () => {\n  // const [userInfo,setUserInfo]=useState({name:\"\"})\n  const name = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)(state => {\n    return state.name;\n  }); // ?????????????????????????????????diaptch\n\n  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {\n    // ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n    // ????????????about???????????????????????????????????????????????????????????????????????????js???????????????????????????????????????????????????????????????????????????????????????????????????????????????\n    // ??????name?????????????????????????????????????????????\n    if (!name) {\n      axios__WEBPACK_IMPORTED_MODULE_1___default().get('http://localhost:3000/api/getUserInfo').then(res => {\n        console.log('????????????', res.data.data);\n        dispatch({\n          type: 'CHANGE_DATA',\n          payload: res.data.data\n        });\n      });\n    }\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"about-page\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", null, \"About \\u9875\\u9762\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h3\", null, \"\\u59D3\\u540D\\u662F\\uFF1A\", name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__.NavLink, {\n    to: \"/\"\n  }, \"\\u8DF3\\u8F6C\\u5230Home\\u9875\\u9762\")));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (About);\n\n//# sourceURL=webpack://taotao-react-ssr/./src/client/pages/About/About.jsx?");

/***/ }),

/***/ "./src/client/pages/Home/Home.jsx":
/*!****************************************!*\
  !*** ./src/client/pages/Home/Home.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Home_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.css */ \"./src/client/pages/Home/Home.css\");\n/* harmony import */ var _Home_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Home_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nconst Home = () => {\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"div\", {\n    className: \"home-page\"\n  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(\"h2\", null, \"home\\u9875\\u9762\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__.NavLink, {\n    to: \"/about\"\n  }, \"\\u8DF3\\u8F6C\\u5230About\\u9875\\u9762\"));\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);\n\n//# sourceURL=webpack://taotao-react-ssr/./src/client/pages/Home/Home.jsx?");

/***/ }),

/***/ "./src/client/router/index.jsx":
/*!*************************************!*\
  !*** ./src/client/router/index.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RouteSwitch\": () => (/* binding */ RouteSwitch),\n/* harmony export */   \"routes\": () => (/* binding */ routes)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\n/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _pages_Home_Home__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pages/Home/Home */ \"./src/client/pages/Home/Home.jsx\");\n/* harmony import */ var _pages_About_About__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../pages/About/About */ \"./src/client/pages/About/About.jsx\");\n // Swicth?????????5???API ??????6?????????Routes\n\n // ???????????? \n\n\n // ????????????????????????????????????\n\nconst routes = [{\n  path: '/',\n  exact: true,\n  //??????????????????????????????\n  component: _pages_Home_Home__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n}, {\n  path: '/about',\n  exact: true,\n  component: _pages_About_About__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  loadData: _pages_About_About__WEBPACK_IMPORTED_MODULE_3__.getUserInfo\n}]; // ?????????????????????????????????????????????????????????????????????????????????????????????????????????????????????\n\nconst RouteSwitch = () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Switch, null, routes.map(route => {\n  const {\n    path,\n    exact,\n    component\n  } = route;\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__.Route, {\n    key: path,\n    path: path,\n    component: component,\n    exact: true\n  });\n}));\n\n//# sourceURL=webpack://taotao-react-ssr/./src/client/router/index.jsx?");

/***/ }),

/***/ "./src/client/store/index.jsx":
/*!************************************!*\
  !*** ./src/client/store/index.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createClientStore\": () => (/* binding */ createClientStore),\n/* harmony export */   \"createServerStore\": () => (/* binding */ createServerStore)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n\nconst initState = {\n  name: 'chushi'\n};\n\nfunction reducer(state = initState, action) {\n  switch (action.type) {\n    case 'CHANGE_DATA':\n      return { ...state,\n        ...action.payload\n      };\n\n    default:\n      return { ...state\n      };\n  }\n} // ???????????????????????????\n// ?????????,??????????????????????????????\n\n\nfunction createClientStore() {\n  return (0,redux__WEBPACK_IMPORTED_MODULE_0__.legacy_createStore)(reducer, window.REDUX_STORE);\n} // ?????????\n\nfunction createServerStore() {\n  return (0,redux__WEBPACK_IMPORTED_MODULE_0__.legacy_createStore)(reducer);\n}\n\n//# sourceURL=webpack://taotao-react-ssr/./src/client/store/index.jsx?");

/***/ }),

/***/ "./src/client/pages/About/About.css":
/*!******************************************!*\
  !*** ./src/client/pages/About/About.css ***!
  \******************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://taotao-react-ssr/./src/client/pages/About/About.css?");

/***/ }),

/***/ "./src/client/pages/Home/Home.css":
/*!****************************************!*\
  !*** ./src/client/pages/Home/Home.css ***!
  \****************************************/
/***/ (() => {

eval("\n\n//# sourceURL=webpack://taotao-react-ssr/./src/client/pages/Home/Home.css?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-router-dom");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
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
/******/ 				() => (module['default']) :
/******/ 				() => (module);
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
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/entry.server.jsx");
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;