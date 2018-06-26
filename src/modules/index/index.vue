<template>
  <div class="view-index">
    <div class="banner">
      <video id="myvideo1" width="100%" autoplay="autoplay" src="../../assets/video/video1.mp4" loop="loop"> 
      </video>  
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
      topNav: [
        {'title':'租房购房','key':'1'},
        {'title':'工作招聘','key':'2'},
        {'title':'二手商店','key':'3'},
        {'title':'冲击啵闯UK','key':'4'}
      ] 
    }
  },
  methods:{
    init() {

    },
    
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
}
</style>
