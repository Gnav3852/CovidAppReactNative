import React, { Component } from "react"
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
  ActivityIndicator
} from "react-native"
import axios from "axios"

import { Dimensions } from "react-native"
///

// import { LineChart, Path ,XAxis,YAxis,Grid} from 'react-native-svg-charts'

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit"

//
import * as shape from "d3-shape"
import LineCHA from "./linechart"
import NumberFormat from "react-number-format"

export default class Coninfo extends Component {
  state = {
    code: "",
  }
  // https://github.com/indiespirit/react-native-chart-kit
  //https://github.com/indiespirit/react-native-chart-kit/issues/23
  componentWillMount() {
    const { con } = this.props.route.params

    axios
      .get(`https://www.cyberpurge.com/api/covid/countries`, {
        headers: {
          "X-Authorization": "1189c153-9d44-478b-995b-0871467df22a",
        },
      })
      .then(async (res) => {
        this.setState({
          code: Object.keys(res.data.data).find(
            (key) => res.data.data[key] === con.regionName
          ),
        })
      })
  }

  render() {
    const { con } = this.props.route.params
    function thousands_separators(num) {
      var num_parts = num.toString().split(".")
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      return num_parts.join(".")
    }
    if (this.state.code === "") {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size='large' color='#0000ff' />
        </View>
      )
    } else {
      const suv = Math.round((con.recoveredCount / con.casesCount) * 100, 1)
      const still = thousands_separators(con.casesCount - con.recoveredCount)
      return (
        <View>
          <LineCHA code={this.state.code} />
          <View
            style={{ paddingTop: 55, paddingLeft: 15, flexDirection: "row" }}
          >
            {suv >= 50 ? (
                <Text>Survival Rate: {suv}%</Text>
            ) : (

                <Text>Survival Rate: {suv}%</Text>
            )}

            <Text
              style={{
                textAlign: "center",
                fontSize: 40,
                paddingLeft: 60,
                paddingTop: 30,
                color: "#c22f2f",
              }}
            >
              {still}{" "}
            </Text>
          </View>

          <Text style={{ top: -50, right: -220, fontSize: 20 }}>
            still active cases
          </Text>
          {/* <Text>dadasds</Text>
          <Text>
            {Math.round((con.recoveredCount / con.casesCount) * 100, 1)}
          </Text> */}
        </View>
      )
    }
  }
}
