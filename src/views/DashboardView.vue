<script setup lang="ts">
import { computed, ref } from 'vue'
import type { WorkOrder } from '../types/workOrder'
import KpiCard from '../components/KpiCard.vue'

const workOrders = ref<WorkOrder[]>([
  {
    id: 'WO-2026-001',
    product: 'Smart Watch X1',
    quantity: 1000,
    completedQuantity: 650,
    status: 'running',
  },
  {
    id: 'WO-2026-002',
    product: 'GPS Navigator G2',
    quantity: 500,
    completedQuantity: 0,
    status: 'pending',
  },
  {
    id: 'WO-2026-003',
    product: 'Fitness Tracker F3',
    quantity: 800,
    completedQuantity: 800,
    status: 'completed',
  },
  {
    id: 'WO-2026-004',
    product: 'Smart Watch X2',
    quantity: 1200,
    completedQuantity: 420,
    status: 'running',
  },
])

const activeWorkOrders = computed(() =>
  workOrders.value.filter((order) => order.status === 'running').length
)

const completedWorkOrders = computed(() =>
  workOrders.value.filter((order) => order.status === 'completed').length
)

const totalProduction = computed(() =>
  workOrders.value.reduce(
    (total, order) => total + order.completedQuantity,
    0,
  ),
)

const completionRate = computed(() => {
  const totalQuantity = workOrders.value.reduce(
    (total, order) => total + order.quantity,
    0,
  )

  if (totalQuantity === 0) return 0

  return Math.round(
    (totalProduction.value / totalQuantity) * 100,
  )
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">
        Production Overview
      </h1>

      <p class="text-medium-emphasis mt-2">
        Monitor today's manufacturing operations.
      </p>
    </div>

    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <KpiCard title="Active Work Orders" :value="activeWorkOrders" icon="mdi-progress-clock" color="info" />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <KpiCard title="Completed Work Orders" :value="completedWorkOrders" icon="mdi-check-circle-outline"
          color="success" />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <KpiCard title="Units Produced" :value="totalProduction" icon="mdi-factory" color="primary" />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <KpiCard title="Completion Rate" :value="`${completionRate}%`" icon="mdi-chart-donut" color="warning"
          :progress="completionRate" />
      </v-col>
    </v-row>
  </div>
</template>