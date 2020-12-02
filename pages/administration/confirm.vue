<template>
  <view class="index">
    <view class="header">
      <view>确认助记词</view>
      <text>请按顺序点击助记词, 以确认您正确备份</text>
    </view>
    <view class="content"
          v-if="newArr.length != 0">
      <view v-for="(items, indexs) in newArr"
            :key="indexs">{{items.text}}</view>
    </view>
    <view class="list">
      <view class="item"
            @click="shishiClick(item)"
            :class="item.flag == true ? 'active':''"
            v-for="(item, index) in arr"
            :key="index">{{item.text}}</view>
    </view>
    <view class="btn"
          :class="isActives == true ? 'active' : ''"
          @click="confirm">确认</view>
  </view>
</template>

<script>
import CryptoJS from "crypto-js"
export default {
  data () {
    return {
      index: '',
      list: [],
      arr: [],
      newArr: [],
      textList: []
    };
  },
  onLoad (options) {
    this.index = options.index
    const encryption = uni.getStorageSync('id') + uni.getStorageSync('phone') + 'f1321058503!'
    const decrypt = CryptoJS.AES.decrypt(getApp().globalData.list[this.index - 1].mnemonic, encryption).toString(CryptoJS.enc.Utf8)
    this.list = decrypt.split(' ')
    var temporary = []
    temporary = this.list.map((item, index) => ({ text: item, id: index }))
    this.arr = this.rand(temporary)
  },
  onBackPress (options) {
    if (options.from === 'navigateBack') {
      return false;
    }
    this.back();
    return true;
  },
  computed: {
    isActives () {
      if (this.newArr.length == 12) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    confirm () {
      const bip39 = require('bip39');
      if (this.newArr.length < 12) {
        return this.$api.msg('请将助记词选择完整');
      }
      const bool = this.textList.join(' ')
      const flag = bip39.validateMnemonic(bool)
      if (flag) {
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/index/index'
          });
        }, 1500);
        return this.$api.msg('助记词正确');
      } else {
        return this.$api.msg('助记词错误, 请重新选择');
      }
    },
    shishiClick (item) {
      const { text, id } = item
      const flag = this.newArr.some(item => {
        return item.id == id
      })
      const index = this.arr.findIndex(item => {
        return item.id == id
      })
      if (flag == false) {
        this.arr[index].flag = true
        this.newArr.push(this.arr[index])
        this.textList.push(this.arr[index].text)
      } else {
        var i = this.newArr.findIndex(item => {
          return item.id == id
        })
        this.arr[index].flag = false
        this.newArr.splice(i, 1)
        this.textList.splice(i, 1)
      }
    },
    // 打乱数组的排列方式
    rand (arr) {
      var len = arr.length
      //首先从最大的数开始遍历，之后递减
      for (var i = arr.length - 1; i >= 0; i--) {
        //随机索引值randomIndex是从0-arr.length中随机抽取的
        var randomIndex = Math.floor(Math.random() * (i + 1));
        //下面三句相当于把从数组中随机抽取到的值与当前遍历的值互换位置
        var itemIndex = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = itemIndex;
      }
      //每一次的遍历都相当于把从数组中随机抽取（不重复）的一个元素放到数组的最后面（索引顺序为：len-1,len-2,len-3......0）
      return arr;
    },
    back () {
      uni.navigateBack({
        delta: 3
      });
    }
  },
}
</script>

<style>
page {
  background-color: #fafafa;
}
</style>

<style lang="less">
.index {
  position: relative;
  padding: 0 30rpx;
  .header {
    > view {
      font-weight: 600;
      font-size: 34rpx;
    }
    > text {
      color: #aaa;
      display: inline-block;
      margin: 20rpx 0;
    }
  }
  .content {
    margin: 30rpx 0;
    padding: 30rpx;
    border-radius: 30rpx;
    background-color: #fff;
    display: flex;
    flex-wrap: wrap;
    > view {
      padding: 6rpx;
      box-sizing: content-box;
      width: 20%;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      border-radius: 12rpx;
      background-color: #fff;
      margin-bottom: 30rpx;
      margin-right: 10rpx;
      font-size: 26rpx;
      color: #415aff;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .item {
      padding: 6rpx;
      box-sizing: content-box;
      width: 20%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 12rpx;
      background-color: #fff;
      margin-bottom: 30rpx;
      font-size: 26rpx;
    }
    .active {
      background-color: #415aff;
      color: #fff;
    }
  }
  .btn {
    margin: 100rpx auto 0;
    width: 690rpx;
    height: 100rpx;
    color: #fff;
    font-weight: 600;
    font-size: 32rpx;
    text-align: center;
    line-height: 100rpx;
    border-radius: 50rpx;
    background-color: #d4d8e4;
  }
  .active {
    background-color: #415aff;
  }
}
</style>
