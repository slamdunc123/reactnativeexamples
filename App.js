// In App.js in a new project

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import axios from 'axios';
// import Home from './components/Home';
// import About from './components/About';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';

function Home({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button title="About" onPress={() => navigation.navigate('About')} />
      <Button title="Items" onPress={() => navigation.navigate('Items')} />
    </View>
  );
}

function About({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>About Screen</Text>
      <Button title="Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const deleteItem = async id => {
  console.log('deleteItem fired', id);
  try {
    await axios.delete(`http://10.0.2.2:5000/api/items/${id}`);
  } catch (err) {
    console.log(err);
  }
};

function Item({name, desc, id}) {
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
}

const Items = navigation => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const getItems = async () => {
    try {
      const results = await axios.get(
        // 'https://jsonplaceholder.typicode.com/users',
        // 'http://slamdunc.co.uk/musson-grumble-backend/categories.php',
        'http://10.0.2.2:5000/api/items',
      );
      // console.log(results.data[0]);
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
  }, []);

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

  return (
    <View>
      {console.log(items)}

      <Text>Items</Text>

      <FlatList
        data={items}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => {
          return <Item name={item.name} desc={item.desc} id={item._id} />;
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

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="Items" component={Items} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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

export default App;
