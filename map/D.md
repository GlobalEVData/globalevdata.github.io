---
layout: page
---
<!-- # Spatial Distributions of the Housing Price Index of EV charging stations (EVCSs) at the City Level in 2022 -->
<!-- # Housing Price around EV Charging Stations (EVCSs) in 2022 -->

<DropDown :options="menu" defaultKey="D"/>

<Drawer :is-open="isDrawerOpen" :speed="500" @close="closeDrawer">
    <cityDetails>
        <div class="note custom-block github-alert">
            <p>The spatial distributions of the housing price index of EVCSs at the city level across China and the US with different buffer radii. It can be found that for most cities in both China and the US, the values of housing price index are close to each other (fluctuating around 1), while the US has a wider variation range.</p>
            <p>In the following table, the column "<b>XXX</b>m buffer" represents the average housing price index of EVCSs with the <b>XXX</b> m buffer radius across cities.</p>
        </div>
    </cityDetails>
</Drawer>

<LeafletMap :mainScript :center="mapCenter" :zoom="mapZoom" ref="map" />

<button @click="toggleDrawer" :class="{ open: isDrawerOpen, close: !isDrawerOpen }" id="toggle">
</button>

<script setup>
    import LeafletMap from '@/components/LeafletMap.vue';
    import { ref, watch } from 'vue';
    import { initGeoJsonLayer } from "@/layers/geojsonlayer.js";
    import { data } from '@/loader/D.data.js';
    import { initSelectAndButtonControl } from '@/layers/controls/selectAndButton.js'; // 引入自定义控件

    import Drawer from "@/components/Drawer.vue";
    import cityDetails from "@/layouts/cityDetails.vue";

    import { useCityStore } from '@/stores/cityStore';
    import { computed } from 'vue';


    const cityStore = useCityStore();

    const selectedCity = computed(() => cityStore.selectedCity);

    const colorsets = [
        ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'], // blue
        // ['#ffffd9','#edf8b1','#c7e9b4','#7fcdbb','#41b6c4','#1d91c0','#225ea8','#253494','#081d58'], // blue-green
        // ['#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'], // green
        // ['#f7f4f9','#e7e1ef','#d4b9da','#c994c7','#df65b0','#e7298a','#ce1256','#980043','#67001f'], // red
        // ['#fcfbfd','#efedf5','#dadaeb','#bcbddc','#9e9ac8','#807dba','#6a51a3','#54278f','#3f007d'], // purple
        // ['#fff5eb','#fee6ce','#fdd0a2','#fdae6b','#fd8d3c','#f16913','#d94801','#a63603','#7f2704'], // orange
        // ['#fff7f3','#fde0dd','#fcc5c0','#fa9fb5','#f768a1','#dd3497','#ae017e','#7a0177','#49006a'], // pink
    ];

    let isDrawerOpen = ref(false);

    const toggleDrawer = () => {
        isDrawerOpen.value = !isDrawerOpen.value;
    };

    const closeDrawer = () => {
        isDrawerOpen.value = false;
    };

    // 只要 selectedRegion 不为空就打开抽屉
    watch(selectedCity, (newVal) => {
        if (newVal) {
            isDrawerOpen.value = true;
        }
    });

    const clickCallback = function (properties) {
        if (properties){
            cityStore.updateSelectedCity(properties);
            cityStore.updateSelectedColumn(this._legendName);
        } else {
            cityStore.updateSelectedCity(null);
            cityStore.updateSelectedColumn(null);
        }
    };

    const mapCenter = ref([39.8283, -98.5795]);
    const mapZoom = ref(4);

    function mainScript(L, mapInstance, layerControl) {

        initGeoJsonLayer();
        initSelectAndButtonControl();

        const D_geoJsonLayer = L.geoJsonLayer('300m buffer', clickCallback);

        const D_Colors = colorsets[0];
        D_geoJsonLayer.setColors(D_Colors);

        // layerControl.addOverlay(D_geoJsonLayer, 'Housing Price Index of EVCSs');

        D_geoJsonLayer.addTo(mapInstance);
        
        const {cn, us} = data;
        D_geoJsonLayer.appendData(cn, (d) => parseFloat(d.properties["300m buffer"]));
        D_geoJsonLayer.appendData(us, (d) => parseFloat(d.properties["300m buffer"]));

        D_geoJsonLayer.setColumn("300m buffer", D_Colors);
        D_geoJsonLayer.update();

        const columns = D_geoJsonLayer.getColumns();

        // console.log(columns);
        // console.log(D_geoJsonLayer);

        const selectAndButtonControl = L.control.selectAndButton({
            columns: columns,
            buttonName: 'Show',
            info: 'Select a column to show',
            onButtonClick: function (selectedColumn) {
                const index = columns.indexOf(selectedColumn);
                D_geoJsonLayer.setColumn(selectedColumn, D_Colors);
            }
        });

        selectAndButtonControl.addTo(mapInstance);

        return D_geoJsonLayer;
    }


import { menu } from './menu.js';
import DropDown from '@/components/Dropdown.vue';
</script>


<style scoped>
    h1 {
        font-size: 1.5em;
        color: var(--vp-c-brand-1);
        text-align: center;
    }


    #toggle.open {
    background-color: #ff1100b0;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    }

    #toggle.close {
        background-color: #00ff08b0;
        border-radius: 50%;
        width: 5px;
        height: 5px;
    }
</style>