import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>About This App</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Library App</Text>
          <Text style={styles.text}>
            This is a book library application that allows you to browse books by category. 
            Explore different genres including Self-Help, Computing & Tech, Fiction, and Biography.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Navigation</Text>
          <Text style={styles.text}>
            This app demonstrates two types of navigation in React Native using Expo Router:
          </Text>
          
          <View style={styles.navType}>
            <Text style={styles.navTitle}>1. Tab Navigation</Text>
            <Text style={styles.text}>
              The bottom tabs allow you to switch between the Library and About screens. 
              This provides quick access to main sections of the app.
            </Text>
          </View>

          <View style={styles.navType}>
            <Text style={styles.navTitle}>2. Stack Navigation</Text>
            <Text style={styles.text}>
              When you select a category from the Library tab, the app navigates to a Books List screen. 
              This uses stack navigation, allowing you to go back to the previous screen.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technologies</Text>
          <Text style={styles.text}>
            • React Native{"\n"}
            • Expo Router{"\n"}
            • TypeScript{"\n"}
            • File-based routing
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  navType: {
    marginTop: 16,
    marginLeft: 12,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});
