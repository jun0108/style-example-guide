<script lang="ts" setup>
import { isEmpty } from '@/utils/comUtils';
import { useResizeObserver } from '@vueuse/core';
import dayjs from 'dayjs';
import * as ecahrts from 'echarts';

type Props = {
  id?: string;
  type?: ChartType;
  data?: Record<string, any>[];
  x?: ChartX;
  y?: ChartY;
  series: ChartSeries[];
  pieSize?: string | string[];
};

const DEFAULT_CHART_OPTIONS = {
  grid: {},
  tooltip: {},
  xAxis: {},
  yAxis: {},
  series: [],
  backgroundColor: 'transparent',
};

const props = withDefaults(defineProps<Props>(), {
  id: () => 'chart-' + Math.random().toString().substring(7),
  type: 'line',
  data: () => [],
  y: () => {
    return {};
  },
  pieSize: '80%',
});

let chart: any = undefined;
let chartOptions: any = {};

const loaded = ref(false);

const wrapperRef = ref();
const chartRef = ref();

useResizeObserver(wrapperRef, () => {
  if (chart) {
    chart.resize();
  }
});

const chartType = computed(() => {
  if (['pie', 'donut', 'half-donut'].includes(props.type)) {
    return 'pie';
  }
  return props.type;
});

// 초기화
function init() {
  chart = ecahrts.init(chartRef.value);

  setOptions();
}

// 옵션 설정
function setOptions() {
  // 데이터 확인
  if (isEmpty(props.data) || isEmpty(props.series)) {
    loaded.value = false;
    clearChart();
    return;
  }

  loaded.value = true;
  const options = JSON.parse(JSON.stringify(DEFAULT_CHART_OPTIONS));
  // 차트 구성 옵션 설정
  // TODO: need add grid props

  // TODO: need add tooltip props

  // TODO: need add formatter props

  // TODO: need add legend props

  // TODO: need add color props

  chartOptions = options;

  // 데이터 설정
  if (chartType.value === 'pie') {
    setPieSeries();
  } else {
    chartOptions.xAxis = setXAxis();
    chartOptions.yAxis = setYAxis();
    chartOptions.series = setSeries();
  }

  nextTick(() => {
    chart.setOption(chartOptions, {
      notMerge: true,
    });
  });
}

// 차트 기본 - X축 설정
function setXAxis() {
  if (!chart || isEmpty(props.x)) {
    return {};
  }

  const xAxisData = props.data.map((_i: any) => {
    return props.x!.format ? dayjs(_i[props.x!.key]).format(props.x!.format) : _i[props.x!.key];
  });

  const xAxis: any = {
    type: props.x!.type || 'category',
    data: xAxisData,
  };

  return xAxis;
}

// 차트 기본 - Y축 설정
function setYAxis() {
  if (!chart) {
    return;
  }

  return {
    type: 'value',
    scale: props.y.scale,
  };
}

// 차트 기본 - Series 설정
function setSeries() {
  if (!chart || isEmpty(props.x)) {
    return;
  }

  const series: any[] = [];
  props.series.forEach((_s, _seriesIndex) => {
    const seriesItem: any = {
      name: _s.name,
      type: _s.type || chartType.value,
      data: [],
      showSymbol: props.y.showSymbol,
      emphasis: { focus: 'series' },
    };

    // 설정된 컬러 있는 경우
    if (_s.color) {
      seriesItem.itemStyle = {
        color: _s.color,
      };
    }

    // TODO: min/max 필요 여부에 따라 추가

    // TODO: markpoint 필요 여부에 따라 추가

    // 데이터
    props.data.forEach((_i, _index) => {
      const x = props.x!.format ? dayjs(_i[props.x!.key]).format(props.x!.format) : _i[props.x!.key];
      if (_i[_s.key] !== undefined) {
        const data = [x, _i[_s.key]];
        seriesItem.data.push(data);
      }
    });

    // TODO: markArea 필요 여부에 따라 추가
    series.push(seriesItem);
  });

  return series;
}

// 파이 차트 - series 설정
function setPieSeries() {
  let radius: string | string[] = props.pieSize;

  if (!props.pieSize && ['donut', 'half-donut'].includes(props.type)) {
    const regx = /(\d+)(%)/;
    const matched: any[] | null = (radius as string).match(regx);
    if (matched) {
      radius = [matched[1] - 50 + matched[2], radius];
    }
  }

  const series: any = {
    type: 'pie',
    radius: radius,
    data: [],
  };

  if (!props.data || props.data.length === 0) {
    return;
  }

  // 데이터 설정
  const data: any[] = [];

  // 모두 빈 값인 경우 확인용
  let isEmptyData = true;

  props.series.forEach((_s) => {
    const value = props.data[0]![_s.key];
    const item = {
      value: value || 0,
      name: _s.name,
      itemStyle: {
        color: _s.color,
      },
    };

    if (Number(value) > 0) {
      isEmptyData = false;
    }
    data.push(item);
  });

  // 타입별 형태 설정
  if (props.type === 'pie') {
    series.label = { show: true };
  } else if (props.type === 'donut') {
    series.label = {
      show: false,
      position: 'center',
      formatter: '{c}',
    };
    series.labelLine = { show: false };
    series.emphasis = {
      label: {
        show: false,
        fontSize: 15,
        fontWeight: 'bold',
      },
    };
  } else if (props.type === 'half-donut') {
    const halfDonutItem = {
      value: data.map((_i) => _i.value).reduce((acc, value) => acc + value, 0),
      itemStyle: {
        color: 'none',
        decal: { symbol: 'none' },
      },
      label: { show: false },
      labelLine: { show: false },
    };
    data.push(halfDonutItem);

    series.startAngle = 180;
    series.center = ['50%', '68%'];
    series.label = { show: false, position: 'center', formatter: '{c}건' };
    series.labelLine = { show: false };
    series.labelLayout = (params: any) => {
      return {
        y: params.rect.y + (params.rect.height * 4.3) / 5,
        verticalAlign: 'middle',
        align: 'center',
      };
    };
    series.emphasis = {
      label: {
        show: false,
        fontSize: 15,
        fontWeight: 'bold',
      },
    };
  }

  loaded.value = !isEmptyData;
  if (isEmptyData) {
    return;
  }

  chartOptions.series = [{ ...series, data: data }];
  delete chartOptions.xAxis;
  delete chartOptions.yAxis;
}

// 차트 초기화
function clearChart() {
  chart.setOption(
    {},
    {
      notMerge: true,
    },
  );
}

// 차트 사이즈 리사이징
function resize() {
  chart.resize();
}

watch(
  () => props.data,
  () => {
    setOptions();
  },
);

watch(
  () => props.x,
  () => {
    setOptions();
  },
);

watch(
  () => props.y,
  () => {
    setOptions();
  },
);

watch(
  () => props.series,
  () => {
    setOptions();
  },
);

onMounted(() => {
  init();
});

defineExpose({
  resize,
});
</script>

<template>
  <div ref="wrapperRef" class="cm-chart">
    <div v-show="loaded" ref="chartRef" class="cm-chart__chart"></div>
    <!-- nodata -->
    <div v-show="!loaded" class="cm-chart__nodata">데이터가 없습니다.</div>
  </div>
</template>

<style lang="scss" scoped></style>
