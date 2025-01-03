// 法律条文或政策检索服务
import { data } from '@/loader/policy.data.js';

// 匹配 选择区域国家名 与 数据中的国家名 匹配结果返回 data 中的数据 若无匹配则返回 null
export function getRegionData(regionName) {
    return data[regionName.toUpperCase()] || null;
}