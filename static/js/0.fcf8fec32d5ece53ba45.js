webpackJsonp([0],{FG1O:function(t,s,e){t.exports=e.p+"static/media/video1.ab8dbe5.mp4"},HOHl:function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("Idcw");var o=e("+Btm"),i=e("fXai"),a=e("QDif"),n=(e("L7Pj"),{name:"index",components:{},data:function(){return{indexClassList:[],postsList:[],addPost:{postTitle:"",postContent:""}}},methods:{init:function(){this.getPostsList()},getPostsList:function(){var t=this,s=o.a.posts.getpostsList;i.a.get(s).done(function(s){a.a.isSuccess(s)&&(s.data.forEach(function(t){t.createtime=a.a.formatDateAndTime(t.createtime,"yyyy-MM-dd hh:mm")}),t.postsList=s.data)})},btn_submit:function(){var t=this,s=o.a.posts.addPost,e=this.addPost;i.a.post(s,e).done(function(s){a.a.isSuccess(s)&&(t.getPostsList(),t.addPost={postTitle:"",postContent:""})})}},activated:function(){this.init()}}),d={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"view-index"},[t._m(0),t._v(" "),e("div",{staticClass:"postsList"},[t._l(t.postsList,function(s,o){return e("div",{staticClass:"item"},[e("p",{staticClass:"time"},[t._v("这篇帖子创造于："+t._s(s.createtime))]),t._v(" "),e("p",{staticClass:"title"},[t._v(t._s(s.postTitle))]),t._v(" "),e("div",{staticClass:"content",domProps:{innerHTML:t._s(s.postContent)}})])}),t._v(" "),e("div",{staticClass:"item"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.addPost.postTitle,expression:"addPost.postTitle"}],attrs:{type:"text",name:"",placeholder:"请输入标题"},domProps:{value:t.addPost.postTitle},on:{input:function(s){s.target.composing||t.$set(t.addPost,"postTitle",s.target.value)}}}),t._v(" "),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.addPost.postContent,expression:"addPost.postContent"}],attrs:{placeholder:"请输入内容"},domProps:{value:t.addPost.postContent},on:{input:function(s){s.target.composing||t.$set(t.addPost,"postContent",s.target.value)}}}),t._v(" "),e("button",{on:{click:function(s){t.btn_submit()}}},[t._v("添加")])])],2)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"banner"},[s("video",{attrs:{id:"myvideo1",width:"100%",autoplay:"autoplay",src:e("FG1O"),loop:"loop"}})])}]};var c=e("vSla")(n,d,!1,function(t){e("uR8z")},"data-v-de75b052",null);s.default=c.exports},uR8z:function(t,s){}});
//# sourceMappingURL=0.fcf8fec32d5ece53ba45.js.map