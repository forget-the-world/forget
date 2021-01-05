<template>
  <div style="margin-top:-15px;">
    <van-search
      v-model="value"
      @input="change"
      @search="Result"
      shape="round"
      autofocus="true"
      placeholder="搜索歌曲、歌手、专辑"
    />
    <div v-if="show">
      <div class="hot">热门搜索</div>
      <span
        class="hotRecommend"
        @click="Result(item.searchWord)"
        v-for="(item,index) in searchlist"
        :key="index"
      >{{item.searchWord}}</span>
      <ul class="show_key">
        <li v-for="(item,index) in doList" :key="index">
          <van-icon color="#ccc" class="icon1" name="clock-o" />
          <span>{{item}}</span>
          <van-icon @click="removeKey(item)" color="#ccc" class="icon2" name="cross" />
        </li>
      </ul>
    </div>
    <div v-else-if="oninput">
      <div class="seach">搜索 “{{value}}”</div>
      <div class="item" @click="Result(item.keyword)" v-for="(item,index) in proposal" :key="index">
        <div class="pic">
          <img src="../../../assets/search.png" alt />
        </div>
        <span class="content">{{item.keyword}}</span>
      </div>
    </div>
    <div v-else-if="!keySongsList" style="text-align:center;margin:20px;">暂无搜索结果</div>
    <ul class="top_list" v-else>
      <li v-for="(item,index) in keySongsList" :key="index" @click="toPlayer(item)">
        <p class="name">{{item.name}}</p>
        <div class="info">
          <i class="sq" v-if="item.fee == 0"></i>
          <span class="zj">{{item.name}}-{{item.artists[0].name}}</span>
        </div>
        <i class="play"></i>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      searchlist: [],
      show: true,
      oninput: false,
      proposal: [],
      doList: [],
      keySongsList: [],
    };
  },
  created() {
    this.Search();
  },
  methods: {
    Search() {
      this.$http.post("/api/search/hot/detail").then((res) => {
        console.log(res);
        if (res.status == 200) {
          this.searchlist = res.data.data.slice(0, 10);
        }
      });
    },
    change() {
      this.show = false;
      this.oninput = true;
      if (this.value == "") {
        this.show = true;
        this.oninput = false;
        return;
      }
      this.$http
        .post("/api/search/suggest?keywords= " + this.value + "&type=mobile")
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.proposal = res.data.result.allMatch;
          }
        });
    },
    Result(data) {
      this.value = data;
      this.show = false;
      this.oninput = false;
      if (this.value == "") {
        return (this.show = true);
      }
      if (this.value && !this.doList.includes(this.value)) {
        this.doList.push(this.value);
      }
      this.$http
        .get("/api/search", {
          params: {
            keywords: this.value,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            this.keySongsList = res.data.result.songs;
          }
        });
    },
    // 删除查询记录
    removeKey(val) {
      this.doList = this.doList.filter((item) => item != val);
    },
    toPlayer(data) {
      console.log(data);
      let obj = {
        path: "/player",
        query: {
          picUrl: data.artists[0].img1v1Url,
          name: data.name,
          id: data.id,
          nickName: data.artists[0].name,
        },
      };
      this.$router.push(obj);
    },
  },
};
</script>

<style lang="less" scoped>
&/deep/ .van-search__content {
  background-color: #e7e7e7;
}
&/deep/ .van-search {
  padding-bottom: 18px;
  border-bottom: 1px solid #ccc;
}
.hot {
  font-size: 12px;
  padding: 15px 0 0 10px;
}
.hotRecommend {
  display: inline-block;
  border-radius: 25px;
  padding: 0 10px;
  margin: 10px;
  font-size: 16px;
  line-height: 2;
  border: 1px solid #333;
}
.seach {
  margin-left: 10px;
  padding: 15px 0;
  font-size: 16px;
  color: rgb(52, 144, 202);
  border-bottom: 1px solid #ccc;
}
.item {
  display: flex;
  .pic {
    flex: 0.5;
    padding: 10px;
    padding-right: 0;
    img {
      width: 16px;
      vertical-align: text-top;
    }
  }
  .content {
    font-size: 16px;
    flex: 9.5;
    padding: 10px 0;
    // margin-left: 10px;
    border-bottom: 1px solid #ccc;
  }
}
.top_list {
  padding-left: 10px;
  li {
    padding: 5px 0;
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
      background-size: 166px;
    }
    .name {
      font-size: 17px;
    }
    .info {
      .zj {
        font-size: 12px;
        color: #888;
      }
      .sq {
        display: inline-block;
        width: 12px;
        height: 8px;
        margin-right: 4px;
        background: url("../../../assets/index_icon.jpg");
        background-size: 166px;
      }
    }
  }
}
.show_key {
  padding: 0 10px;
  margin-top: 15px;
  li {
    line-height: 40px;
    position: relative;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    .icon1 {
      margin-right: 10px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
    }
    .icon2 {
      vertical-align: middle;
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>