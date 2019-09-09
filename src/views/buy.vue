<template>
  <div>
    buy.vue
  </div>
</template>
<script>
export default {
  name: 'buy',
  data () {
    return {
      goodsData: {},
      paymentDatas: [{
        id: '1',
        name: '支付宝支付',
        desc: '数亿用户都在用，安全可信托',
        icon: require('@img/alipay.svg')
      },
      {
        id: '2',
        name: '微信支付',
        desc: '亿万用户选择，更快更安全',
        icon: require('@img/weichat.png')
      }
      ],
      selectPayment: {}
    }
  },
  created () {
    this.selectPayment = this.paymentDatas[0]
    this.loadGoodsData()
  },
  methods: {
    async loadGoodsData () {
      const res = await this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      })
      console.log(res)
    }
  }
}
</script>
