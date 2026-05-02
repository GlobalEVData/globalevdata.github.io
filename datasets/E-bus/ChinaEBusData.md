---
prev: false
next: false
outline: deep
---
# China E-Bus Data (2025)

> - [Subscribe](https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAAMAAYrjOiZUNFdHUDFRQ0hZSFJLRTY5VEJKTE1GVllTOS4u) to receive the latest data updates.

## 1. Data Description

### 1.1 Bus Route and Stop

This dataset was collected from Amap and covers urban bus services in 224 cities across China's 31 provincial-level administrative regions, excluding counties, county-level cities, and banners. It is provided in shapefile format and includes both bus route alignments and the locations of served stops. The dataset also contains additional route- and stop-level attributes, such as service hour, stop names, and stop sequence along each route. In total, it comprises 71,863 direction-specific bus routes, counting inbound and outbound services separately.

### 1.2 Bus Operation Data

This preprocessed dataset contains one day of trip records for 224 cities. Provided in CSV format, it is designed for direct use in the simulation-based optimization model. It covers 1,740,641 trips on 71,863 bus routes for Monday, 20 January 2025.
The dataset integrates multiple data sources, including route and stop information, actual timetables, and operating speeds. It also derives other key inputs required for simulation, such as vehicle schedules and energy consumption estimates that account for traffic conditions.

### 1.3 Road Network Data

This dataset contains the road networks within the bus service area in 224 cities. It is provided in shapefile format and organized as an edge-node topology. The data were obtained from OpenStreetMap, from which we retained the major roads accessible to bus operations. To ensure network connectivity, the original OSM road geometries were first buffered and then converted to centerlines. The network was further split at bus stop locations so that stops were also represented as nodes. Node IDs were aligned with the IDs of bus terminals to support e-bus simulation modeling.



## 2. Sample Data Download

> To request access to the full dataset used and produced in our study, please send the completed [Data Request Form](/ApplicationForm) to: global.ev.map@gmail.com.

Below are sample files from a single city:

<FileDownloader 
  :fileUrl='SampleDataURL1'
  buttonText="Download Route & Stop Sample Data" 
  fileName="route_stop.zip"
/>

<FileDownloader 
  :fileUrl='SampleDataURL2'
  buttonText="Download Bus Operation Sample Data" 
  fileName="vs_parking_nodeid.csv"
/>

<FileDownloader 
  :fileUrl='SampleDataURL3'
  buttonText="Download Road Network Sample Data" 
  fileName="road_network.zip"
/>

[**Back to the dataset list**](/datasets/index.md)

<script setup>
    import { ref } from 'vue';
    import FileDownloader from '@/components/Databtn.vue';
    import SampleDataURL1 from '../../data/ChinaEBus/route_stop.zip?url';
    import SampleDataURL2 from '../../data/ChinaEBus/vs_parking_nodeid.csv?url';
    import SampleDataURL3 from '../../data/ChinaEBus/road_network.zip?url';
</script>
<style scoped>
</style>
    