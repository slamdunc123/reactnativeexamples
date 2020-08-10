import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet} from 'react-native';

const Item = ({name, desc, id, deleteItem}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>
        {name} - {desc}
      </Text>
      <TouchableOpacity onPress={() => deleteItem(id)}>
        <FontAwesomeIcon icon={faTimesCircle} style={styles.icon} />
        {/* </Button> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  item: {
    backgroundColor: '#E8E8E8',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  icon: {
    color: 'red',
  },
});

export default Item;
