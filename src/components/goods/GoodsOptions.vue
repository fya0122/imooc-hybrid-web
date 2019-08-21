<template>
  <div class="goods-options z-index-2">
    <!-- 一级选项 -->
    <ul class="goods-options-list">
      <li :key="item.id" v-for="(item, index) of optionsDatas" class="goods-options-list-item">
        <a @click="onOptionsItemClick(item, index)" class="goods-options-list-item-content">
          <span
            class="goods-options-list-item-content-name"
            :class="{'goods-options-list-item-content-name-active': selectedOptions.id === item.id}">{{ item.name }}</span>
          <span class="goods-options-list-item-content-create caret" v-if="item.subs.length"></span>
        </a>
      </li>
    </ul>
    <!-- 子选项内容 -->
    <div class="options-sub-content" v-if="isShowSubContent">
      <ul class="options-sub-content-list">
        <li class="options-sub-content-list-item" :key="item.id" v-for="(item, index) of selectedOptions.subs">
          <a @click="onSubOptionsItemClick(item, index)" class="options-sub-content-list-item-content">
            <span
              class="options-sub-content-list-item-content-name"
              :class="{'options-sub-content-list-item-content-name-active': selectedOptions.id === item.id}"
            >{{ item.name }}</span>
            <img class="options-sub-content-list-item-content-select" v-if="selectedOptions.id === item.id"
                 src="@img/options-select.svg" alt="">
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GoodsOptions',
  data () {
    return {
      optionsDatas: [
        {
          id: '1',
          name: '默认',
          subs:
            [
              { id: '1', name: '默认' },
              { id: '1-2', name: '价格由高到低' },
              { id: '1-3', name: '销量由高到低' }
            ]
        },
        {
          id: '2',
          name: '有货优先',
          subs: []
        },
        {
          id: '3',
          name: '有货优先',
          subs: []
        }
      ],
      // 选中的
      selectedOptions: {},
      // 是否是展开的
      isShowSubContent: false
    }
  },
  created () {
    this.selectedOptions = this.optionsDatas[0]
    console.log(this.selectedOptions)
  },
  methods: {
    onOptionsItemClick (item, index) {
      if (this.isShowSubContent === true) {
        this.isShowSubContent = false
        return false
      }
      if (item.subs.length > 0 && this.selectedOptions.id === item.id) {
        this.isShowSubContent = true
      }
      this.selectedOptions = item
    },
    onSubOptionsItemClick (item, index) {
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@css/style.scss';

  .goods-options {
    width: 100%;
    border-bottom: 1px solid $lineColor;

    &-list {
      display: flex;
      width: 100%;
      height: px2rem(46);
      background-color: white;

      &-item {
        flex-grow: 1;

        &-content {
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          &-name {
            font-size: $infoSize;
            margin-right: $marginSize;

            &-active {
              color: $mainColor;
            }
          }
        }
      }
    }

    .options-sub-content {
      position: absolute;
      width: 100%;
      max-height: px2rem(180);
      overflow: hidden;
      overflow-y: auto;
      background-color: white;

      &-list {
        &-item {
          &-content {
            display: flex;
            align-items: center;
            border-top: 1px solid $lineColor;
            padding: $marginSize;
            height: px2rem(44);
            box-sizing: border-box;

            &-name {
              font-size: $infoSize;
              display: inline-block;
              flex-grow: 1;

              &-active {
                color: $mainColor;
              }
            }

            &-select {
              width: px2rem(18);
              height: px2rem(18);
            }
          }
        }
      }
    }
  }
</style>
