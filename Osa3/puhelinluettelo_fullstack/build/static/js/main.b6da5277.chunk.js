(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{14:function(e,t,n){e.exports=n(37)},36:function(e,t,n){},37:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(13),u=n.n(c),o=n(2),l=n(3),s=n.n(l),i="/api/persons",m=function(){return s.a.get(i).then((function(e){return e.data}))},f=function(e){return s.a.post(i,e).then((function(e){return e.data}))},d=function(e){return s.a.delete("".concat(i,"/").concat(e.id)).then((function(e){return e.data}))},b=function(e,t){return s.a.put("".concat(i,"/").concat(e),t).then((function(e){return e.data}))},h=(n(36),function(e){var t=e.clicked,n=e.text;return r.a.createElement("button",{onClick:t},n)}),v=function(e){var t=e.filterName,n=e.setFilter;return r.a.createElement("form",null,r.a.createElement("div",null,"filter shown with ",r.a.createElement("input",{value:t,onChange:function(e){n(e.target.value)}})))},E=function(e){var t=e.newName,n=e.setNewName,a=e.newNumber,c=e.setNewNumber,u=e.persons,o=e.setPersons,l=e.setSuccessMessage,s=e.setErrorMessage;return r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var r={name:t,number:a};if(u.some((function(e){return e.name===r.name}))){var i=u.find((function(e){return e.name===r.name}));window.confirm("".concat(i.name," is already added in to the phonebook, replace the old number with the new one?"))&&b(i.id,r).then((function(e){l("Changed ".concat(e.name,"s number")),setTimeout((function(){l(null)}),5e3)})).catch((function(e){return s("Information of ".concat(i.name," has already been removed from the server"))}))}else f(r).then((function(e){o(u.concat(e)),n(""),c(""),l("Added ".concat(e.name)),setTimeout((function(){l(null)}),5e3)})).catch((function(e){console.log(e.response.data.error),s("".concat(e.message))}))}},r.a.createElement("div",null," name: ",r.a.createElement("input",{value:t,onChange:function(e){n(e.target.value)}})),r.a.createElement("div",null," number: ",r.a.createElement("input",{value:a,onChange:function(e){c(e.target.value)}})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},p=function(e){var t=e.persons,n=e.filterName,a=e.setPersons,c=e.setSuccessMessage,u=t.filter((function(e){return e.name.toLowerCase().includes(n.toLowerCase())}));return r.a.createElement("div",null,u.map((function(e,n){return r.a.createElement("div",{key:n},e.name," ",e.number,r.a.createElement(h,{clicked:function(){return n=e,void(!0===window.confirm("Delete ".concat(n.name))&&d(n).then((function(e){a(t.filter((function(e){return e!==n}))),c("Deleted ".concat(n.name)),setTimeout((function(){c(null)}),5e3)})));var n},text:"delete"}))})))},g=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"success"},t)},w=function(e){var t=e.message;return null===t?null:r.a.createElement("div",{className:"error"},t)},N=function(){Object(a.useEffect)((function(){m().then((function(e){c(e)}))}),[]);var e=Object(a.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(""),l=Object(o.a)(u,2),s=l[0],i=l[1],f=Object(a.useState)(""),d=Object(o.a)(f,2),b=d[0],h=d[1],N=Object(a.useState)(""),j=Object(o.a)(N,2),O=j[0],S=j[1],k=Object(a.useState)(null),C=Object(o.a)(k,2),M=C[0],y=C[1],P=Object(a.useState)(null),x=Object(o.a)(P,2),D=x[0],T=x[1];return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(g,{message:M}),r.a.createElement(w,{message:D}),r.a.createElement(v,{filterName:O,setFilter:S}),r.a.createElement("h2",null,"add a new"),r.a.createElement(E,{newName:s,setNewName:i,newNumber:b,setNewNumber:h,persons:n,setPersons:c,setSuccessMessage:y,setErrorMessage:T}),r.a.createElement("h2",null,"Numbers"),r.a.createElement(p,{persons:n,filterName:O,setPersons:c,setSuccessMessage:y}))};u.a.render(r.a.createElement(N,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.b6da5277.chunk.js.map