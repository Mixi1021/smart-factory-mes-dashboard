<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
}>()
</script>

<template>
  <v-card height="100%">
    <v-card-text>
        <div class="text-medium-emphasis">
          {{ title }}
          </div>

          <div class="text-h4 font-weight-bold mt-2">
            {{ value }}
          </div>
    </v-card-text>
  </v-card>
</template>
