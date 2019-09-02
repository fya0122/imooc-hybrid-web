<template>
  <div class="goods-options z-index-2">
    <!-- 一级选项 -->
    <ul class="goods-options-list">
      <li :key="item.id" v-for="(item, index) of optionsDatas" class="goods-options-list-item">
        <a @click="onOptionsItemClick(item, index)" class="goods-options-list-item-content">
          <span
            class="goods-options-list-item-content-name"
            :class="{'goods-options-list-item-content-name-active': selectedOption.id === item.id}">{{ item.name }}</span>
          <span
            :class="[isShowSubContent && selectedOption.id === item.id ? 'goods-options-list-item-content-create-open' : 'goods-options-list-item-content-create-close']"
            class="goods-options-list-item-content-create caret" v-if="item.subs.length"></span>
        </a>
      </li>
    </ul>
    <!-- 子选项内容 -->
    <transition name="ok">
      <div class="options-sub-content z-index-2" v-if="isShowSubContent">
        <ul class="options-sub-content-list">
          <li class="options-sub-content-list-item" :key="item.id" v-for="(item, index) of selectedOption.subs">
            <a @click="onSubOptionsItemClick(item, index)" class="options-sub-content-list-item-content">
            <span
              class="options-sub-content-list-item-content-name"
              :class="{'options-sub-content-list-item-content-name-active': selectedOption.id === item.id}"
            >{{ item.name }}</span>
              <img class="options-sub-content-list-item-content-select" v-if="selectedOption.id === item.id"
                   src="@img/options-select.svg" alt="">
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 遮盖层 -->
    <div class="cover" v-if="isShowSubContent" @click="isShowSubContent = false"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      optionsDatas: [
        {
          id: '1-1',
          name: '默认',
          subs:
            [
              { id: '1-1', name: '默认' },
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
      selectedOption: {},
      // 是否是展开的
      isShowSubContent: false
    }
  },
  created () {
    this.selectedOption = this.optionsDatas[0]
  },
  watch: {
    selectedOption (newVal, oldVal) {
      this.$emit('optionsChange', newVal.id)
    }
  },
  methods: {
    // 展开父组件
    onOptionsItemClick (item, index) {
      if (this.isShowSubContent === true) {
        this.isShowSubContent = false
        return false
      }
      if (item.subs.length > 0 && this.selectedOption.id === item.id) {
        this.isShowSubContent = true
      }
      this.selectedOption = item
    },
    onSubOptionsItemClick (item, index) {
      this.selectedOption = item
      this.optionsDatas.forEach((item) => {
        item.subs.forEach((item2) => {
          if (item2.id === this.selectedOption.id) {
            item.id = item2.id
            item.name = item2.name
          }
        })
      })
      this.isShowSubContent = false
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
        flex: 1;

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

          /* 动画 */
          &-create {
            /* 展开 */
            &-open {
              transform: rotate(-180deg);
              transition: all 0.3s;
            }

            /* 关闭 */
            &-close {
              transform: rotate(0deg);
              transition: all 0.3s;
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

    /* 当v-if为true的时候调用 */
    .ok-enter-active {
      animation-duration: 0.5s;
      animation-name: ok-open;
    }

    @keyframes ok-open {
      0% {
        max-height: 0;
      }
      100% {
        max-height: px2rem(180);
      }
    }
    /* 当v-if为false的时候调用，也就是关闭的 */
    .ok-leave-active {
      animation-duration: 0.5s;
      animation-name: ok-close;
    }

    @keyframes ok-close {
      0% {
        max-height: px2rem(180);
      }
      100% {
        max-height: 0;
      }
    }
  }
</style>
