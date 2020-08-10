import React, {useState, useEffect} from 'react';
import {View, Text, Button, FlatList, TextInput} from 'react-native';
import Item from './Item';
import axios from 'axios';

const Items = navigation => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const getItems = async () => {
    try {
      const results = await axios.get('http://10.0.2.2:5000/api/items');
      setItems(results.data);

      if (!items) {
        return null;
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getItems();
  }, [getItems]);

  const handleNameChange = event => {
    setName(event.nativeEvent.text);
  };
  const handleDescChange = event => {
    setDesc(event.nativeEvent.text);
  };

  // create item
  const createItem = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      name: name,
      desc: desc,
    };
    console.warn(body);
    try {
      await axios.post('http://10.0.2.2:5000/api/items', body, config);
    } catch (err) {
      console.log(err);
    }
  };

  // delete item
  const deleteItem = async id => {
    console.log('deleteItem fired', id);
    try {
      await axios.delete(`http://10.0.2.2:5000/api/items/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => {
          return (
            <Item
              name={item.name}
              desc={item.desc}
              id={item._id}
              deleteItem={deleteItem}
            />
          );
        }}
      />
      <TextInput
        placeholder="item name"
        type="text"
        onChange={handleNameChange}
      />
      <TextInput
        placeholder="item description"
        type="text"
        onChange={handleDescChange}
      />
      <Button title="Add Item" onPress={createItem} />
    </View>
  );
};

export default Items;
