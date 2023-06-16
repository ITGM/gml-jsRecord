<script setup>
const $router = useRouter()
const routes = $router.getRoutes()
</script>
<template>
  <div class="container">
    <div class="side">
      <NuxtLink class="nav" v-for="route of routes" :to="{ name: route.name }">
        {{ route.name }}
      </NuxtLink>
    </div>
    <div class="main">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
.container {
  display: flex;
  .side {
    .nav {
      min-width: 200px;
      display: block;
      padding: 20px;
      &:hover {
        background: #0094ff;
      }
    }
  }
  .main {
    flex: 1;
  }
}
</style>
