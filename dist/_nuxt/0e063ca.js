(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{1101:function(e,t,n){"use strict";n.r(t);n(95);var r=n(27),o=n(901),c=[{title:"Member",dataIndex:"full_name",fixed:"left",scopedSlots:{customRender:"fullName"}},{title:"Level",dataIndex:"package",scopedSlots:{customRender:"pkg"}},{title:"Date Joined",dataIndex:"created_at",scopedSlots:{customRender:"joined"}},{title:"Rank",dataIndex:"rank",scopedSlots:{customRender:"rank"}},{title:"Generation",dataIndex:"depth",scopedSlots:{customRender:"depth"}},{title:"Previous Week Accumulated Performance",dataIndex:"prevWeekPoint",scopedSlots:{customRender:"pw"}},{title:"Current Week Accumulated Performance",dataIndex:"currentWeekPoint",scopedSlots:{customRender:"cw"}},{title:"Accumulated Performance",dataIndex:"stream_pv",scopedSlots:{customRender:"pv"}}],d={name:"sponsor-list",layout:"dashboard",mixins:[o.a],data:function(){return{columns:c,dateFormat:"d MMM, Y",activities:""}},methods:{getActivites:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$post("user/streamAccumulatedPv/".concat(e.userId),{});case 2:e.activities=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()}},mounted:function(){this.getActivites()}},l=n(34),component=Object(l.a)(d,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a-page-header",{attrs:{"sub-title":"Stream Sponsor's Network"}}),e._v(" "),e.activities?n("a-table",{attrs:{columns:e.columns,"data-source":e.activities,rowKey:function(e){return e.id},scroll:{x:1500,y:300}},scopedSlots:e._u([{key:"fullName",fn:function(t,r){return n("span",{},[n("b",[e._v(e._s(r.referral))]),e._v(" "),n("br"),e._v(" "),n("span",[e._v(e._s(r.full_name))])])}},{key:"pkg",fn:function(t){return t?n("span",{},[e._v(e._s(t.name))]):e._e()}},{key:"joined",fn:function(t){return n("span",{},[e._v(e._s(e.formatDate(t)))])}},{key:"rank",fn:function(t){return n("span",{},[e._v("None")])}},{key:"pv",fn:function(t,r){return n("span",{},[e._v(e._s(r.accumulatedPv))])}},{key:"pw",fn:function(t,r){return n("span",{},[e._v(e._s(r.prevWeekAccumulatedPv?r.prevWeekAccumulatedPv:r.prevWeekPoint))])}}],null,!0)}):e._e()],1)}),[],!1,null,"08c7978f",null);t.default=component.exports},901:function(e,t,n){"use strict";var r=n(904),o=n.n(r);t.a={methods:{formatDate:function(e){var t="";return e&&(t=o()(new Date(e),this.dateFormat)),t},getTime:function(e){var t="";return e&&(t=o()(new Date(e),this.dateFormat2)),t}}}}}]);