import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  StatusBar
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { fetchItems } from '../state/slices/itemSlice';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

interface Item {
  userId: number;
  id: number;
  title: string;
  body: string;
}


const HomeScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.items.data || []);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => navigation.replace('Login')
      }
    ]);
  };

 const filteredItems = (items ?? []).filter((item: { title: string }) =>
  item.title.toLowerCase().includes(searchQuery.toLowerCase())
);

  const renderItem = ({ item }: { item: Item } ) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', { item })}
      style={styles.cardContainer}
    >
      <View style={styles.cardHeader}>
        <Feather name="user" size={20} color="#64748b" />
        <Text style={styles.userText}> User 1</Text>
        <Text style={styles.timeText}>2h ago</Text>
      </View>
      <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
      <Text style={styles.cardBody} numberOfLines={2}>{item.body}</Text>
      <View style={styles.cardFooter}>
        <Text style={styles.footerText}>33 likes</Text>
        <Text style={styles.footerText}>7 comments</Text>
        <Feather name="chevron-right" size={20} color="#64748b" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#a18cd1", "#fbc2eb"]} style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <View style={{width:'50%', flexDirection:"row", alignItems:"center"}}>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}> 
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.username}>admin</Text>
          </View>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={handleLogout}>
              <Feather name="log-out" size={20} color="#64748b" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
        <TextInput
          placeholder="Search posts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
          placeholderTextColor="#94a3b8"
        />
        <View style={styles.recentPostsRow}>
          <Text style={styles.recentPosts}>Posts</Text>
        </View>
      </LinearGradient>

      <View style={{height:700}}>
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc'},
  headerContainer: {
    padding: 20,
     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 ,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f472b6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18,
  },
  greeting: { color: '#0f172a', fontSize: 14 },
  username: { color: '#0f172a', fontWeight: 'bold', fontSize: 16 },
  headerIcons: { flexDirection: 'row', gap: 12 },
  icon: { marginLeft: 10 },
  searchInput: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 12,
    fontSize: 14,
  },
  recentPostsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  recentPosts: { fontSize: 18, fontWeight: 'bold', color: '#0f172a' },
  viewAll: { color: '#64748b' },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userText: {
    marginLeft: 6,
    color: '#475569',
    fontSize: 14,
  },
  timeText: {
    marginLeft: 'auto',
    color: '#94a3b8',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardBody: {
    color: '#64748b',
    fontSize: 14,
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 12,
  },
});