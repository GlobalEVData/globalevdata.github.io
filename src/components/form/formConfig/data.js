// 地区选项
export const regionOptions = [
  {
    value: 'China',
    label: 'China'
  },
  {
    value: 'USA',
    label: 'USA'
  },
  {
    value: 'Europe',
    label: 'Europe',
    children: [
  { value: 'Austria', label: 'Austria' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Bulgaria', label: 'Bulgaria' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Czech Republic', label: 'Czech Republic' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Estonia', label: 'Estonia' },
  { value: 'Greece', label: 'Greece' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Finland', label: 'Finland' },
  { value: 'France', label: 'France' },
  { value: 'Croatia', label: 'Croatia' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Latvia', label: 'Latvia' },
  { value: 'Moldova', label: 'Moldova' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Romania', label: 'Romania' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Slovenia', label: 'Slovenia' },
  { value: 'Slovakia', label: 'Slovakia' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Iceland', label: 'Iceland' },
  { value: 'Cyprus', label: 'Cyprus' },
]
  },
  {
    value: 'others',
    label: 'Other Regions',
    children: [
      { value: 'HongKong, China', label: 'Hong Kong' },
      { value: 'Japan', label: 'Japan' },
      { value: 'korea', label: 'Korea' },
      { value: 'TaiWan, China', label: 'Taiwan' },
      { value: 'Australia', label: 'Australia' },
      { value: 'Newzealand', label: 'New Zealand' },
      { value: 'Thailand', label: 'Thailand' },
      { value: 'Singapore', label: 'Singapore' },
      { value: 'Malaysia', label: 'Malaysia' },
      { value: 'Colombia', label: 'Colombia' },
      { value: 'Peru', label: 'Peru' },
      { value: 'Brazil', label: 'Brazil' }
    ]
  }
]

// 可用年份
export const availableYears = ['2022', '2024*', '2025*']

// 表单验证规则
export const rules = {
  databases: [
    { 
      type: 'array', 
      required: true, 
      message: '请至少选择一个数据库', 
      trigger: 'change' 
    }
  ],
  regions: [
    { 
      type: 'array', 
      required: true, 
      message: '请选择地区', 
      trigger: 'change' 
    }
  ],
  years: [
    { 
      type: 'array', 
      required: true, 
      message: '请选择年份', 
      trigger: 'change' 
    }
  ]
}