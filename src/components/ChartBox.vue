
<template>
  <div class="chart" ref="chart">

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    // init初始化
    this.chart = echarts.init(this.$refs.chart);
    // this.chart.setOption({
    //   title: {
    //     text: '图表'
    //   }
    // })
  },
  beforeDestroy () {
    // console.log('组件销毁前');
    // 销毁图标实例
    this.chart.dispose();
  },

  methods: {
    setOption(option){
      this.chart.setOption(option);
    },
    resize() {
      this.chart.resize();
    }
  }
}
</script>
