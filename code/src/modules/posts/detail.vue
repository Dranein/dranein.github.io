<template>
  <div class="view-posts">
    
  </div>
</template>

<script>
  import Bus from '@/helper/bus';
  import Api from '@/helper/api';
  import Rest from '@/helper/rest';
  import Helper from '@/helper/helper';
  import $ from 'jquery'  

  export default {
    name: 'posts',
    components: {

    },
    data () {
      return {
        
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
  .view-posts{
  	font-size: 0;
  }
</style>
