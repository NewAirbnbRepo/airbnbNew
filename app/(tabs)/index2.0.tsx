import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { supabase } from '@/lib/supabase';
import { Link } from 'expo-router';
import Listings from '@/components/listings2.0';

type Place = {
  userid: any;
  title: any;
  availability_start_date: any;
  availability_end_date: any;
  price_per_year: any;
  hostPhoneNumber: any;
  shared_room_amount: any;
  images: string[];
};

export default function Example() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [saved, setSaved] = useState<number[]>([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        let { data, error } = await supabase
          .from('property')
          .select(`
            userid,
            title,
            availability_start_date,
            availability_end_date,
            price_per_year,
            hostPhoneNumber,
            shared_room_amount
          `);

        if (error) {
          console.error('Error fetching places:', error);
          return;
        }

        if (!data) {
          console.error('No data returned from the query');
          return;
        }

        const placesWithImages: Place[] = await Promise.all(
          data.map(async (place: any) => {
            const { data: imageList, error: imageError } = await supabase
              .storage
              .from('homehive')
              .list(`${place.userid}`);

              //console.log(place.userid)

            if (imageError) {
              console.error('Error fetching images:', imageError);
              return { ...place, images: [] };
            }

            const images = imageList.map((img) => {
              const { data: publicUrlData } = supabase.storage
                .from('homehive')
                .getPublicUrl(`${place.userid}/${img.name}`);
              return publicUrlData.publicUrl;
            });
            //console.log(images)

            return { ...place, images };
            
          })
        );

        setPlaces(placesWithImages);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchPlaces();
  }, []);

  const handleSave = (id: number) => {
    if (saved.includes(id)) {
      setSaved(saved.filter(val => val !== id));
    } else {
      setSaved([...saved, id]);
    }
  };

  function spellOutMonth(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', /*year: 'numeric'*/ };
    const month = date.toLocaleDateString('en-US', options);
    return month;
  }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerAction} />

          <View style={styles.headerAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <FeatherIcon
                color="#000"
                name="sliders"
                size={21} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.headerTitle}>Places to stay</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} >
        {places.map(
          ({ userid, images, title, availability_start_date, availability_end_date, price_per_year, hostPhoneNumber, shared_room_amount }) => {
            const isSaved = saved.includes(userid);

            return (
              <Link key={userid} href={{ pathname: 'details', params: { ...places[userid] } }} asChild>
              <TouchableOpacity
                key={userid}
                activeOpacity={0.9}
                delayPressIn={250.0}
                onPress={() => {
                  // handle onPress
                }}>
                <View style={styles.card}>
                  <View style={styles.cardLikeWrapper}>
                    <TouchableOpacity onPress={() => handleSave(userid)}>
                      <View style={styles.cardLike}>
                        <FontAwesome
                          color={isSaved ? '#ea266d' : '#222'}
                          name="heart"
                          solid={isSaved}
                          size={20} />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardTop}>
                    {images.length > 0 ? (
                      <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
                        {images.map((image, index) => (
                          <Image
                            key={index}
                            resizeMode='stretch'
                            style={styles.cardImg}
                            source={{ uri: image }}
                            onError={(e) => console.error('Error loading image:', e.nativeEvent.error)}
                          />
                        ))}
                      </ScrollView>
                    ) : (
                      <View style={styles.cardImgPlaceholder}>
                        <Text>No Images Available</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardTitle}>{title}</Text>

                      <FontAwesome
                        color="#ea266d"
                        name="star"
                        solid={true}
                        size={12}
                        style={{ marginBottom: 2 }} />

                      <Text style={styles.cardStars}>{hostPhoneNumber}</Text>

                      <Text style={{ color: '#595a63' }}>
                        ({shared_room_amount} reviews)
                      </Text>
                    </View>

                    <Text style={styles.cardDates}>
                      {availability_start_date ? spellOutMonth(availability_start_date) : 'N/A'} 
                      - {availability_end_date ? spellOutMonth(availability_end_date) : 'N/A'}
                    </Text>

                    <Text style={styles.cardPrice}>
                      <Text style={{ fontWeight: '600' }}>${price_per_year} </Text>
                      / year
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              </Link>
            );
          },
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTop: {
    marginHorizontal: -6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  card: {
    position: 'relative',
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 16,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardLikeWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: 12,
    right: 12,
  },
  cardLike: {
    width: 40,
    height: 40,
    borderRadius: 9999,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTop: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardImg: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 5,
  },
  cardImgPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#232425',
    marginRight: 'auto',
  },
  cardStars: {
    marginLeft: 2,
    marginRight: 4,
    fontSize: 15,
    fontWeight: '500',
    color: '#232425',
  },
  cardDates: {
    marginTop: 4,
    fontSize: 16,
    color: '#595a63',
  },
  cardPrice: {
    marginTop: 6,
    fontSize: 16,
    color: '#232425',
  },
});
