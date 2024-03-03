import { View } from 'react-native';
import FormatStyle from 'utils/FormatStyle';


interface CompletedDotProps {
  color: string;
  completed: boolean;
}

const CompletedDot = ({ color, completed }: CompletedDotProps) => {
  return (
    <View style={{ ...FormatStyle.circle, backgroundColor: 'transparent', borderColor: color, borderWidth: 2, justifyContent: 'center', marginTop: 0, width: 20, height: 20 }}>
      {completed && <View style={{ ...FormatStyle.circle, backgroundColor: color, width: 10, height: 10, marginTop: 0 }}></View>}
    </View>
  );
};

export default CompletedDot;
