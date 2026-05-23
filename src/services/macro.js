import http from './http'
import { macroMetricMock } from '@/data/macroMock'

const useMockData = import.meta.env.VITE_USE_MOCK_DATA !== 'false'

export async function fetchMacroMetric(metricKey) {
  if (useMockData) {
    return Promise.resolve(macroMetricMock[metricKey] || macroMetricMock.inflation)
  }

  return http.get(`/macro/metrics/${metricKey}`)
}
