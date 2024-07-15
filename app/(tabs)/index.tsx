import { View } from 'react-native';
import React, { useMemo, useState } from 'react';
import listingsData from '@/assets/data/airbnb-listings.json';
import Listings from '@/components/Listings';
import { Stack } from 'expo-router';
import ExploreHeader from '@/components/ExploreHeader';

const Page = () => {
  const items = useMemo(() => listingsData as any, []);
  const [category, setCategory] = useState('Tiny homes');

  const onDataChanged = (category: string) => {
    setCategory(category);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />
      <Listings listings={items} category={category} />
    </View>
  );
};

export default Page;
