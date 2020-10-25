import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import colors from "../../assets/colors";
import ListItem from "../../components/ListItem";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import { connect } from "react-redux";

class BooksReadScreen extends React.Component {
  renderItem = (item) => {
    return <ListItem item={item} />;
  };
  render() {
    return (
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
        <FlatList
          data={this.props.books.booksRead}
          renderItem={({ item }, index) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          // リストが空の場合
          ListEmptyComponent={
            !this.props.books.isLoadingBooks && (
              <ListEmptyComponent text="読み終えた本はありません" />
            )
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(BooksReadScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
});
