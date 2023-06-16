<script setup>
import { Random } from 'mockjs'
const floores = [1, 2, 3, 4, 5, 6, 7].map((i) => {
  return {
    color: Random.color(),
    floor: i
  }
})
/*
 * 锚点点击事件
 * el 锚点目标选择器
 */
const navHeight = 18
let moving = false
function moveTo(el) {
  if (moving) return
  const { offsetTop: targetTop } = document.querySelector(el)
  const scrollTop = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop // 当前滚动位置
  const moveDis = targetTop - scrollTop - navHeight // 移动距离
  const duration = 300 // 移动时长 可根据moveDis的绝对值设置不同的时长
  startAnimation((elapsed) => {
    const dis =
      moveDis > 0
        ? Math.min(moveDis, (elapsed / duration) * moveDis) // 向下滚动
        : Math.max(moveDis, (elapsed / duration) * moveDis) // 向上滚动
    const targetScrollTop = scrollTop + dis
    window.scrollTo(0, targetScrollTop)
    moving = moveDis !== dis //
    return !moving
  }, duration)
}

// 帧动画触发
function startAnimation(action, duration = 2000) {
  let start, previousTimeStamp, done
  function step(timestamp) {
    if (start === undefined) {
      start = timestamp // 记录动画开始时间
    }
    const elapsed = timestamp - start // 动画进行的时长，用于按比例计算当前滚动的位置
    if (previousTimeStamp !== timestamp) {
      done = action(elapsed) // 执行动画 并返回动画是否结束
    }
    if (elapsed < duration) {
      previousTimeStamp = timestamp
      if (!done) {
        window.requestAnimationFrame(step)
      }
    }
  }
  window.requestAnimationFrame(step)
}
</script>

<template>
  <div class="anchors">
    <a
      :class="['anchor', `anchor_${floor}`]"
      v-for="{ color, floor } of floores"
      :key="floor"
      :style="{ backgroundColor: color }"
      @click="moveTo(`.floor_${floor}`)"
    >
      floor {{ floor }}</a
    >
  </div>
  <div
    :class="['floor', 'floor_' + floor]"
    v-for="{ color, floor } of floores"
    :key="floor"
    :style="{ backgroundColor: color }"
  >
    floor {{ floor }}
  </div>
</template>

<style scoped lang="scss">
.anchors {
  background: #fff;
  position: sticky;
  top: 0;
  .anchor {
    padding: 0 20px;
    margin: 20px;
    cursor: pointer;
  }
}
.floor {
  height: 800px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
}
</style>
