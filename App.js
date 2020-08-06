// In App.js in a new project

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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

function Item({title, id}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={() => deleteItem(id)}>
        <FontAwesomeIcon icon={faTimesCircle} style={styles.icon} />
        {/* </Button> */}
      </TouchableOpacity>
    </View>
  );
}

const Items = navigation => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, [getItems, items]);

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

  // create item
  const createItem = async () => {
    console.log('createItem fired');
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const getRandomNumber = () => {
      const num = Math.floor(Math.random() * 100 + 1);
      return num;
    };
    const body = {
      name: 'item ' + getRandomNumber(),
      desc: 'item desc',
    };

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
      <Button title="Add" onPress={createItem} />
      <FlatList
        data={items}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item}) => {
          return <Item title={item.name} id={item._id} />;
        }}
      />
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
