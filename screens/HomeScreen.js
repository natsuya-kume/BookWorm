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
  Image,
  ActivityIndicator,
} from "react-native";
import * as Animatable from "react-native-animatable";
import BookCount from "../components/BookCount";
import CustomActionButton from "../components/CustomActionButton";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import * as firebase from "firebase/app";
import { snapshotToArray } from "../helpers/firebaseHelpers";
import ListItem from "../components/ListItem";
import { connect } from "react-redux";
import ListEmptyComponent from "../components/ListEmptyComponent";
class HomeScreen extends React.Component {
  constructor() {
    super();
    // 初期値の設定
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      textInputData: "",
      isAddNewBookVisible: false,
      currentUser: {},
      books: [],
      booksReading: [],
      booksRead: [],
    };
    console.log("constructor");
    this.textInputRef = null;
  }

  // 本が追加された時
  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam("user");

    // userのuidを参照
    const currentUserData = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    // booksのuidを参照
    const books = await firebase
      .database()
      .ref("books")
      .child(user.uid)
      .once("value");

    // snapshotToArrayにuidを含んだbooks情報を渡す→配列に変換
    const booksArray = snapshotToArray(books);
    this.setState({
      currentUser: currentUserData.val(),
    });
    this.props.loadBooks(booksArray.reverse());
    this.props.toggleIsLoadingBooks(false);
  };
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
  addBook = async (book) => {
    this.textInputRef.setNativeProps({ text: "" });
    this.setState({ textInputData: "" });
    try {
      this.props.toggleIsLoadingBooks(true);
      const snapshot = await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .orderByChild("name")
        .equalTo(book)
        .once("value");
      if (snapshot.exists()) {
        alert("Unable to add as book already exists");
      } else {
        const key = await firebase
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .push().key;

        const response = await firebase
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .child(key)
          .set({ name: book, read: false });
        this.props.addBook({ name: book, read: false, key: key });
        this.props.toggleIsLoadingBooks(false);
      }
    } catch (error) {
      console.log(error);
      this.props.toggleIsLoadingBooks(false);
    }
  };

  // 本を読み終えたボタン(markAsRead)が押された時の関数
  // 引数selectedBookにはFlatListで選択された個別の情報が入ってくる
  markAsRead = async (selectedBook, index) => {
    // book !== selectedBookなら残される(trueの場合)　book === selectedBookなら取り除かれる(falseの場合)
    try {
      this.props.toggleIsLoadingBooks(true);
      // readの値を変更
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: true });
      let books = this.state.books.map((book) => {
        if (book.name == selectedBook.name) {
          return { ...book, read: true };
        }
        return book;
      });
      let booksReading = this.state.booksReading.filter(
        (book) => book.name !== selectedBook.name
      );
      this.setState((prevState) => ({
        // 新しい配列
        books: books,
        booksReading: booksReading,
        booksRead: [
          ...prevState.booksRead,
          { name: selectedBook.name, read: true },
        ],
        // カウントの更新
        // readingCount: prevState.readingCount - 1,
        // readCount: prevState.readCount + 1,
      }));
      this.props.markBookAsRead(selectedBook);
      this.props.toggleIsLoadingBooks(false);
    } catch (error) {
      console.log(error);
      this.props.toggleIsLoadingBooks(false);
    }
  };

  // FlatListでbooks配列から取得した1つ1つの要素を画面に表示する関数
  // 引数には配列の個々の要素が入る
  renderItem = (item, index) => (
    <ListItem item={item}>
      {item.read ? (
        <Ionicons name="ios-checkmark" color={colors.logoColor} size={30} />
      ) : (
        <CustomActionButton
          style={styles.markAsReadButton}
          onPress={() => this.markAsRead(item, index)}
        >
          <Text style={styles.markAsReadButtonText}>Mark as read</Text>
        </CustomActionButton>
      )}
    </ListItem>
    // <View style={styles.listItemContainer}>
    //   <View style={styles.imageContainer}>
    //     <Image source={require("../assets/icon.png")} style={styles.image} />
    //   </View>
    //   <View style={styles.listItemTitleContainer}>
    //     <Text style={styles.listItemTitle}>{item.name}</Text>
    //   </View>

    // </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View> */}
        <View style={styles.container}>
          {this.props.books.isLoadingBooks && (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                elevation: 1000,
              }}
            >
              <ActivityIndicator size="large" color={colors.logoColor} />
            </View>
          )}
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={(text) => this.setState({ textInputData: text })}
              placeholder="本のタイトルを入力してください"
              placeholderTextColor={colors.txtPlaceholder}
              style={styles.textInput}
              ref={(component) => (this.textInputRef = component)}
            />
          </View>
          {/* 初めはここが表示されない　追加ボタンが押された時に表示 */}
          {/* {this.state.isAddNewBookVisible && (
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
          )} */}
          <FlatList
            data={this.props.books.books}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            // リストが空の場合
            ListEmptyComponent={
              !this.props.books.isLoadingBooks && (
                <ListEmptyComponent text="登録された本がありません" />
              )
            }
          />
          <Animatable.View
            animation={
              this.state.textInputData.length > 0
                ? "slideInRight"
                : "slideOutRight"
            }
          >
            <CustomActionButton
              position="right"
              style={styles.addNewBookButton}
              onPress={() => this.addBook(this.state.textInputData)}
            >
              <Text style={styles.addNewBookButtonText}>+</Text>
            </CustomActionButton>
          </Animatable.View>
        </View>
        {/* <View style={styles.footer}>
          <BookCount title="Total Books" count={this.state.books.length} />
          <BookCount title="Reading" count={this.state.booksReading.length} />
          <BookCount title="Read" count={this.state.booksRead.length} />
        </View> */}
        <SafeAreaView />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBooks: (books) =>
      dispatch({ type: "LOAD_BOOKS_FROM_SERVER", payload: books }),
    addBook: (book) => dispatch({ type: "ADD_BOOK", payload: book }),
    markBookAsRead: (book) =>
      dispatch({ type: "MARK_BOOK_AS_READ", payload: book }),
    toggleIsLoadingBooks: (bool) =>
      dispatch({ type: "TOGGLE_IS_LOADING_BOOKS", payload: bool }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
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
    margin: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: "transparent",
    paddingLeft: 5,
    borderColor: colors.listItemBg,
    borderBottomWidth: 5,
    fontWeight: "200",
    color: colors.txtWhite,
    fontSize: 22,
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
    minHeight: 100,
    flexDirection: "row",
    backgroundColor: colors.listItemBg,
    alignItems: "center",
    marginVertical: 5,
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35,
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  listItemTitle: {
    fontSize: 22,
    fontWeight: "100",
    color: colors.txtWhite,
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
