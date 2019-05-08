import React from 'react';
import "./colors.scss"

const normalStyle1 = {
  color: 'unset',
  fontWeight: 'normal'
}
const normalStyle2 = {
  color: 'rgb(255, 255, 255)',
  fontWeight: 'bold'
}
const normalStyle3 = {
  color: 'rgb(255, 255, 255)',
  fontWeight: 'normal'
}
const normalStyle4 = {
  color: 'unset',
  fontWeight: 'bold'
}

const Section = () => (
  <section className="ant-colors">
    <div className="color-palettes">

      <div className="color-palette">
        <div className="color-title">Dust Red<span className="color-description">high spirits, bold</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-red-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">red-1</span><span className="main-color-value">#fff1f0</span></div>
          <div className="main-color-item palatte-red-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">red-2</span><span className="main-color-value">#ffccc7</span></div>
          <div className="main-color-item palatte-red-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">red-3</span><span className="main-color-value">#ffa39e</span></div>
          <div className="main-color-item palatte-red-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">red-4</span><span className="main-color-value">#ff7875</span></div>
          <div className="main-color-item palatte-red-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">red-5</span><span className="main-color-value">#ff4d4f</span></div>
          <div className="main-color-item palatte-red-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">red-6</span><span className="main-color-value">#f5222d</span></div>
          <div className="main-color-item palatte-red-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">red-7</span><span className="main-color-value">#cf1322</span></div>
          <div className="main-color-item palatte-red-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">red-8</span><span className="main-color-value">#a8071a</span></div>
          <div className="main-color-item palatte-red-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">red-9</span><span className="main-color-value">#820014</span></div>
          <div className="main-color-item palatte-red-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">red-10</span><span className="main-color-value">#5c0011</span></div>
        </div>
      </div>

        <div className="color-palette">
          <div className="color-title">Volcano<span className="color-description">striking, turbulent</span></div>
          <div className="main-color">
          <div className="main-color-item palatte-volcano-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">volcano-1</span><span className="main-color-value">#fff2e8</span></div>
          <div className="main-color-item palatte-volcano-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">volcano-2</span><span className="main-color-value">#ffd8bf</span></div>
          <div className="main-color-item palatte-volcano-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">volcano-3</span><span className="main-color-value">#ffbb96</span></div>
          <div className="main-color-item palatte-volcano-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">volcano-4</span><span className="main-color-value">#ff9c6e</span></div>
          <div className="main-color-item palatte-volcano-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">volcano-5</span><span className="main-color-value">#ff7a45</span></div>
          <div className="main-color-item palatte-volcano-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">volcano-6</span><span className="main-color-value">#fa541c</span></div>
          <div className="main-color-item palatte-volcano-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">volcano-7</span><span className="main-color-value">#d4380d</span></div>
          <div className="main-color-item palatte-volcano-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">volcano-8</span><span className="main-color-value">#ad2102</span></div>
          <div className="main-color-item palatte-volcano-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">volcano-9</span><span className="main-color-value">#871400</span></div>
          <div className="main-color-item palatte-volcano-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">volcano-10</span><span className="main-color-value">#610b00</span></div>
        </div>
        </div>

      <div className="color-palette">
        <div className="color-title">Sunset Orange<span className="color-description">warm, happy</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-orange-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">orange-1</span><span className="main-color-value">#fff7e6</span></div>
          <div className="main-color-item palatte-orange-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">orange-2</span><span className="main-color-value">#ffe7ba</span></div>
          <div className="main-color-item palatte-orange-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">orange-3</span><span className="main-color-value">#ffd591</span></div>
          <div className="main-color-item palatte-orange-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">orange-4</span><span className="main-color-value">#ffc069</span></div>
          <div className="main-color-item palatte-orange-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">orange-5</span><span className="main-color-value">#ffa940</span></div>
          <div className="main-color-item palatte-orange-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">orange-6</span><span className="main-color-value">#fa8c16</span></div>
          <div className="main-color-item palatte-orange-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">orange-7</span><span className="main-color-value">#d46b08</span></div>
          <div className="main-color-item palatte-orange-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">orange-8</span><span className="main-color-value">#ad4e00</span></div>
          <div className="main-color-item palatte-orange-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">orange-9</span><span className="main-color-value">#873800</span></div>
          <div className="main-color-item palatte-orange-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">orange-10</span><span className="main-color-value">#612500</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Calendula Gold<span className="color-description">energetic, positive</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-gold-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">gold-1</span><span className="main-color-value">#fffbe6</span></div>
          <div className="main-color-item palatte-gold-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">gold-2</span><span className="main-color-value">#fff1b8</span></div>
          <div className="main-color-item palatte-gold-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">gold-3</span><span className="main-color-value">#ffe58f</span></div>
          <div className="main-color-item palatte-gold-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">gold-4</span><span className="main-color-value">#ffd666</span></div>
          <div className="main-color-item palatte-gold-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">gold-5</span><span className="main-color-value">#ffc53d</span></div>
          <div className="main-color-item palatte-gold-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">gold-6</span><span className="main-color-value">#faad14</span></div>
          <div className="main-color-item palatte-gold-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">gold-7</span><span className="main-color-value">#d48806</span></div>
          <div className="main-color-item palatte-gold-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">gold-8</span><span className="main-color-value">#ad6800</span></div>
          <div className="main-color-item palatte-gold-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">gold-9</span><span className="main-color-value">#874d00</span></div>
          <div className="main-color-item palatte-gold-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">gold-10</span><span className="main-color-value">#613400</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Sunrise Yellow<span className="color-description">born, sunshine</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-yellow-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">yellow-1</span><span className="main-color-value">#feffe6</span></div>
          <div className="main-color-item palatte-yellow-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">yellow-2</span><span className="main-color-value">#ffffb8</span></div>
          <div className="main-color-item palatte-yellow-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">yellow-3</span><span className="main-color-value">#fffb8f</span></div>
          <div className="main-color-item palatte-yellow-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">yellow-4</span><span className="main-color-value">#fff566</span></div>
          <div className="main-color-item palatte-yellow-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">yellow-5</span><span className="main-color-value">#ffec3d</span></div>
          <div className="main-color-item palatte-yellow-6" title="click to copy color" style={normalStyle4}><span className="main-color-text">yellow-6</span><span className="main-color-value">#fadb14</span></div>
          <div className="main-color-item palatte-yellow-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">yellow-7</span><span className="main-color-value">#d4b106</span></div>
          <div className="main-color-item palatte-yellow-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">yellow-8</span><span className="main-color-value">#ad8b00</span></div>
          <div className="main-color-item palatte-yellow-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">yellow-9</span><span className="main-color-value">#876800</span></div>
          <div className="main-color-item palatte-yellow-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">yellow-10</span><span className="main-color-value">#614700</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Lime<span className="color-description">nature, life</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-lime-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">lime-1</span><span className="main-color-value">#fcffe6</span></div>
          <div className="main-color-item palatte-lime-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">lime-2</span><span className="main-color-value">#f4ffb8</span></div>
          <div className="main-color-item palatte-lime-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">lime-3</span><span className="main-color-value">#eaff8f</span></div>
          <div className="main-color-item palatte-lime-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">lime-4</span><span className="main-color-value">#d3f261</span></div>
          <div className="main-color-item palatte-lime-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">lime-5</span><span className="main-color-value">#bae637</span></div>
          <div className="main-color-item palatte-lime-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">lime-6</span><span className="main-color-value">#a0d911</span></div>
          <div className="main-color-item palatte-lime-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">lime-7</span><span className="main-color-value">#7cb305</span></div>
          <div className="main-color-item palatte-lime-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">lime-8</span><span className="main-color-value">#5b8c00</span></div>
          <div className="main-color-item palatte-lime-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">lime-9</span><span className="main-color-value">#3f6600</span></div>
          <div className="main-color-item palatte-lime-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">lime-10</span><span className="main-color-value">#254000</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Polar Green<span className="color-description">healthy, creative</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-green-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">green-1</span><span className="main-color-value">#f6ffed</span></div>
          <div className="main-color-item palatte-green-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">green-2</span><span className="main-color-value">#d9f7be</span></div>
          <div className="main-color-item palatte-green-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">green-3</span><span className="main-color-value">#b7eb8f</span></div>
          <div className="main-color-item palatte-green-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">green-4</span><span className="main-color-value">#95de64</span></div>
          <div className="main-color-item palatte-green-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">green-5</span><span className="main-color-value">#73d13d</span></div>
          <div className="main-color-item palatte-green-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">green-6</span><span className="main-color-value">#52c41a</span></div>
          <div className="main-color-item palatte-green-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">green-7</span><span className="main-color-value">#389e0d</span></div>
          <div className="main-color-item palatte-green-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">green-8</span><span className="main-color-value">#237804</span></div>
          <div className="main-color-item palatte-green-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">green-9</span><span className="main-color-value">#135200</span></div>
          <div className="main-color-item palatte-green-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">green-10</span><span className="main-color-value">#092b00</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Cyan<span className="color-description">hope, strong</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-cyan-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">cyan-1</span><span className="main-color-value">#e6fffb</span></div>
          <div className="main-color-item palatte-cyan-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">cyan-2</span><span className="main-color-value">#b5f5ec</span></div>
          <div className="main-color-item palatte-cyan-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">cyan-3</span><span className="main-color-value">#87e8de</span></div>
          <div className="main-color-item palatte-cyan-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">cyan-4</span><span className="main-color-value">#5cdbd3</span></div>
          <div className="main-color-item palatte-cyan-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">cyan-5</span><span className="main-color-value">#36cfc9</span></div>
          <div className="main-color-item palatte-cyan-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">cyan-6</span><span className="main-color-value">#13c2c2</span></div>
          <div className="main-color-item palatte-cyan-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">cyan-7</span><span className="main-color-value">#08979c</span></div>
          <div className="main-color-item palatte-cyan-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">cyan-8</span><span className="main-color-value">#006d75</span></div>
          <div className="main-color-item palatte-cyan-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">cyan-9</span><span className="main-color-value">#00474f</span></div>
          <div className="main-color-item palatte-cyan-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">cyan-10</span><span className="main-color-value">#002329</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Daybreak Blue<span className="color-description">magnanimous, tech</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-blue-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">blue-1</span><span className="main-color-value">#e6f7ff</span></div>
          <div className="main-color-item palatte-blue-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">blue-2</span><span className="main-color-value">#bae7ff</span></div>
          <div className="main-color-item palatte-blue-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">blue-3</span><span className="main-color-value">#91d5ff</span></div>
          <div className="main-color-item palatte-blue-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">blue-4</span><span className="main-color-value">#69c0ff</span></div>
          <div className="main-color-item palatte-blue-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">blue-5</span><span className="main-color-value">#40a9ff</span></div>
          <div className="main-color-item palatte-blue-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">blue-6</span><span className="main-color-value">#1890ff</span></div>
          <div className="main-color-item palatte-blue-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">blue-7</span><span className="main-color-value">#096dd9</span></div>
          <div className="main-color-item palatte-blue-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">blue-8</span><span className="main-color-value">#0050b3</span></div>
          <div className="main-color-item palatte-blue-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">blue-9</span><span className="main-color-value">#003a8c</span></div>
          <div className="main-color-item palatte-blue-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">blue-10</span><span className="main-color-value">#002766</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Geek Blue<span className="color-description">explore, grit</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-geekblue-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">geekblue-1</span><span className="main-color-value">#f0f5ff</span></div>
          <div className="main-color-item palatte-geekblue-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">geekblue-2</span><span className="main-color-value">#d6e4ff</span></div>
          <div className="main-color-item palatte-geekblue-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">geekblue-3</span><span className="main-color-value">#adc6ff</span></div>
          <div className="main-color-item palatte-geekblue-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">geekblue-4</span><span className="main-color-value">#85a5ff</span></div>
          <div className="main-color-item palatte-geekblue-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">geekblue-5</span><span className="main-color-value">#597ef7</span></div>
          <div className="main-color-item palatte-geekblue-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">geekblue-6</span><span className="main-color-value">#2f54eb</span></div>
          <div className="main-color-item palatte-geekblue-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">geekblue-7</span><span className="main-color-value">#1d39c4</span></div>
          <div className="main-color-item palatte-geekblue-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">geekblue-8</span><span className="main-color-value">#10239e</span></div>
          <div className="main-color-item palatte-geekblue-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">geekblue-9</span><span className="main-color-value">#061178</span></div>
          <div className="main-color-item palatte-geekblue-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">geekblue-10</span><span className="main-color-value">#030852</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Golden Purple<span className="color-description">elegant, romantic</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-purple-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">purple-1</span><span className="main-color-value">#f9f0ff</span></div>
          <div className="main-color-item palatte-purple-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">purple-2</span><span className="main-color-value">#efdbff</span></div>
          <div className="main-color-item palatte-purple-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">purple-3</span><span className="main-color-value">#d3adf7</span></div>
          <div className="main-color-item palatte-purple-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">purple-4</span><span className="main-color-value">#b37feb</span></div>
          <div className="main-color-item palatte-purple-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">purple-5</span><span className="main-color-value">#9254de</span></div>
          <div className="main-color-item palatte-purple-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">purple-6</span><span className="main-color-value">#722ed1</span></div>
          <div className="main-color-item palatte-purple-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">purple-7</span><span className="main-color-value">#531dab</span></div>
          <div className="main-color-item palatte-purple-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">purple-8</span><span className="main-color-value">#391085</span></div>
          <div className="main-color-item palatte-purple-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">purple-9</span><span className="main-color-value">#22075e</span></div>
          <div className="main-color-item palatte-purple-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">purple-10</span><span className="main-color-value">#120338</span></div>
        </div>
      </div>

      <div className="color-palette">
        <div className="color-title">Magenta<span className="color-description">sprightly</span></div>
        <div className="main-color">
          <div className="main-color-item palatte-magenta-1" title="click to copy color" style={normalStyle1}><span className="main-color-text">magenta-1</span><span className="main-color-value">#fff0f6</span></div>
          <div className="main-color-item palatte-magenta-2" title="click to copy color" style={normalStyle1}><span className="main-color-text">magenta-2</span><span className="main-color-value">#ffd6e7</span></div>
          <div className="main-color-item palatte-magenta-3" title="click to copy color" style={normalStyle1}><span className="main-color-text">magenta-3</span><span className="main-color-value">#ffadd2</span></div>
          <div className="main-color-item palatte-magenta-4" title="click to copy color" style={normalStyle1}><span className="main-color-text">magenta-4</span><span className="main-color-value">#ff85c0</span></div>
          <div className="main-color-item palatte-magenta-5" title="click to copy color" style={normalStyle1}><span className="main-color-text">magenta-5</span><span className="main-color-value">#f759ab</span></div>
          <div className="main-color-item palatte-magenta-6" title="click to copy color" style={normalStyle2}><span className="main-color-text">magenta-6</span><span className="main-color-value">#eb2f96</span></div>
          <div className="main-color-item palatte-magenta-7" title="click to copy color" style={normalStyle3}><span className="main-color-text">magenta-7</span><span className="main-color-value">#c41d7f</span></div>
          <div className="main-color-item palatte-magenta-8" title="click to copy color" style={normalStyle3}><span className="main-color-text">magenta-8</span><span className="main-color-value">#9e1068</span></div>
          <div className="main-color-item palatte-magenta-9" title="click to copy color" style={normalStyle3}><span className="main-color-text">magenta-9</span><span className="main-color-value">#780650</span></div>
          <div className="main-color-item palatte-magenta-10" title="click to copy color" style={normalStyle3}><span className="main-color-text">magenta-10</span><span className="main-color-value">#520339</span></div>
        </div>
      </div>
    </div>
  </section>
)

export default Section;
