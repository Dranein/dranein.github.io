<template>
  <div class="comp-nav">
    <div class="user">
      <div class=imgBox>
      	<img src="http://img5.mtime.cn/pi/2017/12/08/150747.22653528.jpg">
      </div>
      <div class="userName">Dranein</div>
    </div>
    <div class="nav">
      <ul>
        <li v-for="item in navlist" @click="handleJump(item.id)">{{ item.name }}</li>
      </ul>
    </div>
    <!-- <div class="logOut">
    </div> -->
  </div>
</template>

<script>
import Bus from '@/helper/bus';
import Helper from '@/helper/helper';


export default {
  name: 'com-header',
  data () {
    return {
    	userName: '',
      navlist: [
        {'id':'mypublish','name':'我的发布'},
        {'id':'collect','name':'我的收藏'},
        {'id':'classify','name':'我的消息'},
        {'id':'classify','name':'设置'}
      ]
    }
  },
  methods:{
    
  },
  created() {
    // this.userName = Helper.get('nickname');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/sass/install";

.comp-nav{
  position: relative;
	font-size: 0;
	padding-top: px2rem(80);
	height: 100%;
  padding-bottom: px2rem(90);
  overflow: auto;
	.user{
		.imgBox{
			display: inline-block;
			width: px2rem(200);
			height: px2rem(200);
			overflow: hidden;
			border-radius: 50%;
			border: 3px solid $font_p;
		}
		.userName{
			font-size: px2rem(30);
			font-weight: bold;
			margin-top: px2rem(20);
		}
	}
	.nav{
		margin-top: px2rem(50);
    overflow: auto;
		ul{
			li{
				font-size: px2rem(29);
				margin-bottom: px2rem(20);
				padding: px2rem(20) 0;
        color: #4a4a4a;
			}
		}
	}
  .logOut{
    font-size: px2rem(30);
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
    span{
      display: inline-block;
      margin: 0 auto; 
      color: #f49085;
      border-radius: px2rem(5);
      padding: px2rem(20) px2rem(45);
      border: solid px2rem(3) #f49085;
    }
  }
}
</style>
