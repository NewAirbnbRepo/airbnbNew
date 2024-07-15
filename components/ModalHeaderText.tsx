import { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Colors from '@/constants/Colors';

const ModalHeaderText = () => {
  const [active, setActive] = useState(0);
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={{
            fontFamily: 'mon-sb',
            fontSize: 18,
            color: active == 0 ? '#000' : Colors.grey,
           
          }}>
          Stays
        </Text>
      </TouchableOpacity>
      
    </View>
  );
};

export default ModalHeaderText;
