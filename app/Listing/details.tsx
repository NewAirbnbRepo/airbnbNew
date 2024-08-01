import React from 'react';
import { StyleSheet, SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import listingData from '@/components/listings2.0'

interface PlaceDetails {
    title: string;
    price_per_year: number;
    images: string[];
    shared_room_amount: number;
}

const Details: React.FC = () => {
    const { host_id} = useRoute().params as any;
    const route = useRoute();
    const navigation = useNavigation();

    // Extract parameters from route
    const params = route.params as PlaceDetails;

    // Log the parameters for debugging
    console.log('Params:', params);

    const {
        title = 'Default Title',
        price_per_year = 0,
        images = [],
        shared_room_amount = 0,
    } = params || {};

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.imageContainer}>
                    {images.length > 0 ? (
                        <Image
                            style={styles.image}
                            source={{ uri: images[0] }}
                            resizeMode='cover'
                        />
                    ) : (
                        <View style={styles.imagePlaceholder}>
                            <Text>No Images Available</Text>
                        </View>
                    )}
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.ratingContainer}>
                        <FontAwesome name="star" color="#ffcc00" size={16} />
                        <Text style={styles.rating}>4.64</Text>
                        <Text style={styles.reviewCount}>({shared_room_amount} reviews)</Text>
                    </View>

                    <Text style={styles.price}>₵{price_per_year} per academic year</Text>

                    <Text style={styles.customizeTitle}>Customize your preferences</Text>
                    <View style={styles.preferencesContainer}>
                        <Text style={styles.preference}>2 in a room</Text>
                        <Text style={styles.preference}>Medium Kitchen</Text>
                        <Text style={styles.preference}>1 Bath</Text>
                    </View>

                    <Text style={styles.featuresTitle}>Features:</Text>
                    <View style={styles.featuresContainer}>
                        <Text style={styles.feature}>✅ Great for studies</Text>
                        <Text style={styles.feature}>✅ Power plant</Text>
                        <Text style={styles.feature}>✅ Close to campus</Text>
                    </View>

                    <TouchableOpacity style={styles.reserveButton}>
                        <Text style={styles.reserveButtonText}>RESERVE</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    imageContainer: {
        height: 300,
        width: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#e0e0e0',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    detailsContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        marginTop: -20,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    rating: {
        marginLeft: 4,
        fontSize: 16,
        color: '#555',
    },
    reviewCount: {
        marginLeft: 4,
        fontSize: 14,
        color: '#888',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ea266d',
        marginVertical: 12,
    },
    customizeTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    preferencesContainer: {
        marginBottom: 16,
    },
    preference: {
        fontSize: 16,
        color: '#333',
    },
    featuresTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 16,
        marginBottom: 8,
    },
    featuresContainer: {
        marginBottom: 16,
    },
    feature: {
        fontSize: 16,
        color: '#333',
    },
    reserveButton: {
        backgroundColor: '#ea266d',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    reserveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Details;