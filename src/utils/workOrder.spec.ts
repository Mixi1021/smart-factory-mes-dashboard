import { describe, expect, it } from 'vitest'
import type { WorkOrder } from '../types/workOrder'

import {
  getStatusColor,
  getWorkOrderProgress,
} from './workOrder'

describe('getStatusColor', () => {
  it('returns success for completed orders', () => {
    expect(getStatusColor('completed')).toBe('success')
  })

  it('returns info for running orders', () => {
    expect(getStatusColor('running')).toBe('info')
  })

  it('returns warning for pending orders', () => {
    expect(getStatusColor('pending')).toBe('warning')
  })
})

describe('getWorkOrderProgress', () => {
  const createOrder = (
    quantity: number,
    completedQuantity: number,
  ): WorkOrder => ({
    id: 'WO-TEST-001',
    product: 'Test Product',
    quantity,
    completedQuantity,
    status: 'running',
  })

  it('calculates progress correctly', () => {
    expect(getWorkOrderProgress(createOrder(1000, 650))).toBe(65)
  })

  it('returns zero when no units are completed', () => {
    expect(getWorkOrderProgress(createOrder(500, 0))).toBe(0)
  })

  it('returns 100 for a completed order', () => {
    expect(getWorkOrderProgress(createOrder(800, 800))).toBe(100)
  })

  it('handles zero quantity safely', () => {
    expect(getWorkOrderProgress(createOrder(0, 0))).toBe(0)
  })

  it('caps progress at 100 percent', () => {
    expect(getWorkOrderProgress(createOrder(100, 120))).toBe(100)
  })

  it('prevents negative progress', () => {
    expect(getWorkOrderProgress(createOrder(100, -10))).toBe(0)
  })
})