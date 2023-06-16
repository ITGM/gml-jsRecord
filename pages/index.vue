<script setup>
import avatar from '@/assets/images/avatar.png'
const list = [avatar, avatar, avatar, avatar]
const CropImg1 = await CropAvatar(list.slice(0, 1))
const CropImg2 = await CropAvatar(list.slice(0, 2))
const CropImg3 = await CropAvatar(list.slice(0, 3))
const CropImg4 = await CropAvatar(list.slice(0, 4))
</script>

<template>
  <p>头像裁剪重组</p>
  <img :src="CropImg1" alt="" />
  <img :src="CropImg2" alt="" />
  <img :src="CropImg3" alt="" />
  <img :src="CropImg4" alt="" />
</template>
<style scoped lang="scss">
img {
  margin: 20px;
}
</style>
