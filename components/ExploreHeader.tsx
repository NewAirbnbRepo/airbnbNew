import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { defaultStyles } from '@/constants/Styles';

const categories = [
  {
    name: 'Trending',
    icon: 'local-fire-department',
  },
  {
    name: 'Homestels',
    icon: 'home',
  },
  {
    name: 'Hostels',
    icon: 'apartment',
  },
  {
    name: 'Campus',
    icon: 'school',
  },
];

interface Props {
  onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(1);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 5, animated: true });
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView style={defaultStyles.container} >
      <View style={styles.container}>
         <View style={styles.header}>
          <Image source={require('@/assets/images/knust-logo.png')} style={styles.logo} />
          <Text style={styles.headerText}>KWAME NKRUMAH UNIVERSITY OF SCIENCE & TECHNOLOGY</Text>
        </View>
        <View style={styles.actionRow}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity>
              <View style={styles.searchBtn}>
                <Ionicons name="search" size={24} />
                <View>
                  <Text style={{ fontFamily: 'mon-sb' }}>Where to?</Text>
                  <Text style={{ color: Colors.grey, fontFamily: 'mon' }}>Anywhere · Any week</Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            gap: 45,
            paddingHorizontal: 10,
          }}>
          {categories.map((item, index) => (
            <TouchableOpacity
              onPress={() => selectCategory(index)}
              key={index}
              ref={(el) => itemsRef.current[index] = el}
              style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
              >
              <MaterialIcons
                name={item.icon as any}
                size={24}
                color={activeIndex === index ? '#000' : Colors.grey}
              />
              
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText} >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 5,
    height: 193,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 15,
    },
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    top: 15,
    marginBottom: 15,
  },
  logo: {
    left: 1,
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 15,
    fontFamily: 'mon-b',
    textAlign: 'center',
  },
  searchBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    gap: 8,
    padding: 14,
    alignItems: 'center',
    width: 280,
    height: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#c2c2c2',
    borderRadius: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 5,
    },
  },
  filterBtn: {
    padding: 13,
    borderWidth: 1,
    borderColor: '#A2A0A2',
    borderRadius: 24,
  },
  categoryText: {
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'mon-sb',
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'mon-sb',
    color: '#000',
  },
  categoriesBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
  },
  categoriesBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
    paddingBottom: 8,
  },
});

export default ExploreHeader;
