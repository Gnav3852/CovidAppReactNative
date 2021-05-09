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
  ActivityIndicator,
} from "react-native"
import * as shape from "d3-shape"
import { Dimensions } from "react-native"
import axios from "axios"

export default class LineCHA extends React.PureComponent {
  state = {
    data: {
      labels: [],
      datasets: [],
      legend: ["Cases", "Recovered", "Deceased"],
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
        // console.log(res.data["data"], isNull(res.data["data"]))
        if (
          Object.keys(res.data["data"]).length === 0 &&
          res.data["data"].constructor === Object
        ) {
          console.log("dads")
          this.setState({ counter: -1 })
          this.state.counter === -1
        }
        console.log(
          Object.keys(res.data["data"]).length === 0 &&
            res.data["data"].constructor === Object
        )
        // if(res.data.data==={}){
        //   console.log('dasads')
        // }
        var dat = []
        var label = []
        for (var date in res.data.data) {
          dat.push(res.data.data[date])
          label.push(date)
        }

        this.state.data.labels = label
        // this.state.data.datasets = [
        //   {
        //     data: dat,
        //     color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        //     strokeWidth: 2, // optional
        //   },
        // ]
        axios
          .get(
            `https://www.cyberpurge.com/api/covid/weeklyRegionalRecoverdCases/${this.props.code}`,
            {
              headers: {
                "X-Authorization": "1189c153-9d44-478b-995b-0871467df22a",
              },
            }
          )
          .then(async (res) => {
            var dat2 = []

            for (var date in res.data.data) {
              dat2.push(res.data.data[date])
            }

            axios
              .get(
                `https://www.cyberpurge.com/api/covid/weeklyRegionalDeceasedCases/${this.props.code}`,
                {
                  headers: {
                    "X-Authorization": "1189c153-9d44-478b-995b-0871467df22a",
                  },
                }
              )
              .then(async (res) => {
                var dat3 = []

                for (var date in res.data.data) {
                  dat3.push(res.data.data[date])
                }

                this.state.data.datasets = [
                  {
                    data: dat,
                    color: (opacity = 1) => `rgba(0,0,0,${opacity})`, // optional
                    strokeWidth: 2, // optional
                  },
                  {
                    data: dat2,
                    color: (opacity = 1) => `rgba(127,211,34,${opacity})`, // optional
                    strokeWidth: 2, // optional
                  },
                  {
                    data: dat3,
                    color: (opacity = 1) => `rgba(226,41,25,${opacity})`, // optional
                    strokeWidth: 2, // optional
                  },
                ]

                this.setState({ counter: this.state.counter + 1 })
              })
          })
      })
  }
  render() {
    const contentInset = { top: 20, bottom: 20 }

    if (this.state.counter > 1) {
      return (
        <View
          style={{
            height: 200,
            flexDirection: "row",
            // transform: [{rotateY: '180deg'},{ scaleX: -1 }]
          }}
        >
          <LineChart
            data={this.state.data}
            width={Dimensions.get("window").width - 16}
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#efefef",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            onDataPointClick={(e)=>{console.log(e.getColor(),e.value)}}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            bezier
          />
        </View>
      )
    } else {
      console.log(this.state.counter)
      console.log(this.state.data.labels)
      return (
        <View style={{ justifyContent: "center", paddingTop: 70 }}>
          <Text style={{ paddingLeft: 170, justifyContent: "center" }}>
            NO DATA FOUND
          </Text>
        </View>
      )
    }
  }
}
