<template>
  <view class="search-box">
    <input type="text"
           value=""
           v-model="keyWords" />
    <text @click="search()">搜索</text>
  </view>
</template>

<script>
export default {
  data () {
    return {
      keyWords: ''
    };
  },
  methods: {
    async search () {
      if (this.keyWords == '') return this.$api.msg("搜索内容不能为空")
      let keyss = this.keyWords
      uni.navigateTo({
        url: `../contactDetail?keys=${keyss}`
      })
    }
  }
}
</script>

<style lang="scss">
.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  input {
    border: 1rpx solid #dddddd;
    height: 60rpx;
    width: 88%;
  }
  text {
    font-size: 30rpx;
    font-weight: bold;
  }
}
</style>
