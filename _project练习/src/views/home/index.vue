<template>
  <div>
    <div class="Page">
      <div class="top">
        <img src="../../assets/01.gif" alt />
        <img src="../../assets/02.gif" alt />
      </div>
      <van-tabs v-model="active" duration='0' line-width='60px' title-active-color='#d43c33'>
        <van-tab title="推荐音乐">
            <Music></Music>
        </van-tab>
        <van-tab title="热歌榜">
          <SongBang></SongBang>
        </van-tab>
        <van-tab title="搜索">
          <Search></Search>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import Music from './music'
import SongBang from './SongBang'
import Search from './Search'
export default {
    components:{
        Music,
        SongBang,
        Search
    },
    data() {
        return {
            active:1
        }
    },
};
</script>

<style lang="less" scoped>
.Page{
    width: 100%;
    .top{
        width: 100%;
        height: 84px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #d43c33;
        padding: 0 10px;
        position: fixed;
        top: 0;
        z-index: 99;
    }
    &/deep/ .van-tabs__wrap{
        width: 100%;
        border-bottom: 1px solid #ccc;
        position: fixed;
        top: 84px;
        z-index: 99;
    }
    &/deep/ .van-tabs__content{
        width: 100%;
        margin-top: 150px;
    }
}
</style>