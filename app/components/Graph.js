import React from 'react'
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'
import { View, Text } from 'react-native'

const Empty = () => (
  <View style={{ height: 200, justifyContent: 'center' }}>
    <Text style={{ fontSize: 16, color: 'gray' }}>No data recieved</Text>
  </View>
)

const contentInset = { top: 20, bottom: 20 }

export default ({ data }) =>
  data.length > 0 ? (
    <View style={{ height: 200, flexDirection: 'row', padding: 16 }}>
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{
          fill: 'grey',
          fontSize: 10
        }}
        numberOfTicks={10}
      />
      <LineChart
        style={{ flex: 1, width: '100%' }}
        data={data}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={contentInset}
      >
        <Grid />
      </LineChart>
    </View>
  ) : (
    <Empty />
  )
