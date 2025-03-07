import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, ChevronRight } from 'lucide-react-native';

export default function HomeScreen() {
  const machines = [
    { 
      id: 1, 
      name: 'CNC Machine A1', 
      status: 'normal', 
      temp: '65°C', 
      vibration: '2.3 Hz', 
      lastUpdate: '2 min ago',
      image: 'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 2, 
      name: 'Industrial Robot B2', 
      status: 'warning', 
      temp: '82°C', 
      vibration: '4.7 Hz', 
      lastUpdate: '1 min ago',
      image: 'https://plus.unsplash.com/premium_photo-1661877204567-cd31b5de1d0c?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 3, 
      name: 'Assembly Line C3', 
      status: 'normal', 
      temp: '71°C', 
      vibration: '1.9 Hz', 
      lastUpdate: '5 min ago',
      image: 'https://plus.unsplash.com/premium_photo-1661962751752-cbf6a170c837?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ];

  // Platform-specific accessibility props
  const getAccessibilityProps = (machine: typeof machines[0]) => {
    if (Platform.OS === 'web') {
      return {
        role: 'button',
        'aria-label': `View details for ${machine.name}`,
      };
    }
    return {
      accessibilityRole: 'button',
      accessibilityHint: `View details for ${machine.name}`,
      accessibilityLabel: machine.name,
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.title}>Factory Overview</Text>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop' }}
            style={styles.avatar}
          />
        </View>

        <View style={styles.statusBar}>
          <View style={styles.statusIcon}>
            {machines.some(m => m.status === 'warning') ? (
              <AlertTriangle size={24} color="#FF9500" />
            ) : (
              <CheckCircle size={24} color="#34C759" />
            )}
          </View>
          <Text style={styles.statusText}>
            {machines.some(m => m.status === 'warning') 
              ? 'Warning: 1 machine requires attention'
              : 'All systems nominal'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Machine Status</Text>
          {machines.map(machine => (
            <TouchableOpacity 
              key={machine.id} 
              style={[
                styles.machineCard,
                machine.status === 'warning' && styles.warningCard
              ]}
              {...getAccessibilityProps(machine)}
            >
              <Image 
                source={{ uri: machine.image }}
                style={styles.machineImage}
              />
              <View style={styles.machineContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.machineName}>{machine.name}</Text>
                  {machine.status === 'normal' ? (
                    <CheckCircle size={20} color="#34C759" />
                  ) : (
                    <AlertTriangle size={20} color="#FF9500" />
                  )}
                </View>

                <View style={styles.readings}>
                  <View style={styles.reading}>
                    <Text style={styles.readingLabel}>Temperature</Text>
                    <Text style={styles.readingValue}>{machine.temp}</Text>
                  </View>
                  <View style={styles.reading}>
                    <Text style={styles.readingLabel}>Vibration</Text>
                    <Text style={styles.readingValue}>{machine.vibration}</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.lastUpdate}>Last update: {machine.lastUpdate}</Text>
                  <ChevronRight size={20} color="#666" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1a1a1a',
    marginTop: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  statusBar: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  statusIcon: {
    marginRight: 12,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#1a1a1a',
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1a1a1a',
    marginBottom: 16,
  },
  machineCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  warningCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9500',
  },
  machineImage: {
    width: '100%',
    height: 150,
  },
  machineContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  machineName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
  },
  readings: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 16,
  },
  reading: {
    flex: 1,
  },
  readingLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  readingValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#1a1a1a',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  lastUpdate: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
});