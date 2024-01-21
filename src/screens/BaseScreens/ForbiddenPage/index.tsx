import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';

const ForbiddenPage = () => {
  return (
    <SafeAreaView style={FormatStyle.container}>
      <Text style={TextStyles.title}>
        403 - Forbidden
      </Text>
      <Text style={TextStyles.subTitle}>
        You do not have permissions to view this page.
      </Text>
    </SafeAreaView>
  );
};

export default ForbiddenPage;
