(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[41],{626:function(e,s){!function(e,s){for(var c in s)e[c]=s[c]}(s,function(e){var s={};function c(t){if(s[t])return s[t].exports;var a=s[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}return c.m=e,c.c=s,c.d=function(e,s,t){c.o(e,s)||Object.defineProperty(e,s,{enumerable:!0,get:t})},c.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,s){if(1&s&&(e=c(e)),8&s)return e;if(4&s&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(c.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&s&&"string"!=typeof e)for(var a in e)c.d(t,a,function(s){return e[s]}.bind(null,a));return t},c.n=function(e){var s=e&&e.__esModule?function(){return e.default}:function(){return e};return c.d(s,"a",s),s},c.o=function(e,s){return Object.prototype.hasOwnProperty.call(e,s)},c.p="",c(c.s=0)}([function(e,s,c){"use strict";c.r(s),c.d(s,"deepObjectsMerge",(function(){return t})),c.d(s,"getColor",(function(){return i})),c.d(s,"getStyle",(function(){return n})),c.d(s,"hexToRgb",(function(){return j})),c.d(s,"hexToRgba",(function(){return o})),c.d(s,"makeUid",(function(){return d})),c.d(s,"omitByKeys",(function(){return b})),c.d(s,"pickByKeys",(function(){return m})),c.d(s,"rgbToHex",(function(){return x}));var t=function e(s,c){for(var t=0,a=Object.keys(c);t<a.length;t++){var r=a[t];c[r]instanceof Object&&Object.assign(c[r],e(s[r],c[r]))}return Object.assign(s||{},c),s},a=function(){for(var e={},s=document.styleSheets,c="",t=s.length-1;t>-1;t--){for(var a=s[t].cssRules,r=a.length-1;r>-1;r--)if(".ie-custom-properties"===a[r].selectorText){c=a[r].cssText;break}if(c)break}return(c=c.substring(c.lastIndexOf("{")+1,c.lastIndexOf("}"))).split(";").forEach((function(s){if(s){var c=s.split(": ")[0],t=s.split(": ")[1];c&&t&&(e["--".concat(c.trim())]=t.trim())}})),e},r=function(){return Boolean(document.documentMode)&&document.documentMode>=10},l=function(e){return e.match(/^--.*/i)},n=function(e){var s,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body;if(l(e)&&r()){var t=a();s=t[e]}else s=window.getComputedStyle(c,null).getPropertyValue(e).replace(/^\s/,"");return s},i=function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:document.body,c="--".concat(e),t=n(c,s);return t||e},j=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");var s,c,t;if(!e.match(/^#(?:[0-9a-f]{3}){1,2}$/i))throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(s=parseInt(e.slice(1,3),16),c=parseInt(e.slice(3,5),16),t=parseInt(e.slice(5,7),16)):(s=parseInt(e.slice(1,2),16),c=parseInt(e.slice(2,3),16),t=parseInt(e.slice(3,5),16)),"rgba(".concat(s,", ").concat(c,", ").concat(t,")")},o=function(e){var s=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100;if(void 0===e)throw new TypeError("Hex color is not defined");var c,t,a,r=e.match(/^#(?:[0-9a-f]{3}){1,2}$/i);if(!r)throw new Error("".concat(e," is not a valid hex color"));return 7===e.length?(c=parseInt(e.slice(1,3),16),t=parseInt(e.slice(3,5),16),a=parseInt(e.slice(5,7),16)):(c=parseInt(e.slice(1,2),16),t=parseInt(e.slice(2,3),16),a=parseInt(e.slice(3,5),16)),"rgba(".concat(c,", ").concat(t,", ").concat(a,", ").concat(s/100,")")},d=function(){return"uid-"+Math.random().toString(36).substr(2)},b=function(e,s){for(var c={},t=Object.keys(e),a=0;a<t.length;a++)!s.includes(t[a])&&(c[t[a]]=e[t[a]]);return c},m=function(e,s){for(var c={},t=0;t<s.length;t++)c[s[t]]=e[s[t]];return c},x=function(e){if(void 0===e)throw new TypeError("Hex color is not defined");if("transparent"===e)return"#00000000";var s=e.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(!s)throw new Error("".concat(e," is not a valid rgb color"));var c="0".concat(parseInt(s[1],10).toString(16)),t="0".concat(parseInt(s[2],10).toString(16)),a="0".concat(parseInt(s[3],10).toString(16));return"#".concat(c.slice(-2)).concat(t.slice(-2)).concat(a.slice(-2))},h={deepObjectsMerge:t,getColor:i,getStyle:n,hexToRgb:j,hexToRgba:o,makeUid:d,omitByKeys:b,pickByKeys:m,rgbToHex:x};s.default=h}]))},687:function(e,s,c){"use strict";c.r(s);var t=c(20),a=c(375),r=c(376),l=c(378),n=c(377),i=c(1),j=c.n(i),o=c(620),d=c(625),b=c(44),m=c(628),x=c(626),h=Object(x.getStyle)("success")||"#4dbd74",u=Object(x.getStyle)("info")||"#20a8d8",O=Object(x.getStyle)("danger")||"#f86c6b",g=function(e){var s=function(e,s){return Math.floor(Math.random()*(s-e+1)+e)},c=function(){for(var e=[],c=[],t=[],a=0;a<=27;a++)e.push(s(50,200)),c.push(s(80,100)),t.push(65);return[{label:"My First dataset",backgroundColor:Object(x.hexToRgba)(u,10),borderColor:u,pointHoverBackgroundColor:u,borderWidth:2,data:e},{label:"My Second dataset",backgroundColor:"transparent",borderColor:h,pointHoverBackgroundColor:h,borderWidth:2,data:c},{label:"My Third dataset",backgroundColor:"transparent",borderColor:O,pointHoverBackgroundColor:O,borderWidth:1,borderDash:[8,5],data:t}]}(),a={maintainAspectRatio:!1,legend:{display:!1},scales:{xAxes:[{gridLines:{drawOnChartArea:!1}}],yAxes:[{ticks:{beginAtZero:!0,maxTicksLimit:5,stepSize:Math.ceil(50),max:250},gridLines:{display:!0}}]},elements:{point:{radius:0,hitRadius:10,hoverRadius:4,hoverBorderWidth:3}}};return Object(t.jsx)(m.c,Object(b.a)(Object(b.a)({},e),{},{datasets:c,options:a,labels:["Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su","Mo","Tu","We","Th","Fr","Sa","Su"]}))},p=Object(i.lazy)((function(){return c.e(24).then(c.bind(null,639))})),N=Object(i.lazy)((function(){return c.e(40).then(c.bind(null,638))})),v=function(e){Object(l.a)(c,e);var s=Object(n.a)(c);function c(e){var t;return Object(a.a)(this,c),(t=s.call(this,e)).state={totalDisasters:0,disasterList:[],page:1},t}return Object(r.a)(c,[{key:"componentDidMount",value:function(){this.fetchDisasters()}},{key:"fetchDisasters",value:function(){var e=this;fetch("https://sample-will.herokuapp.com/api/disasters?page=".concat(this.state.page)).then((function(e){return e.json()})).then((function(s){console.log(s),e.setState({totalDisasters:s.totalDisasters,disasterList:s.disasters})})).catch((function(e){console.log(e)}))}},{key:"getUsers",value:function(){var e=new Headers({authorization:"Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im4yWlN4YWR2T1F4V2xzMkxPTF9DRCJ9.eyJuaWNrbmFtZSI6IndiY2hyaXN0ZXJzb24iLCJuYW1lIjoid2JjaHJpc3RlcnNvbkBnbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvNDZhMjI0MDk4OTEwMjgxYWRmNDcxZTE1MzcwMTRkOTQ_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZ3Yi5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMS0wMi0wNlQyMDowOToyNi44NTZaIiwiZW1haWwiOiJ3YmNocmlzdGVyc29uQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtOXhvNWdkZmMudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVmN2ZhN2JmNmJjNzkyMDA2ODI3ZjMzYSIsImF1ZCI6IlJHdVNiOGhyYTg5VXlkVWhWY2p2SkF3M25aSHRCRGRYIiwiaWF0IjoxNjEyNjQyMTY3LCJleHAiOjE2MTI2NzgxNjcsIm5vbmNlIjoiNG9aWjU1Q1RGUVlwV1l5NkdFZkgifQ.uFUpViiTnrwrZSLrFzeqKT4cjF8cmDBrCO1WErfTabwNpwAXbh2WSQxUvf1quQTSCtDFJJJW1DEiNl2D84g_Rz2YjKu6XG_OOfBJ74S_D1ilz5DNTERsvl4fFxNepuV4RvAWyO8Nw_naZNmNmdBZTqRzdCDRUYA--GkU05-EjFMSzGybZWP3IaQ6GJJvfBBr0GgV6igK2LKUe_TQLBd5PTpq2VOTPAiCzQ3fYj8Ha_KeaR9HV_fK91_BhSEA-CNko8qFJ9aH-opGV3BNhJjK2ffgVDEy6i_E39J6dRHjsxhIWxpEpn3r4PIKXStZ70hst7FiavUPKRLiGXzJTfvpDw"});fetch("https://sample-will.herokuapp.com/api/observers",{headers:e,method:"GET"}).then((function(e){return e.json()})).then((function(e){console.log(e)}))}},{key:"render",value:function(){var e=(new Date).getSeconds();return console.log("disasterlist: ",this.state.disasterList),Object(t.jsxs)(t.Fragment,{children:[Object(t.jsxs)("div",{className:"login-box auth0-box before",children:[Object(t.jsx)("img",{src:"https://i.cloudup.com/StzWWrY34s.png",alt:"Auth0 login"}),Object(t.jsx)("h3",{children:"Auth0 Example"}),Object(t.jsx)("p",{children:"Zero friction identity infrastructure, built for developers"}),Object(t.jsx)("a",{className:"btn btn-primary btn-lg btn-login btn-block",href:"https://sample-will.herokuapp.com/my-login",children:"Log In"})]}),Object(t.jsxs)("div",{className:"logged-in-box auth0-box logged-in",children:[Object(t.jsx)("h1",{id:"logo",children:Object(t.jsx)("img",{src:"//cdn.auth0.com/samples/auth0_logo_final_blue_RGB.png",alt:"logo"})}),Object(t.jsx)("a",{className:"btn btn-primary btn-lg btn-logout btn-block",href:"https://sample-will.herokuapp.com/my-logout",children:"Logout"})]}),Object(t.jsx)(o.f,{block:!0,color:"primary",onClick:this.getUsers,children:"Primary"}),Object(t.jsx)("div",{className:"my-test ".concat(e%3===0?"main-image-1":e%3===1?"main-image-2":"main-image-3"),children:Object(t.jsxs)("div",{className:"card-overlay",children:[Object(t.jsx)("h1",{className:"display-3 main-top-text",children:"Disaster Reporter"}),Object(t.jsx)("p",{className:"main-bottom-text",children:"See And Write Reports About Natural Disasters In Your Area"})]})}),this.state.disasterList.map((function(e,s){return Object(t.jsx)(o.wb,{children:Object(t.jsx)(o.u,{xs:"12",sm:"12",md:"12",children:Object(t.jsxs)(o.j,{children:[Object(t.jsxs)(o.n,{children:["".concat(e.informal_name," - Official Name: ").concat(e.official_name),Object(t.jsx)("div",{className:"card-header-actions",children:Object(t.jsx)(o.b,{className:"mr-1 float-right",color:"".concat(e.is_ongoing?"danger":"success"),children:"".concat(e.is_ongoing?"On-Going":"Not On-Going")})})]}),e.random_observer_url&&Object(t.jsx)("img",{className:"d-block w-100 set-disaster-max-height",src:e.random_witness_image,alt:"slide 1"}),Object(t.jsxs)(o.k,{children:[e.random_observer&&Object(t.jsx)("table",{className:"table table-hover table-outline mb-0 d-none d-sm-table",children:Object(t.jsx)("tbody",{children:Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{className:"text-center",children:Object(t.jsxs)("div",{className:"c-avatar",children:[Object(t.jsx)("img",{src:e.random_observer_url,className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(t.jsx)("span",{className:"c-avatar-status bg-success"})]})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{children:e.random_observer}),Object(t.jsxs)("div",{className:"small text-muted",children:[Object(t.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cif-us",title:"us",id:"us"})}),Object(t.jsxs)("td",{children:[Object(t.jsxs)("div",{className:"clearfix",children:[Object(t.jsx)("div",{className:"float-left",children:Object(t.jsx)("strong",{children:"50%"})}),Object(t.jsx)("div",{className:"float-right",children:Object(t.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"success",value:"50"})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cib-cc-mastercard"})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(t.jsx)("strong",{children:"10 sec ago"})]})]})})}),e.random_comment&&Object(t.jsx)("h5",{children:'"'.concat(e.random_comment,'"')}),e.random_observer&&Object(t.jsx)("h6",{children:"Observer: ".concat(e.random_observer)}),e.average_severity&&Object(t.jsx)("h6",{children:"Average severity: ".concat(e.average_severity)}),e.disaster_type&&Object(t.jsx)("h6",{children:"Disaster type: ".concat(e.disaster_type)}),e.first_observance&&Object(t.jsx)("h6",{children:"First observance: ".concat(e.first_observance)}),e.last_observance&&Object(t.jsx)("h6",{children:"Last observance: ".concat(e.last_observance)}),Object(t.jsx)("h6",{children:"id: ".concat(e.id)}),Object(t.jsx)("h6",{children:"Location: (".concat(e.location[0],", ").concat(e.location[1],")")}),Object(t.jsx)("h6",{children:"Number Of Reports: ".concat(e.num_reports)}),e.people_affected&&Object(t.jsx)("h6",{children:"People affected: ".concat(e.people_affected)})]})]})})},s)})),Object(t.jsx)(p,{}),Object(t.jsxs)(o.j,{children:[Object(t.jsxs)(o.k,{children:[Object(t.jsxs)(o.wb,{children:[Object(t.jsxs)(o.u,{sm:"5",children:[Object(t.jsx)("h4",{id:"traffic",className:"card-title mb-0",children:"Traffic"}),Object(t.jsx)("div",{className:"small text-muted",children:"November 2017"})]}),Object(t.jsxs)(o.u,{sm:"7",className:"d-none d-md-block",children:[Object(t.jsx)(o.f,{color:"primary",className:"float-right",children:Object(t.jsx)(d.a,{name:"cil-cloud-download"})}),Object(t.jsx)(o.g,{className:"float-right mr-3",children:["Day","Month","Year"].map((function(e){return Object(t.jsx)(o.f,{color:"outline-secondary",className:"mx-0",active:"Month"===e,children:e},e)}))})]})]}),Object(t.jsx)(g,{style:{height:"300px",marginTop:"40px"}})]}),Object(t.jsx)(o.l,{children:Object(t.jsxs)(o.wb,{className:"text-center",children:[Object(t.jsxs)(o.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0",children:[Object(t.jsx)("div",{className:"text-muted",children:"Visits"}),Object(t.jsx)("strong",{children:"29.703 Users (40%)"}),Object(t.jsx)(o.ub,{className:"progress-xs mt-2",precision:1,color:"success",value:40})]}),Object(t.jsxs)(o.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0 d-md-down-none",children:[Object(t.jsx)("div",{className:"text-muted",children:"Unique"}),Object(t.jsx)("strong",{children:"24.093 Users (20%)"}),Object(t.jsx)(o.ub,{className:"progress-xs mt-2",precision:1,color:"info",value:40})]}),Object(t.jsxs)(o.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0",children:[Object(t.jsx)("div",{className:"text-muted",children:"Pageviews"}),Object(t.jsx)("strong",{children:"78.706 Views (60%)"}),Object(t.jsx)(o.ub,{className:"progress-xs mt-2",precision:1,color:"warning",value:40})]}),Object(t.jsxs)(o.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0",children:[Object(t.jsx)("div",{className:"text-muted",children:"New Users"}),Object(t.jsx)("strong",{children:"22.123 Users (80%)"}),Object(t.jsx)(o.ub,{className:"progress-xs mt-2",precision:1,color:"danger",value:40})]}),Object(t.jsxs)(o.u,{md:!0,sm:"12",className:"mb-sm-2 mb-0 d-md-down-none",children:[Object(t.jsx)("div",{className:"text-muted",children:"Bounce Rate"}),Object(t.jsx)("strong",{children:"Average Rate (40.15%)"}),Object(t.jsx)(o.ub,{className:"progress-xs mt-2",precision:1,value:40})]})]})})]}),Object(t.jsx)(N,{withCharts:!0}),Object(t.jsx)(o.wb,{children:Object(t.jsx)(o.u,{children:Object(t.jsxs)(o.j,{children:[Object(t.jsxs)(o.n,{children:["Traffic "," & "," Sales"]}),Object(t.jsxs)(o.k,{children:[Object(t.jsxs)(o.wb,{children:[Object(t.jsxs)(o.u,{xs:"12",md:"6",xl:"6",children:[Object(t.jsxs)(o.wb,{children:[Object(t.jsx)(o.u,{sm:"6",children:Object(t.jsxs)(o.i,{color:"info",children:[Object(t.jsx)("small",{className:"text-muted",children:"New Clients"}),Object(t.jsx)("br",{}),Object(t.jsx)("strong",{className:"h4",children:"9,123"})]})}),Object(t.jsx)(o.u,{sm:"6",children:Object(t.jsxs)(o.i,{color:"danger",children:[Object(t.jsx)("small",{className:"text-muted",children:"Recurring Clients"}),Object(t.jsx)("br",{}),Object(t.jsx)("strong",{className:"h4",children:"22,643"})]})})]}),Object(t.jsx)("hr",{className:"mt-0"}),Object(t.jsxs)("div",{className:"progress-group mb-4",children:[Object(t.jsx)("div",{className:"progress-group-prepend",children:Object(t.jsx)("span",{className:"progress-group-text",children:"Monday"})}),Object(t.jsxs)("div",{className:"progress-group-bars",children:[Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"34"}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"danger",value:"78"})]})]}),Object(t.jsxs)("div",{className:"progress-group mb-4",children:[Object(t.jsx)("div",{className:"progress-group-prepend",children:Object(t.jsx)("span",{className:"progress-group-text",children:"Tuesday"})}),Object(t.jsxs)("div",{className:"progress-group-bars",children:[Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"56"}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"danger",value:"94"})]})]}),Object(t.jsxs)("div",{className:"progress-group mb-4",children:[Object(t.jsx)("div",{className:"progress-group-prepend",children:Object(t.jsx)("span",{className:"progress-group-text",children:"Wednesday"})}),Object(t.jsxs)("div",{className:"progress-group-bars",children:[Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"12"}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"danger",value:"67"})]})]}),Object(t.jsxs)("div",{className:"progress-group mb-4",children:[Object(t.jsx)("div",{className:"progress-group-prepend",children:Object(t.jsx)("span",{className:"progress-group-text",children:"Thursday"})}),Object(t.jsxs)("div",{className:"progress-group-bars",children:[Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"43"}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"danger",value:"91"})]})]}),Object(t.jsxs)("div",{className:"progress-group mb-4",children:[Object(t.jsx)("div",{className:"progress-group-prepend",children:Object(t.jsx)("span",{className:"progress-group-text",children:"Friday"})}),Object(t.jsxs)("div",{className:"progress-group-bars",children:[Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"22"}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"danger",value:"73"})]})]}),Object(t.jsxs)("div",{className:"progress-group mb-4",children:[Object(t.jsx)("div",{className:"progress-group-prepend",children:Object(t.jsx)("span",{className:"progress-group-text",children:"Saturday"})}),Object(t.jsxs)("div",{className:"progress-group-bars",children:[Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"53"}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"danger",value:"82"})]})]}),Object(t.jsxs)("div",{className:"progress-group mb-4",children:[Object(t.jsx)("div",{className:"progress-group-prepend",children:Object(t.jsx)("span",{className:"progress-group-text",children:"Sunday"})}),Object(t.jsxs)("div",{className:"progress-group-bars",children:[Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"9"}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"danger",value:"69"})]})]}),Object(t.jsx)("div",{className:"legend text-center",children:Object(t.jsxs)("small",{children:[Object(t.jsx)("sup",{className:"px-1",children:Object(t.jsx)(o.b,{shape:"pill",color:"info",children:"\xa0"})}),"New clients \xa0",Object(t.jsx)("sup",{className:"px-1",children:Object(t.jsx)(o.b,{shape:"pill",color:"danger",children:"\xa0"})}),"Recurring clients"]})})]}),Object(t.jsxs)(o.u,{xs:"12",md:"6",xl:"6",children:[Object(t.jsxs)(o.wb,{children:[Object(t.jsx)(o.u,{sm:"6",children:Object(t.jsxs)(o.i,{color:"warning",children:[Object(t.jsx)("small",{className:"text-muted",children:"Pageviews"}),Object(t.jsx)("br",{}),Object(t.jsx)("strong",{className:"h4",children:"78,623"})]})}),Object(t.jsx)(o.u,{sm:"6",children:Object(t.jsxs)(o.i,{color:"success",children:[Object(t.jsx)("small",{className:"text-muted",children:"Organic"}),Object(t.jsx)("br",{}),Object(t.jsx)("strong",{className:"h4",children:"49,123"})]})})]}),Object(t.jsx)("hr",{className:"mt-0"}),Object(t.jsxs)("div",{className:"progress-group mb-4",children:[Object(t.jsxs)("div",{className:"progress-group-header",children:[Object(t.jsx)(d.a,{className:"progress-group-icon",name:"cil-user"}),Object(t.jsx)("span",{className:"title",children:"Male"}),Object(t.jsx)("span",{className:"ml-auto font-weight-bold",children:"43%"})]}),Object(t.jsx)("div",{className:"progress-group-bars",children:Object(t.jsx)(o.ub,{className:"progress-xs",color:"warning",value:"43"})})]}),Object(t.jsxs)("div",{className:"progress-group mb-5",children:[Object(t.jsxs)("div",{className:"progress-group-header",children:[Object(t.jsx)(d.a,{className:"progress-group-icon",name:"cil-user-female"}),Object(t.jsx)("span",{className:"title",children:"Female"}),Object(t.jsx)("span",{className:"ml-auto font-weight-bold",children:"37%"})]}),Object(t.jsx)("div",{className:"progress-group-bars",children:Object(t.jsx)(o.ub,{className:"progress-xs",color:"warning",value:"37"})})]}),Object(t.jsxs)("div",{className:"progress-group",children:[Object(t.jsxs)("div",{className:"progress-group-header",children:[Object(t.jsx)(d.a,{className:"progress-group-icon",name:"cil-globe-alt"}),Object(t.jsx)("span",{className:"title",children:"Organic Search"}),Object(t.jsxs)("span",{className:"ml-auto font-weight-bold",children:["191,235 ",Object(t.jsx)("span",{className:"text-muted small",children:"(56%)"})]})]}),Object(t.jsx)("div",{className:"progress-group-bars",children:Object(t.jsx)(o.ub,{className:"progress-xs",color:"success",value:"56"})})]}),Object(t.jsxs)("div",{className:"progress-group",children:[Object(t.jsxs)("div",{className:"progress-group-header",children:[Object(t.jsx)(d.a,{name:"cib-facebook",className:"progress-group-icon"}),Object(t.jsx)("span",{className:"title",children:"Facebook"}),Object(t.jsxs)("span",{className:"ml-auto font-weight-bold",children:["51,223 ",Object(t.jsx)("span",{className:"text-muted small",children:"(15%)"})]})]}),Object(t.jsx)("div",{className:"progress-group-bars",children:Object(t.jsx)(o.ub,{className:"progress-xs",color:"success",value:"15"})})]}),Object(t.jsxs)("div",{className:"progress-group",children:[Object(t.jsxs)("div",{className:"progress-group-header",children:[Object(t.jsx)(d.a,{name:"cib-twitter",className:"progress-group-icon"}),Object(t.jsx)("span",{className:"title",children:"Twitter"}),Object(t.jsxs)("span",{className:"ml-auto font-weight-bold",children:["37,564 ",Object(t.jsx)("span",{className:"text-muted small",children:"(11%)"})]})]}),Object(t.jsx)("div",{className:"progress-group-bars",children:Object(t.jsx)(o.ub,{className:"progress-xs",color:"success",value:"11"})})]}),Object(t.jsxs)("div",{className:"progress-group",children:[Object(t.jsxs)("div",{className:"progress-group-header",children:[Object(t.jsx)(d.a,{name:"cib-linkedin",className:"progress-group-icon"}),Object(t.jsx)("span",{className:"title",children:"LinkedIn"}),Object(t.jsxs)("span",{className:"ml-auto font-weight-bold",children:["27,319 ",Object(t.jsx)("span",{className:"text-muted small",children:"(8%)"})]})]}),Object(t.jsx)("div",{className:"progress-group-bars",children:Object(t.jsx)(o.ub,{className:"progress-xs",color:"success",value:"8"})})]}),Object(t.jsx)("div",{className:"divider text-center",children:Object(t.jsx)(o.f,{color:"link",size:"sm",className:"text-muted",children:Object(t.jsx)(d.a,{name:"cil-options"})})})]})]}),Object(t.jsx)("br",{}),Object(t.jsxs)("table",{className:"table table-hover table-outline mb-0 d-none d-sm-table",children:[Object(t.jsx)("thead",{className:"thead-light",children:Object(t.jsxs)("tr",{children:[Object(t.jsx)("th",{className:"text-center",children:Object(t.jsx)(d.a,{name:"cil-people"})}),Object(t.jsx)("th",{children:"User"}),Object(t.jsx)("th",{className:"text-center",children:"Country"}),Object(t.jsx)("th",{children:"Usage"}),Object(t.jsx)("th",{className:"text-center",children:"Payment Method"}),Object(t.jsx)("th",{children:"Activity"})]})}),Object(t.jsxs)("tbody",{children:[Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{className:"text-center",children:Object(t.jsxs)("div",{className:"c-avatar",children:[Object(t.jsx)("img",{src:"avatars/1.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(t.jsx)("span",{className:"c-avatar-status bg-success"})]})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{children:"Yiorgos Avraamu"}),Object(t.jsxs)("div",{className:"small text-muted",children:[Object(t.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cif-us",title:"us",id:"us"})}),Object(t.jsxs)("td",{children:[Object(t.jsxs)("div",{className:"clearfix",children:[Object(t.jsx)("div",{className:"float-left",children:Object(t.jsx)("strong",{children:"50%"})}),Object(t.jsx)("div",{className:"float-right",children:Object(t.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"success",value:"50"})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cib-cc-mastercard"})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(t.jsx)("strong",{children:"10 sec ago"})]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{className:"text-center",children:Object(t.jsxs)("div",{className:"c-avatar",children:[Object(t.jsx)("img",{src:"avatars/2.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(t.jsx)("span",{className:"c-avatar-status bg-danger"})]})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{children:"Avram Tarasios"}),Object(t.jsxs)("div",{className:"small text-muted",children:[Object(t.jsx)("span",{children:"Recurring"})," | Registered: Jan 1, 2015"]})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cif-br",title:"br",id:"br"})}),Object(t.jsxs)("td",{children:[Object(t.jsxs)("div",{className:"clearfix",children:[Object(t.jsx)("div",{className:"float-left",children:Object(t.jsx)("strong",{children:"10%"})}),Object(t.jsx)("div",{className:"float-right",children:Object(t.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"10"})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cib-cc-visa"})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(t.jsx)("strong",{children:"5 minutes ago"})]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{className:"text-center",children:Object(t.jsxs)("div",{className:"c-avatar",children:[Object(t.jsx)("img",{src:"avatars/3.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(t.jsx)("span",{className:"c-avatar-status bg-warning"})]})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{children:"Quintin Ed"}),Object(t.jsxs)("div",{className:"small text-muted",children:[Object(t.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cif-in",title:"in",id:"in"})}),Object(t.jsxs)("td",{children:[Object(t.jsxs)("div",{className:"clearfix",children:[Object(t.jsx)("div",{className:"float-left",children:Object(t.jsx)("strong",{children:"74%"})}),Object(t.jsx)("div",{className:"float-right",children:Object(t.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"warning",value:"74"})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cib-stripe"})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(t.jsx)("strong",{children:"1 hour ago"})]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{className:"text-center",children:Object(t.jsxs)("div",{className:"c-avatar",children:[Object(t.jsx)("img",{src:"avatars/4.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(t.jsx)("span",{className:"c-avatar-status bg-secondary"})]})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{children:"En\xe9as Kwadwo"}),Object(t.jsxs)("div",{className:"small text-muted",children:[Object(t.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cif-fr",title:"fr",id:"fr"})}),Object(t.jsxs)("td",{children:[Object(t.jsxs)("div",{className:"clearfix",children:[Object(t.jsx)("div",{className:"float-left",children:Object(t.jsx)("strong",{children:"98%"})}),Object(t.jsx)("div",{className:"float-right",children:Object(t.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"danger",value:"98"})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cib-paypal"})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(t.jsx)("strong",{children:"Last month"})]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{className:"text-center",children:Object(t.jsxs)("div",{className:"c-avatar",children:[Object(t.jsx)("img",{src:"avatars/5.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(t.jsx)("span",{className:"c-avatar-status bg-success"})]})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{children:"Agapetus Tade\xe1\u0161"}),Object(t.jsxs)("div",{className:"small text-muted",children:[Object(t.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cif-es",title:"es",id:"es"})}),Object(t.jsxs)("td",{children:[Object(t.jsxs)("div",{className:"clearfix",children:[Object(t.jsx)("div",{className:"float-left",children:Object(t.jsx)("strong",{children:"22%"})}),Object(t.jsx)("div",{className:"float-right",children:Object(t.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"info",value:"22"})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cib-google-pay"})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(t.jsx)("strong",{children:"Last week"})]})]}),Object(t.jsxs)("tr",{children:[Object(t.jsx)("td",{className:"text-center",children:Object(t.jsxs)("div",{className:"c-avatar",children:[Object(t.jsx)("img",{src:"avatars/6.jpg",className:"c-avatar-img",alt:"admin@bootstrapmaster.com"}),Object(t.jsx)("span",{className:"c-avatar-status bg-danger"})]})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{children:"Friderik D\xe1vid"}),Object(t.jsxs)("div",{className:"small text-muted",children:[Object(t.jsx)("span",{children:"New"})," | Registered: Jan 1, 2015"]})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cif-pl",title:"pl",id:"pl"})}),Object(t.jsxs)("td",{children:[Object(t.jsxs)("div",{className:"clearfix",children:[Object(t.jsx)("div",{className:"float-left",children:Object(t.jsx)("strong",{children:"43%"})}),Object(t.jsx)("div",{className:"float-right",children:Object(t.jsx)("small",{className:"text-muted",children:"Jun 11, 2015 - Jul 10, 2015"})})]}),Object(t.jsx)(o.ub,{className:"progress-xs",color:"success",value:"43"})]}),Object(t.jsx)("td",{className:"text-center",children:Object(t.jsx)(d.a,{height:25,name:"cib-cc-amex"})}),Object(t.jsxs)("td",{children:[Object(t.jsx)("div",{className:"small text-muted",children:"Last login"}),Object(t.jsx)("strong",{children:"Yesterday"})]})]})]})]})]})]})})})]})}}]),c}(j.a.Component);s.default=v}}]);
//# sourceMappingURL=41.453ac569.chunk.js.map