<template>
  <div id="app">
    <header  class="app_header"> 
      <com-header>
      </com-header>
    </header>
    <div class="app_content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <transition :name="tranName">
      <div class="app_nav"  v-if="navShow" v-clickoutside="nav_clickoutside">
        <com-nav>
        </com-nav>
      </div>
    </transition>
    <!-- <footer class="app_footer">
      <com-footer>
      </com-footer>
    </footer> -->
  </div>
</template>

<script>
// import ComFooter from '@/modules/footer'
import ComHeader from '@/modules/header'
import ComNav from '@/modules/nav'
import clickoutside from '@/helper/clickoutside';
import Bus from '@/helper/bus';
import Api from '@/helper/api';
import Rest from '@/helper/rest';
import Helper from '@/helper/helper';
import $ from 'jquery'

export default {

  name: 'App',
  components: {
    ComHeader,
    ComNav
  },
  directives: {
    clickoutside
  },
  data () {
    return {
      tranName:'transright',
      navShow: false
    }
  },
  methods:{
    show() {
      this.tranName = 'transright';
      this.navShow = true;
    },
    nav_clickoutside() {
      this.tranName = 'transleft';
      setTimeout(()=>{
        this.navShow = false;
      }, 100);
    },
  },
  created(){
    // 获取窗口的宽度
    function resetFontSize(){
      let htmlWidth = window.innerWidth || document.body.clienWidth;
      if(htmlWidth>750){htmlWidth = 750};
      let htmlDom = document.getElementsByTagName('html')[0];
      htmlDom.style.fontSize = htmlWidth / 10 + 'px';
    }
    resetFontSize();
    $(window).resize(function(){
      resetFontSize();
    })
    Bus.$on('app_nav_show',()=>{
      this.show();
    })
    Bus.$on('app_nav_close',()=>{
      this.nav_clickoutside();
    })
  }
}
</script>

<style lang="scss" scoped>
@import "./assets/sass/install";

#app {
  position: absolute;
  overflow: hidden;
  margin:  0 auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .app_header{
    position: absolute;
    z-index: 2;
    left: 0;
    right: 0;
    top: 0;
    height: px2rem(80);
    border-bottom:0.5px solid #eee; 
  }
  .app_content{
    position: absolute;
    left: 0;
    right: 0;
    top: px2rem(80);
    bottom: 0;
    overflow: auto;
    background: #eee;
  }
  .app_footer{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: px2rem(40);
  }
  .app_nav{
    background-color: #fff;
    box-shadow: -1px 0 4px #ddd;
    position: fixed;
    z-index: 100;
    right: 0;
    top: 0;
    bottom: 0;
    width: 60%;
    max-width: px2rem(600);
  }
}

</style>
