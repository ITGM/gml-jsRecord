<script setup>
const data = TenThousand() // 一万条mock数据
const LIST_HEIGHT = 666 // 容器高度
const ITEM_HEIGHT = 42 // 数据高度
const scrollHeight = data.length * ITEM_HEIGHT // 滚动高度
const paddingTop = ref(0) // 顶部占位
const paddingBottom = /* 底部占位 */ computed(() => {
  return scrollHeight - paddingTop.value - LIST_HEIGHT
})
const showListCount = Math.ceil(LIST_HEIGHT / ITEM_HEIGHT) // 计算出可视区域的数据量
const startIndex = ref(0) // 数据开始下标
const endIndex = computed(() => startIndex.value + showListCount) // 数据结束下标
const style = /* 动态修改容器的占位 */ computed(() => {
  return {
    paddingTop: paddingTop.value + 'px',
    paddingBottom: paddingBottom.value + 'px'
  }
})
function onScroll({ target }) {
  const { scrollTop } = target
  paddingTop.value = Math.min(scrollHeight - LIST_HEIGHT, scrollTop) // 监听滚动 修改顶部占位数据
  startIndex.value = Math.floor(scrollTop / ITEM_HEIGHT) // 计算开始下标
}
</script>

<template>
  <div>虚拟列表</div>
  <div class="list-container" @scroll="onScroll">
    <div class="list-inner-container" :style="style">
      <div class="list-item" v-for="{ name, idx } of data.slice(startIndex, endIndex)" :key="idx">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-container {
  width: 400px;
  max-height: 666px;
  overflow: auto;
}

.list-item {
  display: flex;
  justify-content: center;
  height: 20px;
  padding: 10px;
  border: 1px solid #333;
  &:not(:first-child) {
    border-top: none;
  }
}
</style>
