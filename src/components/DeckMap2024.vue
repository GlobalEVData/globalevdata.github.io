<template>


  <div id = "deck-map" > </div>
    <div id="control-panel" :class= "{collapsed: togglePanel}">

      <div class="tool-bar">
        <button class = "cn" @click="cnV">China</button>
        <button class = "eu" @click="euV">Europe</button>
        <button class = "us" @click="usV">USA</button>
        <!-- <button class="togglePanel" @click="togglePanel = !togglePanel">
          Panel {{ togglePanel ? 'OFF' : 'ON' }}
        </button> -->
      </div>

      <div class="legned">
        <div style="background-color: rgb(1, 152, 189); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(73, 227, 206); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(216, 254, 181); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(254, 237, 177); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(254, 173, 84); width: 16.6666668%; height: 10px;"></div>
        <div style="background-color: rgb(209, 55, 78); width: 16.6666668%; height: 10px;"></div>
      </div>

      <div class="legnd-info">
        <span>Lower</span>
        <span>Higher</span>
      </div>
    </div>


  <!-- <div id="deck-map"></div> -->
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { data } from '@/loader/points3.data.js';
const { eu, us, cn } = data; // data from csv

const togglePanel = ref(false);
// deck-map
const deckmap = ref(null);

function loadDeckResources(callback) {
  return new Promise((resolve, reject) => {
    let resourcesLoaded = 0;
    const totalResources = 4;

    function resourceLoaded() {
      resourcesLoaded += 1;
      if (resourcesLoaded === totalResources) {
        let deckgl = callback();
        resolve(deckgl);
      }
    }

    function resourceFailed() {
      reject(new Error('Failed to load resources'));
    }

    // 加载 Deck JS
    const deckScript = document.createElement('script');
    deckScript.src = 'https://unpkg.com/deck.gl@^9.0.0/dist.min.js';
    deckScript.onload = resourceLoaded;
    deckScript.onerror = resourceFailed;
    document.head.appendChild(deckScript);

    // 加载 Maplibre CSS
    const maplibreCSS = document.createElement('link');
    maplibreCSS.rel = 'stylesheet';
    maplibreCSS.href = 'https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.css';
    maplibreCSS.onload = resourceLoaded;
    maplibreCSS.onerror = resourceFailed;
    document.head.appendChild(maplibreCSS);

    // 加载 Maplibre JS
    const maplibreScript = document.createElement('script');
    maplibreScript.src = 'https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.js';
    maplibreScript.onload = resourceLoaded;
    maplibreScript.onerror = resourceFailed;
    document.head.appendChild(maplibreScript);

    // 加载 D3 JS
    const d3Script = document.createElement('script');
    d3Script.src = 'https://d3js.org/d3.v5.min.js';
    d3Script.onload = resourceLoaded;
    d3Script.onerror = resourceFailed;
    document.head.appendChild(d3Script);
  });
}

// 编写一个测试函数 以确定是否成功加载资源
function main() {
    const {DeckGL, HexagonLayer} = deck;

    const deckgl = new DeckGL({
      container: 'deck-map',
      mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json',
      initialViewState: {
        longitude: 114,
        latitude: 36,
        zoom: 4,
        minZoom: 2,
        maxZoom: 10,
        pitch: 55
      },
      controller: true,
      cotainer: deckmap.value,
      // pickable: true,
      // getPosition: d => d,
      // getTooltip: getTooltip,
      getCursor: ({isHovering}) => isHovering ? 'pointer' : 'default',
    });

    const OPTIONS = ['radius', 'coverage'];

    const COLOR_RANGE = [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78]
    ];

    function renderLayer() {
    const hexagonLayer = new HexagonLayer({
        id: 'heatmap',
        colorRange: COLOR_RANGE,
        data, // 更新后数据
        elevationRange: [10, 2000],
        elevationScale: 100,
        extruded: true,
        getPosition: d => d,
        colorScaleType : 'linear',
        coverage: 0.7,
        radius: 10000,
        // ...options
    });

    deckgl.setProps({
        layers: [hexagonLayer]
    });
  }

  // 数据加载和合并
  let data = [];

  data = data.concat(
      eu.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
  );

  data = data.concat(
      us.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
  );

  data = data.concat(
      cn.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
  );

  // 渲染图层
  renderLayer();

  return deckgl;


}

let deckgl = null;

onMounted(() => {
    loadDeckResources(main).then((deck) => {
        deckgl = deck;
        // console.log('DeckGL loaded');
        // console.log(deckgl);
    });

});

let currentViewState = {
  longitude: -98.5795,
  latitude: 39.8283,
  zoom: 5,
  pitch: 55
};

function setViewState(deckgl, viewState) {
  currentViewState = { ...currentViewState, ...viewState };
  deckgl.setProps({
    viewState: currentViewState,
    onViewStateChange: ({ viewState }) => {
      currentViewState = viewState; // 动态同步用户交互的视图状态
      deckgl.setProps({ viewState });
    }
  });
}

function flyTo(deckgl, targetViewState, duration = 2000) {
  const startViewState = { ...currentViewState };
  const startTime = performance.now();

  function animate() {
    const elapsedTime = performance.now() - startTime;
    const t = Math.min(elapsedTime / duration, 1); // 归一化时间进度 (0 ~ 1)

    // 自定义缓动函数（可选）
    const easing = t => t * (2 - t); // Ease out

    // 插值计算新的视图状态
    const interpolatedViewState = {
      longitude: startViewState.longitude + (targetViewState.longitude - startViewState.longitude) * easing(t),
      latitude: startViewState.latitude + (targetViewState.latitude - startViewState.latitude) * easing(t),
      zoom: startViewState.zoom + (targetViewState.zoom - startViewState.zoom) * easing(t),
      pitch: startViewState.pitch + (targetViewState.pitch - startViewState.pitch) * easing(t),
    };

    // 更新视图状态
    setViewState(deckgl, interpolatedViewState);

    // 如果动画未完成，继续下一帧
    if (t < 1) {
      requestAnimationFrame(animate);
    }
  }

  // 启动动画
  requestAnimationFrame(animate);
}

// 示例用法
function cnV() {
  flyTo(deckgl, {
    longitude: 114,
    latitude: 36,
    zoom: 4,
    pitch: 55
  });
}

function euV() {
  flyTo(deckgl, {
    longitude: 8.6821,
    latitude: 50.1109,
    zoom: 4,
    pitch: 55
  });
}

function usV() {
  flyTo(deckgl, {
    longitude: -98.5795,
    latitude: 39.8283,
    zoom: 4,
    pitch: 55
  });
}

onUnmounted(() => {
    deckgl.finalize();
    deckgl.canvas.remove();
    deckgl = null;
    document.head.removeChild(document.querySelector('link[href="https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.css"]'));
    document.head.removeChild(document.querySelector('script[src="https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.js"]'));
    document.head.removeChild(document.querySelector('script[src="https://d3js.org/d3.v5.min.js"]'));
    document.head.removeChild(document.querySelector('script[src="https://unpkg.com/deck.gl@^9.0.0/dist.min.js"]'));
  });

</script>

<style scoped>

#control-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 12px;
  padding: 20px;
  z-index: 1;
  background-color: var(--vp-c-bg-soft); /* 使用背景变量 */
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  border-radius: 5px;
  box-shadow: var(--vp-shadow-1); /* 使用阴影变量 */
  backdrop-filter: blur(8px); /* 添加背景模糊效果 */
}

/* control panel 折叠后的样式*/
#control-panel.collapsed {
  display: none;
}

label {
  display: inline-block;
  width: 140px;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

input {
  width: 100px;
  padding: 5px;
  border: 1px solid var(--vp-c-border); /* 使用边框变量 */
  border-radius: 3px;
  background-color: var(--vp-c-bg); /* 使用背景变量 */
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

.legned {
  display: flex;
  justify-content: space-between;
  margin-top: 10px; /* 添加间距 */
}

.legnd-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
}

#deck-map {
  height: 78vh;
  width: 100%;
  z-index: 0;
  margin: 0 auto;
  border-radius: 5px; /* 添加圆角 */
  overflow: hidden; /* 隐藏溢出内容 */
}



button {
  padding: 8px 16px; /* 增加按钮内边距 */
  margin: 0 5px;
  border: 1px solid var(--vp-c-bg-soft); /* 使用成功色 */
  border-radius: 5px; /* 增加圆角 */
  background-color: var(--vp-c-green-soft); /* 使用成功色 */
  color: var(--vp-c-text-1); /* 使用主文本颜色变量 */
  cursor: pointer;
  font-weight: 500; /* 增加字体粗细 */
}

button:hover {
  background-color: var(--vp-c-bg-soft); /* 使用背景变量 */
  border: 1px solid var(--vp-c-green-1);
}

</style>