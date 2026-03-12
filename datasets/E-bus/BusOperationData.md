---
prev: false
next: false
outline: deep
---
# Bus Operation Data (2025)

> - [Subscribe](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u) to receive the latest data updates.

## 1. Data Description

This preprocessed dataset contains one day of trip records for 224 cities. Provided in CSV format, it is designed for direct use in the simulation-based optimization model. It covers 1,740,641 trips on 71,863 bus routes for Monday, 20 January 2025.

The dataset integrates multiple data sources, including route and stop information, actual timetables, and operating speeds. It also derives other key inputs required for simulation, such as vehicle schedules and energy consumption estimates that account for traffic conditions.

## 2. Sample Data Download

> To request access to the full dataset used and produced in our study, please send the completed [Data Request Form](/ApplicationForm) to: global.ev.map@gmail.com.

<FileDownloader 
  :fileUrl='SampleDataURL1'
  buttonText="Download One-City Sample" 
  fileName="vs_parking_nodeid.csv"
/>

[**Back to the dataset list**](/datasets/index.md)

<script setup>
    import { ref } from 'vue';
    import FileDownloader from '@/components/Databtn.vue';
    import SampleDataURL1 from '../../data/ChinaEBus/vs_parking_nodeid.csv?url';



    // data/AAM/Sample_data_china.csv
</script>
<style scoped>
</style>
