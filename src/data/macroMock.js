export const macroMetricTabs = [
  { key: 'inflation', label: '通胀率', code: 'CPI' },
  { key: 'unemployment', label: '失业率', code: 'UNEMP' },
  { key: 'gdp', label: 'GDP', code: 'GDP' },
  { key: 'rate', label: '利率', code: 'RATE' }
]

import { getCountryNameZh } from '@/data/countryNameMap'

function asCountryData(values) {
  return Object.entries(values).map(([name, value]) => ({
    name,
    countryName: getCountryNameZh(name),
    value
  }))
}

export const macroMetricMock = {
  inflation: {
    key: 'inflation',
    title: '全球通胀率热图',
    label: '通胀率',
    unit: '%',
    year: 2025,
    note: '年度 CPI 同比，示例数据',
    scale: { min: 0, max: 35 },
    data: asCountryData({
      Argentina: 31.5,
      Turkey: 30.8,
      Russia: 9.5,
      India: 4.6,
      Brazil: 5.1,
      Mexico: 3.9,
      'South Africa': 3.2,
      'United Kingdom': 3.4,
      'United States': 2.9,
      Australia: 2.7,
      Canada: 2.4,
      Germany: 2.3,
      Italy: 1.8,
      France: 1.5,
      China: 0.6,
      Japan: 3.1
    })
  },
  unemployment: {
    key: 'unemployment',
    title: '全球失业率热图',
    label: '失业率',
    unit: '%',
    year: 2025,
    note: '指标切换演示数据',
    scale: { min: 0, max: 12 },
    data: asCountryData({
      'South Africa': 11.8,
      Turkey: 8.7,
      France: 7.5,
      Italy: 6.3,
      Argentina: 6.2,
      Canada: 6.1,
      Germany: 5.9,
      Brazil: 5.8,
      China: 5.1,
      India: 4.8,
      Australia: 4.3,
      'United Kingdom': 4.2,
      'United States': 4.1,
      Russia: 2.5,
      Japan: 2.4
    })
  },
  gdp: {
    key: 'gdp',
    title: '全球 GDP 增长热图',
    label: 'GDP 增速',
    unit: '%',
    year: 2025,
    note: '年度实际增速，示例数据',
    scale: { min: -1, max: 7 },
    data: asCountryData({
      India: 6.6,
      China: 4.8,
      Turkey: 3.2,
      Argentina: 3.1,
      Russia: 2.4,
      Brazil: 2.3,
      'United States': 2.1,
      Australia: 1.9,
      Canada: 1.7,
      Spain: 2.5,
      France: 1.1,
      'United Kingdom': 1.0,
      Italy: 0.8,
      Germany: 0.4,
      Japan: 0.6
    })
  },
  rate: {
    key: 'rate',
    title: '全球政策利率热图',
    label: '政策利率',
    unit: '%',
    year: 2025,
    note: '期末政策利率，示例数据',
    scale: { min: 0, max: 30 },
    data: asCountryData({
      Turkey: 29.0,
      Argentina: 24.0,
      Russia: 18.0,
      Brazil: 13.75,
      Mexico: 8.5,
      'South Africa': 7.25,
      India: 6.0,
      'United States': 4.25,
      'United Kingdom': 4.0,
      Canada: 2.75,
      Australia: 3.6,
      China: 1.5,
      Germany: 2.0,
      France: 2.0,
      Italy: 2.0,
      Japan: 0.5
    })
  }
}
