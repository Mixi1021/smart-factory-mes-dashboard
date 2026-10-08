export interface WorkOrder {
    id: string
    product: string
    quantity: number
    completedQuantity: number
    status: 'pending' | 'running' | 'completed'
}