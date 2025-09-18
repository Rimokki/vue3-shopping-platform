<script setup lang="ts">
  import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import type { CategoryChild, GoodsItem } from '@/apis/layout'
  import type { CategoryRequestData } from '@/apis/category'
  import GoodsItemComponent from '@/components/GoodsItem.vue'

  const route = useRoute()
  const categoryData = ref<CategoryChild>()
  const requestData = ref<CategoryRequestData>({
    categoryId: route.params.id as string,
    page: 1,
    pageSize: 20,
    sortField: 'publishTime'
  })
  const goodsList = ref<GoodsItem[]>([])
  const disabled = ref<boolean>(false)
  const getCategoryData = async (id: string) => {
    const res = await getCategoryFilterAPI(id)
    categoryData.value = res.result
  }

  const getGoodsList = async () => {
    const res = await getSubCategoryAPI(requestData.value)
    goodsList.value = res.result.items
  }

  const handleTabChange = () => {
    requestData.value.page = 1
    getGoodsList()
  }

  const load = async () => {
    requestData.value.page++
    const res = await getSubCategoryAPI(requestData.value)
    goodsList.value = [...goodsList.value, ...res.result.items]
    if (res.result.items.length === 20) {
      disabled.value = true
    }
  }

  onMounted(() => {
    getCategoryData(route.params.id as string)
    getGoodsList()
  })
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData?.parentId}` }">
          {{ categoryData?.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData?.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="requestData.sortField" @tab-change="handleTabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <GoodsItemComponent v-for="goods in goodsList" :key="goods.id" :goods="goods" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .bread-container {
    padding: 25px 0;
    color: #666;
  }

  .sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
      display: flex;
      flex-wrap: wrap;
      padding: 0 10px;
    }

    .goods-item {
      display: block;
      width: 220px;
      margin-right: 20px;
      padding: 20px 30px;
      text-align: center;

      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }

    .pagination-container {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
</style>
