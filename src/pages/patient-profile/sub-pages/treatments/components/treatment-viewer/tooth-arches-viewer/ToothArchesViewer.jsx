// TODO: Refactorizar esto
/* eslint-disable */

import { createRef, useEffect } from 'react'
import AdultToothArchesViewer from 'pages/patient-profile/sub-pages/treatments/components/treatment-viewer/tooth-arches-viewer/AdultToothArchesViewer'
import KidToothArchesViewer from 'pages/patient-profile/sub-pages/treatments/components/treatment-viewer/tooth-arches-viewer/KidToothArchesViewer'
import { bindReporter } from 'web-vitals/dist/modules/lib/bindReporter'

const ToothArchesViewer = ({ type, toothsSelected }) => {
  const toothRefs = new Map()

  useEffect(() => {
    toothRefs.forEach((v, k) => {
      if (toothsSelected.find(t => t.includes('Todas'))) {
        selectAll()
        return
      }

      const toothSelected = toothsSelected.find(t => t === k)
      if (toothSelected !== undefined) {
        const currentStyle = v.current.getAttribute('style')
        v.current.setAttribute('style', currentStyle.replace('fill: none', 'fill: red'))
      }
    })
  }, [toothsSelected])

  const selectAll = () => {
    toothRefs.forEach((v, k) => {
      const currentStyle = v.current.getAttribute('style')
      v.current.setAttribute('style', currentStyle.replace('fill: none', 'fill: red'))
    })
  }

  const getToothRefInit = (key) => {
    const ref = getToothRef(key)
    if (ref === undefined) {
      toothRefs.set(key, createRef())
      return toothRefs.get(key)
    }

    return ref
  }

  const getToothRef = (key) => toothRefs.get(key)

  const textStyle = {
    '-webkit-touch-callout': 'none', /* iOS Safari */
    '-webkit-user-select': 'none', /* Safari */
    '-khtml-user-select': 'none', /* Konqueror HTML */
    '-moz-user-select': 'none', /* Old versions of Firefox */
    '-ms-user-select': 'none', /* Internet Explorer/Edge */
    'user-select': 'none', /* Non-prefixed version, currently*/
    fontSize: '10.13467216px',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: '125%',
    letterSpacing: '0px',
    wordSpacing: '0px',
    fill: '#000000',
    fillOpacity: 1,
    stroke: 'none',
  }

  const AdultIndicator = () => (
    <>
      <text x="120.37785" y="17.284296" style={textStyle}>
        <tspan x="120.37785" y="17.284296">11</tspan>
      </text>
      <text x="85.630409" y="28.142862" style={textStyle}>
        <tspan x="85.630409" y="28.142862">12</tspan>
      </text>
      <text x="56.67421" y="43.344887" style={textStyle}>
        <tspan x="56.67421" y="43.344887">13</tspan>
      </text>
      <text x="42.92001" y="64.338097" style={textStyle}>
        <tspan x="42.92001" y="64.338097">14</tspan>
      </text>
      <text x="32.785339" y="88.226982" style={textStyle}>
        <tspan x="32.785339" y="88.226982">15</tspan>
      </text>
      <text x="19.031139" y="110.66804" style={textStyle}>
        <tspan x="19.031139" y="110.66804">16</tspan>
      </text>
      <text x="12.515995" y="141.07207" style={textStyle}>
        <tspan x="12.515995" y="141.07207">17</tspan>
      </text>
      <text x="8.8964691" y="172.2" style={textStyle}>
        <tspan x="8.8964691" y="172.2">18</tspan>
      </text>
      <text x="155.84921" y="17.284296" style={textStyle}>
        <tspan x="155.84921" y="17.284296">21</tspan>
      </text>
      <text x="192.76837" y="29.590677" style={textStyle}>
        <tspan x="192.76837" y="29.590677">22</tspan>
      </text>
      <text x="220.27673" y="44.068779" style={textStyle}>
        <tspan x="220.27673" y="44.068779">23</tspan>
      </text>
      <text x="236.20268" y="64.338097" style={textStyle}>
        <tspan x="236.20268" y="64.338097">24</tspan>
      </text>
      <text x="247.06125" y="86.779167" style={textStyle}>
        <tspan x="247.06125" y="86.779167">25</tspan>
      </text>
      <text x="258.64374" y="109.22027" style={textStyle}>
        <tspan x="258.64374" y="109.22027">26</tspan>
      </text>
      <text x="264.43497" y="139.62425" style={textStyle}>
        <tspan x="264.43497" y="139.62425">27</tspan>
      </text>
      <text x="268.77841" y="169.3044" style={textStyle}>
        <tspan x="268.77841" y="169.3044">28</tspan>
      </text>
      <text x="151.50578" y="360.41531" style={textStyle}>
        <tspan x="151.50578" y="360.41531">31</tspan>
      </text>
      <text x="176.84245" y="355.34799" style={textStyle}>
        <tspan x="176.84245" y="355.34799">32</tspan>
      </text>
      <text x="202.17912" y="346.6611" style={textStyle}>
        <tspan x="202.17912" y="346.6611">33</tspan>
      </text>
      <text x="222.44849" y="330.01129" style={textStyle}>
        <tspan x="222.44849" y="330.01129">34</tspan>
      </text>
      <text x="240.5461" y="309.01804" style={textStyle}>
        <tspan x="240.5461" y="309.01804">35</tspan>
      </text>
      <text x="257.91986" y="282.95749" style={textStyle}>
        <tspan x="257.91986" y="282.95749">36</tspan>
      </text>
      <text x="265.15891" y="245.31441" style={textStyle}>
        <tspan x="265.15891" y="245.31441">37</tspan>
      </text>
      <text x="265.15891" y="214.18651" style={textStyle}>
        <tspan x="265.15891" y="214.18651">38</tspan>
      </text>
      <text x="128.34082" y="360.41531" style={textStyle}>
        <tspan x="128.34082" y="360.41531">41</tspan>
      </text>
      <text x="100.10851" y="356.79581" style={textStyle}>
        <tspan x="100.10851" y="356.79581">42</tspan>
      </text>
      <text x="76.94355" y="347.38501" style={textStyle}>
        <tspan x="76.94355" y="347.38501">43</tspan>
      </text>
      <text x="55.950298" y="330.01129" style={textStyle}>
        <tspan x="55.950298" y="330.01129">44</tspan>
      </text>
      <text x="38.57658" y="310.46585" style={textStyle}>
        <tspan x="38.57658" y="310.46585">45</tspan>
      </text>
      <text x="20.478951" y="287.30087" style={textStyle}>
        <tspan x="20.478951" y="287.30087">46</tspan>
      </text>
      <text x="12.515995" y="244.5905" style={textStyle}>
        <tspan x="12.515995" y="244.5905">47</tspan>
      </text>
      <text x="12.515995" y="214.18651" style={textStyle}>
        <tspan x="12.515995" y="214.18651">48</tspan>
      </text>
    </>
  )

  const ChildIndicator = () => (
    <>
      <text x="87.802124" y="124.42228" style={textStyle}>
        <tspan x="87.802124" y="124.42228">53</tspan>
      </text>
      <text x="73.32402" y="141.07207" style={textStyle}>
        <tspan x="73.32402" y="141.07207">54</tspan>
      </text>
      <text x="63.189354" y="163.51317" style={textStyle}>
        <tspan x="63.189354" y="163.51317">55</tspan>
      </text>
      <text x="152.22969" y="100.53336" style={textStyle}>
        <tspan x="152.22969" y="100.53336">61</tspan>
      </text>
      <text x="176.11855" y="110.66804" style={textStyle}>
        <tspan x="176.11855" y="110.66804">62</tspan>
      </text>
      <text x="192.76837" y="120.80273" style={textStyle}>
        <tspan x="192.76837" y="120.80273">63</tspan>
      </text>
      <text x="207.97037" y="139.62425" style={textStyle}>
        <tspan x="207.97037" y="139.62425">64</tspan>
      </text>
      <text x="214.48553" y="164.96092" style={textStyle}>
        <tspan x="214.48553" y="164.96092">65</tspan>
      </text>
      <text x="149.33405" y="276.44232" style={textStyle}>
        <tspan x="149.33405" y="276.44232">71</tspan>
      </text>
      <text x="169.60339" y="271.375" style={textStyle}>
        <tspan x="169.60339" y="271.375">72</tspan>
      </text>
      <text x="187.70103" y="262.68811" style={textStyle}>
        <tspan x="187.70103" y="262.68811">73</tspan>
      </text>
      <text x="202.90305" y="244.5905" style={textStyle}>
        <tspan x="202.90305" y="244.5905">74</tspan>
      </text>
      <text x="213.76163" y="217.08217" style={textStyle}>
        <tspan x="213.76163" y="217.08217">75</tspan>
      </text>
      <text x="131.23643" y="275.71838" style={textStyle}>
        <tspan x="131.23643" y="275.71838">81</tspan>
      </text>
      <text x="109.51928" y="269.92715" style={textStyle}>
        <tspan x="109.51928" y="269.92715">82</tspan>
      </text>
      <text x="91.421661" y="259.79251" style={textStyle}>
        <tspan x="91.421661" y="259.79251">83</tspan>
      </text>
      <text x="76.94355" y="240.97096" style={textStyle}>
        <tspan x="76.94355" y="240.97096">84</tspan>
      </text>
      <text x="64.637154" y="217.08217" style={textStyle}>
        <tspan x="64.637154" y="217.08217">85</tspan>
      </text>
    </>
  )

  const AdultRender = () => (
    <>
      <AdultToothArchesViewer
        getToothRef={getToothRefInit}
      />
      <AdultIndicator/>
    </>
  )

  const KidRender = () => (
    <>
      <KidToothArchesViewer/>
      <ChildIndicator />
    </>
  )

  return (
    <>

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="289.61084"
           height="370.54398">
        <defs>
          <marker refX="0" refY="0" orient="auto" overflow="visible">
            <circle r="0.8" cy="0" cx="3"/>
            <circle r="0.8" cy="0" cx="6.5"/>
            <circle r="0.8" cy="0" cx="10"/>
          </marker>
          <marker orient="auto" refY="0" refX="0" overflow="visible">
            <path d="m5.77 0-8.65 5 0-10 8.65 5z" transform="scale(-0.2,-0.2)"
                  style={{ fillRule: 'evenodd', markerStart: 'none', strokeWidth: '1pt', stroke: '#000' }}/>
          </marker>
          <marker orient="auto" refY="0" refX="0" overflow="visible">
            <path d="M0 0 5-5-12.5 0 5 5 0 0z" transform="matrix(0.2,0,0,0.2,1.2,0)"
                  style={{ fillRule: 'evenodd', markerStart: 'none', strokeWidth: '1pt', stroke: '#000' }}/>
          </marker>
          <marker orient="auto" refY="0" refX="0" overflow="visible">
            <path d="M0 0 5-5-12.5 0 5 5 0 0z" transform="matrix(0.8,0,0,0.8,10,0)"
                  style={{ fillRule: 'evenodd', markerStart: 'none', strokeWidth: '1pt', stroke: '#000' }}/>
          </marker>
        </defs>

        {type === 'adult' ? <AdultRender /> : type === 'kid' ?  <KidRender /> : <></>}
      </svg>
    </>
  )
}

export default ToothArchesViewer