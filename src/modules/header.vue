<template>
  <div class="comp-header">
    {{title}}
  </div>
</template>

<script>
import Bus from '@/helper/bus';
import Helper from '@/helper/helper';
import $ from 'jquery'
  
export default {
  name: 'com-header',
  components: {
    Login
  },
  data () {
    return {
      title: 'Dranein Blog',
      navlist: [
        {'id':'index','name':'首页'},
        {'id':'message','name':'消息'},
        {'id':'classify','name':'关于我'},
      ]
    }
  },
  methods:{

    // headerType(curVal){
    //   for(var i in this.show){
    //     this.show[i] = false;
    //   }
    //   switch(this.$route.name){
    //     case 'myindex': 
    //     case 'index': 
    //       this.title = '首页';
    //       this.show.logo = true;
    //       this.show.more = true;break;
    //     case 'classify': 
    //       this.title = '分类';
    //       this.show.add = true;
    //       this.show.title = true;
    //       this.show.back = true;
    //       this.show.more = true;break;
    //     case 'register': 
    //       this.title = '注册';
    //       this.show.title = true;
    //       this.show.back = true;break;
    //     case 'message': 
    //       this.title = '我的消息';break;
    //     case 'publish': 
    //       this.title = '发布帖子';
    //       this.show.title = true;
    //       this.show.addOk = true;
    //       this.show.back = true;break;
    //     case 'mypublish':
    //       this.title = '我的发布';
    //       this.show.title = true;
    //       this.show.back = true;break;
    //     case 'collect': 
    //       this.title = '我的收藏';
    //       this.show.title = true;
    //       this.show.back = true;break;
    //     case 'detail': 
    //       this.title = '帖子';
    //       this.show.title = true;
    //       this.show.back = true;
    //       // this.show.add = true;
    //       this.show.more = true;break;
    //     case 'setcoms': 
    //       this.title = '发表回复';
    //       this.show.title = true;
    //       this.show.addComOk = true;
    //       this.show.back = true;break;
    //     case 'seach': 
    //       this.title = '搜索';
    //       this.show.title = true;
    //       this.show.back = true;break;
    //     default:
    //       this.$router.push({name:'index'})
    //   }
    //   $('.app_content').scrollTop(0);//滚回顶部
    // }
  },
  created() {
    // this.headerType();
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/sass/install";

.comp-header{
  background: #fff;
  height: 100%;
	font-size: px2rem(14);
  display: flex;
  align-items: center;
  justify-content: center;
  .logo{
    display: inline-block;
    width: px2rem(64);
    height: px2rem(64);
    background: url(./../assets/images/icons.png) no-repeat;
    background-size: px2rem(620) auto;
    background-position: px2rem(-69) px2rem(4);
  }
  .back{
    position: absolute;
    left: px2rem(15);
    display: flex;
  }
  .title{
    font-size: px2rem(26.5);
    color: #333;
  }
  .nav{
    ul{
      padding: 0;
      margin: 0;
      font-size: 0;
      height: 100%;
      li{
        height: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size:  px2rem(14);
        cursor: pointer;
        padding:0 px2rem(15);
      }
    }
  }
  .flr{
    div{
      margin-left: px2rem(10);
    }
    position: absolute;
    right: px2rem(15);
    height: 100%;
    display: flex;
    align-items: center;
    .login{
      height: 100%;
      display: flex;
      align-items: center;
    }
    em{
      font-size: px2rem(20);
      color: #f49085;
    }
  }
}
.icon{
  display: inline-block;
  width: px2rem(39);
  height: px2rem(39);
  background: url(./../assets/images/icons.png) no-repeat;
  background-size: px2rem(580) auto;
  &.icon_login{
    background-position: px2rem(-151) px2rem(-6);
  }
  &.icon_back{
    background-position: px2rem(0) px2rem(-6);
  }
  &.icon_more{
    background-position: px2rem(-439) px2rem(-6);
  }
  &.icon_addPosts{
    background-position: px2rem(-326) px2rem(-6);
  }
  
}
</style>
