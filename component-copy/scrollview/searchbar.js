import React, { Component } from "react"
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
} from "react-native"

export default class Searchbox extends Component {
  state = {
    text: "",
    // curletter: [],
    // allwords: [],
  }
  setText = (text) => {
    this.setState({ text })
  }

  onSubmit = () => {
    // Object.keys(this.props.data).map((letter) => {
    //   return this.props.data[letter].map((word) => {
    //     if (this.state.text != null) {
    //       //where its non case sensitive
    //       const word2 = word.word.toLowerCase()
    //       if (word2.includes(this.state.text.toLowerCase())) {
    //         this.state.curletter.push(letter)
    //         this.state.allwords.push(word)
    //       }
    //     }
    //   })
    // })
    this.props.navigation.navigate("Searchres", {
      search: this.state.text,
      data:this.props.data
    })
  }

  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder='Type here !'
          onChangeText={(text) => this.setText(text)}
          defaultValue={this.state.text}
          onSubmitEditing={() => this.onSubmit()}
          // Object.keys(this.props.data).map((letter) => {
          //   return this.props.data[letter].map((word) => {
          //     if (this.state.text != null) {
          //       //where its non case sensitive
          //       const word2 = word.word.toLowerCase()
          //       if (word2.includes(this.state.text.toLowerCase())) {
          //         this.state.curletter.push(letter)
          //         this.state.allwords.push(word)
          //       }
          //     }
          //   })
          // })
          // this.props.navigation.navigate("WordSearch", {
          //   letters: this.state.curletter,
          //   words: this.state.allwords,
          //   text: this.state.text,
          //   vocab: this.props.data,
          // })
        />
      </View>
    )
  }
}
