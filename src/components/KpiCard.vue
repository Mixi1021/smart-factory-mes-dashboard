<script setup lang="ts">
withDefaults(
    defineProps<{
    title: string
    value: number | string
    icon?: string
    color?: string
    progress?: number
    }>(),
    {
        icon: 'mdi-chart-box-outline',
        color: 'primary',
    },
)
</script>

<template>
  <v-card height="100%">
    <v-card-text>
      <div class="d-flex align-center justify-space-between">
        <span class="text-medium-emphasis">
          {{ title }}
        </span>

        <v-icon :icon="icon" :color="color" size="large" />
      </div>

      <div class="text-h4 font-weight-bold mt-3">
        {{ value }}
      </div>

      <v-progress-linear
        v-if="progress !== undefined"
        :model-value="progress"
        :color="color"
        height="6"
        rounded
        class="mt-4"
      />
    </v-card-text>
  </v-card>
</template>
