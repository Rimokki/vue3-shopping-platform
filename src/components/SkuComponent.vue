<script setup lang="ts">
  import { onMounted } from 'vue'
  import type { GoodsDetail, Spec, SpecValue, Sku, SkuSpec } from '@/apis/detail'
  import PowerSet from '@/utils/power-set'

  const { goods } = defineProps<{ goods: GoodsDetail }>()
  const emits = defineEmits<{ (e: 'change', skuObj: Sku | undefined): Sku }>()

  let skusMap: { [key: string]: string[] } = {}

  const getGoods = async () => {
    skusMap = getSkusMap(goods)
    initDisabledStatus(goods?.specs, skusMap)
  }

  const changeSelectedStatus = (item: Spec, val: SpecValue) => {
    if (val.selected) {
      val.selected = false
    } else {
      item.values.forEach((val) => (val.selected = false))
      val.selected = true
    }
    updateDisabledStatus(goods?.specs as Spec[], skusMap)
    const index = getSelectedSpecs(goods?.specs as Spec[]).findIndex((item) => item === undefined)
    if (index === -1) {
      const key = getSelectedSpecs(goods?.specs as Spec[]).join('-')
      const skuIds = skusMap[key]
      const skuObj = goods?.skus.find((item) => item.id === skuIds[0])
      if (skuObj) {
        skuObj.specsText = skuObj.specs.map((item) => item.name + '：' + item.valueName).join('；')
        emits('change', skuObj)
      } else {
        emits('change', undefined)
      }
    } else {
      emits('change', undefined)
    }
  }

  const getSkusMap = (goods: GoodsDetail) => {
    const pathMap: { [key: string]: string[] } = {}
    // 获取有效的Sku数组
    const availableSkus: Sku[] = goods?.skus.filter((sku: Sku) => sku.inventory > 0)
    // 根据有效的sku数据得到有效规格名数组
    availableSkus.forEach((sku: Sku) => {
      const availableValNames = sku.specs.map((val: SkuSpec) => val.valueName)
      const valueNamesPowerSet = PowerSet(availableValNames)

      valueNamesPowerSet.forEach((arr: string[]) => {
        const key = arr.join('-')
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    })
    return pathMap
  }

  const initDisabledStatus = (specs: Spec[], pathMap: { [key: string]: string[] }) => {
    specs.forEach((spec: Spec) => {
      spec.values.forEach((value: SpecValue) => {
        value.disabled = !pathMap[value.name as string]
      })
    })
  }

  // 获取选中规格的数组
  const getSelectedSpecs = (specs: Spec[]) => {
    const selectedSpecs: Array<string | undefined> = []

    specs.forEach((spec: Spec) => {
      const selectedVal = spec.values.find((item) => item.selected)
      selectedSpecs.push(selectedVal ? selectedVal.name : undefined)
    })

    return selectedSpecs
  }

  const updateDisabledStatus = (specs: Spec[], pathMap: { [key: string]: string[] }) => {
    specs.forEach((spec: Spec, index) => {
      const selectedSpecs = getSelectedSpecs(specs)
      // 遍历规格值, 模拟选中情况
      spec.values.forEach((val) => {
        selectedSpecs[index] = val.name
        const key = selectedSpecs.filter((value) => value).join('-')
        val.disabled = !pathMap[key]
      })
    })
  }

  onMounted(() => getGoods())
</script>

<template>
  <div class="goods-sku">
    <dl v-for="item in goods?.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- 图片类型规格 -->
          <img
            v-if="val.picture"
            :class="{ selected: val.selected, disabled: val.disabled }"
            :src="val.picture"
            :title="val.name"
            @click="changeSelectedStatus(item, val)" />
          <!-- 文字类型规格 -->
          <span
            v-else
            :class="{ selected: val.selected, disabled: val.disabled }"
            @click="changeSelectedStatus(item, val)">
            {{ val.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
  @mixin sku-state-mixin {
    border: 1px solid #e4e4e4;
    margin-right: 10px;
    cursor: pointer;

    &.selected {
      border-color: #27ba9b;
    }

    &.disabled {
      opacity: 0.6;
      border-style: dashed;
      cursor: not-allowed;
    }
  }

  .goods-sku {
    padding-left: 10px;
    padding-top: 20px;

    dl {
      display: flex;
      padding-bottom: 20px;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        flex: 1;
        color: #666;

        > img {
          width: 50px;
          height: 50px;
          margin-bottom: 4px;
          @include sku-state-mixin;
        }

        > span {
          display: inline-block;
          height: 30px;
          line-height: 28px;
          padding: 0 20px;
          margin-bottom: 4px;
          @include sku-state-mixin;
        }
      }
    }
  }
</style>
