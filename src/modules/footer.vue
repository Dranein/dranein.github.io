<template>
  <div class="comp-footer">
    <ul>
    	<li v-for="item in navlist" @click="handleJump(item.id)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'com-footer',
  data () {
    return {
      navlist: [
      	{'id':'index','name':'首页'},
      	{'id':'classify','name':'分类'},
      	{'id':'publish','name':'发布'},
      	{'id':'message','name':'消息'},
      	{'id':'user','name':'我的'},
      ]
    }
  },
	methods:{
  	handleJump(id){
  		this.$router.push({
  			name:id
  		})
  		console.log(id)
  	}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/sass/install";
.comp-footer{
	width: 100%;
	height: 100%;
	border-top:1px solid #ddd; 
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
			width: 20%;
			cursor: pointer;
		}
	}
}
</style>
