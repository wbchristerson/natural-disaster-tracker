(this["webpackJsonp@coreui/coreui-free-react-admin-template"]=this["webpackJsonp@coreui/coreui-free-react-admin-template"]||[]).push([[21],{621:function(e,t,s){"use strict";s.d(t,"a",(function(){return o}));var r=s(44),i=s(20),n=s(159),a=s(1),c=s.n(a),d=s(620),l=function(e){var t=e.name,s=e.text,a=Object(n.a)(e,["name","text"]),c=t?"https://coreui.io/react/docs/components/".concat(t):e.href;return Object(i.jsx)("div",{className:"card-header-actions",children:Object(i.jsx)(d.db,Object(r.a)(Object(r.a)({},a),{},{href:c,rel:"noreferrer noopener",target:"_blank",className:"card-header-action",children:Object(i.jsx)("small",{className:"text-muted",children:s||"docs"})}))})},o=c.a.memo(l)},629:function(e,t,s){"use strict";t.a=[{id:0,name:"John Doe",registered:"2018/01/01",role:"Guest",status:"Pending"},{id:1,name:"Samppa Nori",registered:"2018/01/01",role:"Member",status:"Active"},{id:2,name:"Estavan Lykos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:3,name:"Chetan Mohamed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:4,name:"Derick Maximinus",registered:"2018/03/01",role:"Member",status:"Pending"},{id:5,name:"Friderik D\xe1vid",registered:"2018/01/21",role:"Staff",status:"Active"},{id:6,name:"Yiorgos Avraamu",registered:"2018/01/01",role:"Member",status:"Active"},{id:7,name:"Avram Tarasios",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:8,name:"Quintin Ed",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:9,name:"En\xe9as Kwadwo",registered:"2018/03/01",role:"Member",status:"Pending"},{id:10,name:"Agapetus Tade\xe1\u0161",registered:"2018/01/21",role:"Staff",status:"Active"},{id:11,name:"Carwyn Fachtna",registered:"2018/01/01",role:"Member",status:"Active"},{id:12,name:"Nehemiah Tatius",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:13,name:"Ebbe Gemariah",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:14,name:"Eustorgios Amulius",registered:"2018/03/01",role:"Member",status:"Pending"},{id:15,name:"Leopold G\xe1sp\xe1r",registered:"2018/01/21",role:"Staff",status:"Active"},{id:16,name:"Pompeius Ren\xe9",registered:"2018/01/01",role:"Member",status:"Active"},{id:17,name:"Pa\u0109jo Jadon",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:18,name:"Micheal Mercurius",registered:"2018/02/01",role:"Admin",status:"Inactive"},{id:19,name:"Ganesha Dubhghall",registered:"2018/03/01",role:"Member",status:"Pending"},{id:20,name:"Hiroto \u0160imun",registered:"2018/01/21",role:"Staff",status:"Active"},{id:21,name:"Vishnu Serghei",registered:"2018/01/01",role:"Member",status:"Active"},{id:22,name:"Zbyn\u011bk Phoibos",registered:"2018/02/01",role:"Staff",status:"Banned"},{id:23,name:"Aulus Agmundr",registered:"2018/01/01",role:"Member",status:"Pending"},{id:42,name:"Ford Prefect",registered:"2001/05/25",role:"Alien",status:"Don't panic!"}]},652:function(e,t,s){"use strict";s.r(t);var r=s(20),i=(s(1),s(620)),n=s(621),a=s(629),c=function(e){switch(e){case"Active":return"success";case"Inactive":return"secondary";case"Pending":return"warning";case"Banned":return"danger";default:return"primary"}},d=["name","registered","role","status"];t.default=function(){return Object(r.jsxs)(r.Fragment,{children:[Object(r.jsxs)(i.wb,{children:[Object(r.jsx)(i.u,{xs:"12",lg:"6",children:Object(r.jsxs)(i.j,{children:[Object(r.jsxs)(i.n,{children:["Simple Table",Object(r.jsx)(n.a,{name:"CModal"})]}),Object(r.jsx)(i.k,{children:Object(r.jsx)(i.y,{items:a.a,fields:d,itemsPerPage:5,pagination:!0,scopedSlots:{status:function(e){return Object(r.jsx)("td",{children:Object(r.jsx)(i.b,{color:c(e.status),children:e.status})})}}})})]})}),Object(r.jsx)(i.u,{xs:"12",lg:"6",children:Object(r.jsxs)(i.j,{children:[Object(r.jsx)(i.n,{children:"Striped Table"}),Object(r.jsx)(i.k,{children:Object(r.jsx)(i.y,{items:a.a,fields:d,striped:!0,itemsPerPage:5,pagination:!0,scopedSlots:{status:function(e){return Object(r.jsx)("td",{children:Object(r.jsx)(i.b,{color:c(e.status),children:e.status})})}}})})]})})]}),Object(r.jsxs)(i.wb,{children:[Object(r.jsx)(i.u,{xs:"12",lg:"6",children:Object(r.jsxs)(i.j,{children:[Object(r.jsx)(i.n,{children:"Condensed Table"}),Object(r.jsx)(i.k,{children:Object(r.jsx)(i.y,{items:a.a,fields:d,size:"sm",itemsPerPage:5,pagination:!0,scopedSlots:{status:function(e){return Object(r.jsx)("td",{children:Object(r.jsx)(i.b,{color:c(e.status),children:e.status})})}}})})]})}),Object(r.jsx)(i.u,{xs:"12",lg:"6",children:Object(r.jsxs)(i.j,{children:[Object(r.jsx)(i.n,{children:"Bordered Table"}),Object(r.jsx)(i.k,{children:Object(r.jsx)(i.y,{items:a.a,fields:d,bordered:!0,itemsPerPage:5,pagination:!0,scopedSlots:{status:function(e){return Object(r.jsx)("td",{children:Object(r.jsx)(i.b,{color:c(e.status),children:e.status})})}}})})]})})]}),Object(r.jsx)(i.wb,{children:Object(r.jsx)(i.u,{children:Object(r.jsxs)(i.j,{children:[Object(r.jsx)(i.n,{children:"Combined All Table"}),Object(r.jsx)(i.k,{children:Object(r.jsx)(i.y,{items:a.a,fields:d,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{status:function(e){return Object(r.jsx)("td",{children:Object(r.jsx)(i.b,{color:c(e.status),children:e.status})})}}})})]})})}),Object(r.jsx)(i.wb,{children:Object(r.jsx)(i.u,{children:Object(r.jsxs)(i.j,{children:[Object(r.jsx)(i.n,{children:"Combined All dark Table"}),Object(r.jsx)(i.k,{children:Object(r.jsx)(i.y,{items:a.a,fields:d,dark:!0,hover:!0,striped:!0,bordered:!0,size:"sm",itemsPerPage:10,pagination:!0,scopedSlots:{status:function(e){return Object(r.jsx)("td",{children:Object(r.jsx)(i.b,{color:c(e.status),children:e.status})})}}})})]})})})]})}}}]);
//# sourceMappingURL=21.ecb3ec5f.chunk.js.map