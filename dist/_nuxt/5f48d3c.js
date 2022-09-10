(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1039:function(e,t,r){"use strict";r(937)},1040:function(e,t,r){(t=r(45)(!1)).push([e.i,".form-check[data-v-9ced028c]{display:inline}.female[data-v-9ced028c]{margin-left:12px}",""]),e.exports=t},1089:function(e,t,r){"use strict";r.r(t);r(95);var l=r(27),o={name:"profile",layout:"dashboard",mixins:[r(908).a],data:function(){return{referralId:"",placement:"",lgas:"",banks:"",sponsor:"",parent:"",details:{first_name:"",last_name:"",phone:"",email:"",gender:"",dob:"",account_number:"",account_name:"",bank_name:"Select Bank",country:"Nigeria",state:"Select State",lga:"Select LGA",address:"",parent_id:"",brought_by:""}}},methods:{getDetails:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$post("user/".concat(e.userId));case 2:e.details=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()},getRefById:function(e,t){var r=this;return Object(l.a)(regeneratorRuntime.mark((function l(){return regeneratorRuntime.wrap((function(l){for(;;)switch(l.prev=l.next){case 0:return l.next=2,r.$axios.$get("user/getReferral/".concat(e));case 2:r.details[t]=l.sent.data;case 3:case"end":return l.stop()}}),l)})))()}},mounted:function(){this.getDetails()},watch:{"details.brought_by":{handler:function(e){this.getRefById(e,"brought_by")},immediate:!0},"details.parent_id":{handler:function(e){this.getRefById(e,"parent_id")},immediate:!0}}},n=(r(1039),r(34)),component=Object(n.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12"},[r("div",{staticClass:"card card-outline-secondary"},[e._m(0),e._v(" "),r("div",{staticClass:"card-body"},[r("form",{staticClass:"form",attrs:{autocomplete:"off",role:"form"}},[r("div",{staticClass:"form-group"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("label",{attrs:{for:"inputName"}},[e._v("First Name")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.first_name,expression:"details.first_name"}],staticClass:"form-control",attrs:{disabled:"",id:"inputName",placeholder:"First name"},domProps:{value:e.details.first_name},on:{input:function(t){t.target.composing||e.$set(e.details,"first_name",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-md-6"},[r("label",{attrs:{for:"lastName"}},[e._v("Last Name")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.last_name,expression:"details.last_name"}],staticClass:"form-control",attrs:{disabled:"",id:"lastName",placeholder:"Last Name"},domProps:{value:e.details.last_name},on:{input:function(t){t.target.composing||e.$set(e.details,"last_name",t.target.value)}}})])])]),e._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-6"},[r("label",{staticStyle:{display:"block"}},[e._v("Gender")]),e._v(" "),r("div",{staticClass:"form-check"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.gender,expression:"details.gender"}],staticClass:"form-check-input",attrs:{disabled:"",value:"m",name:"gender",type:"radio"},domProps:{checked:e._q(e.details.gender,"m")},on:{change:function(t){return e.$set(e.details,"gender","m")}}}),e._v(" "),r("label",{staticClass:"form-check-label"},[e._v("Male")])]),e._v(" "),r("div",{staticClass:"form-check female"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.gender,expression:"details.gender"}],staticClass:"form-check-input",attrs:{disabled:"",value:"f",name:"gender",type:"radio"},domProps:{checked:e._q(e.details.gender,"f")},on:{change:function(t){return e.$set(e.details,"gender","f")}}}),e._v(" "),r("label",{staticClass:"form-check-label"},[e._v("Female")])])]),e._v(" "),r("div",{staticClass:"col-md-6"},[r("label",[e._v("Date of Birth")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.dob,expression:"details.dob"}],staticClass:"form-control",attrs:{disabled:"",placeholder:"DOB"},domProps:{value:e.details.dob},on:{input:function(t){t.target.composing||e.$set(e.details,"dob",t.target.value)}}})])])]),e._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-3"},[r("label",{attrs:{for:"phone"}},[e._v("Phone")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.phone,expression:"details.phone"}],staticClass:"form-control",attrs:{disabled:"",id:"phone",placeholder:"Phone"},domProps:{value:e.details.phone},on:{input:function(t){t.target.composing||e.$set(e.details,"phone",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-md-3"},[r("label",{attrs:{for:"email"}},[e._v("Email")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.email,expression:"details.email"}],staticClass:"form-control",attrs:{disabled:"",id:"email",placeholder:"Email",required:"",type:"email"},domProps:{value:e.details.email},on:{input:function(t){t.target.composing||e.$set(e.details,"email",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-md-3"},[r("label",{attrs:{for:"referral"}},[e._v("Sponsor ID"),e.sponsor?r("small",[e._v(": "+e._s(e.sponsor))]):e._e()]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.brought_by,expression:"details.brought_by"}],staticClass:"form-control",attrs:{disabled:"",placeholder:"Your sponsor ID",id:"referral"},domProps:{value:e.details.brought_by},on:{input:function(t){t.target.composing||e.$set(e.details,"brought_by",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-md-3"},[r("label",{attrs:{for:"placement"}},[e._v("Placement ID"),e.parent?r("small",[e._v(": "+e._s(e.parent))]):e._e()]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.parent_id,expression:"details.parent_id"}],staticClass:"form-control",attrs:{disabled:"",placeholder:"Your Placement ID",id:"placement",required:""},domProps:{value:e.details.parent_id},on:{input:function(t){t.target.composing||e.$set(e.details,"parent_id",t.target.value)}}})])])]),e._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-4"},[r("label",{attrs:{for:"account-number"}},[e._v("Account Number")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.account_number,expression:"details.account_number"}],staticClass:"form-control",attrs:{disabled:"",id:"account-number",placeholder:"Account Number"},domProps:{value:e.details.account_number},on:{input:function(t){t.target.composing||e.$set(e.details,"account_number",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-md-4"},[r("label",{attrs:{for:"bank"}},[e._v("Bank")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.bank_name,expression:"details.bank_name"}],staticClass:"form-control",attrs:{disabled:"",placeholder:"Account Name",id:"bank"},domProps:{value:e.details.bank_name},on:{input:function(t){t.target.composing||e.$set(e.details,"bank_name",t.target.value)}}})]),e._v(" "),r("div",{staticClass:"col-md-4"},[r("label",{attrs:{for:"account-name"}},[e._v("Account Name")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.account_name,expression:"details.account_name"}],staticClass:"form-control",attrs:{disabled:"",placeholder:"Account Name",id:"account-name"},domProps:{value:e.details.account_name},on:{input:function(t){t.target.composing||e.$set(e.details,"account_name",t.target.value)}}})])])]),e._v(" "),r("div",{staticClass:"form-group"},[r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-4"},[r("label",{attrs:{for:"country"}},[e._v("Country")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.country,expression:"details.country"}],staticClass:"form-control",attrs:{disabled:"",placeholder:"Country",id:"country"},domProps:{value:e.details.country},on:{input:function(t){t.target.composing||e.$set(e.details,"country",t.target.value)}}})]),e._v(" "),"Nigeria"==e.details.country?r("div",{staticClass:"col-md-4"},[r("label",{attrs:{for:"state"}},[e._v("State")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.state,expression:"details.state"}],staticClass:"form-control",attrs:{disabled:"",placeholder:"State",id:"state"},domProps:{value:e.details.state},on:{input:function(t){t.target.composing||e.$set(e.details,"state",t.target.value)}}})]):e._e(),e._v(" "),"Nigeria"==e.details.country?r("div",{staticClass:"col-md-4"},[r("label",{attrs:{for:"lga"}},[e._v("LGA")]),e._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:e.details.lga,expression:"details.lga"}],staticClass:"form-control",attrs:{disabled:"",placeholder:"LGA",id:"lga"},domProps:{value:e.details.lga},on:{input:function(t){t.target.composing||e.$set(e.details,"lga",t.target.value)}}})]):e._e()])])])])])])])}),[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"card-header m-b-33"},[t("h3",{staticClass:"mb-0"},[this._v("Profile")])])}],!1,null,"9ced028c",null);t.default=component.exports},908:function(e,t,r){"use strict";r(95);var l=r(27);t.a={methods:{isNumber:function(e){return/^\d+$/.test(e)},removeErrorClass:function(e){document.querySelector(e).classList.remove("is-invalid")},login:function(e){var t=this;return Object(l.a)(regeneratorRuntime.mark((function r(){var l,o,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return l=e.referral,o=e.password,r.prev=1,r.next=4,t.$auth.loginWith("local",{data:{referral:l,password:o}});case 4:return n=r.sent,t.$auth.setUser(n.data.user),r.abrupt("return","done");case 9:r.prev=9,r.t0=r.catch(1),console.log(r.t0);case 12:case"end":return r.stop()}}),r,null,[[1,9]])})))()}}}},937:function(e,t,r){var content=r(1040);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,r(46).default)("52b82c41",content,!0,{sourceMap:!1})}}]);