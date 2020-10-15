import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import BookCount from "./components/BookCount";
import { Ionicons } from "@expo/vector-icons";

class App extends React.Component {
  constructor() {
    super();
    // 初期値の設定
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInputData: "",
      books: [],
    };
  }

  // 本の追加ボタンを出現させる関数
  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  // 本の追加ボタンを消す関数
  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  // 本の追加ボタン（チェックマーク）を押したときの関数
  // 引数bookにはテキストインプットに入力された値が入る
  addBook = (book) => {
    this.setState(
      (state, props) => ({
        // 本の情報を更新
        books: [...state.books, book],
        // カウントの変更
        totalCount: state.totalCount + 1,
        readingCount: state.readingCount + 1,
      }),
      // 上記の後に実行
      () => {
        console.log(this.state.books);
      }
    );
  };

  // 本を読み終えたボタン(markAsRead)が押された時の関数
  // 引数selectedBookにはFlatListで選択された個別の情報が入ってくる
  markAsRead = (selectedBook, index) => {
    // book !== selectedBookなら残される(trueの場合)　book === selectedBookなら取り除かれる(falseの場合)
    let newList = this.state.books.filter((book) => book !== selectedBook);

    this.setState((prevState) => ({
      // 新しい配列
      books: newList,
      // カウントの更新
      readingCount: prevState.readingCount - 1,
      readCount: prevState.readCount + 1,
    }));
  };

  // FlatListでbooks配列から取得した1つ1つの要素を画面に表示する関数
  // 引数には配列の個々の要素が入る
  renderItem = (item, index) => (
    <View style={{ height: 50, flexDirection: "row" }}>
      <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
        <Text>{item}</Text>
      </View>
      <TouchableOpacity onPress={() => this.markAsRead(item, index)}>
        <View
          style={{
            width: 100,
            height: 50,
            backgroundColor: "#a5deba",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Mark as read
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView />
        <View
          style={{
            height: 70,
            borderBottomWidth: 0.5,
            borderBottomColor: "#E9E9E9",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24 }}>Book Worm</Text>
        </View>
        <View style={{ flex: 1 }}>
          {/* 初めはここが表示されない　追加ボタンが押された時に表示 */}
          {this.state.isAddNewBookVisible && (
            <View style={{ height: 50, flexDirection: "row" }}>
              <TextInput
                onChangeText={(text) => this.setState({ textInputData: text })}
                placeholder="本のタイトルを入力してください"
                placeholderTextColor="grey"
                style={{ flex: 1, backgroundColor: "#ececec", paddingLeft: 5 }}
              />
              <TouchableOpacity
                onPress={() => this.addBook(this.state.textInputData)}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#a5deba",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="ios-checkmark" color="white" size={40} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.hideAddNewBook}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#deada5",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Ionicons name="ios-close" color="white" size={40} />
                </View>
              </TouchableOpacity>
            </View>
          )}
          <FlatList
            data={this.state.books}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            // リストが空の場合
            ListEmptyComponent={
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ fontWeight: "bold" }}>
                  登録された本はありません
                </Text>
              </View>
            }
          />
          <TouchableOpacity
            onPress={this.showAddNewBook}
            style={{ position: "absolute", bottom: 20, right: 20 }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "#AAD1E6",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 30 }}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 70,
            borderTopWidth: 0.5,
            borderTopColor: "#E9E9E9",
            flexDirection: "row",
          }}
        >
          <BookCount title="Total" count={this.state.totalCount} />
          <BookCount title="Reading" count={this.state.readingCount} />
          <BookCount title="Read" count={this.state.readCount} />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "red",
  },
});
