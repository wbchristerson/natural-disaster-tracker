(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[11],{622:function(e,r,t){"use strict";t.d(r,"a",(function(){return d}));var c=t(44),n=t(20),o=t(159),s=t(1),a=t.n(s),i=t(621),l=function(e){var r=e.name,t=e.text,s=Object(o.a)(e,["name","text"]),a=r?"https://coreui.io/react/docs/components/".concat(r):e.href;return Object(n.jsx)("div",{className:"card-header-actions",children:Object(n.jsx)(i.eb,Object(c.a)(Object(c.a)({},s),{},{href:a,rel:"noreferrer noopener",target:"_blank",className:"card-header-action",children:Object(n.jsx)("small",{className:"text-muted",children:t||"docs"})}))})},d=a.a.memo(l)},625:function(e,r){!function(e,r){for(var t in r)e[t]=r[t]}(r,function(e){var r={};function t(c){if(r[c])return r[c].exports;var n=r[c]={i:c,l:!1,exports:{}};return e[c].call(n.exports,n,n.exports,t),n.l=!0,n.exports}return t.m=e,t.c=r,t.d=function(e,r,c){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:c})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var c=Object.create(null);if(t.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var n in e)t.d(c,n,function(r){return e[r]}.bind(null,n));return c},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r,t){"use strict";t.r(r),t.d(r,"deepObjectsMerge",(function(){return c})),t.d(r,"getColor",(function(){return i})),t.d(r,"getStyle",(function(){return a})),t.d(r,"hexToRgb",(function(){return l})),t.d(r,"hexToRgba",(function(){return d})),t.d(r,"makeUid",(function(){return j})),t.d(r,"omitByKeys",(function(){return b})),t.d(r,"pickByKeys",(function(){return u})),t.d(r,"rgbToHex",(function(){return h}));var c=function e(r,t){for(var c=0,n=Object.keys(t);c<n.length;c++){var o=n[c];t[o]instanceof Object&&Object.assign(t[o],e(r[o],t[o]))}return Object.assign(r||{},t),r},n=function(){for(var e={},r=document.styleSheets,t="",c=r.length-1;c>-1;c--){for(var n=r[c].cssRules,o=n.length-1;o>-1;o--)if(".ie-custom-properties"===n[o].selectorText){t=n[o].cssText;break}if(t)break}return(t=t.substring(t.lastIndexOf("{")+1,t.lastIndexOf("}"))).split(";").forEach((function(r){if(r){var t=r.split(": ")[0],c=r.split(": ")[1];t&&c&&(e["--".concat(t.trim())]=c.trim())}})),e},o=function(){return Boolean(document.documentMode)&&document.documentMode>=10},s=function(e){return e.match(/^--.*/i)},a=function(e){var r,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;if(s(e)&&o()){var c=n();r=c[e]}else r=window.getComputedStyle(t,null).getPropertyValue(e).replace(/^\s/,"");return r},i=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,t="--".concat(e),c=a(t,r);return c||e},l=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");var r,t,c;if(!e.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(r=parseInt(e.slice(1,3),16),t=parseInt(e.slice(3,5),16),c=parseInt(e.slice(5,7),16)):(r=parseInt(e.slice(1,2),16),t=parseInt(e.slice(2,3),16),c=parseInt(e.slice(3,5),16)),"rgba(".concat(r,", ").concat(t,", ").concat(c,")")},d=function(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if(void 0===e)throw new TypeError("Hex color is not defined");var t,c,n,o=e.match(/^#(?:[0-9a-f]{3}){1,2}$/i);if(!o)throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(t=parseInt(e.slice(1,3),16),c=parseInt(e.slice(3,5),16),n=parseInt(e.slice(5,7),16)):(t=parseInt(e.slice(1,2),16),c=parseInt(e.slice(2,3),16),n=parseInt(e.slice(3,5),16)),"rgba(".concat(t,", ").concat(c,", ").concat(n,", ").concat(r/100,")")},j=function(){return"uid-"+Math.random().toString(36).substr(2)},b=function(e,r){for(var t={},c=Object.keys(e),n=0;n<c.length;n++)!r.includes(c[n])&&(t[c[n]]=e[c[n]]);return t},u=function(e,r){for(var t={},c=0;c<r.length;c++)t[r[c]]=e[r[c]];return t},h=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");if("transparent"===e)return"#00000000";var r=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!r)throw new Error("".concat(e," is not a valid rgb color"));var t="0".concat(parseInt(r[1],10).toString(16)),c="0".concat(parseInt(r[2],10).toString(16)),n="0".concat(parseInt(r[3],10).toString(16));return"#".concat(t.slice(-2)).concat(c.slice(-2)).concat(n.slice(-2))},f={deepObjectsMerge:c,getColor:i,getStyle:a,hexToRgb:l,hexToRgba:d,makeUid:j,omitByKeys:b,pickByKeys:u,rgbToHex:h};r.default=f}]))},685:function(e,r,t){"use strict";t.r(r);var c=t(20),n=t(624),o=t(1),s=t(620),a=t.n(s),i=t(621),l=t(625),d=t(622),j=function(){var e=Object(o.useState)("rgb(255, 255, 255)"),r=Object(n.a)(e,2),t=r[0],s=r[1],a=Object(o.createRef)();return Object(o.useEffect)((function(){var e=a.current.parentNode.firstChild,r=window.getComputedStyle(e).getPropertyValue("background-color");s(r)}),[a]),Object(c.jsx)("table",{className:"table w-100",ref:a,children:Object(c.jsxs)("tbody",{children:[Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-muted",children:"HEX:"}),Object(c.jsx)("td",{className:"font-weight-bold",children:Object(l.rgbToHex)(t)})]}),Object(c.jsxs)("tr",{children:[Object(c.jsx)("td",{className:"text-muted",children:"RGB:"}),Object(c.jsx)("td",{className:"font-weight-bold",children:t})]})]})})},b=function(e){var r=e.className,t=e.children,n=a()(r,"theme-color w-75 rounded mb-3");return Object(c.jsxs)(i.v,{xl:"2",md:"4",sm:"6",xs:"12",className:"mb-4",children:[Object(c.jsx)("div",{className:n,style:{paddingTop:"75%"}}),t,Object(c.jsx)(j,{})]})};r.default=function(){return Object(c.jsxs)(c.Fragment,{children:[Object(c.jsxs)(i.k,{children:[Object(c.jsxs)(i.o,{children:["Theme colors",Object(c.jsx)(d.a,{href:"https://coreui.io/docs/utilities/colors/"})]}),Object(c.jsx)(i.l,{children:Object(c.jsxs)(i.xb,{children:[Object(c.jsx)(b,{className:"bg-primary",children:Object(c.jsx)("h6",{children:"Brand Primary Color"})}),Object(c.jsx)(b,{className:"bg-secondary",children:Object(c.jsx)("h6",{children:"Brand Secondary Color"})}),Object(c.jsx)(b,{className:"bg-success",children:Object(c.jsx)("h6",{children:"Brand Success Color"})}),Object(c.jsx)(b,{className:"bg-danger",children:Object(c.jsx)("h6",{children:"Brand Danger Color"})}),Object(c.jsx)(b,{className:"bg-warning",children:Object(c.jsx)("h6",{children:"Brand Warning Color"})}),Object(c.jsx)(b,{className:"bg-info",children:Object(c.jsx)("h6",{children:"Brand Info Color"})}),Object(c.jsx)(b,{className:"bg-light",children:Object(c.jsx)("h6",{children:"Brand Light Color"})}),Object(c.jsx)(b,{className:"bg-dark",children:Object(c.jsx)("h6",{children:"Brand Dark Color"})})]})})]}),Object(c.jsxs)(i.k,{children:[Object(c.jsx)(i.o,{children:"Grays"}),Object(c.jsx)(i.l,{children:Object(c.jsxs)(i.xb,{className:"mb-3",children:[Object(c.jsx)(b,{className:"bg-gray-100",children:Object(c.jsx)("h6",{children:"Gray 100 Color"})}),Object(c.jsx)(b,{className:"bg-gray-200",children:Object(c.jsx)("h6",{children:"Gray 200 Color"})}),Object(c.jsx)(b,{className:"bg-gray-300",children:Object(c.jsx)("h6",{children:"Gray 300 Color"})}),Object(c.jsx)(b,{className:"bg-gray-400",children:Object(c.jsx)("h6",{children:"Gray 400 Color"})}),Object(c.jsx)(b,{className:"bg-gray-500",children:Object(c.jsx)("h6",{children:"Gray 500 Color"})}),Object(c.jsx)(b,{className:"bg-gray-600",children:Object(c.jsx)("h6",{children:"Gray 600 Color"})}),Object(c.jsx)(b,{className:"bg-gray-700",children:Object(c.jsx)("h6",{children:"Gray 700 Color"})}),Object(c.jsx)(b,{className:"bg-gray-800",children:Object(c.jsx)("h6",{children:"Gray 800 Color"})}),Object(c.jsx)(b,{className:"bg-gray-900",children:Object(c.jsx)("h6",{children:"Gray 900 Color"})})]})})]})]})}}}]);
//# sourceMappingURL=11.f30e8e15.chunk.js.map