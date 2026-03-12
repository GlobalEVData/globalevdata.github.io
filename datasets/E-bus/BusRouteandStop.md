---
prev: false
next: false
outline: deep
---
# Bus Route and Stop Data (2025)

> - [Subscribe](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u) to receive the latest data updates.

## 1. Data Description

This dataset was collected from Amap and covers urban bus services in 224 cities across China's 31 provincial-level administrative regions, excluding counties, county-level cities, and banners. It is provided in shapefile format and includes both bus route alignments and the locations of served stops. The dataset also contains additional route- and stop-level attributes, such as service hour, stop names, and stop sequence along each route. In total, it comprises 71,863 direction-specific bus routes, counting inbound and outbound services separately.


## 2. Sample Data Download

> To request access to the full dataset used and produced in our study, please send the completed [Data Request Form](/ApplicationForm) to: global.ev.map@gmail.com.

<FileDownloader 
  :fileUrl='SampleDataURL1'
  buttonText="Download One-City Sample: route_stop.zip" 
  fileName="route_stop.zip"
/>

[**Back to the dataset list**](/datasets/index.md)

<script setup>
    import { ref } from 'vue';
    import FileDownloader from '@/components/Databtn.vue';
    import SampleDataURL1 from '../../data/ChinaEBus/route_stop.zip?url';



    // data/AAM/Sample_data_china.csv
</script>
<style scoped>
</style>
