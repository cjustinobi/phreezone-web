(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{1096:function(e,t,n){"use strict";n.r(t);n(98),n(95);var r=n(27),o=n(901),c=[{title:"Member",dataIndex:"full_name",fixed:"left",scopedSlots:{customRender:"fullName"}},{title:"Level",dataIndex:"package",scopedSlots:{customRender:"pkg"}},{title:"Date Joined",dataIndex:"created_at",scopedSlots:{customRender:"joined"}},{title:"Rank",dataIndex:"rank",scopedSlots:{customRender:"rank"}},{title:"Generation",dataIndex:"depth",scopedSlots:{customRender:"depth"}}],d={name:"sponsor-list",layout:"dashboard",mixins:[o.a],filters:{capitalize:function(e){return 0==e?"None":e.charAt(0).toUpperCase()+e.slice(1)}},data:function(){return{columns:c,dateFormat:"d MMM, Y",activities:""}},methods:{getActivites:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$post("user/accumulatedPv/".concat(e.userId),{type:"placement"});case 2:e.activities=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.getActivites()}},l=n(34),component=Object(l.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a-page-header",{attrs:{"sub-title":"Sponsor's Network Activities"}}),e._v(" "),e.activities?n("a-table",{attrs:{columns:e.columns,"data-source":e.activities,rowKey:function(e){return e.id},scroll:{x:1500,y:300}},scopedSlots:e._u([{key:"fullName",fn:function(t,r){return n("span",{},[n("b",[e._v(e._s(r.referral))]),e._v(" "),n("br"),e._v(" "),n("span",[e._v(e._s(r.full_name))])])}},{key:"pkg",fn:function(t){return t?n("span",{},[e._v(e._s(t.name))]):e._e()}},{key:"joined",fn:function(t){return n("span",{},[e._v(e._s(e.formatDate(t)))])}},{key:"rank",fn:function(t,r){return n("span",{},[e._v(e._s(e._f("capitalize")(r.rank)))])}}],null,!0)}):e._e()],1)}),[],!1,null,"8342376c",null);t.default=component.exports},901:function(e,t,n){"use strict";var r=n(904),o=n.n(r);t.a={methods:{formatDate:function(e){var t="";return e&&(t=o()(new Date(e),this.dateFormat)),t},getTime:function(e){var t="";return e&&(t=o()(new Date(e),this.dateFormat2)),t}}}}}]);