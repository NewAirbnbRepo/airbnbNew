import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { defaultStyles } from '@/constants/Styles'; // Ensure to define your default styles

const Bookings = () => {
  // Placeholder data for booked items (replace with actual data)
  // just an example
  const bookedItems = [
    { id: 1, title: 'Luxury Villa in Bali', checkIn: '2024-07-01', checkOut: '2024-07-07' },
    { id: 2, title: 'Cozy Apartment in Paris', checkIn: '2024-08-15', checkOut: '2024-08-20' },
  ];

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>My Bookings</Text>
      </View>
      <View style={styles.content}>
        {bookedItems.map((item) => (
          <View key={item.id} style={styles.bookingItem}>
            <Text style={styles.bookingTitle}>{item.title}</Text>
            <Text>Check-in: {item.checkIn}</Text>
            <Text>Check-out: {item.checkOut}</Text>
          </View>
        ))}
        {bookedItems.length === 0 && (
          <Text style={styles.noBookingsText}>You have no bookings yet.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
  },
  header: {
    fontFamily: 'mon-b',
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  bookingItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  bookingTitle: {
    fontFamily: 'mon-sb',
    fontSize: 18,
    marginBottom: 8,
  },
  noBookingsText: {
    fontFamily: 'mon',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
});

export default Bookings;
