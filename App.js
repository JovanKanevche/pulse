import React from 'react'
import { StyleSheet, View } from 'react-native'
import MainScreen from './app/screens/MainScreen'
import io from 'socket.io-client'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      pusleData: []
    }

    this.socket = io.connect('http://192.168.1.116:5050')

    this.socket.on('connect', () => {
      console.log('connected')
      // this.setState({ pusleData: [] })
    })

    this.socket.on('pulse', pusle => {
      console.log(pusle)
      this.setState({ pusleData: [...this.state.pusleData, pusle.IR] })
      console.log(this.state.pusleData)
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MainScreen data={this.state.pusleData} />
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
  }
})
