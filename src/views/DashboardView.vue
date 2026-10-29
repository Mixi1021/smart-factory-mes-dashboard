<script setup lang="ts">
import {
  getStatusColor,
  getWorkOrderProgress,
} from '../utils/workOrder'
import { computed, ref } from 'vue'
import type { WorkOrder } from '../types/workOrder'
import KpiCard from '../components/KpiCard.vue'

// 1. 工單資料
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

// 2. KPI 計算
const activeWorkOrders = computed(() =>
  workOrders.value.filter((order) => order.status === 'running').length,
)

const completedWorkOrders = computed(() =>
  workOrders.value.filter((order) => order.status === 'completed').length,
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

  if (totalQuantity <= 0) return 0

  return Math.round((totalProduction.value / totalQuantity) * 100)
})

// 3. 表格欄位設定
const workOrderHeaders = [
  { title: 'Work Order ID', key: 'id' },
  { title: 'Product', key: 'product' },
  { title: 'Status', key: 'status' },
  { title: 'Progress', key: 'progress', sortable: false },
  { title: 'Quantity', key: 'quantity' },
]
</script>

<template>
  <div>
    <!-- 頁面標題 -->
    <div class="mb-6">
      <h1 class="text-h4 font-weight-bold">
        Production Overview
      </h1>

      <p class="text-medium-emphasis mt-2">
        Monitor today's manufacturing operations.
      </p>
    </div>

    <!-- KPI Cards -->
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

    <!-- Recent Work Orders -->
    <v-card class="mt-6">
      <v-card-title class="pa-4">
        Recent Work Orders
      </v-card-title>

      <v-data-table :headers="workOrderHeaders" :items="workOrders" item-value="id">
        <!-- 工單狀態 -->
        <template #item.status="{ item }">
          <v-chip :color="getStatusColor(item.status)" size="small" variant="tonal">
            {{ item.status }}
          </v-chip>
        </template>

        <!-- 工單進度 -->
        <template #item.progress="{ item }">
          <div class="d-flex align-center ga-3" style="min-width: 140px">
            <v-progress-linear :model-value="getWorkOrderProgress(item)" color="primary" height="6" rounded />

            <span class="text-caption">
              {{ item.completedQuantity }}/{{ item.quantity }}
            </span>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
