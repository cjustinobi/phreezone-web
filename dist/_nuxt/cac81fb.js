(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1108:function(e,t,r){"use strict";r.r(t);r(912),r(82),r(164),r(95);var n=r(27),o={name:"user",layout:"dashboard",validate:function(e){var t=e.params;return/^\d+$/.test(t.id)},data:function(){return{user:"",pkgs:"",selectedPkgId:"",banks:""}},methods:{getUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$post("user/".concat(e.$route.params.id));case 2:e.user=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()},getPackages:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("getPackages");case 2:e.pkgs=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()},updateUser:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(1!=e.isValidFields()){t.next=6;break}return t.next=3,e.$axios.$put("user/".concat(e.$route.params.id),e.user);case 3:(r=t.sent).success?e.$message.success(r.message):e.$message.error(r.message),e.$router.push("/users/".concat(e.$route.params.id));case 6:case"end":return t.stop()}}),t)})))()},getAccountName:function(){this.banks.length&&setTimeout(Object(n.a)(regeneratorRuntime.mark((function e(){var t,r,n,o=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t=this.banks.find((function(e){return e.name==o.user.bank_name})))){e.next=7;break}return r=t.code,e.next=5,this.$axios.$post("/banks",{account_number:this.user.account_number,bank_code:r});case 5:(n=e.sent).status?this.user.account_name=n.data.account_name:this.user.account_name="";case 7:case"end":return e.stop()}}),e,this)}))),5e3)},isValidFields:function(){var e=!0,t=[];return""==this.user.first_name&&(e=!1,t.push("First Name is required")),""==this.user.last_name&&(e=!1,t.push("Last Name is required")),""==this.user.phone&&(e=!1,t.push("Phone is required")),""==this.user.bank_name&&(e=!1,t.push("Bank name is required")),e||this.$store.dispatch("notification/setStatus",{messages:t,success:!1}),e},getBanks:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("/banks");case 2:e.banks=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()}},computed:{formItemLayout:function(){return{labelCol:{span:4},wrapperCol:{span:14}}}},beforeMount:function(){this.getUser(),this.getPackages(),this.getBanks()},watch:{user:{handler:function(e){e&&(this.selectedPkgId=e.package_id)},immediate:!0}}},c=r(34),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("a-page-header",{attrs:{"sub-title":"Edit User"}}),e._v(" "),r("a-form-model",e._b({},"a-form-model",e.formItemLayout,!1),[r("a-form-model-item",{attrs:{label:"First Name"}},[r("a-input",{attrs:{placeholder:"First Name"},model:{value:e.user.first_name,callback:function(t){e.$set(e.user,"first_name",t)},expression:"user.first_name"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"Last Name"}},[r("a-input",{attrs:{placeholder:"Last Name"},model:{value:e.user.last_name,callback:function(t){e.$set(e.user,"last_name",t)},expression:"user.last_name"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"Phone"}},[r("a-input",{attrs:{placeholder:"Phone"},model:{value:e.user.phone,callback:function(t){e.$set(e.user,"phone",t)},expression:"user.phone"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"Email"}},[r("a-input",{attrs:{placeholder:"Email"},model:{value:e.user.email,callback:function(t){e.$set(e.user,"email",t)},expression:"user.email"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"State"}},[r("a-input",{attrs:{placeholder:"State"},model:{value:e.user.state,callback:function(t){e.$set(e.user,"state",t)},expression:"user.state"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"LGA"}},[r("a-input",{attrs:{placeholder:"LGA"},model:{value:e.user.lga,callback:function(t){e.$set(e.user,"lga",t)},expression:"user.lga"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"Bank Name"}},[r("select",{directives:[{name:"model",rawName:"v-model",value:e.user.bank_name,expression:"user.bank_name"}],staticClass:"form-control",attrs:{id:"bank"},on:{change:[function(t){var r=Array.prototype.filter.call(t.target.options,(function(e){return e.selected})).map((function(e){return"_value"in e?e._value:e.value}));e.$set(e.user,"bank_name",t.target.multiple?r:r[0])},e.getAccountName]}},[r("option",[e._v("Select Bank")]),e._v(" "),e._l(e.banks,(function(t,i){return r("option",{key:i},[e._v(e._s(t.name))])}))],2)]),e._v(" "),r("a-form-model-item",{attrs:{label:"Account Number"}},[r("a-input",{attrs:{placeholder:"Account Number"},on:{change:e.getAccountName},model:{value:e.user.account_number,callback:function(t){e.$set(e.user,"account_number",t)},expression:"user.account_number"}})],1),e._v(" "),r("a-form-model-item",{attrs:{label:"Account Name"}},[r("a-input",{attrs:{placeholder:"Account Name",disabled:""},model:{value:e.user.account_name,callback:function(t){e.$set(e.user,"account_name",t)},expression:"user.account_name"}})],1),e._v(" "),e.user&&e.user.package?r("a-form-model-item",{attrs:{label:"Package"}},[r("a-input",{attrs:{value:e.user.package.name,disabled:""}})],1):e._e(),e._v(" "),r("a-form-model-item",{attrs:{"wrapper-col":{span:14,offset:4}}},[r("a-button",{attrs:{type:"primary"},on:{click:e.updateUser}},[e._v("Submit")])],1)],1)],1)}),[],!1,null,"71518506",null);t.default=component.exports},912:function(e,t,r){"use strict";var n=r(28),o=r(138).find,c=r(305),l=r(96),m=!0,d=l("find");"find"in[]&&Array(1).find((function(){m=!1})),n({target:"Array",proto:!0,forced:m||!d},{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),c("find")}}]);