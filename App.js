import { StatusBar } from "expo-status-bar"
import React from "react"
import { StyleSheet, Text, View } from "react-native"
import Global from "./component/scrollview/scrollview"
import Test from "./component/test/test"
import { createDrawerNavigator } from "@react-navigation/drawer"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import Viewall from "./component/scrollview/viewall"
import Coninfo from "./component/scrollview/coninfo"
import Searchres from "./component/scrollview/searchres"

const Stack = createStackNavigator()

const Drawer = createDrawerNavigator()
function VocabStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='WordList'
        component={Global}
        options={{ title: "Top 25 Countries with the most cases" }}
      />
      <Stack.Screen
        name='Viewall'
        component={Viewall}
        options={{ title: "View all of the countries" }}
      />
      <Stack.Screen
        name='Coninfo'
        component={Coninfo}
        options={({ route }) => ({
          title: "Details for " + route.params.con.regionName,
        })}
      />
      <Stack.Screen
        name='Searchres'
        component={Searchres}
        options={({ route }) => ({
          title: "Results for " + route.params.search,
        })}
      />
    </Stack.Navigator>
  )
}
export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Global/>
    //   <Test/>
    //   <StatusBar style="auto" />
    // </View>

    <NavigationContainer>
      <Drawer.Navigator initialRouteName='Home'>
        <Drawer.Screen name='Home' component={VocabStack} />
        <Drawer.Screen name='Notifications' component={Test} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
