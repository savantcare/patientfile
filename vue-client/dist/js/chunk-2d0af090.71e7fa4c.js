(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0af090"],{"0d39":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-dialog",{attrs:{visible:e.dialogVisible,width:"80%","before-close":e.handleClose},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("el-tabs",{attrs:{type:"card"}},[a("el-tab-pane",[a("span",{staticStyle:{"font-size":"22px"},attrs:{slot:"label"},slot:"label"},[e._v(" Multi change reminder")]),a("el-row",{attrs:{gutter:12}},[a("el-col",{attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[a("el-form",{ref:"form",attrs:{"label-position":"top",model:e.form}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"Description"}},[a("el-input",{attrs:{span:8,type:"textarea",autosize:{minRows:4}},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"When to remind"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"Pick a date"},model:{value:e.form.when,callback:function(t){e.$set(e.form,"when",t)},expression:"form.when"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"success",size:"small"},on:{click:e.onSubmit}},[e._v("Save")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.onSubmit}},[e._v("Discontinue")])],1)],1),a("el-row",[a("span",{staticStyle:{"font-size":"14px"}},[e._v(" History:")])]),a("br"),a("el-row",{attrs:{gutter:12}},[a("div",{staticClass:"block"},[a("el-timeline",e._l(e.activities,(function(t,i){return a("el-timeline-item",{key:i,attrs:{icon:t.icon,type:t.type,color:t.color,size:t.size,timestamp:t.timestamp}},[e._v(" "+e._s(t.content)+" ")])})),1)],1)]),a("br")],1)],1),a("el-col",{attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[a("el-form",{ref:"form",attrs:{"label-position":"top",model:e.form}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"Description"}},[a("el-input",{attrs:{span:8,type:"textarea",autosize:{minRows:4}},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"When to remind"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"Pick a date"},model:{value:e.form.when,callback:function(t){e.$set(e.form,"when",t)},expression:"form.when"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"success",size:"small"},on:{click:e.onSubmit}},[e._v("Save")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.onSubmit}},[e._v("Discontinue")])],1)],1),a("el-row",[a("span",{staticStyle:{"font-size":"14px"}},[e._v(" History:")])]),a("br"),a("el-row",{attrs:{gutter:12}},[a("div",{staticClass:"block"},[a("el-timeline",e._l(e.activities,(function(t,i){return a("el-timeline-item",{key:i,attrs:{icon:t.icon,type:t.type,color:t.color,size:t.size,timestamp:t.timestamp}},[e._v(" "+e._s(t.content)+" ")])})),1)],1)]),a("el-pagination",{attrs:{small:"",layout:"prev, pager, next",total:50}})],1)],1),a("el-col",{attrs:{span:8}},[a("el-card",{staticClass:"box-card",attrs:{shadow:"hover"}},[a("el-form",{ref:"form",attrs:{"label-position":"top",model:e.form}},[a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"Description"}},[a("el-input",{attrs:{span:8,type:"textarea",autosize:{minRows:4}},model:{value:e.form.desc,callback:function(t){e.$set(e.form,"desc",t)},expression:"form.desc"}})],1),a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"When to remind"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"Pick a date"},model:{value:e.form.when,callback:function(t){e.$set(e.form,"when",t)},expression:"form.when"}})],1),a("el-form-item",[a("el-button",{attrs:{type:"success",size:"small"},on:{click:e.onSubmit}},[e._v("Save")]),a("el-button",{attrs:{type:"danger",size:"small"},on:{click:e.onSubmit}},[e._v("Discontinue")])],1)],1),a("el-row",[a("span",{staticStyle:{"font-size":"14px"}},[e._v(" History:")])]),a("br"),a("el-row",{attrs:{gutter:12}},[a("div",{staticClass:"block"},[a("el-timeline",e._l(e.activities,(function(t,i){return a("el-timeline-item",{key:i,attrs:{icon:t.icon,type:t.type,color:t.color,size:t.size,timestamp:t.timestamp}},[e._v(" "+e._s(t.content)+" ")])})),1)],1)]),a("br")],1)],1)],1)],1),a("el-tab-pane",[a("span",{staticStyle:{"font-size":"22px"},attrs:{slot:"label"},slot:"label"},[e._v(" Add reminder")]),a("el-row",{attrs:{gutter:12}},[a("el-col",{attrs:{span:24}},[a("el-card",{staticClass:"box-card"},[a("el-form",{ref:"dynamicValidateForm",staticClass:"demo-dynamic",attrs:{model:e.dynamicValidateForm}},[e._l(e.dynamicValidateForm.domains,(function(t){return a("el-form-item",{key:t.key,attrs:{prop:"desc","label-position":"top",rules:{required:!0,message:"Description can not be blank",trigger:"blur"}}},[a("el-row",[a("el-col",{attrs:{span:2,offset:24}},[a("i",{staticClass:"el-icon-close",on:{click:function(a){return a.preventDefault(),e.removeDomain(t)}}})])],1),a("el-input",{attrs:{span:8,type:"textarea",placeholder:"You may enter multi line text",autosize:{minRows:4}},model:{value:t.value,callback:function(a){e.$set(t,"value",a)},expression:"domain.value"}}),a("el-form-item",{staticStyle:{"font-weight":"bold"},attrs:{label:"When to remind"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"Pick a date"},model:{value:e.form.when,callback:function(t){e.$set(e.form,"when",t)},expression:"form.when"}})],1)],1)})),a("el-form-item",[a("el-button",{attrs:{type:"success",size:"small"},on:{click:function(t){return e.submitForm("dynamicValidateForm")}}},[e._v("Save")]),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:e.addDomain}},[e._v("Add one more")])],1)],2)],1)],1)],1)],1)],1)],1)},l=[],o=(a("4de4"),a("4160"),a("c975"),a("a434"),a("b0c0"),a("159b"),{data:function(){return{editableTabsValue:"2",editableTabs:[{title:"Multi change reminder",name:"reminder",content:"reminder"},{title:"Tab 2",name:"2",content:"Tab 2 content"}],tabIndex:2,form:{desc:"Reminder1",when:""},dialogVisible:!0,dynamicValidateForm:{domains:[{key:1,value:""}]},activities:[{content:"Reminder1",timestamp:"25th May, 2020",size:"large",type:"primary"},{content:"Rem1",timestamp:"25th May, 2020",color:"#0bbd87"}]}},methods:{handleTabsEdit:function(e,t){if("add"===t){var a=++this.tabIndex+"";this.editableTabs.push({title:"New Tab",name:a,content:"New Tab content"}),this.editableTabsValue=a}if("remove"===t){var i=this.editableTabs,l=this.editableTabsValue;l===e&&i.forEach((function(t,a){if(t.name===e){var o=i[a+1]||i[a-1];o&&(l=o.name)}})),this.editableTabsValue=l,this.editableTabs=i.filter((function(t){return t.name!==e}))}},onSubmit:function(){console.log("submit!")},handleClose:function(e){e()},submitForm:function(e){this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;alert("submit!")}))},resetForm:function(e){this.$refs[e].resetFields()},removeDomain:function(e){var t=this.dynamicValidateForm.domains.indexOf(e);-1!==t&&this.dynamicValidateForm.domains.splice(t,1)},addDomain:function(){this.dynamicValidateForm.domains.push({key:Date.now(),value:""})}}}),s=o,n=a("2877"),r=Object(n["a"])(s,i,l,!1,null,null,null);t["default"]=r.exports}}]);
//# sourceMappingURL=chunk-2d0af090.71e7fa4c.js.map