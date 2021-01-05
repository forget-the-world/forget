<template>
  <div>
    <h2>推荐歌单</h2>
    <div class="gedan">
      <div class="item" v-for="(item,index) in GedanList" :key="index">
        <div class="pic">
          <img :src="item.picUrl" alt />
          <span>{{ item.playCount | Listen }}万</span>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <h2>最新音乐</h2>
    <ul class="musiclist">
      <li @click="toPlayer(item)" v-for="(item,index) in MusicList" :key="index">
        <p class="name">{{item.name}}</p>
        <div class="info">
          <i class="Song" v-if="item.copyright == 0"></i>
          <span class="Singer">{{item.ar[0].name}}-{{item.al.name}}</span>
        </div>
        <i class="play"></i>
      </li>
    </ul>
    <div class="footer">
      <div class="openapp" @click="openUrl">打开APP，发现更多好音乐 ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      GedanList: [],
      MusicList: [],
    };
  },
  created() {
    this.getGedanList(), this.getMusiclist();
  },
  methods: {
    getGedanList() {
      this.$http.post("/api/personalized?limit=6").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.GedanList = res.data.result;
        }
      });
    },
    getMusiclist() {
      this.$http.post("/api/top/list?idx=2").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.MusicList = res.data.playlist.tracks.slice(0, 20);
        }
      });
    },
    openUrl() {
      window.location =
        "https://m.music.163.com/m/applink/?scheme=orpheus%3A%2F%2Fopenurl";
    },
    toPlayer(data) {
      console.log(data);
      let obj = {
        path: "/player",
        query: {
          picUrl: data.al.picUrl,
          name: data.name,
          id: data.id,
          nickName: data.ar[0].name,
        },
      };
      this.$router.push(obj);
    },
  },
  filters: {
    Listen(val) {
      //   小数点后一位
      return (val / 10000).toFixed(1);
    },
  },
};
</script>

<style lang="less" scoped>
h2 {
  font-size: 20px;
  font-weight: 400;
  padding-left: 10px;
  margin-bottom: 20px;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 2px;
    height: 16px;
    background-color: #d43c33;
  }
  &:last-of-type {
    margin-bottom: 10px;
  }
}
.gedan {
  display: flex;
  flex-wrap: wrap;
  .item {
    flex: calc(33% - 4px);
    margin-right: 2px;
    .pic {
      width: 100%;
      position: relative;
      img {
        width: 100%;
      }
      span {
        position: absolute;
        top: 3px;
        right: 5px;
        color: #fff;
      }
    }
    p {
      font-size: 16px;
      padding-bottom: 30px;
    }
  }
}
.musiclist {
  padding-left: 10px;
  li {
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    padding-right: 32px;
    position: relative;
    .play {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 22px;
      height: 22px;
      background: url("../../../assets/index_icon.jpg");
      background-repeat: no-repeat;
      background-position: -24px 0;
      background-size: 166px 97px;
    }
    .name {
      padding-top: 10px;
      font-size: 17px;
    }
    .info {
      padding-bottom: 10px;
      .Singer {
        font-size: 12px;
        color: #888;
      }
      .Song {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background: url("../../../assets/index_icon.jpg");
        background-size: 166px 97px;
      }
    }
  }
}
.footer {
  background: url("../../../assets/recommand_bg_2x.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  padding: 150px 0 30px 0;
  .openapp {
    line-height: 40px;
    border: 1px solid #d33a31;
    border-radius: 40px;
    font-size: 16px;
    color: #d33a31;
    margin: 15px 37px 5px;
    text-align: center;
  }
}
</style>
