import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Graph from './app/components/Graph'
import io from 'socket.io-client'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      IRData: [],
      RData: [],
      temp: 0,
      connected: false
    }
    this.socket = io.connect('http://192.168.1.116:5050') // ip

    this.socket.on('connect', () => {
      this.setState({ connected: true })
    })

    this.socket.on('pulse', ({ IR, R }) => {
      this.setState({
        IRData: [...this.state.IRData, IR],
        RData: [...this.state.RData, R]
      })
    })

    this.socket.on('temp', ({ temp }) => {
      this.setState({ temp })
    })
  }

  render() {
    return this.state.connected ? (
      <View style={styles.container}>
        <Text style={styles.text}>IR</Text>
        <Graph data={this.state.IRData} />
        <Text style={styles.text}>R</Text>
        <Graph data={this.state.IRData} />
        <Text style={styles.text}>Temp: {this.state.temp}</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <Text style={styles.text}>Device not connected to rasberry pi</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 18
  }
})
