/* @ds-bundle: {"format":3,"namespace":"OPITZCONSULTINGDesignSystem_dd6368","components":[{"name":"MARK_COLORS","sourcePath":"components/brand/Logo.jsx"},{"name":"LogoMark","sourcePath":"components/brand/Logo.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"BarChart","sourcePath":"components/charts/BarChart.jsx"},{"name":"ColumnChart","sourcePath":"components/charts/ColumnChart.jsx"},{"name":"DonutChart","sourcePath":"components/charts/DonutChart.jsx"},{"name":"LineChart","sourcePath":"components/charts/LineChart.jsx"},{"name":"CHART_COLORS","sourcePath":"components/charts/chartUtils.jsx"},{"name":"Legend","sourcePath":"components/charts/chartUtils.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Quote","sourcePath":"components/core/Quote.jsx"},{"name":"StatBubble","sourcePath":"components/core/StatBubble.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"12d9f8475585","components/charts/BarChart.jsx":"100a00b1e325","components/charts/ColumnChart.jsx":"ce1b61282224","components/charts/DonutChart.jsx":"00b13b5b020e","components/charts/LineChart.jsx":"5b48df45edc7","components/charts/chartUtils.jsx":"a5380c36ba9f","components/core/Badge.jsx":"967715d5f878","components/core/Button.jsx":"5e33a1e55427","components/core/Card.jsx":"0cc1290c5e02","components/core/Eyebrow.jsx":"7002644de030","components/core/Quote.jsx":"f5241b0eb977","components/core/StatBubble.jsx":"5a0c979e9bc3","components/forms/Input.jsx":"ae000436d0fa","slides/fit.js":"b1222d9e3fd9","slides/oc-icons.js":"3eacd10d47c8","slides/oc-logo.js":"59c8bd79ff73","ui_kits/website/Site.jsx":"be941738631b","ui_kits/website/oc-icons.js":"316db66faefc"},"inlinedExternals":[],"unexposedExports":[{"name":"chartColor","sourcePath":"components/charts/chartUtils.jsx"},{"name":"niceMax","sourcePath":"components/charts/chartUtils.jsx"},{"name":"titleStyle","sourcePath":"components/charts/chartUtils.jsx"}]} */

(() => {

const __ds_ns = (window.OPITZCONSULTINGDesignSystem_dd6368 = window.OPITZCONSULTINGDesignSystem_dd6368 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — Logo
 * The triangle + signal-waves mark with the OPITZ / CONSULTING wordmark.
 * The mark is multi-colored by default (navy triangle + blue/amber/red
 * signal waves). Pass `mono` (a color, or true for currentColor) to force
 * a single color — use this for the reverse (white-on-dark) treatment.
 */
const MARK_PATHS = ['M165282 39615 L296646 268935 L33922 268943 L165282 39615 Z M165282 0 L0 288555 L330568 288543 L165282 0 Z', 'M193717 260535 C195777 226687 209989 196141 232205 173304 L222089 155649 C194156 182392 176082 219350 173908 260535 L193717 260535 Z M330568 131673 L330568 112061 C301750 112061 274769 119869 251564 133428 L261364 150533 C281699 138618 305296 131673 330568 131673', 'M213550 140737 L203600 123367 C164966 157072 139851 205826 137495 260538 L157099 260538 C159372 213112 180695 170726 213550 140737 M330568 95252 L330568 75644 C295163 75644 262008 85207 233470 101826 L243215 118840 C268875 103870 298709 95252 330568 95252', 'M195088 108496 L185162 91169 C135732 131630 103549 192279 101086 260536 L120690 260536 C123105 199573 151481 145335 195088 108496 M330568 58832 L330568 39220 C288573 39220 249243 50546 215368 70225 L225113 87239 C256118 69209 292119 58832 330568 58832'];

/** Official brand colors of the mark, shape order: triangle, then 3 waves. */
const MARK_COLORS = ['#003A6F', '#0068B4', '#F7AD00', '#E82000'];
function LogoMark({
  size = 40,
  mono = false,
  style,
  ...rest
}) {
  const single = mono === true ? 'currentColor' : mono; // mono may be a color string
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 330568 288554",
    width: size,
    height: size * (288554 / 330568),
    role: "img",
    "aria-label": "OPITZ CONSULTING",
    style: {
      display: 'block',
      ...style
    }
  }, rest), MARK_PATHS.map((d, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: d,
    fill: single || MARK_COLORS[i]
  })));
}
function Logo({
  tone = 'ink',
  size = 40,
  markOnly = false,
  style,
  ...rest
}) {
  const reverse = tone === 'white';
  const mark = reverse ? '#fff' : false; // colored on light, white on dark
  const wordColor = reverse ? '#fff' : 'var(--oc-ink)';
  const subColor = reverse ? 'rgba(255,255,255,.78)' : 'var(--text-secondary)';
  if (markOnly) return /*#__PURE__*/React.createElement(LogoMark, _extends({
    size: size,
    mono: mark,
    style: style
  }, rest));
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: size * 0.28,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(LogoMark, {
    size: size,
    mono: mark
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'grid',
      lineHeight: 0.96
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extrabold)',
      fontSize: size * 0.55,
      letterSpacing: '0.01em',
      color: wordColor
    }
  }, "OPITZ"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: size * 0.3,
      letterSpacing: '0.34em',
      textTransform: 'uppercase',
      color: subColor
    }
  }, "Consulting")));
}
Object.assign(__ds_scope, { MARK_COLORS, LogoMark, Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/charts/chartUtils.jsx
try { (() => {
/* Shared chart helpers for OPITZ chart components. */
const CHART_COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)'];
const chartColor = i => CHART_COLORS[i % CHART_COLORS.length];
function niceMax(v) {
  if (v <= 0) return 10;
  const pow = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / pow;
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
  return step * pow;
}
function Legend({
  items,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px 18px',
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 'var(--fs-sm)',
      color: 'var(--text-secondary)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 11,
      height: 11,
      borderRadius: 2,
      background: it.color,
      flex: 'none'
    }
  }), it.label)));
}
const titleStyle = {
  fontFamily: 'var(--font-display)',
  fontWeight: 'var(--fw-bold)',
  fontSize: 'var(--fs-base)',
  color: 'var(--text-primary)',
  margin: '0 0 14px'
};
Object.assign(__ds_scope, { CHART_COLORS, chartColor, niceMax, Legend, titleStyle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/chartUtils.jsx", error: String((e && e.message) || e) }); }

// components/charts/BarChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — BarChart (Balkendiagramm)
 * Horizontal bars, single series, brand colors. Pure SVG.
 */
function BarChart({
  data = [],
  title,
  height,
  barColor,
  showValues = true,
  valueFormat = v => v,
  cycleColors = false,
  style,
  ...rest
}) {
  const max = __ds_scope.niceMax(Math.max(1, ...data.map(d => +d.value || 0)));
  const rowH = 40,
    padL = 150,
    padR = 48,
    padT = 6,
    padB = 6;
  const W = 640;
  const H = height || data.length * rowH + padT + padB;
  const plotW = W - padL - padR;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: __ds_scope.titleStyle
  }, title), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    role: "img"
  }, data.map((d, i) => {
    const v = +d.value || 0;
    const bw = v / max * plotW;
    const y = padT + i * rowH + rowH * 0.16;
    const h = rowH * 0.68;
    const col = cycleColors ? __ds_scope.chartColor(i) : barColor || 'var(--chart-1)';
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("text", {
      x: padL - 12,
      y: y + h / 2 + 4,
      textAnchor: "end",
      fontSize: "13",
      fill: "var(--text-primary)",
      fontWeight: "600"
    }, d.label), /*#__PURE__*/React.createElement("rect", {
      x: padL,
      y: y,
      width: plotW,
      height: h,
      fill: "var(--chart-grid)",
      rx: "2",
      opacity: "0.5"
    }), /*#__PURE__*/React.createElement("rect", {
      x: padL,
      y: y,
      width: bw,
      height: h,
      fill: col,
      rx: "2"
    }), showValues && /*#__PURE__*/React.createElement("text", {
      x: padL + bw + 8,
      y: y + h / 2 + 4,
      fontSize: "13",
      fontWeight: "700",
      fill: "var(--text-primary)"
    }, valueFormat(v)));
  })));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/ColumnChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — ColumnChart (Säulendiagramm)
 * Vertical bars, one or more series, brand color cycle. Pure SVG.
 */
function ColumnChart({
  data = [],
  series,
  title,
  height = 300,
  showValues = true,
  yTicks = 4,
  valueFormat = v => v,
  style,
  ...rest
}) {
  const keys = series || (data[0] ? Object.keys(data[0]).filter(k => k !== 'label') : []);
  const maxRaw = Math.max(1, ...data.flatMap(d => keys.map(k => +d[k] || 0)));
  const max = __ds_scope.niceMax(maxRaw);
  const padL = 46,
    padB = 34,
    padT = 10,
    padR = 8;
  const W = 640,
    H = height;
  const plotW = W - padL - padR,
    plotH = H - padT - padB;
  const groupW = plotW / data.length;
  const barGap = 0.18,
    innerGap = 0.12;
  const bw = groupW * (1 - barGap) / keys.length;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: __ds_scope.titleStyle
  }, title), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    role: "img",
    style: {
      overflow: 'visible'
    }
  }, Array.from({
    length: yTicks + 1
  }).map((_, i) => {
    const val = max / yTicks * i;
    const y = padT + plotH - val / max * plotH;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      y1: y,
      x2: W - padR,
      y2: y,
      stroke: "var(--chart-grid)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 8,
      y: y + 4,
      textAnchor: "end",
      fontSize: "11",
      fill: "var(--chart-axis)"
    }, valueFormat(Math.round(val))));
  }), data.map((d, gi) => {
    const gx = padL + gi * groupW + groupW * barGap / 2;
    return /*#__PURE__*/React.createElement("g", {
      key: gi
    }, keys.map((k, ki) => {
      const v = +d[k] || 0;
      const bh = v / max * plotH;
      const x = gx + ki * (bw * (1 + innerGap));
      const y = padT + plotH - bh;
      return /*#__PURE__*/React.createElement("g", {
        key: k
      }, /*#__PURE__*/React.createElement("rect", {
        x: x,
        y: y,
        width: bw,
        height: bh,
        fill: __ds_scope.chartColor(ki),
        rx: "1"
      }), showValues && keys.length <= 2 && /*#__PURE__*/React.createElement("text", {
        x: x + bw / 2,
        y: y - 5,
        textAnchor: "middle",
        fontSize: "11",
        fontWeight: "700",
        fill: "var(--text-primary)"
      }, valueFormat(v)));
    }), /*#__PURE__*/React.createElement("text", {
      x: gx + groupW * (1 - barGap) / 2,
      y: H - padB + 18,
      textAnchor: "middle",
      fontSize: "12",
      fill: "var(--chart-axis)"
    }, d.label));
  }), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: padT + plotH,
    x2: W - padR,
    y2: padT + plotH,
    stroke: "var(--chart-axis)",
    strokeWidth: "1.5"
  })), keys.length > 1 && /*#__PURE__*/React.createElement(__ds_scope.Legend, {
    items: keys.map((k, i) => ({
      label: k,
      color: __ds_scope.chartColor(i)
    })),
    style: {
      marginTop: 14,
      justifyContent: 'center'
    }
  }));
}
Object.assign(__ds_scope, { ColumnChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/ColumnChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/DonutChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — DonutChart (Kreisdiagramm)
 * Doughnut by default (the brand's preferred pie style). Center can
 * show a total. Set thickness near 0.5 for a full pie.
 */
function DonutChart({
  data = [],
  title,
  size = 240,
  thickness = 0.32,
  centerLabel,
  centerValue,
  showLegend = true,
  valueFormat = v => v,
  style,
  ...rest
}) {
  const total = data.reduce((s, d) => s + (+d.value || 0), 0) || 1;
  const r = size / 2;
  const inner = r * (1 - thickness);
  const cx = r,
    cy = r;
  let angle = -Math.PI / 2;
  const arc = (start, end, outer, innerR) => {
    const large = end - start > Math.PI ? 1 : 0;
    const x1 = cx + outer * Math.cos(start),
      y1 = cy + outer * Math.sin(start);
    const x2 = cx + outer * Math.cos(end),
      y2 = cy + outer * Math.sin(end);
    const x3 = cx + innerR * Math.cos(end),
      y3 = cy + innerR * Math.sin(end);
    const x4 = cx + innerR * Math.cos(start),
      y4 = cy + innerR * Math.sin(start);
    return `M${x1} ${y1} A${outer} ${outer} 0 ${large} 1 ${x2} ${y2} L${x3} ${y3} A${innerR} ${innerR} 0 ${large} 0 ${x4} ${y4} Z`;
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: __ds_scope.titleStyle
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${size} ${size}`,
    width: size,
    height: size,
    role: "img"
  }, data.map((d, i) => {
    const frac = (+d.value || 0) / total;
    const start = angle;
    const end = angle + frac * Math.PI * 2;
    angle = end;
    return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: arc(start, end - 0.012, r, inner),
      fill: __ds_scope.chartColor(i)
    });
  }), (centerValue || centerLabel) && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy - (centerLabel ? 2 : -6),
    textAnchor: "middle",
    fontFamily: "var(--font-display)",
    fontWeight: "800",
    fontSize: size * 0.17,
    fill: "var(--text-primary)"
  }, centerValue), centerLabel && /*#__PURE__*/React.createElement("text", {
    x: cx,
    y: cy + size * 0.11,
    textAnchor: "middle",
    fontSize: size * 0.058,
    fill: "var(--text-secondary)"
  }, centerLabel))), showLegend && /*#__PURE__*/React.createElement(__ds_scope.Legend, {
    style: {
      flexDirection: 'column',
      gap: 9
    },
    items: data.map((d, i) => ({
      label: `${d.label} · ${valueFormat(d.value)}`,
      color: __ds_scope.chartColor(i)
    }))
  })));
}
Object.assign(__ds_scope, { DonutChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/DonutChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/LineChart.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — LineChart (Liniendiagramm)
 * One or more series as polylines with dots. Pure SVG.
 */
function LineChart({
  data = [],
  series,
  title,
  height = 300,
  yTicks = 4,
  area = false,
  valueFormat = v => v,
  style,
  ...rest
}) {
  const keys = series || (data[0] ? Object.keys(data[0]).filter(k => k !== 'label') : []);
  const max = __ds_scope.niceMax(Math.max(1, ...data.flatMap(d => keys.map(k => +d[k] || 0))));
  const padL = 46,
    padB = 34,
    padT = 12,
    padR = 12;
  const W = 640,
    H = height;
  const plotW = W - padL - padR,
    plotH = H - padT - padB;
  const x = i => padL + (data.length === 1 ? plotW / 2 : i / (data.length - 1) * plotW);
  const y = v => padT + plotH - v / max * plotH;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), title && /*#__PURE__*/React.createElement("div", {
    style: __ds_scope.titleStyle
  }, title), /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    role: "img",
    style: {
      overflow: 'visible'
    }
  }, Array.from({
    length: yTicks + 1
  }).map((_, i) => {
    const val = max / yTicks * i;
    const yy = y(val);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: padL,
      y1: yy,
      x2: W - padR,
      y2: yy,
      stroke: "var(--chart-grid)",
      strokeWidth: "1"
    }), /*#__PURE__*/React.createElement("text", {
      x: padL - 8,
      y: yy + 4,
      textAnchor: "end",
      fontSize: "11",
      fill: "var(--chart-axis)"
    }, valueFormat(Math.round(val))));
  }), keys.map((k, ki) => {
    const pts = data.map((d, i) => `${x(i)},${y(+d[k] || 0)}`).join(' ');
    const col = __ds_scope.chartColor(ki);
    return /*#__PURE__*/React.createElement("g", {
      key: k
    }, area && keys.length === 1 && /*#__PURE__*/React.createElement("polygon", {
      points: `${padL},${padT + plotH} ${pts} ${W - padR},${padT + plotH}`,
      fill: col,
      opacity: "0.12"
    }), /*#__PURE__*/React.createElement("polyline", {
      points: pts,
      fill: "none",
      stroke: col,
      strokeWidth: "2.5",
      strokeLinejoin: "round",
      strokeLinecap: "round"
    }), data.map((d, i) => /*#__PURE__*/React.createElement("circle", {
      key: i,
      cx: x(i),
      cy: y(+d[k] || 0),
      r: "3.5",
      fill: "#fff",
      stroke: col,
      strokeWidth: "2"
    })));
  }), data.map((d, i) => /*#__PURE__*/React.createElement("text", {
    key: i,
    x: x(i),
    y: H - padB + 18,
    textAnchor: "middle",
    fontSize: "12",
    fill: "var(--chart-axis)"
  }, d.label)), /*#__PURE__*/React.createElement("line", {
    x1: padL,
    y1: padT + plotH,
    x2: W - padR,
    y2: padT + plotH,
    stroke: "var(--chart-axis)",
    strokeWidth: "1.5"
  })), keys.length > 1 && /*#__PURE__*/React.createElement(__ds_scope.Legend, {
    items: keys.map((k, i) => ({
      label: k,
      color: __ds_scope.chartColor(i)
    })),
    style: {
      marginTop: 14,
      justifyContent: 'center'
    }
  }));
}
Object.assign(__ds_scope, { LineChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/LineChart.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — Badge
 * Compact status / category label. Solid brand fills or soft tints.
 */
const TONES = {
  blue: {
    bg: 'var(--oc-blue)',
    fg: '#fff'
  },
  navy: {
    bg: 'var(--oc-navy)',
    fg: '#fff'
  },
  ink: {
    bg: 'var(--oc-ink)',
    fg: '#fff'
  },
  signal: {
    bg: 'var(--oc-red)',
    fg: '#fff'
  },
  success: {
    bg: 'var(--oc-success)',
    fg: '#fff'
  },
  warning: {
    bg: 'var(--oc-warning)',
    fg: '#fff'
  },
  neutral: {
    bg: 'var(--oc-gray-600)',
    fg: '#fff'
  }
};
const SOFT = {
  blue: {
    bg: 'var(--oc-blue-100)',
    fg: 'var(--oc-blue-700)'
  },
  navy: {
    bg: 'var(--oc-blue-100)',
    fg: 'var(--oc-navy)'
  },
  ink: {
    bg: 'var(--oc-gray-100)',
    fg: 'var(--oc-ink)'
  },
  signal: {
    bg: '#fde7e2',
    fg: '#c41b00'
  },
  success: {
    bg: '#e3f3ea',
    fg: 'var(--oc-success)'
  },
  warning: {
    bg: '#fdf0d9',
    fg: '#9a6207'
  },
  neutral: {
    bg: 'var(--oc-gray-100)',
    fg: 'var(--oc-gray-700)'
  }
};
function Badge({
  tone = 'blue',
  soft = false,
  dot = false,
  children,
  style,
  ...rest
}) {
  const c = (soft ? SOFT : TONES)[tone] || TONES.blue;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.45em',
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: 'var(--fs-xs)',
      lineHeight: 1,
      letterSpacing: '0.02em',
      padding: '0.4em 0.7em',
      borderRadius: 'var(--radius-pill)',
      background: c.bg,
      color: c.fg,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '0.5em',
      height: '0.5em',
      borderRadius: '999px',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — Button
 * Brand primary action. Blue fill by default; navy "secondary",
 * low-emphasis "ghost", and a rare "signal" (red) for a single
 * high-stakes action. Squared-ish (6px radius), uppercase optional.
 */

let _injected = false;
function injectStyles() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ocbtn{--_bg:var(--oc-blue);--_fg:#fff;--_bgh:var(--oc-blue-700);--_bd:transparent;
    display:inline-flex;align-items:center;justify-content:center;gap:.5em;
    font-family:var(--font-sans);font-weight:var(--fw-bold);line-height:1;
    border:1.5px solid var(--_bd);background:var(--_bg);color:var(--_fg);
    border-radius:var(--radius-md);cursor:pointer;white-space:nowrap;
    text-decoration:none;transition:background var(--dur-fast) var(--ease-standard),
      border-color var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard);}
  .ocbtn:hover{background:var(--_bgh);}
  .ocbtn:active{transform:translateY(1px);}
  .ocbtn:focus-visible{outline:none;box-shadow:var(--focus-ring);}
  .ocbtn[disabled]{opacity:.45;cursor:not-allowed;transform:none;}
  .ocbtn--sm{font-size:var(--fs-sm);padding:.5em .9em;}
  .ocbtn--md{font-size:var(--fs-base);padding:.7em 1.25em;}
  .ocbtn--lg{font-size:var(--fs-md);padding:.85em 1.6em;}
  .ocbtn--secondary{--_bg:var(--oc-navy);--_fg:#fff;--_bgh:var(--oc-blue-900);}
  .ocbtn--outline{--_bg:transparent;--_fg:var(--oc-blue);--_bd:var(--oc-blue);--_bgh:var(--oc-blue-100);}
  .ocbtn--ghost{--_bg:transparent;--_fg:var(--oc-ink);--_bgh:var(--oc-gray-100);}
  .ocbtn--signal{--_bg:var(--oc-red);--_fg:#fff;--_bgh:#c41b00;}
  .ocbtn--upper{text-transform:uppercase;letter-spacing:var(--ls-wide);}
  .ocbtn--block{display:flex;width:100%;}
  .ocbtn svg{width:1.15em;height:1.15em;flex:none;}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-oc', 'button');
  el.textContent = css;
  document.head.appendChild(el);
}
function Button({
  variant = 'primary',
  size = 'md',
  uppercase = false,
  block = false,
  icon = null,
  iconRight = false,
  as = 'button',
  className = '',
  children,
  ...rest
}) {
  injectStyles();
  const Tag = as;
  const cls = ['ocbtn', `ocbtn--${size}`, variant !== 'primary' ? `ocbtn--${variant}` : '', uppercase ? 'ocbtn--upper' : '', block ? 'ocbtn--block' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: cls
  }, rest), icon && !iconRight ? icon : null, children ? /*#__PURE__*/React.createElement("span", null, children) : null, icon && iconRight ? icon : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — Card
 * Surface container. Flat-first: white with hairline border + soft
 * shadow; or a solid `accent`(blue)/`dark`(navy)/`ink` emphasis tile.
 */
const VARIANTS = {
  default: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-sm)'
  },
  flat: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'none'
  },
  subtle: {
    background: 'var(--surface-subtle)',
    color: 'var(--text-primary)',
    border: '1px solid transparent',
    boxShadow: 'none'
  },
  accent: {
    background: 'var(--oc-blue)',
    color: '#fff',
    border: 'none',
    boxShadow: 'var(--shadow-md)'
  },
  dark: {
    background: 'var(--oc-navy)',
    color: '#fff',
    border: 'none',
    boxShadow: 'var(--shadow-md)'
  },
  ink: {
    background: 'var(--oc-ink)',
    color: '#fff',
    border: 'none',
    boxShadow: 'var(--shadow-md)'
  }
};
const PAD = {
  none: '0',
  sm: 'var(--space-4)',
  md: 'var(--space-5)',
  lg: 'var(--space-6)'
};
function Card({
  variant = 'default',
  padding = 'md',
  interactive = false,
  accentBar = false,
  className = '',
  style,
  children,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.default;
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: className,
    onMouseEnter: interactive ? () => setHover(true) : undefined,
    onMouseLeave: interactive ? () => setHover(false) : undefined,
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      padding: PAD[padding] ?? PAD.md,
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...v,
      ...(interactive && hover ? {
        transform: 'translateY(-3px)',
        boxShadow: 'var(--shadow-lg)'
      } : null),
      ...(accentBar ? {
        borderTop: '3px solid var(--oc-blue)'
      } : null),
      overflow: 'hidden',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — Eyebrow
 * The signature "#LABEL" section kicker: Open Sans ExtraBold, uppercase,
 * wide tracking, prefixed with a hash. Pair above a title.
 */
function Eyebrow({
  hash = true,
  tone = 'blue',
  as = 'div',
  children,
  style,
  ...rest
}) {
  const Tag = as;
  const color = tone === 'ink' ? 'var(--text-primary)' : tone === 'white' ? '#fff' : 'var(--oc-blue)';
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extrabold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-wide)',
      fontSize: 'var(--fs-sm)',
      color,
      lineHeight: 1.2,
      ...style
    }
  }, rest), hash ? '#' : '', children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Quote.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — Quote
 * Testimonial block with German typographic quotes („ … ") and a
 * named attribution (person, role, company). Light or dark surface.
 */
function Quote({
  children,
  author,
  role,
  dark = false,
  accent = true,
  style,
  ...rest
}) {
  const fg = dark ? '#fff' : 'var(--text-primary)';
  const sub = dark ? 'rgba(255,255,255,.7)' : 'var(--text-secondary)';
  return /*#__PURE__*/React.createElement("figure", _extends({
    style: {
      margin: 0,
      display: 'grid',
      gap: 'var(--space-4)',
      paddingLeft: accent ? 'var(--space-5)' : 0,
      borderLeft: accent ? '3px solid var(--oc-blue)' : 'none',
      color: fg,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontWeight: 'var(--fw-light)',
      fontSize: 'var(--fs-lg)',
      lineHeight: 1.45,
      color: fg
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--oc-blue)',
      fontWeight: 'var(--fw-bold)'
    }
  }, "\u201E"), children, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--oc-blue)',
      fontWeight: 'var(--fw-bold)'
    }
  }, "\"")), (author || role) && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontSize: 'var(--fs-sm)'
    }
  }, author && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-bold)',
      color: fg
    }
  }, author), role && /*#__PURE__*/React.createElement("span", {
    style: {
      color: sub
    }
  }, author ? ' · ' : '', role)));
}
Object.assign(__ds_scope, { Quote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Quote.jsx", error: String((e && e.message) || e) }); }

// components/core/StatBubble.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — StatBubble
 * The recurring circular figure: a filled disc with a big ExtraBold
 * number and a small label. Used for locations, KPIs, headcounts.
 */
const TONES = {
  blue: 'var(--oc-blue)',
  navy: 'var(--oc-navy)',
  light: 'var(--oc-blue-400)',
  gray: 'var(--oc-gray-500)',
  ink: 'var(--oc-ink)'
};
function StatBubble({
  value,
  label,
  tone = 'blue',
  size = 150,
  style,
  ...rest
}) {
  const bg = TONES[tone] || TONES.blue;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderRadius: '999px',
      background: bg,
      color: '#fff',
      textAlign: 'center',
      padding: '0.5em',
      boxSizing: 'border-box',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extrabold)',
      fontSize: Math.round(size * 0.3),
      lineHeight: 1
    }
  }, value), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 'var(--fw-semibold)',
      fontSize: Math.max(11, Math.round(size * 0.085)),
      marginTop: 4,
      opacity: 0.92
    }
  }, label));
}
Object.assign(__ds_scope, { StatBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatBubble.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * OPITZ CONSULTING — Input
 * Text field with optional label and hint/error. Hairline border,
 * 6px radius, blue focus ring.
 */
let _injected = false;
function inject() {
  if (_injected || typeof document === 'undefined') return;
  _injected = true;
  const css = `
  .ocfield{display:grid;gap:6px;font-family:var(--font-sans);}
  .ocfield > label{font-size:var(--fs-sm);font-weight:var(--fw-semibold);color:var(--text-primary);}
  .ocinput{font-family:var(--font-sans);font-size:var(--fs-base);color:var(--text-primary);
    background:#fff;border:1px solid var(--border-default);border-radius:var(--radius-md);
    padding:.65em .8em;width:100%;box-sizing:border-box;
    transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard);}
  .ocinput::placeholder{color:var(--text-muted);}
  .ocinput:hover{border-color:var(--border-strong);}
  .ocinput:focus{outline:none;border-color:var(--oc-blue);box-shadow:var(--focus-ring);}
  .ocfield[data-invalid="true"] .ocinput{border-color:var(--oc-red);}
  .ocfield[data-invalid="true"] .ocinput:focus{box-shadow:0 0 0 3px color-mix(in srgb,var(--oc-red) 30%,transparent);}
  .ocfield .ochint{font-size:var(--fs-xs);color:var(--text-muted);}
  .ocfield[data-invalid="true"] .ochint{color:var(--oc-red);}
  .ocinput:disabled{background:var(--oc-gray-100);color:var(--text-muted);cursor:not-allowed;}
  `;
  const el = document.createElement('style');
  el.setAttribute('data-oc', 'input');
  el.textContent = css;
  document.head.appendChild(el);
}
function Input({
  label,
  hint,
  error,
  id,
  className = '',
  style,
  ...rest
}) {
  inject();
  const fid = id || React.useId();
  const invalid = !!error;
  return /*#__PURE__*/React.createElement("div", {
    className: `ocfield ${className}`,
    "data-invalid": invalid,
    style: style
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fid
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    className: "ocinput",
    "aria-invalid": invalid
  }, rest)), (error || hint) && /*#__PURE__*/React.createElement("span", {
    className: "ochint"
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// slides/fit.js
try { (() => {
/* Scales the .slide (1280×720) to fit the viewport while preserving
   aspect ratio. Lets slide files open cleanly at any window size. */
(function () {
  function fit() {
    var s = document.querySelector('.slide');
    if (!s) return;
    var pad = 0;
    var scale = Math.min((window.innerWidth - pad) / 1280, (window.innerHeight - pad) / 720);
    scale = Math.min(scale, 1.6);
    s.style.transform = 'scale(' + scale + ')';
    s.style.transformOrigin = 'center center';
  }
  document.documentElement.style.cssText = 'height:100%';
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fit);else fit();
  window.addEventListener('resize', fit);
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/fit.js", error: String((e && e.message) || e) }); }

// slides/oc-icons.js
try { (() => {
/* Injects inline OPITZ brand icons (currentColor) into
   <span class="oc-ic" data-icon="lock"></span>. Size via font-size/width. */
(function () {
  var ICONS = {
    "cloud-sync": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M63.53 49.26 57.05 55.74 50.56 49.26 54.18 49.26C52.9555 46.8748 50.5011 45.3736 47.82 45.37 46.0902 45.3719 44.4212 46.0089 43.13 47.16L36.54 47.16C39.4757 40.9239 46.9109 38.2485 53.1469 41.1842 56.4749 42.7509 58.9423 45.7059 59.89 49.26Z\" fill=\"currentColor\"></path><path d=\"M32.15 55.74 38.64 49.26 45.12 55.74 41.47 55.74C42.6911 58.1236 45.1418 59.6249 47.82 59.63 49.5531 59.6296 51.2257 58.9926 52.52 57.84L59.14 57.84C56.1947 64.0837 48.7455 66.7577 42.5018 63.8124 39.1768 62.2439 36.7108 59.2913 35.76 55.74Z\" fill=\"currentColor\"></path><path d=\"M78.73 76C87.3653 75.7956 94.1999 68.6296 93.9956 59.9943 93.8152 52.3757 88.1701 45.9961 80.63 44.89 79.8332 39.9997 77.1469 35.6183 73.15 32.69 69.0134 29.7585 63.8469 28.6723 58.88 29.69 53.9935 22.1456 44.8806 18.5028 36.14 20.6 27.621 22.7939 21.2554 29.8931 20 38.6 14.3248 38.7524 9.03265 41.498 5.64 46.05 1.62015 51.6339 0.888078 58.9394 3.72 65.21 6.60674 71.3908 12.6499 75.4913 19.46 75.89ZM19.73 69.68C15.2051 69.395 11.1936 66.6709 9.26 62.57 7.38374 58.3901 7.86725 53.5285 10.53 49.8 13.2524 46.1376 17.7824 44.2887 22.29 45L25.84 45.59 25.84 41.67C25.8747 34.5877 30.6878 28.4223 37.55 26.67 44.4356 25.0098 51.5547 28.3287 54.71 34.67L55.92 37.08 58.43 36.19C62.1855 34.8631 66.3517 35.445 69.6 37.75 72.8296 40.1158 74.7416 43.8766 74.75 47.88L74.75 51 78.83 51C84.0123 51.1946 88.0557 55.5534 87.8611 60.7357 87.6754 65.6835 83.6796 69.637 78.73 69.77Z\" fill=\"currentColor\"></path></svg>",
    "head-gears": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M47.1 19.7C44.8 19.7 42.9 21.6 42.9 23.9 42.9 26.2 44.8 28.1 47.1 28.1 49.4 28.1 51.3 26.2 51.3 23.9 51.3 21.6 49.4 19.7 47.1 19.7Z\" fill=\"currentColor\"></path><circle cx=\"34.5\" cy=\"44.2\" r=\"4.2\" fill=\"currentColor\"></circle><path d=\"M59 25.3 56.5 26.5C56.3 27.3 55.9 28 55.5 28.7L56.4 31.3 54.4 33.3 51.8 32.4C51.1 32.8 50.4 33.1 49.6 33.3L48.4 35.7 45.6 35.7 44.4 33.2C43.6 33 42.9 32.7 42.2 32.3L39.6 33.2 37.6 31.2 38.5 28.6C38.1 27.9 37.8 27.2 37.6 26.4L35.1 25.2 35.1 22.4 37.6 21.2C37.8 20.4 38.1 19.7 38.5 19L37.7 16.4 39.7 14.4 42.3 15.3C43 14.9 43.7 14.6 44.5 14.4L45.7 11.9 48.5 11.9 49.7 14.3C50.5 14.5 51.2 14.8 51.9 15.2L54.5 14.3 56.5 16.3 55.6 18.9C56 19.6 56.3 20.3 56.5 21.1L59 22.3 59 25.3ZM46.4 45.6 43.9 46.8C43.7 47.6 43.4 48.3 43 49L43.8 51.6 41.8 53.6 39.2 52.7C38.5 53.1 37.8 53.4 37 53.6L35.9 56 33.1 56 31.9 53.5C31.1 53.3 30.4 53 29.7 52.6L27.1 53.4 25.1 51.4 26 48.8C25.6 48.1 25.3 47.4 25.1 46.6L22.6 45.4 22.6 42.6 25.1 41.4C25.3 40.6 25.6 39.9 26 39.2L25.1 36.6 27.1 34.6 29.7 35.5C30.4 35.1 31.1 34.8 31.9 34.6L33.1 32.1 36 32.1 37.2 34.6C38 34.8 38.7 35.1 39.4 35.5L42 34.6 44 36.6 43.1 39.2C43.5 39.9 43.8 40.6 44 41.4L46.5 42.6 46.4 45.6 46.4 45.6ZM81 49.3 74.1 37.3 74.1 36.8C74.5 25.8 68.9 15.5 59.4 9.8 49.9 4.2 38.2 4.2 28.7 9.8 19.2 15.4 13.6 25.8 14 36.8 14 46.3 18.3 55.2 25.8 61L25.8 86.3 57.4 86.3 57.4 74.3 62.3 74.3C65.5 74.3 68.5 73 70.7 70.8 72.9 68.5 74.1 65.5 74.1 62.3L74.1 56.3 78.5 56.3C81.1 56 83.4 53 81 49.3Z\" fill=\"currentColor\"></path></svg>",
    "lock": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><g><path d=\"M69.025 44.015 69.025 32.031C69.025 20.4187 59.6113 11.005 47.999 11.005 36.3867 11.005 26.973 20.4187 26.973 32.031L26.973 44.014 19.997 44.514 19.997 82.523 47.997 84.523 75.997 82.523 75.997 44.512ZM28.973 32.031C28.973 21.5232 37.4912 13.005 47.999 13.005 58.5068 13.005 67.025 21.5232 67.025 32.031L67.025 43.881 64 43.679 64 32.006C64 23.1694 56.8366 16.006 48 16.006 39.1634 16.006 32 23.1694 32 32.006L32 43.679 28.975 43.879ZM62 43.539 48 42.512 34 43.539 34 32.006C34 24.274 40.268 18.006 48 18.006 55.732 18.006 62 24.274 62 32.006ZM74 80.661 48 82.519 22 80.661 22 46.375 27.134 46.008 33.147 45.608 48 44.517 62.867 45.608 68.858 46.008 74 46.375Z\" stroke=\"currentColor\" fill=\"currentColor\"></path><path d=\"M48 55.516C44.1175 55.5319 40.983 58.6922 40.9989 62.5748 41.01 65.2733 42.5647 67.7273 45 68.89L45 74.521 51 74.521 51 68.866C53.4176 67.6668 54.9617 65.2164 55 62.518 54.9961 58.6533 51.8647 55.521 48 55.516ZM49.635 67.288 49 67.537 49 72.521 47 72.521 47 67.508 46.328 67.275C43.7107 66.3621 42.3291 63.5003 43.2421 60.883 44.155 58.2657 47.0168 56.8841 49.6341 57.7971 51.6434 58.498 52.9924 60.3899 53 62.518 52.9562 64.6458 51.6241 66.5336 49.634 67.288Z\" stroke=\"currentColor\" fill=\"currentColor\"></path></g></svg>",
    "blockchain": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><g><path d=\"M74 50.4338 74 40.1123C73.9797 39.7332 73.7643 39.3917 73.431 39.2099L64 34.7043 64 17.4336 48 7.8336 32 17.4336 32 34.7043 22.5693 39.21C22.2361 39.3917 22.0209 39.7331 22.0005 40.1121L22.0005 50.4338 7.0005 59.4338 7.0005 78.5664 23.0005 88.1664 37.5292 79.4496 47.3941 85.8396C47.7172 86.0494 48.1321 86.0547 48.4605 85.8532L58.6871 79.5791 73 88.166 89 78.566 89 59.4336ZM86.0421 60.0086 73 67.834 59.9581 60.0086C59.9534 60.0068 59.951 60.0015 59.9528 59.9967 59.9537 59.9943 59.9556 59.9923 59.9581 59.9914L72 52.7661 72 56.7178C72 57.2701 72.4477 57.7178 73 57.7178 73.5523 57.7178 74 57.2701 74 56.7178L74 52.7661 86.042 59.9914C86.0467 59.9932 86.0491 59.9986 86.0473 60.0033 86.0463 60.0058 86.0444 60.0077 86.0419 60.0086ZM58.5439 32.0977C58.0456 31.8596 57.4486 32.0705 57.2104 32.5688 56.9723 33.0672 57.1833 33.6642 57.6816 33.9023L61.5064 35.73 49.0151 43.2248C49.0068 43.2298 49 43.2259 49 43.2162L49 27.5662 61.9849 19.7755C61.9932 19.7705 62 19.7744 62 19.7841L62 33.7491ZM61.0419 18.0086 48 25.834 34.9581 18.0086C34.9534 18.0068 34.951 18.0015 34.9528 17.9967 34.9537 17.9943 34.9556 17.9923 34.9581 17.9914L48 10.166 61.0419 17.9914C61.0466 17.9932 61.049 17.9985 61.0472 18.0033 61.0463 18.0057 61.0444 18.0077 61.0419 18.0086ZM34.0151 19.7752 47 27.5659 47 43.2159C47 43.2259 46.9932 43.2295 46.9849 43.2245L34.4936 35.73 38.3184 33.9026C38.8167 33.6645 39.0277 33.0675 38.7896 32.5691 38.5514 32.0708 37.9544 31.8599 37.4561 32.098L34 33.7488 34 19.7838C34 19.7741 34.0068 19.77 34.0151 19.7752ZM23 57.7178C23.5523 57.7178 24 57.2701 24 56.7178L24 52.7661 36.0418 59.9914C36.0466 59.9932 36.0489 59.9985 36.0471 60.0033 36.0462 60.0057 36.0443 60.0077 36.0418 60.0086L23 67.834 9.9581 60.0086C9.95335 60.0068 9.95096 60.0015 9.95277 59.9967 9.9537 59.9943 9.95564 59.9923 9.9581 59.9914L22 52.7661 22 56.7178C22 57.2701 22.4477 57.7178 23 57.7178ZM9.0151 61.7752 22 69.5659 22 85.2159C22 85.2259 21.9932 85.2295 21.9849 85.2245L9 77.4336 9 61.7836C9 61.7741 9.0068 61.77 9.0151 61.7752ZM24 85.2162 24 69.5662 36.9849 61.7755C36.9932 61.7705 37 61.7744 37 61.7841L37 76.7249 34.5435 75.1338C34.0894 74.8194 33.4665 74.9327 33.1521 75.3868 32.8377 75.8409 32.951 76.4638 33.4051 76.7782 33.4219 76.7898 33.439 76.8009 33.4565 76.8115L35.6591 78.2383 24.0151 85.2248C24.0068 85.23 24 85.2259 24 85.2162ZM47.9517 83.8184 39 78.02 39 59.4336 24 50.4341 24 40.7432 32.3287 36.7639 48 46.166 63.6708 36.7639 72 40.7432 72 50.4341 57 59.4336 57 78.2666ZM62.8525 75.85C62.5639 75.3791 61.9483 75.2313 61.4774 75.5198 61.4773 75.5199 61.4772 75.5199 61.4771 75.52L59 77.0393 59 61.7838C59 61.7738 59.0068 61.7702 59.0151 61.7752L72 69.5659 72 85.2159C72 85.2259 71.9932 85.2295 71.9849 85.2245L60.6088 78.3989 62.5229 77.2246C62.9933 76.9359 63.1408 76.3206 62.8525 75.85ZM74 85.2162 74 69.5662 86.9849 61.7755C86.9932 61.7705 87 61.7744 87 61.7841L87 77.4341 74.0151 85.2248C74.0068 85.23 74 85.2259 74 85.2162Z\" stroke=\"currentColor\" fill=\"currentColor\"></path></g></svg>",
    "handshake": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M44.9 72.4C44.4 72.4 43.8 72.3 43.4 71.9 42.6 71.2 42.5 69.9 43.2 69.1L47.1 64.6C47.8 63.8 49.1 63.7 49.9 64.4 50.7 65.1 50.8 66.4 50.1 67.2L46.2 71.7C45.9 72.1 45.4 72.3 44.9 72.4Z\" fill=\"currentColor\"></path><path d=\"M38.8 70.1C38.1 70.2 37.5 70 36.9 69.5 35.9 68.6 35.8 67 36.7 66L41.3 60.7C42.2 59.7 43.8 59.6 44.8 60.5 45.8 61.4 45.9 63 45 64L40.4 69.3C40 69.8 39.4 70.1 38.8 70.1Z\" fill=\"currentColor\"></path><path d=\"M32.5 66.4C31.7 66.5 30.9 66.2 30.3 65.7 29.1 64.6 28.9 62.7 30 61.5L34.6 56.2C35.7 55 37.6 54.8 38.8 55.9 40 57 40.2 58.9 39.1 60.1L34.5 65.4C34 66 33.2 66.4 32.5 66.4Z\" fill=\"currentColor\"></path><path d=\"M25.2 62.7C24.4 62.8 23.6 62.5 23 62 21.8 60.9 21.6 59 22.7 57.8L28 51.8C29.1 50.6 31 50.4 32.2 51.5 33.4 52.6 33.6 54.5 32.5 55.7L27.2 61.7C26.6 62.3 25.9 62.6 25.2 62.7Z\" fill=\"currentColor\"></path><path d=\"M4.6 40.7 12.3 45.4C13.2 46 14.5 45.7 15 44.7L24.3 29.3C24.9 28.4 24.6 27.1 23.6 26.6L16 21.9 4.6 40.7Z\" fill=\"currentColor\"></path><path d=\"M69.4 53.8 53.3 40 52.2 39 45.3 46.9C44.3 48.1 42.9 48.8 41.3 48.9 41.1 48.9 40.9 48.9 40.8 48.9 39.3 48.9 37.9 48.4 36.9 47.4 34.4 45.2 34.2 41.4 36.3 38.9L42.2 32.1C37.6 31.5 31.7 33.9 25.6 30.9L16.9 45.3 23.7 53.2 26.3 50.2C27.2 49.1 28.6 48.5 30.1 48.5L30.1 48.5C31.3 48.5 32.5 48.9 33.4 49.7 34.5 50.6 35 51.9 35.1 53.3 35.6 53.1 36.2 53 36.8 53 38 53 39.2 53.4 40.1 54.2 41.2 55.2 41.8 56.5 41.8 57.9 42.2 57.8 42.7 57.7 43.1 57.7L43.1 57.7C44.2 57.7 45.2 58.1 46.1 58.8 47 59.6 47.5 60.7 47.6 61.9 47.9 61.8 48.3 61.7 48.7 61.7L48.7 61.7C49.7 61.7 50.6 62 51.3 62.7 52.1 63.4 52.6 64.4 52.7 65.4 52.8 66.5 52.4 67.5 51.7 68.3L48.3 72.2 49.7 73.3C50.4 73.7 51.2 74 52.1 73.9 54.3 73.7 55.9 71.8 55.7 69.6 55.7 69.6 55.7 69.5 55.7 69.5 56 69.6 56.4 69.6 56.7 69.6 58.9 69.4 60.5 67.5 60.3 65.3 60.3 65.3 60.3 65.2 60.3 65.2 60.6 65.3 61 65.3 61.3 65.3 63.5 65.1 65.1 63.2 64.9 61 64.9 60.8 64.8 60.6 64.8 60.4 65.4 60.7 66.1 60.9 66.9 60.8 69.1 60.6 70.7 58.7 70.5 56.5 70.6 55.4 70.1 54.5 69.4 53.8Z\" fill=\"currentColor\"></path><path d=\"M91.4 40.7 83.7 45.4C82.8 46 81.5 45.7 81 44.7L71.7 29.3C71.1 28.4 71.4 27.1 72.4 26.6L80.1 21.9 91.4 40.7Z\" fill=\"currentColor\"></path><path d=\"M70.5 31.3C62.2 34.3 56.2 31.4 49.5 30.1 49.4 30.1 49 30 49 30 47.8 29.9 46.5 30.3 45.6 31.3L37.7 40.3C36.2 42 36.4 44.5 38.1 45.9 39 46.6 40 47 41.1 46.9 42.1 46.8 43.1 46.4 43.8 45.5 43.8 45.5 52 36.1 52 36.1L70.7 52.2 70.7 52.2 70.7 52.2C71.2 52.7 71.4 52.9 71.8 53.5L79 45.2 70.5 31.3Z\" fill=\"currentColor\"></path></svg>",
    "target": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M78.5 17.5 77.5 8.5 66.5 19.5 67.1 24.7 51.1 40.7C49.7 40 48.1 39.5 46.4 39.5 40.9 39.5 36.4 44 36.4 49.5 36.4 55 40.9 59.5 46.4 59.5 51.9 59.5 56.4 55 56.4 49.5 56.4 47.8 56 46.3 55.3 44.9L71.3 28.9 76.5 29.5 87.5 18.5 78.5 17.5Z\" fill=\"currentColor\"></path><path d=\"M79.3 32.3 78 33.7 76.1 33.5 74 33.2C76.8 38 78.5 43.5 78.5 49.5 78.5 67.1 64.1 81.5 46.5 81.5 28.9 81.5 14.5 67.1 14.5 49.5 14.5 31.9 28.9 17.5 46.5 17.5 52.4 17.5 58 19.1 62.8 22L62.6 20 62.3 18 63.7 16.6 64.4 15.9C59 13.1 53 11.5 46.5 11.5 25.5 11.5 8.5 28.5 8.5 49.5 8.5 70.5 25.5 87.5 46.5 87.5 67.5 87.5 84.5 70.5 84.5 49.5 84.5 43 82.9 37 80 31.7L79.3 32.3Z\" fill=\"currentColor\"></path><path d=\"M63.2 42.7C64.1 44.8 64.5 47.1 64.5 49.5 64.5 59.4 56.4 67.5 46.5 67.5 36.6 67.5 28.5 59.4 28.5 49.5 28.5 39.6 36.6 31.5 46.5 31.5 48.9 31.5 51.2 32 53.3 32.8L57.8 28.3C54.4 26.5 50.6 25.5 46.5 25.5 33.3 25.5 22.5 36.3 22.5 49.5 22.5 62.7 33.3 73.5 46.5 73.5 59.7 73.5 70.5 62.7 70.5 49.5 70.5 45.4 69.5 41.6 67.7 38.2L63.2 42.7Z\" fill=\"currentColor\"></path></svg>",
    "people-growth": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M74 51.95 84.1 41.85 90 47.75 90 31.75 74 31.75 79.9 37.65 70 47.55 53 64.55 38 49.55 6.9 80.65 11.1 84.85 38 57.95 53 72.95 74 51.95Z\" fill=\"currentColor\"></path><circle cx=\"18\" cy=\"20\" r=\"5\" fill=\"currentColor\"></circle><path d=\"M66.17 45.71 67.17 44.71 69.46 42.42 66.68 29.92C66.595 29.4772 66.3536 29.0797 66 28.8 64.8023 27.8602 63.4482 27.1392 62 26.67 59.3875 25.777 56.5525 25.777 53.94 26.67 52.4922 27.1403 51.1383 27.8613 49.94 28.8 49.594 29.0864 49.3545 29.4809 49.26 29.92L48 35.78 48 35.78 46.69 29.92C46.5983 29.4774 46.3541 29.081 46 28.8 44.8023 27.8602 43.4482 27.1392 42 26.67 37.8944 25.3449 33.3988 26.1428 30 28.8 29.654 29.0864 29.4145 29.4809 29.32 29.92L28 35.59C28 35.59 28 35.59 28 35.59L26.7 29.92C26.6002 29.4782 26.3534 29.0833 26 28.8 24.8017 27.8613 23.4478 27.1403 22 26.67 19.3875 25.777 16.5525 25.777 13.94 26.67 12.4931 27.1424 11.1396 27.8632 9.94 28.8 9.594 29.0864 9.35448 29.4809 9.26 29.92L6.08 44.44C5.79511 45.5586 6.47093 46.6963 7.5895 46.9812 7.61621 46.988 7.64304 46.9943 7.67 47 7.77978 47.0099 7.89022 47.0099 8 47 8.95634 47.0223 9.79459 46.3643 10 45.43L13 32 13 32 13 39.1 10 54 13 54 13 68.89 17 64.89 17 54 19 54 19 62.89 23 58.89 23 54 26 54 23 39.11 23 32.11 23 32.11 26 45.17C26.0885 46.2077 26.9586 47.0038 28 47L28 47C28.9339 46.9938 29.7392 46.3421 29.94 45.43L30 45 32.92 32.17C32.92 32.17 32.92 32.17 32.92 32.17L32.92 48.94 35.13 46.72C36.6912 45.157 39.2239 45.1556 40.7869 46.7169 40.7879 46.7179 40.789 46.719 40.79 46.72L43 48.85 43 32.18C43 32.18 43 32.18 43 32.18L46 45.44C46.2095 46.3703 47.0467 47.0233 48 47L48 47C48.9377 46.9985 49.7484 46.3457 49.95 45.43L52.95 32.17C52.95 32.17 52.95 32.17 52.95 32.17L52.95 58.87 52.95 58.87 56.95 54.87 56.95 48 58.95 48 58.95 52.91 62.95 48.91 62.95 32.18C62.95 32.18 62.95 32.18 62.95 32.18L66.1 45.72Z\" fill=\"currentColor\"></path><circle cx=\"57.99\" cy=\"20\" r=\"5\" fill=\"currentColor\"></circle><circle cx=\"37.96\" cy=\"20\" r=\"5\" fill=\"currentColor\"></circle></svg>",
    "database": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><g><ellipse cx=\"48\" cy=\"18\" rx=\"28\" ry=\"8\" fill=\"currentColor\"></ellipse><path d=\"M68 38C66.8 38 66 37.2 66 36 66 34.8 66.8 34 68 34 69.2 34 70 34.8 70 36 70 37.2 69.2 38 68 38ZM48 30C32.6 30 20 26.4 20 22L20 38C20 42.4 32.6 46 48 46 63.4 46 76 42.4 76 38L76 22C76 26.4 63.4 30 48 30Z\" fill=\"currentColor\"></path><path d=\"M68 58C66.8 58 66 57.2 66 56 66 54.8 66.8 54 68 54 69.2 54 70 54.8 70 56 70 57.2 69.2 58 68 58ZM48 50C32.6 50 20 46.4 20 42L20 58C20 62.4 32.6 66 48 66 63.4 66 76 62.4 76 58L76 42C76 46.4 63.4 50 48 50Z\" fill=\"currentColor\"></path><path d=\"M68 78C66.8 78 66 77.2 66 76 66 74.8 66.8 74 68 74 69.2 74 70 74.8 70 76 70 77.2 69.2 78 68 78ZM48 70C32.6 70 20 66.4 20 62L20 78C20 82.4 32.6 86 48 86 63.4 86 76 82.4 76 78L76 62C76 66.4 63.4 70 48 70Z\" fill=\"currentColor\"></path></g></svg>",
    "ai-head": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><g><path d=\"M29.5 36.711C28.2346 37.2633 27.6564 38.7368 28.2087 40.0023 28.761 41.2677 30.2346 41.8459 31.5 41.2936 32.7654 40.7413 33.3436 39.2677 32.7913 38.0023 32.5391 37.4244 32.0779 36.9632 31.5 36.711L31.5 30.008 27.5 30.008 27.5 26.288C28.7654 25.7357 29.3436 24.2622 28.7913 22.9967 28.239 21.7313 26.7654 21.1531 25.5 21.7054 24.2346 22.2577 23.6564 23.7313 24.2087 24.9967 24.4609 25.5746 24.9221 26.0358 25.5 26.288L25.5 30.007 20.318 30C20.126 30.535 19.983 31.07 19.833 31.633 19.801 31.755 19.767 31.878 19.733 32L29.5 32.009Z\" stroke=\"currentColor\" fill=\"currentColor\"></path><path d=\"M81 51.014 74.1 39.014 74.1 38.514C74.6878 21.9183 61.7108 7.98833 45.1152 7.40053 45.1101 7.40035 45.105 7.40018 45.1 7.4 44.728 7.38733 44.3577 7.38067 43.989 7.38 27.8298 7.36576 14.5665 20.1607 14 36.31L14 38.51C13.961 47.9739 18.3211 56.9187 25.8 62.718L25.8 88.025 57.4 88.025 57.4 76.025 62.3 76.025C68.8115 76.0118 74.0868 70.7365 74.1 64.225L74.1 58.025 78.5 58.025C81.1 57.716 83.4 54.715 81 51.014ZM79.828 54.914C79.5447 55.4943 79.0002 55.9034 78.364 56.014L72.1 56.014 72.1 64.214C72.0923 69.6232 67.7092 74.0063 62.3 74.014L55.4 74.014 55.4 86.014 27.8 86.014 27.8 61.736 27.024 61.136C20.0226 55.7257 15.946 47.359 16 38.511L16 36.347C16.5122 21.2722 28.9076 9.33115 43.991 9.382 44.3357 9.382 44.682 9.38833 45.03 9.401 60.5172 9.96062 72.629 22.9506 72.105 38.439L72.105 39.545 72.371 40.008 79.271 52.008 79.298 52.054 79.327 52.099C79.9768 52.8837 80.1684 53.9513 79.832 54.913Z\" stroke=\"currentColor\" fill=\"currentColor\"></path><path d=\"M58.5 21.5C58.2084 21.5025 57.9196 21.5567 57.647 21.66L54.5 18.828 54.5 14.4C53.84 14.137 53.168 13.873 52.5 13.647L52.5 19.679 56.2 23.012C55.6543 24.2803 56.2402 25.7508 57.5085 26.2965 58.7768 26.8421 60.2473 26.2563 60.793 24.988 61.3386 23.7197 60.7528 22.2492 59.4845 21.7035 59.1735 21.5697 58.8386 21.5005 58.5 21.5Z\" stroke=\"currentColor\" fill=\"currentColor\"></path><path d=\"M47.5 41.5C47.1739 41.5003 46.8511 41.5649 46.55 41.69L39.5 34.616 39.5 23.006 45.5 23.006 45.5 27.706C44.2346 28.2583 43.6564 29.7318 44.2087 30.9973 44.761 32.2627 46.2346 32.8409 47.5 32.2886 48.7654 31.7363 49.3436 30.2627 48.7913 28.9973 48.5391 28.4194 48.0779 27.9582 47.5 27.706L47.5 21.005 39.5 21.005 39.5 18.287C40.7654 17.7347 41.3436 16.2612 40.7913 14.9957 40.239 13.7303 38.7654 13.1521 37.5 13.7044 36.2346 14.2567 35.6564 15.7303 36.2087 16.9957 36.4609 17.5736 36.9221 18.0348 37.5 18.287L37.5 35.407 40.8 38.816 35.5 44.116 35.5 49.01 29.469 49.01 25.613 44.481C26.2153 43.1958 25.6617 41.6656 24.3764 41.0633 23.0912 40.461 21.561 41.0146 20.9587 42.2998 20.3564 43.5851 20.9101 45.1152 22.1953 45.7176 22.7866 45.9946 23.4611 46.0363 24.082 45.834L28.532 51.011 35.5 51.011 35.5 52.711C34.2346 53.2633 33.6564 54.7368 34.2087 56.0023 34.761 57.2677 36.2346 57.8459 37.5 57.2936 38.7654 56.7413 39.3436 55.2677 38.7913 54.0023 38.5391 53.4244 38.0779 52.9632 37.5 52.711L37.5 44.905 42.2 40.205 45.149 43.175C44.6967 44.476 45.3847 45.8974 46.6857 46.3497 47.9867 46.802 49.4081 46.114 49.8604 44.813 50.3127 43.512 49.6247 42.0906 48.3237 41.6383 48.0588 41.5462 47.7804 41.4995 47.5 41.5Z\" stroke=\"currentColor\" fill=\"currentColor\"></path></g></svg>",
    "code": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M34.59 64.41 23.17 53 34.59 41.59 37.41 44.41 28.83 53 37.41 61.59 34.59 64.41Z\" stroke=\"currentColor\" stroke-width=\"0.999933\" fill=\"currentColor\"></path><path d=\"M61.41 64.41 58.59 61.59 67.17 53 58.59 44.41 61.41 41.59 72.83 53 61.41 64.41Z\" stroke=\"currentColor\" stroke-width=\"0.999933\" fill=\"currentColor\"></path><rect x=\"35.44\" y=\"51.54\" stroke=\"currentColor\" stroke-width=\"0.999933\" fill=\"currentColor\" transform=\"matrix(0.382845 -0.923813 0.923813 0.382845 -19.88 77.33)\"></rect><path d=\"M8 17 8 79 88 79 88 17ZM77 23C78.1046 23 79 23.8954 79 25 79 26.1046 78.1046 27 77 27 75.8954 27 75 26.1046 75 25 75 23.8954 75.8954 23 77 23ZM70 23C71.1046 23 72 23.8954 72 25 72 26.1046 71.1046 27 70 27 68.8954 27 68 26.1046 68 25 68 23.8954 68.8954 23 70 23ZM63 23C64.1046 23 65 23.8954 65 25 65 26.1046 64.1046 27 63 27 61.8954 27 61 26.1046 61 25 61 23.8954 61.8954 23 63 23ZM82 73 14 73 14 33 82 33Z\" stroke=\"currentColor\" stroke-width=\"0.999933\" fill=\"currentColor\"></path></svg>",
    "idea-gear": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M55.33 39.17 56.18 36.65 54.26 34.73 51.74 35.58C51.0849 35.2109 50.3861 34.9253 49.66 34.73L48.48 32.38 45.8 32.38 44.61 34.74C43.8813 34.9371 43.1794 35.2225 42.52 35.59L40 34.74 38.08 36.66 38.88 39.18C38.4963 39.8315 38.2004 40.5309 38 41.26L35.64 42.44 35.64 45.08 38 46.27C38.1945 46.9964 38.4801 47.6953 38.85 48.35L38 50.87 40 52.79 42.52 51.93C43.1746 52.3026 43.8734 52.5915 44.6 52.79L45.78 55.14 48.46 55.14 49.65 52.83C50.3639 52.6359 51.0521 52.3572 51.7 52L54.21 52.86 56.13 50.93 55.28 48.42C55.662 47.7603 55.9673 47.0591 56.19 46.33L58.54 45.15 58.54 42.44 56.18 41.25C55.9891 40.5224 55.7033 39.8231 55.33 39.17ZM47.13 47.8C44.9209 47.8 43.13 46.0091 43.13 43.8 43.13 41.5909 44.9209 39.8 47.13 39.8 49.3257 39.8322 51.0978 41.6043 51.13 43.8 51.13 46.0091 49.3391 47.8 47.13 47.8Z\" fill=\"currentColor\"></path><path d=\"M55.72 74.79 38.51 74.79C36.9167 74.8839 35.7011 76.2516 35.7949 77.8449 35.8811 79.3073 37.0477 80.4739 38.51 80.56L55.72 80.56C57.3133 80.4661 58.5289 79.0984 58.4351 77.5051 58.3489 76.0427 57.1823 74.8761 55.72 74.79Z\" fill=\"currentColor\"></path><path d=\"M47.12 90.33C50.3851 90.3248 53.0996 87.8147 53.36 84.56L40.87 84.56C41.1353 87.8163 43.853 90.3252 47.12 90.33Z\" fill=\"currentColor\"></path><path d=\"M72.09 44.47 72.09 43.61C71.8352 29.9604 60.7417 19.0044 47.09 18.92L47.09 18.92C33.4383 19.0044 22.3448 29.9604 22.09 43.61L22.09 44.47C22.1814 47.4304 22.7696 50.3545 23.83 53.12 24.8421 55.7293 26.3118 58.1371 28.17 60.23 30.46 62.72 32.96 67.57 34.02 69.73 34.3442 70.3825 35.0114 70.7936 35.74 70.79L58.44 70.79C59.1686 70.7936 59.8358 70.3825 60.16 69.73 61.22 67.57 63.72 62.73 66.01 60.23 67.8682 58.1371 69.3379 55.7293 70.35 53.12 71.4104 50.3545 71.9986 47.4304 72.09 44.47ZM66.33 44.38C66.2589 46.6779 65.8096 48.9483 65 51.1 64.2407 53.0377 63.1437 54.8254 61.76 56.38 59.5403 59.0224 57.6373 61.9154 56.09 65L38.09 65C36.5604 61.9074 34.6742 59.0043 32.47 56.35 31.0863 54.7954 29.9893 53.0077 29.23 51.07 28.4034 48.9212 27.9371 46.6507 27.85 44.35L27.85 43.63C28.0291 33.13 36.5586 24.6937 47.06 24.63L47.06 24.63C57.5614 24.6937 66.0909 33.13 66.27 43.63Z\" fill=\"currentColor\"></path><path d=\"M47.31 15C48.4146 15 49.31 14.1046 49.31 13L49.31 6C49.31 4.89543 48.4146 4 47.31 4 46.2054 4 45.31 4.89543 45.31 6L45.31 13C45.31 14.1046 46.2054 15 47.31 15Z\" fill=\"currentColor\"></path><path d=\"M23.58 23.79C24.3601 24.5654 25.6199 24.5654 26.4 23.79 27.1754 23.0099 27.1754 21.7501 26.4 20.97L21.45 16C20.6302 15.2598 19.3655 15.3243 18.6252 16.1441 17.936 16.9075 17.9381 18.0691 18.63 18.83Z\" fill=\"currentColor\"></path><path d=\"M69.66 24.76C70.193 24.7604 70.7042 24.548 71.08 24.17L76.02 19.17C76.6643 18.2728 76.4594 17.0232 75.5622 16.3789 74.8543 15.8705 73.8987 15.879 73.2 16.4L68.2 21.4C67.4246 22.1801 67.4246 23.4399 68.2 24.22 68.5938 24.5898 69.1204 24.7846 69.66 24.76Z\" fill=\"currentColor\"></path><path d=\"M16.25 41.5 9.25 41.5C8.14543 41.5 7.25 42.3954 7.25 43.5 7.25 44.6046 8.14543 45.5 9.25 45.5L16.25 45.5C17.3546 45.5 18.25 44.6046 18.25 43.5 18.25 42.3954 17.3546 41.5 16.25 41.5Z\" fill=\"currentColor\"></path><path d=\"M23.58 63.14 18.63 68.14C17.791 68.8585 17.6933 70.121 18.4118 70.96 19.1303 71.799 20.3929 71.8966 21.2318 71.1782 21.3101 71.1112 21.383 71.0382 21.45 70.96L26.4 65.96C27.1185 65.121 27.0208 63.8585 26.1818 63.14 25.4331 62.4988 24.3288 62.4988 23.58 63.14Z\" fill=\"currentColor\"></path><path d=\"M71.08 62.76C70.3398 61.9402 69.0751 61.8757 68.2552 62.6159 67.4354 63.3561 67.3709 64.6208 68.1111 65.4407 68.1551 65.4893 68.2015 65.5359 68.25 65.58L73.25 70.58C73.957 71.4287 75.2181 71.5436 76.0668 70.8366 76.9155 70.1297 77.0303 68.8686 76.3234 68.0199 76.2275 67.9048 76.1191 67.8009 76 67.71Z\" fill=\"currentColor\"></path><path d=\"M85 41.43 78 41.43C76.8954 41.43 76 42.3254 76 43.43 76 44.5346 76.8954 45.43 78 45.43L85 45.43C86.1046 45.43 87 44.5346 87 43.43 87 42.3254 86.1046 41.43 85 41.43Z\" fill=\"currentColor\"></path></svg>",
    "search": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M85.5 75.6 73 63.1C71.3 61.4 69 60.8 66.8 61.2L62.4 56.8C66.3 51.8 68.6 45.4 68.6 38.6 68.6 22.1 55.1 8.6 38.6 8.6 22.1 8.6 8.6 22.1 8.6 38.6 8.6 55.1 22.1 68.6 38.6 68.6 45.4 68.6 51.7 66.3 56.8 62.4L61.2 66.8C60.8 69 61.4 71.3 63.1 73L75.6 85.5C77 86.9 78.8 87.6 80.6 87.6 82.4 87.6 84.2 86.9 85.6 85.5 88.2 82.7 88.2 78.3 85.5 75.6ZM38.5 62.5C25.3 62.5 14.5 51.7 14.5 38.5 14.5 25.3 25.3 14.5 38.5 14.5 51.7 14.5 62.5 25.3 62.5 38.5 62.5 51.7 51.7 62.5 38.5 62.5Z\" fill=\"currentColor\"></path></svg>"
  };
  function run() {
    document.querySelectorAll('.oc-ic[data-icon]').forEach(function (el) {
      var k = el.getAttribute('data-icon');
      if (ICONS[k]) el.innerHTML = ICONS[k];
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);else run();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/oc-icons.js", error: String((e && e.message) || e) }); }

// slides/oc-logo.js
try { (() => {
/* Injects the OPITZ CONSULTING logo lockup into any
   <span class="oc-logo" data-oc-logo></span> on the page.
   The mark is multi-colored (navy triangle + blue/amber/red waves).
   Add class "on-dark" for the reverse (white) treatment — slide.css
   forces the mark + wordmark white. data-mark-only hides the wordmark. */
(function () {
  var P = [['M165282 39615 L296646 268935 L33922 268943 L165282 39615 Z M165282 0 L0 288555 L330568 288543 L165282 0 Z', '#003A6F'], ['M193717 260535 C195777 226687 209989 196141 232205 173304 L222089 155649 C194156 182392 176082 219350 173908 260535 L193717 260535 Z M330568 131673 L330568 112061 C301750 112061 274769 119869 251564 133428 L261364 150533 C281699 138618 305296 131673 330568 131673', '#0068B4'], ['M213550 140737 L203600 123367 C164966 157072 139851 205826 137495 260538 L157099 260538 C159372 213112 180695 170726 213550 140737 M330568 95252 L330568 75644 C295163 75644 262008 85207 233470 101826 L243215 118840 C268875 103870 298709 95252 330568 95252', '#F7AD00'], ['M195088 108496 L185162 91169 C135732 131630 103549 192279 101086 260536 L120690 260536 C123105 199573 151481 145335 195088 108496 M330568 58832 L330568 39220 C288573 39220 249243 50546 215368 70225 L225113 87239 C256118 69209 292119 58832 330568 58832', '#E82000']];
  var MARK = '<svg viewBox="0 0 330568 288554" aria-label="OPITZ CONSULTING">' + P.map(function (p) {
    return '<path d="' + p[0] + '" fill="' + p[1] + '"/>';
  }).join('') + '</svg>';
  function build(el) {
    var markOnly = el.hasAttribute('data-mark-only');
    var html = '<span class="mark">' + MARK + '</span>';
    if (!markOnly) {
      html += '<span class="word"><span class="a">OPITZ</span><span class="b">Consulting</span></span>';
    }
    el.innerHTML = html;
  }
  function run() {
    document.querySelectorAll('.oc-logo[data-oc-logo]').forEach(build);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);else run();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "slides/oc-logo.js", error: String((e && e.message) || e) }); }

// ui_kits/website/Site.jsx
try { (() => {
/* OPITZ CONSULTING — Marketing website UI kit
   Recreation of a typical corporate homepage in the brand system.
   Composes DS primitives (Logo, Button, Badge, Eyebrow, StatBubble, Quote, Card).
   Exposes <OCSite/> on window. */
(function () {
  const NS = window.OPITZCONSULTINGDesignSystem_dd6368 || {};
  const {
    Logo,
    Button,
    Badge,
    Eyebrow,
    StatBubble,
    Quote,
    Card
  } = NS;
  const NAV = ['Leistungen', 'Branchen', 'Über uns', 'Karriere', 'Insights'];
  const Icon = ({
    d,
    size = 22
  }) => /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, d);
  const IArrow = /*#__PURE__*/React.createElement(Icon, {
    d: /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14M13 6l6 6-6 6"
    }),
    size: 18
  });
  const IMenu = /*#__PURE__*/React.createElement(Icon, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "6",
      x2: "21",
      y2: "6"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "12",
      x2: "21",
      y2: "12"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "3",
      y1: "18",
      x2: "21",
      y2: "18"
    }))
  });
  const ISearch = /*#__PURE__*/React.createElement(Icon, {
    d: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M21 21l-4-4"
    })),
    size: 19
  });
  function Header() {
    const [open, setOpen] = React.useState(false);
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255,255,255,.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 32px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      size: 34
    }), /*#__PURE__*/React.createElement("nav", {
      className: "oc-desk-nav",
      style: {
        display: 'flex',
        gap: 28,
        alignItems: 'center'
      }
    }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
      key: n,
      href: "#",
      style: {
        textDecoration: 'none',
        color: 'var(--text-primary)',
        fontWeight: 600,
        fontSize: 15
      },
      onMouseOver: e => e.target.style.color = 'var(--oc-blue)',
      onMouseOut: e => e.target.style.color = 'var(--text-primary)'
    }, n))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("button", {
      "aria-label": "Search",
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-secondary)',
        display: 'flex'
      }
    }, ISearch), /*#__PURE__*/React.createElement("span", {
      className: "oc-desk-cta"
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      uppercase: true
    }, "Kontakt")), /*#__PURE__*/React.createElement("button", {
      className: "oc-burger",
      "aria-label": "Menu",
      onClick: () => setOpen(!open),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--text-primary)',
        display: 'none'
      }
    }, IMenu))), open && /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '8px 32px 20px',
        display: 'grid',
        gap: 4,
        borderTop: '1px solid var(--border-subtle)'
      }
    }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
      key: n,
      href: "#",
      style: {
        padding: '10px 0',
        textDecoration: 'none',
        color: 'var(--text-primary)',
        fontWeight: 600
      }
    }, n))));
  }
  function Hero() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        background: 'var(--oc-navy)',
        color: '#fff',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: "url('../../assets/backgrounds/bg-city-network.jpeg') center/cover",
        opacity: .28
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(110deg, rgba(0,48,102,.96) 38%, rgba(0,48,102,.55))'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '96px 32px 104px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 640
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      tone: "white"
    }, "Digitale Service Manufaktur"), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        textTransform: 'uppercase',
        fontSize: 56,
        lineHeight: 1.04,
        letterSpacing: '-.01em',
        margin: '18px 0 0'
      }
    }, "N\xE4chster Schritt der Digitalisierung"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontWeight: 300,
        fontSize: 22,
        lineHeight: 1.45,
        color: 'rgba(255,255,255,.82)',
        margin: '20px 0 32px',
        maxWidth: 540
      }
    }, "Gemeinsam mit unseren Kunden machen wir IT zum Erfolgsfaktor und digitalisieren die individuellen Wettbewerbsvorteile von morgen. Modern. Integriert. Automatisiert. Sicher."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 14,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      icon: IArrow,
      iconRight: true
    }, "Projekt starten"), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "outline",
      style: {
        '--_fg': '#fff',
        '--_bd': 'rgba(255,255,255,.5)',
        '--_bgh': 'rgba(255,255,255,.12)'
      }
    }, "Unsere Leistungen")))));
  }
  const SERVICES = [{
    t: 'IT-Modernisierung',
    d: 'Nachhaltiges Business durch flexible, dynamikrobuste Lösungen für die digitale Welt von morgen.',
    icon: 'cloud-sync'
  }, {
    t: 'Intelligent Automation',
    d: 'Effizienterer Ressourceneinsatz durch die Automatisierung von Business-Prozessen mit KI-Technologien.',
    icon: 'head-gears'
  }, {
    t: 'Security',
    d: 'Sichere IT-Lösungen und Infrastrukturen als Basis für Geschäftsmodelle in dynamischen Märkten.',
    icon: 'lock'
  }, {
    t: 'Systemintegration',
    d: 'Eine integrierte IT-Landschaft als Grundlage für ein #zukunftswirksames Business.',
    icon: 'blockchain'
  }, {
    t: 'Data & Analytics',
    d: 'Data Driven Business Value — smart, intelligent, verlässlich.',
    icon: 'database'
  }, {
    t: 'Cloud-Infrastruktur',
    d: 'Skalierbare, hybride und elastische Infrastruktur. AWS · Oracle · Microsoft.',
    icon: 'target'
  }];
  function Services() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '88px 32px'
      }
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Mehrwert"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        textTransform: 'uppercase',
        fontSize: 38,
        margin: '12px 0 8px',
        color: 'var(--text-primary)'
      }
    }, "Was wir tun"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 18,
        color: 'var(--text-secondary)',
        maxWidth: 620,
        fontWeight: 300,
        margin: '0 0 44px'
      }
    }, "End-to-End-Leistungen \xFCber den gesamten Lebenszyklus Ihrer digitalen Produkte."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 22
      }
    }, SERVICES.map((s, i) => /*#__PURE__*/React.createElement(Card, {
      key: s.t,
      interactive: true,
      accentBar: true,
      padding: "lg"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 48,
        height: 48,
        borderRadius: 'var(--radius-md)',
        background: 'var(--surface-accent-soft)',
        color: 'var(--oc-blue)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "oc-ic",
      "data-icon": s.icon,
      style: {
        width: 26,
        height: 26,
        display: 'inline-flex'
      }
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 19,
        margin: '0 0 8px',
        color: 'var(--text-primary)'
      }
    }, s.t), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14.5,
        lineHeight: 1.55,
        color: 'var(--text-secondary)',
        margin: 0
      }
    }, s.d)))));
  }
  function Stats() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: 'var(--oc-navy)',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '72px 32px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 28
      }
    }, /*#__PURE__*/React.createElement(StatBubble, {
      value: "545",
      label: "Mitarbeitende",
      tone: "blue",
      size: 150
    }), /*#__PURE__*/React.createElement(StatBubble, {
      value: "91%",
      label: "Kundenzufriedenheit",
      tone: "light",
      size: 130
    }), /*#__PURE__*/React.createElement(StatBubble, {
      value: "30+",
      label: "Jahre",
      tone: "blue",
      size: 120
    }), /*#__PURE__*/React.createElement(StatBubble, {
      value: "8+1",
      label: "Standorte",
      tone: "light",
      size: 112
    }), /*#__PURE__*/React.createElement(StatBubble, {
      value: "60,4",
      label: "Mio. \u20AC Umsatz",
      tone: "blue",
      size: 130
    })));
  }
  const CLIENTS = ['Lufthansa CityLine', 'thyssenkrupp Steel', 'BSH Hausgeräte', 'Continental', 'AWS', 'Oracle', 'Microsoft', 'Mittelstand'];
  function Clients() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '80px 32px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1fr 1.1fr',
        gap: 56,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Eyebrow, null, "Kunden"), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        textTransform: 'uppercase',
        fontSize: 34,
        margin: '12px 0 22px',
        color: 'var(--text-primary)'
      }
    }, "Branchen\xFCbergreifend vertraut"), /*#__PURE__*/React.createElement(Quote, {
      author: "Thomas Blume",
      role: "IT-Projektmanager, Lufthansa CityLine"
    }, "Nach dem nun erfolgten Projektabschluss verf\xFCgt Lufthansa CityLine \xFCber eine moderne, browserbasierte Anwendung, die technisch auf dem neuesten Stand ist.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 14
      }
    }, CLIENTS.map(c => /*#__PURE__*/React.createElement("div", {
      key: c,
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--text-secondary)',
        fontWeight: 700,
        fontSize: 15,
        textAlign: 'center',
        padding: '0 12px'
      }
    }, c)))));
  }
  function CTA() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--oc-blue)',
        color: '#fff'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '76px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 32,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        letterSpacing: '.14em',
        textTransform: 'uppercase',
        fontWeight: 700,
        opacity: .82
      }
    }, "#undweiter \u2014 Zusammen erfolgreich"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 52,
        lineHeight: 1,
        marginTop: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--oc-navy)'
      }
    }, "#"), "futureeffective")), /*#__PURE__*/React.createElement(Button, {
      size: "lg",
      variant: "secondary",
      icon: IArrow,
      iconRight: true
    }, "Kontakt aufnehmen")));
  }
  function Footer() {
    const cols = [['Leistungen', ['Modernisierung', 'Automatisierung', 'Security', 'Integration', 'Analytics']], ['Unternehmen', ['Über uns', 'Historie', 'Management', 'Karriere', 'Presse']], ['Standorte', ['Gummersbach', 'Hamburg', 'Berlin', 'München', 'Kraków']]];
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: 'var(--oc-ink)',
        color: 'rgba(255,255,255,.72)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 1200,
        margin: '0 auto',
        padding: '64px 32px 28px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
        gap: 32
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Logo, {
      tone: "white",
      size: 36
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        lineHeight: 1.6,
        marginTop: 18,
        maxWidth: 280
      }
    }, "Digitale Service Manufaktur. Inhabergef\xFChrt seit 1990 \u2014 Ihr Partner f\xFCr IT-getriebene Business-Innovation.")), cols.map(([h, items]) => /*#__PURE__*/React.createElement("div", {
      key: h
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        color: '#fff',
        fontWeight: 700,
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: '.06em',
        marginBottom: 14
      }
    }, h), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'grid',
        gap: 9
      }
    }, items.map(i => /*#__PURE__*/React.createElement("a", {
      key: i,
      href: "#",
      style: {
        color: 'rgba(255,255,255,.72)',
        textDecoration: 'none',
        fontSize: 14
      }
    }, i)))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: '1px solid rgba(255,255,255,.14)',
        marginTop: 44,
        paddingTop: 20,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 13,
        flexWrap: 'wrap',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 OPITZ CONSULTING 2026 \xB7 #futureeffective"), /*#__PURE__*/React.createElement("span", null, "Impressum \xB7 Datenschutz \xB7 ISO 27001 zertifiziert"))));
  }
  function OCSite() {
    React.useEffect(() => {
      if (window.__ocIcons) window.__ocIcons();
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      className: "oc-scope",
      style: {
        fontFamily: 'var(--font-sans)',
        color: 'var(--text-primary)',
        background: '#fff'
      }
    }, /*#__PURE__*/React.createElement(Header, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Services, null), /*#__PURE__*/React.createElement(Stats, null), /*#__PURE__*/React.createElement(Clients, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
  }
  window.OCSite = OCSite;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Site.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/oc-icons.js
try { (() => {
/* Fills <span class="oc-ic" data-icon="..."> with inline brand SVGs (currentColor).
   Exposes window.__ocIcons() to re-run after React mounts. */
(function () {
  var ICONS = {
    "cloud-sync": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M63.53 49.26 57.05 55.74 50.56 49.26 54.18 49.26C52.9555 46.8748 50.5011 45.3736 47.82 45.37 46.0902 45.3719 44.4212 46.0089 43.13 47.16L36.54 47.16C39.4757 40.9239 46.9109 38.2485 53.1469 41.1842 56.4749 42.7509 58.9423 45.7059 59.89 49.26Z\" fill=\"currentColor\"></path><path d=\"M32.15 55.74 38.64 49.26 45.12 55.74 41.47 55.74C42.6911 58.1236 45.1418 59.6249 47.82 59.63 49.5531 59.6296 51.2257 58.9926 52.52 57.84L59.14 57.84C56.1947 64.0837 48.7455 66.7577 42.5018 63.8124 39.1768 62.2439 36.7108 59.2913 35.76 55.74Z\" fill=\"currentColor\"></path><path d=\"M78.73 76C87.3653 75.7956 94.1999 68.6296 93.9956 59.9943 93.8152 52.3757 88.1701 45.9961 80.63 44.89 79.8332 39.9997 77.1469 35.6183 73.15 32.69 69.0134 29.7585 63.8469 28.6723 58.88 29.69 53.9935 22.1456 44.8806 18.5028 36.14 20.6 27.621 22.7939 21.2554 29.8931 20 38.6 14.3248 38.7524 9.03265 41.498 5.64 46.05 1.62015 51.6339 0.888078 58.9394 3.72 65.21 6.60674 71.3908 12.6499 75.4913 19.46 75.89ZM19.73 69.68C15.2051 69.395 11.1936 66.6709 9.26 62.57 7.38374 58.3901 7.86725 53.5285 10.53 49.8 13.2524 46.1376 17.7824 44.2887 22.29 45L25.84 45.59 25.84 41.67C25.8747 34.5877 30.6878 28.4223 37.55 26.67 44.4356 25.0098 51.5547 28.3287 54.71 34.67L55.92 37.08 58.43 36.19C62.1855 34.8631 66.3517 35.445 69.6 37.75 72.8296 40.1158 74.7416 43.8766 74.75 47.88L74.75 51 78.83 51C84.0123 51.1946 88.0557 55.5534 87.8611 60.7357 87.6754 65.6835 83.6796 69.637 78.73 69.77Z\" fill=\"currentColor\"></path></svg>",
    "head-gears": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M47.1 19.7C44.8 19.7 42.9 21.6 42.9 23.9 42.9 26.2 44.8 28.1 47.1 28.1 49.4 28.1 51.3 26.2 51.3 23.9 51.3 21.6 49.4 19.7 47.1 19.7Z\" fill=\"currentColor\"></path><circle cx=\"34.5\" cy=\"44.2\" r=\"4.2\" fill=\"currentColor\"></circle><path d=\"M59 25.3 56.5 26.5C56.3 27.3 55.9 28 55.5 28.7L56.4 31.3 54.4 33.3 51.8 32.4C51.1 32.8 50.4 33.1 49.6 33.3L48.4 35.7 45.6 35.7 44.4 33.2C43.6 33 42.9 32.7 42.2 32.3L39.6 33.2 37.6 31.2 38.5 28.6C38.1 27.9 37.8 27.2 37.6 26.4L35.1 25.2 35.1 22.4 37.6 21.2C37.8 20.4 38.1 19.7 38.5 19L37.7 16.4 39.7 14.4 42.3 15.3C43 14.9 43.7 14.6 44.5 14.4L45.7 11.9 48.5 11.9 49.7 14.3C50.5 14.5 51.2 14.8 51.9 15.2L54.5 14.3 56.5 16.3 55.6 18.9C56 19.6 56.3 20.3 56.5 21.1L59 22.3 59 25.3ZM46.4 45.6 43.9 46.8C43.7 47.6 43.4 48.3 43 49L43.8 51.6 41.8 53.6 39.2 52.7C38.5 53.1 37.8 53.4 37 53.6L35.9 56 33.1 56 31.9 53.5C31.1 53.3 30.4 53 29.7 52.6L27.1 53.4 25.1 51.4 26 48.8C25.6 48.1 25.3 47.4 25.1 46.6L22.6 45.4 22.6 42.6 25.1 41.4C25.3 40.6 25.6 39.9 26 39.2L25.1 36.6 27.1 34.6 29.7 35.5C30.4 35.1 31.1 34.8 31.9 34.6L33.1 32.1 36 32.1 37.2 34.6C38 34.8 38.7 35.1 39.4 35.5L42 34.6 44 36.6 43.1 39.2C43.5 39.9 43.8 40.6 44 41.4L46.5 42.6 46.4 45.6 46.4 45.6ZM81 49.3 74.1 37.3 74.1 36.8C74.5 25.8 68.9 15.5 59.4 9.8 49.9 4.2 38.2 4.2 28.7 9.8 19.2 15.4 13.6 25.8 14 36.8 14 46.3 18.3 55.2 25.8 61L25.8 86.3 57.4 86.3 57.4 74.3 62.3 74.3C65.5 74.3 68.5 73 70.7 70.8 72.9 68.5 74.1 65.5 74.1 62.3L74.1 56.3 78.5 56.3C81.1 56 83.4 53 81 49.3Z\" fill=\"currentColor\"></path></svg>",
    "lock": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><g><path d=\"M69.025 44.015 69.025 32.031C69.025 20.4187 59.6113 11.005 47.999 11.005 36.3867 11.005 26.973 20.4187 26.973 32.031L26.973 44.014 19.997 44.514 19.997 82.523 47.997 84.523 75.997 82.523 75.997 44.512ZM28.973 32.031C28.973 21.5232 37.4912 13.005 47.999 13.005 58.5068 13.005 67.025 21.5232 67.025 32.031L67.025 43.881 64 43.679 64 32.006C64 23.1694 56.8366 16.006 48 16.006 39.1634 16.006 32 23.1694 32 32.006L32 43.679 28.975 43.879ZM62 43.539 48 42.512 34 43.539 34 32.006C34 24.274 40.268 18.006 48 18.006 55.732 18.006 62 24.274 62 32.006ZM74 80.661 48 82.519 22 80.661 22 46.375 27.134 46.008 33.147 45.608 48 44.517 62.867 45.608 68.858 46.008 74 46.375Z\" stroke=\"currentColor\" fill=\"currentColor\"></path><path d=\"M48 55.516C44.1175 55.5319 40.983 58.6922 40.9989 62.5748 41.01 65.2733 42.5647 67.7273 45 68.89L45 74.521 51 74.521 51 68.866C53.4176 67.6668 54.9617 65.2164 55 62.518 54.9961 58.6533 51.8647 55.521 48 55.516ZM49.635 67.288 49 67.537 49 72.521 47 72.521 47 67.508 46.328 67.275C43.7107 66.3621 42.3291 63.5003 43.2421 60.883 44.155 58.2657 47.0168 56.8841 49.6341 57.7971 51.6434 58.498 52.9924 60.3899 53 62.518 52.9562 64.6458 51.6241 66.5336 49.634 67.288Z\" stroke=\"currentColor\" fill=\"currentColor\"></path></g></svg>",
    "blockchain": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><g><path d=\"M74 50.4338 74 40.1123C73.9797 39.7332 73.7643 39.3917 73.431 39.2099L64 34.7043 64 17.4336 48 7.8336 32 17.4336 32 34.7043 22.5693 39.21C22.2361 39.3917 22.0209 39.7331 22.0005 40.1121L22.0005 50.4338 7.0005 59.4338 7.0005 78.5664 23.0005 88.1664 37.5292 79.4496 47.3941 85.8396C47.7172 86.0494 48.1321 86.0547 48.4605 85.8532L58.6871 79.5791 73 88.166 89 78.566 89 59.4336ZM86.0421 60.0086 73 67.834 59.9581 60.0086C59.9534 60.0068 59.951 60.0015 59.9528 59.9967 59.9537 59.9943 59.9556 59.9923 59.9581 59.9914L72 52.7661 72 56.7178C72 57.2701 72.4477 57.7178 73 57.7178 73.5523 57.7178 74 57.2701 74 56.7178L74 52.7661 86.042 59.9914C86.0467 59.9932 86.0491 59.9986 86.0473 60.0033 86.0463 60.0058 86.0444 60.0077 86.0419 60.0086ZM58.5439 32.0977C58.0456 31.8596 57.4486 32.0705 57.2104 32.5688 56.9723 33.0672 57.1833 33.6642 57.6816 33.9023L61.5064 35.73 49.0151 43.2248C49.0068 43.2298 49 43.2259 49 43.2162L49 27.5662 61.9849 19.7755C61.9932 19.7705 62 19.7744 62 19.7841L62 33.7491ZM61.0419 18.0086 48 25.834 34.9581 18.0086C34.9534 18.0068 34.951 18.0015 34.9528 17.9967 34.9537 17.9943 34.9556 17.9923 34.9581 17.9914L48 10.166 61.0419 17.9914C61.0466 17.9932 61.049 17.9985 61.0472 18.0033 61.0463 18.0057 61.0444 18.0077 61.0419 18.0086ZM34.0151 19.7752 47 27.5659 47 43.2159C47 43.2259 46.9932 43.2295 46.9849 43.2245L34.4936 35.73 38.3184 33.9026C38.8167 33.6645 39.0277 33.0675 38.7896 32.5691 38.5514 32.0708 37.9544 31.8599 37.4561 32.098L34 33.7488 34 19.7838C34 19.7741 34.0068 19.77 34.0151 19.7752ZM23 57.7178C23.5523 57.7178 24 57.2701 24 56.7178L24 52.7661 36.0418 59.9914C36.0466 59.9932 36.0489 59.9985 36.0471 60.0033 36.0462 60.0057 36.0443 60.0077 36.0418 60.0086L23 67.834 9.9581 60.0086C9.95335 60.0068 9.95096 60.0015 9.95277 59.9967 9.9537 59.9943 9.95564 59.9923 9.9581 59.9914L22 52.7661 22 56.7178C22 57.2701 22.4477 57.7178 23 57.7178ZM9.0151 61.7752 22 69.5659 22 85.2159C22 85.2259 21.9932 85.2295 21.9849 85.2245L9 77.4336 9 61.7836C9 61.7741 9.0068 61.77 9.0151 61.7752ZM24 85.2162 24 69.5662 36.9849 61.7755C36.9932 61.7705 37 61.7744 37 61.7841L37 76.7249 34.5435 75.1338C34.0894 74.8194 33.4665 74.9327 33.1521 75.3868 32.8377 75.8409 32.951 76.4638 33.4051 76.7782 33.4219 76.7898 33.439 76.8009 33.4565 76.8115L35.6591 78.2383 24.0151 85.2248C24.0068 85.23 24 85.2259 24 85.2162ZM47.9517 83.8184 39 78.02 39 59.4336 24 50.4341 24 40.7432 32.3287 36.7639 48 46.166 63.6708 36.7639 72 40.7432 72 50.4341 57 59.4336 57 78.2666ZM62.8525 75.85C62.5639 75.3791 61.9483 75.2313 61.4774 75.5198 61.4773 75.5199 61.4772 75.5199 61.4771 75.52L59 77.0393 59 61.7838C59 61.7738 59.0068 61.7702 59.0151 61.7752L72 69.5659 72 85.2159C72 85.2259 71.9932 85.2295 71.9849 85.2245L60.6088 78.3989 62.5229 77.2246C62.9933 76.9359 63.1408 76.3206 62.8525 75.85ZM74 85.2162 74 69.5662 86.9849 61.7755C86.9932 61.7705 87 61.7744 87 61.7841L87 77.4341 74.0151 85.2248C74.0068 85.23 74 85.2259 74 85.2162Z\" stroke=\"currentColor\" fill=\"currentColor\"></path></g></svg>",
    "database": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><g><ellipse cx=\"48\" cy=\"18\" rx=\"28\" ry=\"8\" fill=\"currentColor\"></ellipse><path d=\"M68 38C66.8 38 66 37.2 66 36 66 34.8 66.8 34 68 34 69.2 34 70 34.8 70 36 70 37.2 69.2 38 68 38ZM48 30C32.6 30 20 26.4 20 22L20 38C20 42.4 32.6 46 48 46 63.4 46 76 42.4 76 38L76 22C76 26.4 63.4 30 48 30Z\" fill=\"currentColor\"></path><path d=\"M68 58C66.8 58 66 57.2 66 56 66 54.8 66.8 54 68 54 69.2 54 70 54.8 70 56 70 57.2 69.2 58 68 58ZM48 50C32.6 50 20 46.4 20 42L20 58C20 62.4 32.6 66 48 66 63.4 66 76 62.4 76 58L76 42C76 46.4 63.4 50 48 50Z\" fill=\"currentColor\"></path><path d=\"M68 78C66.8 78 66 77.2 66 76 66 74.8 66.8 74 68 74 69.2 74 70 74.8 70 76 70 77.2 69.2 78 68 78ZM48 70C32.6 70 20 66.4 20 62L20 78C20 82.4 32.6 86 48 86 63.4 86 76 82.4 76 78L76 62C76 66.4 63.4 70 48 70Z\" fill=\"currentColor\"></path></g></svg>",
    "target": "<svg viewBox=\"0 0 96 96\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" overflow=\"hidden\"><path d=\"M78.5 17.5 77.5 8.5 66.5 19.5 67.1 24.7 51.1 40.7C49.7 40 48.1 39.5 46.4 39.5 40.9 39.5 36.4 44 36.4 49.5 36.4 55 40.9 59.5 46.4 59.5 51.9 59.5 56.4 55 56.4 49.5 56.4 47.8 56 46.3 55.3 44.9L71.3 28.9 76.5 29.5 87.5 18.5 78.5 17.5Z\" fill=\"currentColor\"></path><path d=\"M79.3 32.3 78 33.7 76.1 33.5 74 33.2C76.8 38 78.5 43.5 78.5 49.5 78.5 67.1 64.1 81.5 46.5 81.5 28.9 81.5 14.5 67.1 14.5 49.5 14.5 31.9 28.9 17.5 46.5 17.5 52.4 17.5 58 19.1 62.8 22L62.6 20 62.3 18 63.7 16.6 64.4 15.9C59 13.1 53 11.5 46.5 11.5 25.5 11.5 8.5 28.5 8.5 49.5 8.5 70.5 25.5 87.5 46.5 87.5 67.5 87.5 84.5 70.5 84.5 49.5 84.5 43 82.9 37 80 31.7L79.3 32.3Z\" fill=\"currentColor\"></path><path d=\"M63.2 42.7C64.1 44.8 64.5 47.1 64.5 49.5 64.5 59.4 56.4 67.5 46.5 67.5 36.6 67.5 28.5 59.4 28.5 49.5 28.5 39.6 36.6 31.5 46.5 31.5 48.9 31.5 51.2 32 53.3 32.8L57.8 28.3C54.4 26.5 50.6 25.5 46.5 25.5 33.3 25.5 22.5 36.3 22.5 49.5 22.5 62.7 33.3 73.5 46.5 73.5 59.7 73.5 70.5 62.7 70.5 49.5 70.5 45.4 69.5 41.6 67.7 38.2L63.2 42.7Z\" fill=\"currentColor\"></path></svg>"
  };
  function fill() {
    document.querySelectorAll('.oc-ic[data-icon]:empty').forEach(function (el) {
      var k = el.getAttribute('data-icon');
      if (ICONS[k]) el.innerHTML = ICONS[k];
    });
    document.querySelectorAll('.oc-ic svg').forEach(function (s) {
      s.style.width = '100%';
      s.style.height = '100%';
    });
  }
  window.__ocIcons = fill;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fill);else fill();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/oc-icons.js", error: String((e && e.message) || e) }); }

__ds_ns.MARK_COLORS = __ds_scope.MARK_COLORS;

__ds_ns.LogoMark = __ds_scope.LogoMark;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.ColumnChart = __ds_scope.ColumnChart;

__ds_ns.DonutChart = __ds_scope.DonutChart;

__ds_ns.LineChart = __ds_scope.LineChart;

__ds_ns.CHART_COLORS = __ds_scope.CHART_COLORS;

__ds_ns.Legend = __ds_scope.Legend;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Quote = __ds_scope.Quote;

__ds_ns.StatBubble = __ds_scope.StatBubble;

__ds_ns.Input = __ds_scope.Input;

})();
