<template>
  <div class="IndexFooter" ref="ref_IndexFooter">
    <div class="IndexFooter_bg"></div>
    <div class='IndexFooter_cirle'></div>
  </div>
</template>

<script>
  export default {
    mounted () {
      let parentNode = this.$refs['ref_IndexFooter'].parentNode;
      let parentsNode = parentNode.parentNode;
      parentsNode.style = 'position: relative;z-index: 0;color: #fff;';
    }
  }
</script>

<style>
.IndexFooter {
  position: fixed;
  z-index: -1;
}
.IndexFooter_bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
.IndexFooter_cirle {

}
.IndexFooter_cirle::after, .IndexFooter_cirle::before {
  content: '';
  position: fixed;
  left: 50%;
  width: 120vw;
  height: 120vw;
  bottom: 0;
  animation-name: rotate;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: #3f4641;
}
.IndexFooter_cirle::after {
  border-radius: 48%;
  animation-duration: 10s;
}
.IndexFooter_cirle::before {
  border-radius: 45%;
  animation-duration: 10s;
  opacity: 0.2;
  animation-duration: 20s;
  animation-duration: 10s;
}


@keyframes rotate {
  0% {
      transform: translate(-50%, 0) rotateZ(0deg);
  }
  50% {
      transform: translate(-50%, -2%) rotateZ(180deg);
  }
  100% {
      transform: translate(-50%, 0%) rotateZ(360deg);
  }
}
</style>