(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{1057:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImFycm93X2JhY2tfMjRweCI+CjxwYXRoIGlkPSJpY29uL25hdmlnYXRpb24vYXJyb3dfYmFja18yNHB4IiBkPSJNMjAgMTFINy44M0wxMy40MiA1LjQxTDEyIDRMNCAxMkwxMiAyMEwxMy40MSAxOC41OUw3LjgzIDEzSDIwVjExWiIgZmlsbD0iI0ZFRkVGRSIgZmlsbC1vcGFjaXR5PSIwLjU0Ii8+CjwvZz4KPC9zdmc+Cg=="},1058:function(t,e,r){"use strict";r(947)},1059:function(t,e,r){(e=r(45)(!1)).push([t.i,"img[data-v-579423db]{margin-top:16px;margin-bottom:12px}.col[data-v-579423db]{margin-bottom:8px}.item[data-v-579423db]{background:#f8964b;border-radius:10px;font-size:.5rem;padding:5px;height:255px}.detail[data-v-579423db]{background:#fefefe;padding:2px 4px;border-radius:5px}.stream[data-v-579423db]{display:grid;justify-content:center;margin-bottom:12px}.spv[data-v-579423db]{color:#ba3d3d}.ref[data-v-579423db]{font-size:.9em}",""]),t.exports=e},1103:function(t,e,r){"use strict";r.r(e);r(95);var n=r(27),c={name:"team-performance",layout:"dashboard",mixins:[r(915).a],data:function(){return{treeData:""}},methods:{getTrees:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.$axios.$get("user/".concat(t,"/trees"));case 2:e.treeData=r.sent.data;case 3:case"end":return r.stop()}}),r)})))()},resetWeeklyPv:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("resetPvs");case 2:e.sent&&(t.getTrees(t.userId),t.$message.success("Stream Pvs resetted"));case 4:case"end":return e.stop()}}),e)})))()}},mounted:function(){this.getTrees(this.userId)}},o=(r(1058),r(34)),component=Object(o.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-page-header",{attrs:{"sub-title":"Team Performance Activities"}},[t.isAdmin?n("template",{slot:"extra"},[n("a-button",{attrs:{type:"primary"},on:{click:t.resetWeeklyPv}},[t._v("Reset Weekly Stream")])],1):t._e()],2),t._v(" "),t.treeData.length?n("a-row",{staticStyle:{"margin-bottom":"36px"},attrs:{type:"flex",justify:"center"}},[t.treeData.length&&t.treeData[0]?n("a-col",{attrs:{xs:12,lg:6}},[n("div",{staticClass:"item",staticStyle:{"margin-right":"1px"}},[n("a-row",{attrs:{gutter:4}},[n("a-col",{staticClass:"col",attrs:{xs:24}},[n("img",{staticClass:"img-responsive",attrs:{width:"40px",src:"m"==t.treeData[0].gender?r(587):r(588),alt:"User picture"}}),t._v(" "),n("div",{staticClass:"detail"},[t._v("\n              "+t._s(t.treeData[0].full_name)+"\n              "),n("a-tag",{staticClass:"ref",attrs:{color:"green"}},[t._v("\n                "+t._s(t.treeData[0].referral)+"\n              ")])],1)]),t._v(" "),n("a-col",{staticClass:"col",attrs:{xs:12}},[n("div",{staticClass:"detail"},[t.treeData[0].rank?n("strong",[n("b",[t._v(t._s(t._f("rank")(t.treeData[0].rank)))])]):n("strong",[t._v("No Rank")])])]),t._v(" "),n("a-col",{staticClass:"col",attrs:{xs:12}},[n("div",{staticClass:"detail"},[t.treeData[0].package?n("strong",[t._v(t._s(t.treeData[0].package.name))]):n("strong",[t._v("No Package")])])])],1),t._v(" "),n("div",{staticClass:"stream"},[n("strong",{staticClass:"detail"},[t._v("Stream PV "),n("span",{staticClass:"spv"},[t._v(t._s(t.treeData[0].downlines_stream_pv))])])]),t._v(" "),n("div",{staticClass:"stream"},[n("strong",{staticClass:"detail"},[t._v("Member Under Network "+t._s(t.treeData[0].member_network_count))])]),t._v(" "),"1"!=t.treeData[0].id?n("div",{staticClass:"stream"},[n("img",{attrs:{src:r(1057)},on:{click:function(e){return t.getTrees(t.treeData[0].parent_id)}}})]):t._e()],1)]):t._e()],1):t._e(),t._v(" "),n("a-row",{attrs:{type:"flex",justify:"center"}},[t.treeData.length&&t.treeData[1]?n("a-col",{attrs:{xs:12,lg:6}},[n("div",{staticClass:"item",staticStyle:{"margin-right":"1px"}},[n("a-row",{attrs:{gutter:4}},[n("a-col",{staticClass:"col",attrs:{xs:24}},[n("img",{staticClass:"img-responsive",attrs:{width:"40px",src:"m"==t.treeData[1].gender?r(587):r(588),alt:"User picture"}}),t._v(" "),n("div",{staticClass:"detail"},[t._v("\n              "+t._s(t.treeData[1].full_name)+"\n              "),n("a-tag",{staticClass:"ref",attrs:{color:"green"}},[t._v("\n                "+t._s(t.treeData[1].referral)+"\n              ")])],1)]),t._v(" "),n("a-col",{staticClass:"col",attrs:{xs:12}},[n("div",{staticClass:"detail"},[t.treeData[1].rank?n("strong",[n("b",[t._v(t._s(t._f("rank")(t.treeData[1].rank)))])]):n("strong",[t._v("No Rank")])])]),t._v(" "),n("a-col",{staticClass:"col",attrs:{xs:12}},[n("div",{staticClass:"detail"},[t.treeData[1].package?n("strong",[t._v(t._s(t.treeData[1].package.name))]):n("strong",[t._v("No Package")])])])],1),t._v(" "),n("div",{staticClass:"stream"},[n("strong",{staticClass:"detail"},[t._v("Stream PV "),n("span",{staticClass:"spv"},[t._v(t._s(t.treeData[1].downlines_stream_pv))])])]),t._v(" "),n("div",{staticClass:"stream"},[n("strong",{staticClass:"detail"},[t._v("Member Under Network "+t._s(t.treeData[1].member_network_count))])]),t._v(" "),n("div",{staticClass:"stream"},[n("img",{attrs:{src:r(946)},on:{click:function(e){return t.getTrees(t.treeData[1].id)}}})])],1)]):t._e(),t._v(" "),t.treeData.length&&t.treeData[2]?n("a-col",{attrs:{xs:12,lg:6}},[n("div",{staticClass:"item",staticStyle:{"margin-left":"1px"}},[n("a-row",{attrs:{gutter:4}},[n("a-col",{staticClass:"col",attrs:{xs:24}},[n("img",{staticClass:"img-responsive",attrs:{width:"40px",src:"m"==t.treeData[2].gender?r(587):r(588),alt:"User picture"}}),t._v(" "),n("div",{staticClass:"detail"},[t._v("\n              "+t._s(t.treeData[2].full_name)+"\n              "),n("a-tag",{staticClass:"ref",attrs:{color:"green"}},[t._v("\n                "+t._s(t.treeData[2].referral)+"\n              ")])],1)]),t._v(" "),n("a-col",{staticClass:"col",attrs:{xs:12}},[n("div",{staticClass:"detail"},[t.treeData[2].rank?n("strong",[n("b",[t._v(t._s(t._f("rank")(t.treeData[2].rank)))])]):n("strong",[t._v("No Rank")])])]),t._v(" "),n("a-col",{staticClass:"col",attrs:{xs:12}},[n("div",{staticClass:"detail"},[t.treeData[2].package?n("strong",[t._v(t._s(t.treeData[2].package.name))]):n("strong",[t._v("No Package")])])])],1),t._v(" "),n("div",{staticClass:"stream"},[n("strong",{staticClass:"detail"},[t._v("Stream PV "),n("span",{staticClass:"spv"},[t._v(t._s(t.treeData[2].downlines_stream_pv))])])]),t._v(" "),n("div",{staticClass:"stream"},[n("strong",{staticClass:"detail"},[t._v("Member Under Network "+t._s(t.treeData[2].member_network_count))])]),n("i",{attrs:{type:"arrow-right"}}),t._v(" "),n("div",{staticClass:"stream"},[n("img",{attrs:{src:r(946)},on:{click:function(e){return t.getTrees(t.treeData[2].id)}}})])],1)]):t._e()],1)],1)}),[],!1,null,"579423db",null);e.default=component.exports},915:function(t,e,r){"use strict";e.a={filters:{rank:function(t){if(!t)return"";var e;switch(t){case"d1":e="Diamond 1";break;case"d2":e="Diamond 2";break;case"d3":e="Diamond 3";break;case"l1":e="Legend 1";break;case"l2":e="Legend 2";break;case"l3":e="Legend 3";break;case"l4":e="Legend 4";break;case"sd1":e="Star Diamond 1";break;case"sd2":e="Star Diamond 2";break;case"sd3":e="Star Diamond 3";break;case"sd4":e="Star Diamond 4";break;case"sd5":e="Star Diamond 5";break;default:e="No rank"}return e}}}},946:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImFycm93X2ZvcndhcmRfMjRweCI+CjxwYXRoIGlkPSJpY29uL25hdmlnYXRpb24vYXJyb3dfZm9yd2FyZF8yNHB4IiBkPSJNMTIgNEwxMC41OSA1LjQxTDE2LjE3IDExSDRWMTNIMTYuMTdMMTAuNTkgMTguNTlMMTIgMjBMMjAgMTJMMTIgNFoiIGZpbGw9IiNGRUZFRkUiIGZpbGwtb3BhY2l0eT0iMC41NCIvPgo8L2c+Cjwvc3ZnPgo="},947:function(t,e,r){var content=r(1059);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(46).default)("e389b972",content,!0,{sourceMap:!1})}}]);