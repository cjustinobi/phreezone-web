(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{1e3:function(e,t,n){"use strict";n(927)},1001:function(e,t,n){(t=n(45)(!1)).push([e.i,".hide-input[data-v-16f2f0ce]{display:none}img[data-v-16f2f0ce]{height:auto;width:100%}",""]),e.exports=t},1082:function(e,t,n){"use strict";n.r(t);var r={name:"home",layout:"dashboard",components:{Message:n(952).default},data:function(){return{loading:!1,visible:!1,title:"",description:""}}},o=n(34),component=Object(o.a)(r,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("Message")],1)}),[],!1,null,null,null);t.default=component.exports;installComponents(component,{Message:n(952).default})},901:function(e,t,n){"use strict";var r=n(904),o=n.n(r);t.a={methods:{formatDate:function(e){var t="";return e&&(t=o()(new Date(e),this.dateFormat)),t},getTime:function(e){var t="";return e&&(t=o()(new Date(e),this.dateFormat2)),t}}}},927:function(e,t,n){var content=n(1001);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(46).default)("69d3e2e1",content,!0,{sourceMap:!1})},952:function(e,t,n){"use strict";n.r(t);n(53),n(110),n(48),n(106),n(107),n(925),n(95);var r=n(27),o=n(901),c=[{title:"Title",dataIndex:"title",scopedSlots:{customRender:"topic"}},{title:"Release Time",dataIndex:"created_at",scopedSlots:{customRender:"created"}},{title:"Delete",scopedSlots:{customRender:"delete"}}],l={name:"Message",mixins:[o.a],data:function(){return{columns:c,messages:"",dateFormat:"d MMM, Y",loading:!1,visible:!1,title:"",description:"",readingMode:!1,file:"",url:""}},methods:{getMessages:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.$get("admin/message");case 2:e.messages=t.sent.data;case 3:case"end":return t.stop()}}),t)})))()},saveMessage:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(""!=e.title&&""!=e.description){t.next=2;break}return t.abrupt("return",e.$message.error("Fill in the required field"));case 2:return e.loading=!0,t.next=5,e.$axios.$post("admin/message",e.form);case 5:if(!(n=t.sent).success){t.next=9;break}return e.$set(e.messages,0,n.data),t.abrupt("return",e.cancel());case 9:e.$message.error("Message not saved"),e.loading=!1;case 11:case"end":return t.stop()}}),t)})))()},deleteMessage:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$axios.$delete("admin/message/".concat(e));case 2:r=n.sent,r.success&&(t.getMessages(),t.$message.success("Message deleted"));case 5:case"end":return n.stop()}}),n)})))()},handleFile:function(e){this.file=e.target.files[0],this.url=URL.createObjectURL(this.file)},cancel:function(){this.title="",this.description="",this.loading=!1,this.visible=!1},readMessage:function(e){this.title=e.title,this.description=e.description,this.file=e.image_path,this.readingMode=!0}},computed:{form:function(){var form=new FormData;return form.append("title",this.title),form.append("description",this.description),form.append("file",this.file),form}},mounted:function(){this.getMessages()}},d=(n(1e3),n(34)),component=Object(d.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",["/home"===e.$route.path?n("a-page-header",{attrs:{"sub-title":"Message Notifications"}},[e.isAdmin?n("template",{slot:"extra"},[n("a-button",{attrs:{type:"primary"},on:{click:function(t){e.visible=!0}}},[e._v("Add Message")])],1):e._e()],2):e._e(),e._v(" "),n("a-modal",{attrs:{title:"Create Message","confirm-loading":e.loading},on:{cancel:e.cancel,ok:e.saveMessage},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[n("a-input",{attrs:{placeholder:"Message Title"},model:{value:e.title,callback:function(t){e.title=t},expression:"title"}}),e._v(" "),n("br"),n("br"),e._v(" "),n("a-textarea",{attrs:{placeholder:"Enter the message ...","auto-size":{minRows:3,maxRows:5}},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}}),e._v(" "),n("br"),n("br"),e._v(" "),n("img",{staticClass:"img-thumbnail",attrs:{src:e.url?e.url:""}}),e._v(" "),n("input",{ref:"file",staticClass:"hide-input",attrs:{type:"file"},on:{change:e.handleFile}}),e._v(" "),n("br"),n("br"),e._v(" "),n("button",{staticClass:"btn btn-light",attrs:{type:"button"},on:{click:function(t){return t.preventDefault(),e.$refs.file.click(t)}}},[e._v("Choose file")])],1),e._v(" "),n("a-modal",{attrs:{title:"Message",footer:null},model:{value:e.readingMode,callback:function(t){e.readingMode=t},expression:"readingMode"}},[n("h6",[e._v(e._s(e.title))]),e._v(" "),n("p",[e._v(e._s(e.description))]),e._v(" "),n("img",{attrs:{alt:"pop",src:e.$config.imagePath+"/"+e.file}})]),e._v(" "),e.messages?n("a-table",{attrs:{columns:e.columns,"data-source":e.messages,rowKey:function(e){return e.id}},scopedSlots:e._u([{key:"topic",fn:function(t,r){return n("span",{},[n("a",{attrs:{href:"javascript:;"},on:{click:function(t){return e.readMessage(r)}}},[e._v(e._s(t))])])}},{key:"created",fn:function(t){return n("span",{},[e._v(e._s(e.formatDate(t)))])}},{key:"delete",fn:function(t){return e.isAdmin?n("span",{},[n("a-button",{attrs:{type:"link"},on:{click:function(n){return e.deleteMessage(t.id)}}},[e._v("Delete")])],1):e._e()}}],null,!0)}):e._e()],1)}),[],!1,null,"16f2f0ce",null);t.default=component.exports}}]);