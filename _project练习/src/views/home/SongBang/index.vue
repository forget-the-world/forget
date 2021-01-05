<template>
  <div style="margin-top:-22px">
    <div class="bg">
      <div class="bgc">
        <div class="Song"></div>
        <span>更新时间：12月24日</span>
      </div>
    </div>
    <div class="musicBang" @click='toPlayer(item)' v-for="(item,index) in musiclist" :key="index">
      <div :class="[{ num_3: index < 3 },'num']">{{ index + 1 | number}}</div>
      <ul class="musiclist">
        <li>
          <p class="name">{{item.name}}</p>
          <div class="info">
            <i class="Song" v-if="item.copyright == 0"></i>
            <span class="Singer">{{item.ar[0].name}}-{{item.al.name}}</span>
          </div>
          <i class="play"></i>
        </li>
      </ul>
    </div>
    <div class="Completelist">查看完整榜单 ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      musicObj: [],
      musicIds: [],
      musiclist: [],
    };
  },
  created() {
    this.MusicIdList();
  },
  methods: {
    MusicIdList() {
      this.$http.post("/api/playlist/detail?id=3778678").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.musicObj = res.data.playlist.trackIds.slice(0, 20);
          console.log(this.musicObj);
          // 遍历出数组对象中的id
          for (var i = 0; i < this.musicObj.length; i++) {
            this.musicIds.push(this.musicObj[i].id);
          }
        }
        // 数据传入后调用
        this.MusicIds();
      });
    },
    MusicIds() {
      this.$http.post("/api/song/detail?ids=" + this.musicIds).then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.musiclist = res.data.songs;
        }
      });
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
    number(val) {
      if (val < 10) {
        return "0" + val;
      } else {
        return val;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.bg {
  padding-top: 39%;
  background: url(../../../assets/hot_music_bg.jpg) no-repeat;
  background-size: 100%;
  position: relative;
  overflow: hidden;
  .bgc {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .Song {
      height: 72px;
      background: url(../../../assets/index_icon.jpg) no-repeat -25px -25px;
      background-size: 166px;
    }
    span {
      color: rgba(255, 255, 255, 0.7);
      font-size: 6px;
      display: block;
      margin-top: 10px;
    }
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
.musicBang {
  display: flex;
  .num {
    flex: 1;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
    line-height: 4;
    color: #ccc;
  }
  .num_3 {
    color: #d43c33;
  }
  .musiclist {
    flex: 9;
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
}
.Completelist {
  text-align: center;
  font-size: 16px;
  line-height: 4;
  font-family: serif;
}
</style>