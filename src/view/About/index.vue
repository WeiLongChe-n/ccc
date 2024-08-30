<template>
  <div style="width: 100vw; height:100vh;font-size:37.5px">
    <view >
    <div class="page-main">
      <div class="page-main-huanbg">
        <div class="cente-bg"></div>
      </div>
      <div class="ring">
        <div class="ring-item" v-for="item,index in userStore.apps" :class="'ring-item' + (index+1)" :key="item.appId"  @click="goTarget(item)">
            <img :src="item.iconUrl || '@/assets/img/cyjsc.png'" alt="icon" :onerror="imgError">
            <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </view>
  </div>

</template>

<script setup name="Index">
import { ref } from "vue";
function imgError(event){
    let img = event.srcElement;
	 img.src = imgUrl
	 img.onerror = null; //防止闪图
}

const apps = ref([1,2,3,4,5,6]);
</script>

<style scoped lang="scss">
$themes:6;
$deg: 60;
 .page-main {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  .page-main-bg {
    width: 100%;
    height: 100%;
  }
  .page-main-huanbg {
    position: absolute;
    left: 50%;
    top: 50%;
    width:82.7vw;
    height:77.7vh;
    transform: translate(-50%,-50%);
    z-index: 1;
    background-image: url("../assets/img/huan.png");
    background-repeat: no-repeat;
    background-size: 100% 100% ;
  }
  .cente-bg {
      position: absolute;
      z-index:1;
      left: 0;
      top: 5.55vw;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 14.625vw;
      height: 14.625vw;
      background-image: url("../assets/img/fill1920.png");
      background-size: 100%;
    }
.ring {
  width:82.7vw;
  height: 82.7vw;
  border-radius: 100%;
  background: rgba(0,0,0,.3);
  position: absolute;
  left: 50%;
  top: 10%;
  z-index: 2;
  margin-left: -41.35vw;
  margin-top: -20.675vw;
  transform: rotateX(-73deg) ;
  transform-origin: center center;
}
.ring .ring-item {
  width: 9.375vw;
  height:9.375vw;
  transform: rotateX(73deg) ;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 50%;
  position: absolute;
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  img {
      width: 7.8125vw;
      height: 7.552vw;
    }
    span {
      font-size: 30px;
      font-weight: 700;
      color: #CCD0D4;
    }
}
}
 
 @for $i from 1 through 6 {
  .ring-item#{$i} {
    animation: move#{$i} 60s linear infinite;
  }
  @keyframes move#{$i} {
    from {
      transform: rotateZ(#{-1 * $i * $deg + 'deg'}) translateX(41.35vw) rotateZ(#{ $i * $deg + 'deg'}) rotateY(-70deg);
    }
    to {
      transform: rotateZ(#{360 -  $i * $deg  + 'deg'}) translateX(41.35vw) rotateZ(#{ $i * $deg - 360 + 'deg'}) rotateY(-70deg);
    }
  }
}
</style>
