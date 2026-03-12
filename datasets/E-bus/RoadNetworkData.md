---
prev: false
next: false
outline: deep
---
# Road Network Data (2025) 

> - [Subscribe](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u) to receive the latest data updates.

## 1. Data Description

This dataset contains the road networks within the bus service area in 224 cities. It is provided in shapefile format and organized as an edge-node topology. The data were obtained from OpenStreetMap, from which we retained the major roads accessible to bus operations. To ensure network connectivity, the original OSM road geometries were first buffered and then converted to centerlines. The network was further split at bus stop locations so that stops were also represented as nodes. Node IDs were aligned with the IDs of bus terminals to support e-bus simulation modeling.


## 2. Sample Data Download

> To request access to the full dataset used and produced in our study, please send the completed [Data Request Form](/ApplicationForm) to: global.ev.map@gmail.com.

<FileDownloader 
  :fileUrl='SampleDataURL1'
  buttonText="Download One-City Sample" 
  fileName="road_network.zip"
/>

[**Back to the dataset list**](/datasets/index.md)

<script setup>
    import { ref } from 'vue';
    import FileDownloader from '@/components/Databtn.vue';
    import SampleDataURL1 from '../../data/ChinaEBus/road_network.zip?url';

    // data/AAM/Sample_data_china.csv
</script>
<style scoped>
</style>
