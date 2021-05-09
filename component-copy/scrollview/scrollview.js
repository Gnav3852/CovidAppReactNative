import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from "react-native"
import axios from "axios"
import Searchbox from "./searchbar"

export default class Global extends React.Component {
  state = {
    data: [],
    fulldata: [],
  }
  componentWillMount() {
    axios
      .get(`https://www.cyberpurge.com/api/covid/globalData`, {
        headers: {
          "X-Authorization": "1189c153-9d44-478b-995b-0871467df22a",
        },
      })
      .then(async (res) => {
        this.setState({ fulldata: res.data.data })
        // this.setState({ data: res.data.data.splice(0, 25) })
        console.log(res.data.data)

        // console.log("dasads", this.state.data)
      })
  }
  render() {
    // _renderItem = (item) => <MyListItem item={item} />
    function Item({ item }) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("Coninfo", {
              con: this.props.item.regionName,
            })
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderRadius: 2,
              borderColor: "#ddd",
              borderBottomWidth: 0,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 1,
              marginLeft: 5,
              marginRight: 5,
              marginTop: 10,
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ left: 10 }}>
                <Text style={{ fontWeight: "bold" }}>{item.regionName}</Text>
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
    }

    if (this.state.fulldata) {
      const data = this.state.fulldata.splice(0, 25)
      return (
        <View>
          <Button
            color='grey'
            title='View all countries'
            onPress={() => {
              this.props.navigation.navigate("Viewall")
            }}
          />
          <Searchbox
            navigation={this.props.navigation}
            data={this.state.fulldata}
          />
          <ScrollView style={{ backgroundColor: "grey" }}>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
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
                      backgroundColor: "white",
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
                          Cases: {item.casesCount}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                      <View>
                        <Text style={{ color: "#36c22f" }}>
                          Recovered: {item.recoveredCount}
                        </Text>
                      </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                      <View>
                        <Text style={{ color: "#c22f2f" }}>
                          Deaths: {item.deceasedCount}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              // renderItem={({ item }) => <MyListItem item={item} />}
              keyExtractor={(item) => item}
            />
            <View style={{ flex: 1, flexDirection: "row" }}>
              {/* <Text>
                Can't find a country you are looking for try searching
              </Text> */}
              {/* <Button
                title='View all countries'
                onPress={() => {
                  this.props.navigation.navigate("Viewall")
                }}
              /> */}
            </View>
          </ScrollView>
        </View>
      )
    } else {
      return (
        <View>
          <Text>dsad</Text>
        </View>
      )
    }
  }
}

// import React, { Component } from "react"
// import {
//   StyleSheet,
//   Text,
//   View,
//   ScrollView,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   VirtualizedList,
//   Button,
// } from "react-native"
// import axios from "axios"

// class MyListItem extends React.PureComponent {
//   render() {
//     return (
//       <TouchableOpacity
// onPress={() => {
//   this.props.navigation.navigate("Coninfo", {
//     con: this.props.item.regionName,
//   })
// }}
//       >
//         <View
//           style={{
//             flex: 1,
//             paddingTop: 10,
//             paddingRight: 20,
//             borderColor: "black",
//             borderWidth: 0.5,
//             paddingBottom: 10,
//           }}
//         >
//           <View style={{ flex: 1, flexDirection: "row" }}>
//             <View style={{ left: 10 }}>
//               <Text style={{ fontWeight: "bold" }}>
//                 {this.props.item.regionName}
//               </Text>
//             </View>
//             <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//               <Text style={{ fontWeight: "bold" }}>
//                 {" "}
//                 Cases: {this.props.item.casesCount}
//               </Text>
//             </View>
//           </View>
//           <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//             <View>
//               <Text style={{ color: "#36c22f" }}>
//                 Recovered: {this.props.item.recoveredCount}{" "}
//               </Text>
//             </View>
//           </View>
//           <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//             <View>
//               <Text style={{ color: "#c22f2f" }}>
//                 Deaths: {this.props.item.deceasedCount}{" "}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//     )
//   }
// }

// export default class Global extends React.Component {
//   state = {
//     data: [],
//   }
//   componentWillMount() {
//     axios
//       .get(`https://www.cyberpurge.com/api/covid/globalData`, {
//         headers: {
//           "X-Authorization": "1189c153-9d44-478b-995b-0871467df22a",
//         },
//       })
//       .then(async (res) => {
//         this.setState({ data: res.data.data.splice(0, 25) })
//         console.log("dasads", this.state.data)
//       })
//   }
//   _renderItem = ({ item }) => <MyListItem item={item} />
//   render() {
//     function Item({ item }) {
//       return (
//         <TouchableOpacity
//           onPress={() => {
//             console.log("das")
//           }}
//         >
//           <View
//             style={{
//               flex: 1,
//               paddingTop: 10,
//               paddingRight: 20,
//               borderColor: "black",
//               borderWidth: 0.5,
//               paddingBottom: 10,
//             }}
//           >
//             <View style={{ flex: 1, flexDirection: "row" }}>
//               <View style={{ left: 10 }}>
//                 <Text style={{ fontWeight: "bold" }}>{item.regionName}</Text>
//               </View>
//               <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//                 <Text style={{ fontWeight: "bold" }}>
//                   {" "}
//                   Cases: {item.casesCount}
//                 </Text>
//               </View>
//             </View>
//             <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//               <View>
//                 <Text style={{ color: "#36c22f" }}>
//                   Recovered: {item.recoveredCount}{" "}
//                 </Text>
//               </View>
//             </View>
//             <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//               <View>
//                 <Text style={{ color: "#c22f2f" }}>
//                   Deaths: {item.deceasedCount}{" "}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         </TouchableOpacity>
//       )
//     }

//     if (this.state.data) {
//       return (
//         <ScrollView>
//           {/* {this.state.data.map((item) => {
//             return (
//               <TouchableOpacity
//                 onPress={() => {
//                   console.log("das")
//                 }}
//               >
//                 <View
//                   style={{
//                     flex: 1,
//                     paddingTop: 10,
//                     paddingRight: 20,
//                     borderColor: "black",
//                     borderWidth: 0.5,
//                     paddingBottom: 10,
//                   }}
//                 >
//                   <View style={{ flex: 1, flexDirection: "row" }}>
//                     <View style={{ left: 10 }}>
//                       <Text style={{ fontWeight: "bold" }}>
//                         {item.regionName}
//                       </Text>
//                     </View>
//                     <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//                       <Text style={{ fontWeight: "bold" }}>
//                         {" "}
//                         Cases: {item.casesCount}
//                       </Text>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//                     <View>
//                       <Text style={{ color: "#36c22f" }}>
//                         Recovered: {item.recoveredCount}{" "}
//                       </Text>
//                     </View>
//                   </View>
//                   <View style={{ flex: 1, flexDirection: "row-reverse" }}>
//                     <View>
//                       <Text style={{ color: "#c22f2f" }}>
//                         Deaths: {item.deceasedCount}{" "}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             )
//           })} */}
//           <FlatList
//             data={this.state.data}
//             // renderItem={({ item }) => <Item item={item} />}
//             renderItem={this._renderItem}
//             keyExtractor={(item) => item}
//           />
// <View style={{ flex: 1, flexDirection: "row" }}>
//   <Text>Can't find a country you are looking for try searching</Text>
//   <Button
//     title='View all countries'
//     onPress={() => {
//       this.props.navigation.navigate("Viewall")
//     }}
//   />
// </View>
//         </ScrollView>
//       )
//     } else {
//       return (
//         <View>
//           <Text>dsad</Text>
//         </View>
//       )
//     }
//   }
// }
