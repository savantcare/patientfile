(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d228c68"],{db2f:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return t.history.length>0?r("div",{staticClass:"mb-2 mt-2"},[r("h5",[t._v("History:")]),r("b-list-group",t._l(t.pageHistory,(function(e,n){return r("b-list-group-item",{key:"history-"+n},[t._v(" "+t._s(e.content)+" "),r("br"),r("small",[t._v(t._s(e.info))])])})),1),t.pageCount>1?r("b-pagination",{staticClass:"mt-2",attrs:{"total-rows":t.rows,"per-page":t.perPage,align:"center",size:"sm"},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}}):t._e()],1):t._e()},s=[],i=(r("fb6a"),r("d3b7"),r("96cf"),r("1da1")),o=r("b441"),a={props:["id"],data:function(){return{history:[],currentPage:1,perPage:3}},computed:{recommendations:function(){return this.$store.state.recommendation.list},rows:function(){return this.history.length},pageHistory:function(){var t=(this.currentPage-1)*this.perPage,e=this.currentPage*this.perPage;return this.history.slice(t,e)},pageCount:function(){return Math.ceil(this.rows/this.perPage)}},watch:{id:function(){this.getHistory()}},mounted:function(){this.getHistory()},methods:{getHistory:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=localStorage.getItem("token"),e.next=3,fetch(o["RECOMMENDATION_API_URL"]+"/getHistory/"+t.id,{headers:{"Content-Type":"application/json;charset=utf-8",Authorization:"Bearer "+r}});case 3:return n=e.sent,e.next=6,n.json();case 6:t.history=e.sent;case 7:case"end":return e.stop()}}),e)})))()}}},c=a,u=r("2877"),h=Object(u["a"])(c,n,s,!1,null,"ebff7bc2",null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d228c68.2588e54e.js.map