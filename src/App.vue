<script setup lang="ts">
import { computed, ref } from 'vue'
import type { WorkOrder } from './types/workOrder' 

const dashboardTitle = ref('Smart Factory MES')

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

const activeWorkOrders = computed(() => {
  return workOrders.value.filter(
    (order) => order.status === 'running',
  ).length
})

const completeWorkOrders = computed(() => {
  return workOrders.value.filter(
    (order) => order.status === 'completed',
  ).length
})
</script>

<template>
  <v-app>
    <v-navigation-drawer>
      <v-list-item
        title="Smart Factory MES"
        subtitle="Manufacturing System"
        class="py-4"
        />

        <v-divider />

        <v-list nav>
          <v-list-item
            prepend-icon="mdi-view-dashboard"
            title="Dashboard"
            />

            <v-list-item
              prepend-icon="mdi-clipboard-text"
              title="Work Orders"
              />

              <v-list-item
                prepend-icon="mdi-package-variant"
                title="Materials"
                />

                <v-list-item
                  prepend-icon="mdi-factory"
                  title="Stations"
                  />

                  <v-list-item
                    prepend-icon="mdi-alert-circle"
                    title="Alerts"
                    />
        </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-title>
        Production Dashboard
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped></style>
