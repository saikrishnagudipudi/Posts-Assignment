import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';

const HEADER_MAX_HEIGHT = 140;
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 44;

const DetailScreen = ({ route, navigation }: any) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <LinearGradient colors={['#a18cd1', '#fbc2eb']} style={styles.gradient}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Feather name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Post Details</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.scrollContent}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Feather name="user" size={20} color="#64748b" />
            <Text style={styles.userText}>User 1</Text>
            <Text style={styles.timeText}>2h ago</Text>
          </View>

          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.body}>{item.body}</Text>

          <View style={styles.cardFooter}>
            <Text style={styles.footerText}>33 likes</Text>
            <Text style={styles.footerText}>7 comments</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailScreen;

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    width,

  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContent: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
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
    marginBottom: 12,
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  body: {
    color: '#64748b',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    color: '#94a3b8',
    fontSize: 13,
  },
});
