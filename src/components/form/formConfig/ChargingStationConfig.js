// 充电桩数据专用配置
export const chargingStationOptions = [
  { 
    value: 'usa', 
    label: 'USA EVCS Data(2014-2024)'
  },
  { 
    value: 'other', 
    label: 'Other Regions'
  }
]

// 不包含美国的地区选项
export const regionOptionsWithoutUSA = [
  { 
    value: 'China', 
    label: 'China'
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
    value: 'other',
    label: 'Other',
    children: [
      { value: 'Japan', label: 'Japan' },
      { value: 'korea', label: 'Korea' },
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

// 为充电站点创建专用配置函数
export function createChargingStationConfig(label) {
  return {
    label,
    fields: [
      {
        type: "checkbox-group",
        model: "stationType",
        label: "Region Selection",
        optionsRef: "chargingStationOptions",
        rules: { required: true, message: "Please select at least one region", trigger: "change" }
      },
      {
        type: "cascader",
        model: "otherRegions",
        label: "Details",
        optionsRef: "regionOptionsWithoutUSA",
        props: {
          multiple: true,
          collapseTags: true,
          collapseTagsTooltip: true,
          clearable: true
        },
        style: { width: "100%" },
        placeholder: "Please select regions",
        rules: {
          validator: (rule, value, callback) => {
            // 如果用户选择了'other'，则需要验证其他地区
            const formData = rule.field.split('.').slice(0, -1).join('.')
            const formInstance = rule.form
            if (formInstance && formInstance[formData] && 
                formInstance[formData].stationType && 
                formInstance[formData].stationType.includes('other') && 
                (!value || value.length === 0)) {
              callback(new Error('Please select regions'))
            } else {
              callback()
            }
          },
          trigger: "change"
        }
      },
      {
        type: "checkbox-group",
        model: "years",
        label: "Years",
        optionsRef: "availableYears",
        rules: {
          validator: (rule, value, callback) => {
            // 如果用户选择了'other'，则需要验证年份
            const formData = rule.field.split('.').slice(0, -1).join('.')
            const formInstance = rule.form
            if (formInstance && formInstance[formData] && 
                formInstance[formData].stationType && 
                formInstance[formData].stationType.includes('other') && 
                (!value || value.length === 0)) {
              callback(new Error('Please select at least one year'))
            } else {
              callback()
            }
          },
          trigger: "change"
        }
      }
    ]
  }
}