<template>
  <div class="container">
    <!-- 获取的歌曲地址 -->
    <audio v-if="songUrl" :src="songUrl" ref="myaudio"></audio>
    <!-- 接收的图片 -->
    <div class="bgc" :style="{'background-image': 'url('+imgUrl+')'}"></div>
    <div class="player">
      <div class="song" @click="changPlay">
        <div class="audio">
          <!-- 暂停图标 -->
          <b class="lock" v-if="!lock"></b>
          <!-- 接收的图片 -->
          <img :src="imgUrl" class="pic" :class="{start: lock}" alt />
          <div class="mask"></div>
        </div>
        <div class="song-name">
          <!-- 接收的歌曲名 -->
          <span class="name">{{name}}</span>-
          <!-- 接收的歌手名 -->
          <span class="nick">{{nickName}}</span>
        </div>
      </div>
      <div class="need"></div>
      <div class="footer">
        <van-button plain class="btn" round block color="#ff3a3a">打开</van-button>
        <van-button class="btn" round block color="#ff3a3a">下载</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      imgUrl: null,
      songUrl: null,
      nickName: null,
      name: null,
      lock: false,
    };
  },
  created() {
    // 获取的播放地址
    this.songUrl =
      "https://music.163.com/song/media/outer/url?id=" +
      this.$route.query.id +
      ".mp3";
      // 接收传参
    this.imgUrl = this.$route.query.picUrl;
    this.name = this.$route.query.name;
    this.nickName = this.$route.query.nickName;
  },
  methods: {
    // 设置的点击事件
    changPlay() {
      console.log(this.songUrl,'.....',this.imgUrl,this.name,this.nickName);
      this.lock = !this.lock;
      if (this.lock) {
        // 播放
        this.$refs.myaudio.play();
      } else {
        // 暂停
        this.$refs.myaudio.pause();
      }
    },
  },
};
</script>

<style lang="less" scoped>
&/deep/.van-button--default {
  background-color: transparent;
}
.bgc {
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: auto 100%;
  transform-origin: center top;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  filter: blur(15px);
  transform: scale(1.2);
  &::before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
.player {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  .song-name {
    color: #fff;
    text-align: center;
    padding-top: 15px;
    .name {
      font-size: 18px;
    }
    .nick {
      font-size: 16px;
      color: hsla(0, 0%, 100%, 0.6);
    }
  }
  .song {
    padding-top: 70px;
    .audio {
      position: relative;
      width: 296px;
      height: 296px;
      margin: 0 auto;
      .lock {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        width: 56px;
        height: 56px;
        background: url("../../assets/lock.png") no-repeat;
        background-size: 100% auto;
      }
      .pic {
        display: inline-block;
        width: 190px;
        height: 190px;
        background: orange;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-name: donghua;
        animation-duration: 10s;
        animation-play-state: paused;
        &.start {
          animation-play-state: running;
        }
        @keyframes donghua {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      }
      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("../../assets/disc-ip6.png") no-repeat;
        background-size: 100% auto;
      }
    }
  }
  .need {
    width: 96px;
    height: 137px;
    position: absolute;
    top: 0;
    left: 46%;
    background: url("../../assets/needle-ip6.png") no-repeat;
    background-size: 100% auto;
  }
  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    .btn {
      margin: 0 10px;
    }
  }
}
</style>
