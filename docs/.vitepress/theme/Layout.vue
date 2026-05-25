<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Landing from './components/Landing.vue'
import OfflineRender from './components/OfflineRender.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Landing v-if="frontmatter.layout === 'landing'" />
  <OfflineRender v-else-if="frontmatter.layout === 'offline-render'" />
  <Layout v-else />
</template>
