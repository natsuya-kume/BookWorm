import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import colors from "../../assets/colors";
import ListItem from "../../components/ListItem";
import ListEmptyComponent from "../../components/ListEmptyComponent";

import { connect } from "react-redux";

class BooksReadingScreen extends React.Component {
  renderItem = (item) => {
    return <ListItem item={item} />;
  };
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.books.booksReading}
          renderItem={({ item }, index) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          // リストが空の場合
          ListEmptyComponent={
            <ListEmptyComponent text="現在読んでいる本はありません" />
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

export default connect(mapStateToProps)(BooksReadingScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center",
  },
  listEmptyComponentText: {
    fontWeight: "bold",
  },
});
