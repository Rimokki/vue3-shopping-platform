<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in bannnerList" :key="item.id">
        <img :src="item.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
  import { getHomeBanner } from '@/apis/home'
  import type { Banner } from '@/apis/home'
  import { ref, onMounted } from 'vue'

  const bannnerList = ref<Banner[]>([])

  const getBanner = async () => {
    const res = await getHomeBanner()
    bannnerList.value = res.result
  }

  onMounted(() => getBanner())
</script>

<style scoped lang="scss">
  .home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98;

    img {
      width: 100%;
      height: 500px;
    }
  }
</style>
