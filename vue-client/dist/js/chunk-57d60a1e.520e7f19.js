(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-57d60a1e","chunk-13df7e30"],{"00c4":function(t,e,a){"use strict";var i=a("71ad"),n=a.n(i);n.a},"129f":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},3792:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-row",{attrs:{gutter:12}},[a("el-col",{attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[a("el-form",{ref:"form",attrs:{"label-position":"top",model:t.form}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"Description"}},[a("el-input",{attrs:{span:8,type:"textarea",autosize:{minRows:4}},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"success",size:"small"},on:{click:t.onSubmit}},[t._v("Save")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.onSubmit}},[t._v("Discontinue")])],1)],1),a("el-row",[a("span",{staticStyle:{"font-size":"14px"}},[t._v("History:")])]),a("br"),a("el-row",{attrs:{gutter:12}},[a("div",{staticClass:"block"},[a("el-timeline",t._l(t.activities,(function(e,i){return a("el-timeline-item",{key:i,attrs:{icon:e.icon,type:e.type,color:e.color,size:e.size,timestamp:e.timestamp}},[t._v(t._s(e.content))])})),1)],1)]),a("br")],1)],1),a("el-col",{attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[a("el-form",{ref:"form",attrs:{"label-position":"top",model:t.form}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"Description"}},[a("el-input",{attrs:{span:8,type:"textarea",autosize:{minRows:4}},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"success",size:"small"},on:{click:t.onSubmit}},[t._v("Save")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.onSubmit}},[t._v("Discontinue")])],1)],1),a("el-row",[a("span",{staticStyle:{"font-size":"14px"}},[t._v("History:")])]),a("br"),a("el-row",{attrs:{gutter:12}},[a("div",{staticClass:"block"},[a("el-timeline",t._l(t.activities,(function(e,i){return a("el-timeline-item",{key:i,attrs:{icon:e.icon,type:e.type,color:e.color,size:e.size,timestamp:e.timestamp}},[t._v(t._s(e.content))])})),1)],1)]),a("el-pagination",{attrs:{small:"",layout:"prev, pager, next",total:50}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[a("el-form",{ref:"form",attrs:{"label-position":"top",model:t.form}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"Description"}},[a("el-input",{attrs:{span:8,type:"textarea",autosize:{minRows:4}},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"success",size:"small"},on:{click:t.onSubmit}},[t._v("Save")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:t.onSubmit}},[t._v("Discontinue")])],1)],1),a("el-row",[a("span",{staticStyle:{"font-size":"14px"}},[t._v("History:")])]),a("br"),a("el-row",{attrs:{gutter:12}},[a("div",{staticClass:"block"},[a("el-timeline",t._l(t.activities,(function(e,i){return a("el-timeline-item",{key:i,attrs:{icon:e.icon,type:e.type,color:e.color,size:e.size,timestamp:e.timestamp}},[t._v(t._s(e.content))])})),1)],1)]),a("br")],1)],1)],1)},n=[],o=(a("4de4"),a("4160"),a("c975"),a("a434"),a("b0c0"),a("159b"),{data:function(){return{editableTabsValue:"2",editableTabs:[{title:"Multi change recommendation",name:"recommendation",content:"recommendation"},{title:"Tab 2",name:"2",content:"Tab 2 content"}],tabIndex:2,form:{desc:"Recommendation1",when:""},dialogVisible:!0,dynamicValidateForm:{domains:[{key:1,value:""}]},activities:[{content:"Recommendation1",timestamp:"25th May, 2020",size:"large",type:"primary"},{content:"Rex1",timestamp:"25th May, 2020",color:"#0bbd87"}]}},methods:{handleTabsEdit:function(t,e){if("add"===e){var a=++this.tabIndex+"";this.editableTabs.push({title:"New Tab",name:a,content:"New Tab content"}),this.editableTabsValue=a}if("remove"===e){var i=this.editableTabs,n=this.editableTabsValue;n===t&&i.forEach((function(e,a){if(e.name===t){var o=i[a+1]||i[a-1];o&&(n=o.name)}})),this.editableTabsValue=n,this.editableTabs=i.filter((function(e){return e.name!==t}))}},onSubmit:function(){console.log("submit!")},handleClose:function(t){t()},submitForm:function(t){this.$refs[t].validate((function(t){if(!t)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm:function(t){this.$refs[t].resetFields()},removeDomain:function(t){var e=this.dynamicValidateForm.domains.indexOf(t);-1!==e&&this.dynamicValidateForm.domains.splice(e,1)},addDomain:function(){this.dynamicValidateForm.domains.push({key:Date.now(),value:""})}}}),s=o,l=a("2877"),r=Object(l["a"])(s,i,n,!1,null,"111b0679",null);e["default"]=r.exports},6403:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"text-align":"center"}},[a("el-autocomplete",{staticClass:"inline-input",attrs:{"fetch-suggestions":t.querySearch,"trigger-on-focus":!1,placeholder:"Please Input","prefix-icon":"el-icon-search",clearable:""},on:{select:t.handleSelect},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)},n=[],o=(a("4de4"),a("ac1f"),a("841c"),a("b441")),s={data:function(){return{keyword:"",componentList:[{value:"Add Recommendation",key:o["ADD_RECOMMENDATION"]},{value:"Multi change recommendation",key:o["MULTIPLE_CHANGE_RECOMMENDATION"]},{value:"Social History",key:o["SOCIAL_HISTORY"]}]}},mounted:function(){},methods:{querySearch:function(t,e){var a=[];0==t.length&&(a=[]),a=this.componentList.filter((function(e){return e.value.toLowerCase().search(t)>-1})),e(a)},handleSelect:function(t){var e=t.key;if(e==o["ADD_RECOMMENDATION"]){var i={label:"Add Recommendation",value:a("d910").default,name:"tab-add-recommendation"};this.$store.commit("addNewTab",i)}else if(e==o["MULTIPLE_CHANGE_RECOMMENDATION"]){var n={label:"Multi change recommendation",value:a("3792").default,name:"tab-multi-change-recommendation"};this.$store.commit("addNewTab",n)}else if(e==o["SOCIAL_HISTORY"]){var s={label:"Social History",value:a("0cf5").default,name:"tab-social-history"};this.$store.commit("addNewTab",s)}}}},l=s,r=a("2877"),c=Object(r["a"])(l,i,n,!1,null,null,null);e["default"]=c.exports},"71ad":function(t,e,a){},"841c":function(t,e,a){"use strict";var i=a("d784"),n=a("825a"),o=a("1d80"),s=a("129f"),l=a("14c3");i("search",1,(function(t,e,a){return[function(e){var a=o(this),i=void 0==e?void 0:e[t];return void 0!==i?i.call(e,a):new RegExp(e)[t](String(a))},function(t){var i=a(e,t,this);if(i.done)return i.value;var o=n(t),r=String(this),c=o.lastIndex;s(c,0)||(o.lastIndex=0);var u=l(o,r);return s(o.lastIndex,c)||(o.lastIndex=c),null===u?-1:u.index}]}))},dc08:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("el-dialog",{attrs:{visible:t.visibility,"custom-class":"multi-tab-dialog",width:"90%",top:"5vh"},on:{"update:visible":function(e){t.visibility=e}}},[a("el-tabs",{attrs:{type:"card",editable:""},on:{edit:t.handleTabsEdit},model:{value:t.tabValue,callback:function(e){t.tabValue=e},expression:"tabValue"}},t._l(t.tabList,(function(t){return a("el-tab-pane",{key:t.name,attrs:{label:t.label,name:t.name}},[a(t.value,{tag:"component"})],1)})),1)],1)},n=[],o=(a("4de4"),a("b0c0"),{data:function(){return{tabIndex:0}},computed:{tabList:function(){return this.$store.state.tabDialog.tabList},tabValue:{get:function(){return this.$store.state.tabDialog.tabValue},set:function(t){this.$store.commit("setTabValue",t)}},visibility:{get:function(){return this.$store.state.tabDialog.visibility},set:function(t){this.$store.commit("setTabDialogVisibility",t)}}},mounted:function(){this.tabIndex=this.tabList.length},methods:{handleTabsEdit:function(t,e){if("add"===e){var i="tab-".concat(++this.tabIndex),n={label:"New tab",value:a("6403").default,name:i};this.$store.commit("addNewTab",n)}if("remove"===e){var o=this.tabList.filter((function(e){return e.name!=t}));this.$store.commit("setTabList",o),o.length>0&&(this.tabValue=o[0]["name"])}}}}),s=o,l=(a("00c4"),a("2877")),r=Object(l["a"])(s,i,n,!1,null,null,null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-57d60a1e.520e7f19.js.map