import React from 'react'
import PropTypes from 'prop-types'
import Chart from 'react-google-charts'

import styles from './styles.scss'

const DonutChart = ({ data, height, width, title }) => (
  <Chart
    className={styles.chart}
    width={height}
    height={width}
    chartType="PieChart"
    loader={<div>Loading Chart</div>}
    data={data}
    options={{
      title: `Votes for ${title}`,
      pieHole: 0.4,
    }}
  />
)

DonutChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  title: PropTypes.string.isRequired,
}

DonutChart.defaultProps = {
  height: '600px',
  width: '600px',
}
export default React.memo(DonutChart)
