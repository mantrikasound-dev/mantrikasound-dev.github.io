<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Landing from './components/Landing.vue'
import OfflineRender from './components/OfflineRender.vue'
import MantrikaTools from './components/MantrikaTools.vue'
import Legal from './components/Legal.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<template>
  <Landing v-if="frontmatter.layout === 'landing'" />
  <OfflineRender v-else-if="frontmatter.layout === 'offline-render'" />
  <MantrikaTools v-else-if="frontmatter.layout === 'mantrika-tools'" />
  <Legal v-else-if="frontmatter.layout === 'legal'" />
  <Layout v-else />
</template>
