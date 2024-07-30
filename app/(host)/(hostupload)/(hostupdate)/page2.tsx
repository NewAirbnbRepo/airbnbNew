import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, TouchableOpacity, Pressable, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { defaultStyles } from '@/constants/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';



const PricingSettings = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [start_date, setStart_date] = useState('')
  const [end_date, setEnd_date] =useState('')

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if(event.type == "set"){
    const currentDate = selectedDate || new Date;
    setDate(currentDate);
    //setShowDatePicker(false);

    if (Platform.OS === "android") {
      toggleDatepicker();
      //toggleDatepicker1();
      setStart_date(currentDate.toDateString());
      //setEnd_date (currentDate.toDateString());
    }
    }else {
    toggleDatepicker();
    }
  };

  const toggleDatepicker = () =>{
    setShowDatePicker(!showDatePicker);
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
      <TextInput style={styles.input} keyboardType='numeric' placeholder="₵" />
      <Text style={styles.tip}>Tip: ₵ 8500</Text>

      <Text style={styles.sectionTitle}>Available Start Date</Text>
      <Text style={styles.description}>
        When demand for your place is low, you may choose this price to attract more guests
      </Text>
      {showDatePicker &&<DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
          style={styles.datePicker}
        />}
        {showDatePicker && Platform.OS === 'ios' &&
        <View style= {{flexDirection: 'row', justifyContent: 'space-around'}}>
          
        </View>}
      {! showDatePicker &&<Pressable onPress={toggleDatepicker}>
        <TextInput style={styles.input} 
        editable={false} 
        placeholder="date" 
        value={start_date} 
        onChangeText={setStart_date}
        onPressIn={toggleDatepicker}
        />
      </Pressable>}
      <Text style={styles.tip}>Tip: ₵ 8000</Text>

      <Text style={styles.sectionTitle}>End date</Text>
      <Text style={styles.description}>
        If demand for your place is high, set the highest price you’re willing to charge
      </Text>
      {showDatePicker &&<DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />}
      <Text style={styles.tip}>Tip: ₵ 9000</Text>

      <Text style={styles.sectionTitle}>Currency</Text>
      <Picker selectedValue="GHC" style={styles.picker}>
        <Picker.Item label="GHC" value="GHC" />
        {/* Add more currency options here */}
      </Picker>

      <Text style={styles.footerText}>You’re always in control of the pricing you set!</Text>
      <Text style={styles.link}>Use base price only</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
          <TouchableOpacity style={[defaultStyles.btn, {width: 140, backgroundColor: '#fff' }]} onPress={() => router.navigate('./page1')} >
            <Text style={[defaultStyles.btnText, {color: '#044D5B'}]}> BACK</Text>
          </TouchableOpacity> 
          <TouchableOpacity style={[defaultStyles.btn, {width: 140,}]} onPress={() => router.navigate('./page3')} >
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
    height: 50,
    width: '100%',
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
    //marginBottom: 20,
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
