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
import BookCount from "../components/BookCount";
import CustomActionButton from "../components/CustomActionButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

class HomeScreen extends React.Component {
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
    console.log("constructor");
  }

  componentDidMount() {
    console.log("did mount");
  }
  componentDidUpdate() {
    console.log("update");
  }

  componentWillUnmount() {
    console.log("will unmount");
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
        this.hideAddNewBook();
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
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item}</Text>
      </View>
      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>Mark as read</Text>
      </CustomActionButton>
    </View>
  );

  render() {
    console.log("render");
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>
        <View style={styles.container}>
          {/* 初めはここが表示されない　追加ボタンが押された時に表示 */}
          {this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={(text) => this.setState({ textInputData: text })}
                placeholder="本のタイトルを入力してください"
                placeholderTextColor="grey"
                style={styles.textInput}
              />
              <CustomActionButton
                style={styles.checkMarkButton}
                onPress={() => this.addBook(this.state.textInputData)}
              >
                <Ionicons name="ios-checkmark" color="white" size={40} />
              </CustomActionButton>
              <CustomActionButton onPress={this.hideAddNewBook}>
                <Ionicons name="ios-close" color="white" size={40} />
              </CustomActionButton>
            </View>
          )}
          <FlatList
            data={this.state.books}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            // リストが空の場合
            ListEmptyComponent={
              <View style={styles.listEmptyComponent}>
                <Text style={styles.listEmptyComponentText}>
                  登録された本はありません
                </Text>
              </View>
            }
          />
          <CustomActionButton
            position="right"
            style={styles.addNewBookButton}
            onPress={this.showAddNewBook}
          >
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>
        </View>
        <View style={styles.footer}>
          <BookCount title="Total" count={this.state.totalCount} />
          <BookCount title="Reading" count={this.state.readingCount} />
          <BookCount title="Read" count={this.state.readCount} />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
  },
  textInputContainer: {
    height: 50,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.bgTextInput,
    paddingLeft: 5,
  },
  checkMarkButton: {
    backgroundColor: colors.bgSuccess,
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center",
  },
  listEmptyComponentText: {
    fontWeight: "bold",
  },
  listItemContainer: {
    height: 50,
    flexDirection: "row",
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25,
  },
  addNewBookButtonText: {
    color: "white",
    fontSize: 30,
  },
  markAsReadButton: {
    width: 100,
    backgroundColor: colors.bgSuccess,
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    flexDirection: "row",
  },
});
