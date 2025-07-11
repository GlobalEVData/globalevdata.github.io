<template>
  <el-form 
    :model="formData" 
    :rules="formRules"
    ref="formRef"
    v-bind="formProps"
  >
    <!-- <h3 class="form-section-title" v-if="title">{{ title }}</h3> -->

    <div v-for="(databaseConfig, dbKey) in databases" :key="dbKey" class="database-card">
      <el-form-item :prop="`${dbKey}.selected`" label="Database">
        <el-checkbox 
          v-model="formData[dbKey].selected" 
          :label="databaseConfig.label" 
          @change="handleDatabaseSelect(dbKey)"
        />
      </el-form-item>

      <div v-if="formData[dbKey].selected" class="database-details">
        <template v-for="field in databaseConfig.fields" :key="field.model">
          <el-form-item 
            :label="field.label" 
            :prop="`${dbKey}.${field.model}`"
          >
            <!-- 级联选择器 -->
            <el-cascader
              v-if="field.type === 'cascader'"
              v-model="formData[dbKey][field.model]"
              :options="getOptions(field.optionsRef)"
              v-bind="field.props || {}"
              :style="field.style || {}"
              :placeholder="field.placeholder"
              :props="{ multiple: true, ...(field.props?.props || {}) }"
            />
            
            <!-- 复选框组 -->
            <el-checkbox-group
              v-else-if="field.type === 'checkbox-group'"
              v-model="formData[dbKey][field.model]"
            >
              <el-checkbox 
                v-for="option in getOptions(field.optionsRef)" 
                :key="option" 
                :label="option"
              >
                {{ option }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </template>
      </div>
    </div>

    <el-form-item v-if="actions">
      <slot name="actions"></slot>
    </el-form-item>

  </el-form>
</template>

<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { regionOptions, availableYears, availableYearsForAAM } from './formConfig/data.js'

const props = defineProps({
  formConfig: {
    type: Object,
    required: true
  },
  modelValue: {
    type: Object,
    required: true,
  },
  // 外部数据引用
  externalData: {
    type: Object,
    default: () => ({
      regionOptions,
      availableYears,
      availableYearsForAAM
    })
  }
})

const emit = defineEmits(['update:modelValue'])

// 提取配置
const { formProps, title, databases, actions } = props.formConfig

// 初始化表单数据
const formData = reactive(JSON.parse(JSON.stringify(props.modelValue)))
const formRef = ref()

// 监听表单变化并通知父组件
watch(
  formData,
  (newValue) => {
    emit('update:modelValue', newValue)
  },
  { deep: true }
)

// 生成验证规则
const formRules = computed(() => {
  const rules = {}
  
  // 数据库选择验证
  rules.databases = [{
    validator: (rule, value, callback) => {
      const selected = Object.values(formData).some(db => db.selected)
      if (!selected) {
        callback(new Error('Please select at least one database'))
      } else {
        callback()
      }
    },
    trigger: 'change'
  }]
  
  // 各字段验证
  Object.entries(databases).forEach(([dbKey, dbConfig]) => {
    dbConfig.fields.forEach(field => {
      if (field.rules) {
        const fullPath = `${dbKey}.${field.model}`
        rules[fullPath] = [
          {
            required: field.rules.required,
            message: field.rules.message,
            trigger: field.rules.trigger
          }
        ]
      }
    })
  })
  
  return rules
})

// 获取选项数据
const getOptions = (refName) => {
  return props.externalData[refName] || []
}

// 处理数据库选择变化
const handleDatabaseSelect = (dbKey) => {
  if (!formData[dbKey].selected) {
    // 重置该数据库下的所有字段
    databases[dbKey].fields.forEach(field => {
      formData[dbKey][field.model] = Array.isArray(formData[dbKey][field.model]) ? [] : ''
    })
  }
}

// 暴露方法给父组件
defineExpose({
  validate: () => formRef.value.validate(),
  reset: () => {
    Object.keys(formData).forEach(dbKey => {
      formData[dbKey].selected = false
      databases[dbKey].fields.forEach(field => {
        formData[dbKey][field.model] = Array.isArray(formData[dbKey][field.model]) ? [] : ''
      })
    })
  }
})
</script>

<style scoped>
.form-section-title {
  margin: 20px 0 15px;
  color: #606266;
}

.database-card {
  margin-bottom: 5px;
  padding: 10px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  background-color: var(--vp-c-bg);
}

/* .database-card honver */
.database-card:hover {
  /* background-color: var(--vp-c-border); */
  border: 1px solid var(--vp-c-border);
  /* 渐入动画 */
  transition: all 0.3s ease;
}

.database-details {
  border-left: 2px solid var(--vp-c-brand-3);
}
</style>