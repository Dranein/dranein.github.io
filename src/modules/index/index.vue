<template>
  <div class="view-index">
    <div class="top_nav">
      <ul>
        <li v-for="(item,index) in topNav"><span>{{item.title}}</span></li>
      </ul>
    </div>
    <com-banner size='big' ref='ref_banner' bannerkey="index_carousel_1"></com-banner>
    <index-ad></index-ad>
    <com-banner bannerkey="index_carousel_2"></com-banner>
    <index-tab></index-tab>
    <div class="classBox">
      <index-class className='最热板块' postModule="HOSTEST" bannerkey="index_carousel_3"></index-class>
    </div>
    <div class="classBox">
      <index-class className='热门板块' postModule="HOST" bannerkey="index_carousel_4"></index-class>
    </div>
    <div class="classBox">
      <index-class className='其他板块' postModule="OTHER1" bannerkey="index_carousel_5"></index-class>
    </div>
    <div class="classBox">
      <index-class className='其他板块2' postModule="OTHER2" bannerkey="index_carousel_6"></index-class>
    </div>
    <div class="classBox">
      <index-class className='校友老乡社团' postModule="ALUMNI" bannerkey="index_carousel_7"></index-class>
    </div>
    <footer class="footer">
      <com-banner class="footer_bannner" ref='ref_banner_footer' bannerkey="index_carousel_8"></com-banner>
      <div class="footer_friendlylink">
        <div class="title">/ 友情链接 /</div> 
        <ul>
          <li><i class="icon"></i><p>伯明翰学院</p></li>
          <li><i class="icon"></i><p>中国驻英国大使馆</p></li>
          <li><i class="icon"></i><p>中国驻英国大使馆</p></li>
          <li><i class="icon"></i><p>全英学联</p></li>
        </ul>
      </div>
      <div class="footer_adr">
        <ul>
          <li>联系我们</li>
          <li>广告合作</li>
          <li>免责声明</li>
          <li>网站统计</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import ComBanner from '@/components/banner/banner'
import IndexAd from './child/index_ad'
import IndexTab from './child/index_tab'
import IndexClass from './child/index_class'
import Bus from '@/helper/bus';
import Api from '@/helper/api';
import Rest from '@/helper/rest';
import Helper from '@/helper/helper';
import $ from 'jquery'

export default {
  name: 'index',
  components: {
  	ComBanner,IndexAd,IndexTab,IndexClass
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
    Bus.$emit('headerType');
    this.init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../../assets/sass/install";

.view-index{
	font-size: 0;
  .classBox{
    margin-bottom: px2rem(23);
  }
  .top_nav{
    background-color: #f8f8f8;
    box-shadow: 0px 4px 9.8px 0.7px rgba(14, 5, 10, 0.06);
    margin-bottom: px2rem(24);
    ul{
      li{
        cursor: pointer;
        position: relative;
        display: inline-block;
        vertical-align: top;
        width: 25%;
        font-size: px2rem(31);
        font-weight: 500;
        color: #f49085;
        height: px2rem(80);
        &:after{
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: px2rem(-25);
          content:'';
          display: inline-block;
          height: px2rem(50);
          border-right: 1.5px solid #e9e9e9;
          width: 0;

        };
        span{
          display: inline-flex;
          align-items: center;
          height: 100%;
        }
        &:last-child{
          font-size: px2rem(24);
          padding: 0 px2rem(30);
          &:after{
            border: none;
          }
        };
      }
    }
  }
  .footer{
    .footer_bannner{
      margin-bottom: px2rem(11);
    }
    .footer_friendlylink{
      padding-top: px2rem(22);
      padding-bottom: px2rem(46);
      background-color: #fff;
      box-shadow: 0px 3.5px 11.5px 0.5px rgba(14, 5, 10, 0.07);
      margin-bottom: px2rem(20);
      .title{
        font-size: px2rem(24);
        color: #f49085;
        margin-bottom: px2rem(30);
      }
      ul{
        li{
          display: inline-block;
          vertical-align: top;
          font-size: px2rem(20);
          text-align: center;
          color: #404040;
          width: 25%;
          p{
            font-size: px2rem(18);
          }
          .icon{
            background-color: #ddd;
            height: px2rem(84);
            width: px2rem(84);
            display: inline-block;
            vertical-align: top;
            margin-bottom: px2rem(7);
          }
        }
      }
    }
    .footer_adr{
      height: px2rem(79);
      padding-top: px2rem(10);
      background-color: #fff;
      box-shadow: 0px 4px 9.8px 0.7px rgba(14, 5, 10, 0.06);
      ul{
        li{
          display: inline-block;
          vertical-align: top;
          height: px2rem(50);
          line-height: px2rem(50);
          width: 25%;
          color: #f49085;
          font-size: px2rem(31);
          border-right: 1px solid #f0f0f0;
          &:last-child{
            border-right: none;
          }
        }
      }
    }
  }
 
}
</style>
