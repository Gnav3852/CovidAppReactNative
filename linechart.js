import React from "react"
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  VirtualizedList,
  Button,
} from "react-native"
import * as shape from "d3-shape"
import { Dimensions } from "react-native"
import axios from "axios"

export default class LineCHA extends React.PureComponent {
  state = {
    data: {
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [20, 45, 28, 80, 99, 43],
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
        {
          data: [2, 4, 6, 8, 8, 2],
          strokeWidth: 2,
          color: (opacity = 1) => `rgba(0,0,102, ${opacity})`, // optional
        },
      ],
      legend: ["Rainy Days"], // optional
    },
    counter: 1,
  }
  componentWillMount() {
    // this.state.datasets = []
    axios
      .get(
        `https://www.cyberpurge.com/api/covid/weeklyRegionalTotalCases/${this.props.code}`,
        {
          headers: {
            "X-Authorization": "1189c153-9d44-478b-995b-0871467df22a",
          },
        }
      )
      .then(async (res) => {
        console.log(res.data.data)
        var dat = []
        var label = []
        for (var date in res.data.data) {
          dat.push(res.data.data[date])
          label.push(date)

          console.log(label)
        }
        this.state.data.labels = label
        this.state.data.datasets = [
          {
            data: dat,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2, // optional
          },
        ]

        this.setState({ counter: this.state.counter + 1 })
        console.log(this.state)
      })
  }
  render() {
    const contentInset = { top: 20, bottom: 20 }

    if (this.state.counter > 1) {
      return (
        <View style={{ height: 200, flexDirection: "row" }}>
          <LineChart
            data={this.state.data}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            bezier
          />

          <Text>{this.props.code}</Text>
        </View>
      )
    } else {
      return (
        <View>
          <Text>LADJGN</Text>
        </View>
      )
    }
  }
}
