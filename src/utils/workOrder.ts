import type { WorkOrder } from '../types/workOrder'

type WorkOrderStatus = WorkOrder['status']

export function getStatusColor(status: WorkOrderStatus): string {
  switch (status) {
    case 'completed':
      return 'success'
    case 'running':
      return 'info'
    case 'pending':
      return 'warning'
  }
}

export function getWorkOrderProgress(order: WorkOrder): number {
  if (order.quantity <= 0) return 0

  return Math.min(
    100,
    Math.max(
      0,
      (order.completedQuantity / order.quantity) * 100,
    ),
  )
}