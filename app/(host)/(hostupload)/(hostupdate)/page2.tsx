import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Pressable, Platform, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { defaultStyles } from '@/constants/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { supabase } from '@/lib/supabase';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';



const PricingSettings = () => {
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState<String>('');
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] =useState('')

  const handlePriceChange = (text: string) => {
    // Allow only numbers and a single decimal point
    const validText = text.replace(/[^0-9.]/g, '');
    const decimalCount = (validText.match(/\./g) || []).length;

    if (decimalCount <= 1) {
      setPrice(validText);
    }
  };


  const handleUpload = async () => {
    try {
      setLoading(true);
      // Add your logic here
      const { data: {user}} = await supabase.auth.getUser();
      if(!user) { Alert.alert("User not logged in");
      return;
      }

      const { data } = await supabase.from('property')
      .select('hostid').eq('userid', user.id).single();

      const { error: updateError} = await supabase.from('property')
      .update({
        price_per_year: price,
        availability_start_date: start_date,
        availability_end_date: end_date
      }).eq('hostid', data?.hostid)

      if (updateError) {
        Alert.alert('Upload failed', updateError.message);
        setLoading(false)
      } else {
        console.log('Upload successful');
        router.navigate('./page3');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || new Date();
      setDate(currentDate);
      setShowStartDatePicker(false);
    } else {
      setShowStartDatePicker(false);
    }if (Platform.OS === "android") {
      const currentDate = selectedDate || new Date();
      setStart_date(currentDate.toDateString());
    }
  };

  const handleEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      const currentDate = selectedDate || new Date();
      setDate1(currentDate);
      setShowEndDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }if (Platform.OS === "android") {
      const currentDate = selectedDate || new Date();
      setEnd_date(currentDate.toDateString());
    }
  };
    //setShowDatePicker(false);

  const openStartDatePicker = () => {
    setShowStartDatePicker(true);
  };

  const openEndDatePicker = () => {
    setShowEndDatePicker(true);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Setting the pricing</Text>
      <Text style={styles.subtitle}>
        Increase your chances of getting booked by setting reasonable prices based on your quality and other competitive demand in the area.
      </Text>

      <Text style={styles.sectionTitle}>Annual price</Text>
      <Text style={styles.description}>
        This will be your default price for a year. You can change it anytime.
      </Text>
      <View style= {{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput style={styles.input} 
        keyboardType='decimal-pad' 
        placeholder="₵" 
        value={price !== null ? price.toString() : ''}
        onChangeText={handlePriceChange}
        />
        <Picker selectedValue="GHC" style={styles.picker}>
          <Picker.Item label="GHC" value="GHC" />
          {/* Add more currency options here */}
        </Picker>
      </View>
      <Text style={styles.tip}>Tip: ₵ 8500</Text>

      <Text style={styles.sectionTitle}>Available Start Date</Text>
      <Text style={styles.description}>
        When demand for your place is low, you may choose this price to attract more guests
      </Text>
      {showStartDatePicker &&<DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleStartDateChange}
          style={styles.datePicker}
        />}
        {showStartDatePicker && Platform.OS === 'ios' &&
        <View style= {{flexDirection: 'row', justifyContent: 'space-around'}}>
          
        </View>}
      <Pressable onPress={openStartDatePicker}>
        <TextInput style={styles.input} 
        editable={false} 
        placeholder="date" 
        value={start_date} 
        onChangeText={setStart_date}
        onFocus={openStartDatePicker}
        />
      </Pressable>
      <Text style={styles.tip}>Tip: ₵ 8000</Text>

      <Text style={styles.sectionTitle}>End date</Text>
      <Text style={styles.description}>
        If demand for your place is high, set the highest price you’re willing to charge
      </Text>
      {showEndDatePicker &&<DateTimePicker
          value={date1}
          mode="date"
          display="spinner"
          onChange={handleEndDateChange}
        />}

      <Pressable onPress={openEndDatePicker}>
        <TextInput style={styles.input} 
        editable={false} 
        placeholder="date" 
        value={end_date} 
        onChangeText={setEnd_date}
        onFocus={openEndDatePicker}
        />
      </Pressable>
      <Text style={styles.tip}>Tip: ₵ 9000</Text>

      <Text style={styles.footerText}>You’re always in control of the pricing you set!</Text>
      <Text style={styles.link}>Use base price only</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, backgroundColor: '#fff' }]} onPress={() => router.navigate('./page1')} >
            <Text style={[defaultStyles.btnText, {color: '#044D5B'}]}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140,}]} onPress={handleUpload/*() => router.navigate('./page3')*/} >
            <Text style={defaultStyles.btnText}> NEXT</Text>
          </TouchableOpacity>
      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
    paddingRight: 20
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 20,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  description: {
    fontSize: 18,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 5,
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    width: '40%',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  tip: {
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 15,
    color: 'gray',
  },
  picker: {
    bottom: 5,
    height: 50,
    width: '40%',
    marginBottom: 15,
  },
  footerText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'gray',
  },
  link: {
    fontSize: 18,
    color: 'blue',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    marginBottom: 50,
  },
  datePicker: {
    height: 120,
    marginTop: -10
  }
});

export default PricingSettings;
