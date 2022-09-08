<template>
  <div class="overview">
    <div class=""></div>
    <div class="chart-list">
      <div class="chart-item chart-1">
        <chart-box ref="chart1" />
      </div>
      <div class="chart-item chart-2">
        <chart-box ref="chart2" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timeId: null
    }
  },
  mounted() {
    this.draw1();
    this.draw2();
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize);
  },
  methods: {
    async draw1() {
      const { data } = await this.axios.get("/status-overview");
      console.log(data);

      // 这里能调用子组件的setOption方法，原因是子组件中图表实例已经初始化好了，因为Vue中子组件的mounted是先于父组件mounted执行的
      this.$refs.chart1.setOption({
        // color: ['#C23531', '#2F4554', '#61A0A8', '#D48265' ],
        title: {
          text: "设备管理总汇",
          left: 'center',
          padding: 20
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            color: ['#C23531', '#2F4554', '#61A0A8', '#D48265' ],
            data:
            //   [
              //     { value: 80, name: '闲置', itemStyle: {color:'#C23531'} },
            //     { value: 300, name: '使用', itemStyle: {color:'#2F4554'} },
            //     { value: 20, name: '保修', itemStyle: {color:'#61A0A8'} },
            //     { value: 40, name: '处置', itemStyle: {color:'#D48265'} },
            //   ] ,
              data.label.map((name, index) => ({
                name,
                value: data.value[index],
              })),
            label: {
              formatter: "{b}: {c}",

            },
          },
        ],
      });
    },
    async draw2() {
      const { data } = await this.axios.get("/category-overview");
      console.log(data);

      // 这里能调用子组件的setOption方法，原因是子组件中图表实例已经初始化好了，因为Vue中子组件的mounted是先于父组件mounted执行的
      this.$refs.chart2.setOption({
        color: ['#C23531' ],
        title: {
          text: "设备分类总汇",
          left: 'center',
          padding: 20
        },
        xAxis: {
          type: 'category',
          data: data.label,
          axisLabel:{
            interval: 0,
            rotate: 35
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data.value,
            type: 'bar'
          }
        ]
      });
    },
    resize() {
      // 防抖
      // 进来判断有没有定时器
      // if(this.timeId) {
      //   clearTimeout(this.timeId);
      //   this.timeId = null;
      // }
      // this.timeId = setTimeout(() =>{
      //   this.$refs.chart1.resize();
      //   this.$refs.chart2.resize();
      // },300)

      // 节流
      // 启动定时器，下次事件来给他return
      if(this.timeId) return;
      this.timeId = setTimeout(() => {
        this.$refs.chart1.resize();
        this.$refs.chart2.resize();
        this.timeId = null;
      }, 100)

      this.$refs.chart1.resize();
      this.$refs.chart2.resize();
    },
  },
};
</script>

<style lang="sass" scoped>
.chart-list
  display: flex
  justify-content: space-between
.chart-item
  position: relative
  border-radius: 10px
  background: #f0f0f0
  & > div
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    // 根据父元素的宽高
.chart-1
  flex: 2
.chart-2
  flex: 3
  margin-left: 20px
  &:after
    display: block
    content: ''
    padding-top: 80%
    // 撑开父元素宽度
</style>
