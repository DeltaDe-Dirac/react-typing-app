(this["webpackJsonpreact-typing-app"]=this["webpackJsonpreact-typing-app"]||[]).push([[0],{29:function(e,t,n){},30:function(e,t,n){},31:function(e,t,n){},42:function(e,t,n){},46:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),i=n(22),r=n.n(i),s=(n(29),n(30),n(13)),j=(n(31),n(48)),l=n(49),o=n(50),d=n(51),u=n(14),b=n(1);function x(){var e=Object(c.useState)(!0),t=Object(s.a)(e,2),n=t[0],a=t[1],i=Object(c.useState)({text:"Touch Typing",word:" Practice!",index:0}),r=Object(s.a)(i,2),x=r[0],h=r[1];return Object(c.useEffect)((function(){var e=setTimeout((function(){a(!n)}),500);return function(){clearTimeout(e)}}),[n]),Object(c.useEffect)((function(){var e=null;return x.index<x.word.length&&(e=setTimeout((function(){var e={text:x.text.concat(x.word[x.index]),word:x.word,index:x.index+1};h(e)}),Math.floor(500*Math.random())+100)),function(){null!==e&&clearTimeout(e)}}),[x]),Object(b.jsx)("div",{className:"p-landWrap",children:Object(b.jsxs)(j.a,{fluid:!0,children:[Object(b.jsxs)("div",{className:"p-landing",children:[Object(b.jsx)("h1",{children:"TypeMe"}),Object(b.jsx)(l.a,{variant:"outline-success",onClick:function(){return alert()},children:"Login"})]}),Object(b.jsx)(o.a,{className:"justify-content-md-center",children:Object(b.jsx)(d.a,{md:"auto",children:Object(b.jsxs)("div",{className:"p-landGetStarted",children:[Object(b.jsxs)("h1",{children:[x.text,Object(b.jsx)("span",{className:n?"strong":"weak",children:"|"})]}),Object(b.jsx)(u.b,{to:"/portal",className:"btn btn-outline-success",children:"Get Started"})]})})})]})})}n(41);var h=n(4),O=n(52);n(42);function f(){var e=Object(c.useState)(null),t=Object(s.a)(e,2),n=t[0],a=t[1];return null!==n?Object(b.jsx)(h.a,{to:n}):Object(b.jsx)("div",{className:"pagenotfound-img",children:Object(b.jsxs)(j.a,{children:[Object(b.jsx)("h1",{children:"404"}),Object(b.jsxs)("div",{className:"notfound",children:[Object(b.jsx)("p",{className:"text-uppercase",children:"page not found"}),Object(b.jsx)(O.a.Link,{eventKey:"/",onSelect:function(e){return a(e)},children:"Home"})]})]})})}n(46);function p(){return Object(b.jsx)(j.a,{children:Object(b.jsx)("h1",{children:"Hello PortalPage"})})}var m=function(){return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)(u.a,{children:Object(b.jsxs)(h.d,{children:[Object(b.jsx)(h.b,{exact:!0,path:"/",children:Object(b.jsx)(x,{})}),Object(b.jsx)(h.b,{exact:!0,path:"/portal",children:Object(b.jsx)(p,{})}),Object(b.jsx)(h.b,{path:"/",children:Object(b.jsx)(f,{})})]})})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))};r.a.render(Object(b.jsx)(a.a.StrictMode,{children:Object(b.jsx)(m,{})}),document.getElementById("root")),g()}},[[47,1,2]]]);
//# sourceMappingURL=main.2e9a3ab6.chunk.js.map