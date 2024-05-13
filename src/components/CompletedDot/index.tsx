import { View } from 'react-native';
import FormatStyle from 'utils/FormatStyle';
import { Ionicons } from '@expo/vector-icons';


interface CompletedDotProps {
  color: string;
  completed: boolean;
}

const CompletedDot = ({ color, completed }: CompletedDotProps) => {
  return (
    <View style={{ height: 28, width: 28, borderRadius: 15.5, borderWidth: 2, borderColor: color, alignItems: 'center', justifyContent: 'center', marginTop: -3 }}>
      {completed ? <Ionicons name="checkmark" size={25} color={color} /> : null}
    </View>
  );
};

export default CompletedDot;
