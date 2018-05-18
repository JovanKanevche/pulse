import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'
import { View, Text } from 'react-native'

export default ({ data }) => (
  <LineChart
    style={{ height: 200, width: '100%' }}
    data={data}
    svg={{ stroke: 'rgb(134, 65, 244)' }}
    contentInset={{ top: 20, bottom: 20 }}
  >
    <Grid />
  </LineChart>
)
