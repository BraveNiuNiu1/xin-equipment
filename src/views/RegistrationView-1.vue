<template>
<div class="registration-view">
  <div class="l">
    <h2>设备登记</h2>
    <search-box @search="formData = $event" />
  </div>
  <div class="r">
    <registration-list :form-data="formData" />
  </div>
</div>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue';
import RegistrationList from '@/components/RegistrationList.vue';
export default {
  components: {
    SearchBox,
    RegistrationList
  },
  data() {
    return {
      formData: {}
    }
  },

};
</script>

<style lang="sass">
.registration-view
  .l
    float: left
    width: 240px
  .r
    padding-left: 20px
    overflow: hidden
</style>
