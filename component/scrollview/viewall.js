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
  ActivityIndicator,
} from "react-native"
import axios from "axios"

export default class Viewall extends Component {
  state = {
    data: [],
  }
  componentWillMount() {
    axios
      .get(`https://www.cyberpurge.com/api/covid/globalData`, {
        headers: {
          "X-Authorization": "1189c153-9d44-478b-995b-0871467df22a",
        },
      })
      .then(async (res) => {
        this.setState({ data: res.data.data })
      })
  }

  render() {
    return (
      <ScrollView>
        {this.state.data.map((item) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log(item)
                this.props.navigation.navigate("Coninfo", {
                  con: item,
                })
              }}
            >
              <View
                style={{
                  flex: 1,

                  borderColor: "black",
                  borderWidth: 0.5,
                  padding: 15,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  margin: 10,
                  //       borderWidth: 1,
                  // borderRadius: 2,
                  // borderColor: "#ddd",
                  // borderBottomWidth: 0,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 1,
                  // marginLeft: 5,
                  // marginRight: 5,
                  // marginTop: 10,
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <View style={{ left: 10 }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {item.regionName}
                    </Text>
                  </View>
                  <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Text style={{ fontWeight: "bold" }}>
                      {" "}
                      Cases: {item.casesCount}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                  <View>
                    <Text style={{ color: "#36c22f" }}>
                      Recovered: {item.recoveredCount}{" "}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                  <View>
                    <Text style={{ color: "#c22f2f" }}>
                      Deaths: {item.deceasedCount}{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
        <ActivityIndicator size='large' color='#0000ff' />
      </ScrollView>
    )
  }
}
