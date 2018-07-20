<template>
  <div class="view-index">
    <div class="banner">
      <video id="myvideo1" width="100%" autoplay="autoplay" src="../../assets/video/video1.mp4" loop="loop"> 
      </video>  
    </div>
    <div class="postsList">
      <div class="item" v-for="(item,index) in postsList">
        <p class="time">这篇帖子创造于：{{item.createtime}}</p>
        <p class="title">{{item.postTitle}}</p>
        <div class="content" v-html="item.postContent"></div>
      </div>
      <div class="item">
        <input type="text" name="" placeholder="请输入标题" v-model="addPost.postTitle">
        <textarea placeholder="请输入内容" v-model="addPost.postContent"></textarea>
        <button @click="btn_submit()">添加</button>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/helper/bus';
import Api from '@/helper/api';
import Rest from '@/helper/rest';
import Helper from '@/helper/helper';
import $ from 'jquery'  

export default {
  name: 'index',
  components: {

  },
  data () {
    return {
      indexClassList: [],
      postsList:[],
      addPost:{
        postTitle: '',
        postContent: ''
      }
    }
  },
  methods:{
    init() {
      this.getPostsList();
    },
    getPostsList(){
      var restApi = Api.posts.getpostsList;
      Rest.get(restApi).done((res)=>{
        if(Helper.isSuccess(res)){
          res.data.forEach((o)=>{
            o.createtime = Helper.formatDateAndTime(o.createtime,"yyyy-MM-dd hh:mm")
          })  
          this.postsList = res.data;
        }
      })
    },
    btn_submit(){
      var restApi = Api.posts.addPost;
      var parms = this.addPost;
      Rest.post(restApi,parms).done((res)=>{
        if(Helper.isSuccess(res)){
          this.getPostsList();
          this.addPost = {
            postTitle: '',
            postContent: ''
          }
        }
        // this.postsList = res;
        // console.log(this.postsList)
      })
    }
  },
  activated() {
    this.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/sass/install";

.view-index{
  height: 100%;
  width: 100%;
	font-size: 0;
  .banner{
    position: relative;
    max-height: px2rem(400);
    overflow: hidden;
    #myvideo1{
      position: relative;
      z-index: 0;
      height: 100%;
      width: 100%;
    }
  }
  .postsList{
    padding: px2rem(20);
    .item{
      padding: px2rem(20);
      font-size: px2rem(16);
      background-color: #fff;
      text-align: left;
      margin-bottom: px2rem(20);
      cursor: pointer;
      transition: all 500ms;
      -moz-transition: all 500ms;  /* Firefox 4 */
      -webkit-transition: all 500ms; /* Safari 和 Chrome */
      -o-transition: all 500ms;  /* Opera */
      &:hover{
        box-shadow: 0 5px 5px 2px rgba(0,0,0,0.1);
      }
      .time{
        font-size: px2rem(14);
        color: #999;
      }
      .title{
        font-weight: 600;
        font-size: px2rem(18);
        color: #333;
        margin: px2rem(10) 0; 
      }
      .content{
        font-size: px2rem(16);
        color: #666;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
      input,textarea{
        margin: 0; 
        width: 100%;
        box-sizing: border-box;
        padding: px2rem(8) 0;
        border: none;
        resize: none;
        outline: none;
        font-size: px2rem(16);
        font-weight: normal;
      }
    }
  }
}
</style>
