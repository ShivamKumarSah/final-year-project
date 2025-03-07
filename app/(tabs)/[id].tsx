import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Thermometer, Vibrate as Vibration, Clock, Battery, Activity } from 'lucide-react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';

const CHART_DATA = [
  { x: 1, y: 65 },
  { x: 2, y: 68 },
  { x: 3, y: 62 },
  { x: 4, y: 75 },
  { x: 5, y: 82 },
  { x: 6, y: 78 },
  { x: 7, y: 72 },
];

export default function MachineDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [selectedMetric, setSelectedMetric] = useState('temperature');
  
  const machine = {
    id: 2,
    name: 'Industrial Robot B2',
    status: 'warning',
    temp: '82°C',
    vibration: '4.7 Hz',
    lastUpdate: '1 min ago',
    battery: '85%',
    load: '72%',
    image: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?q=80&w=2400&auto=format&fit=crop',
  };

  const metrics = [
    { id: 'temperature', name: 'Temperature', value: '82°C', icon: Thermometer, color: '#FF9500' },
    { id: 'vibration', name: 'Vibration', value: '4.7 Hz', icon: Vibration, color: '#32D74B' },
    { id: 'battery', name: 'Battery', value: '85%', icon: Battery, color: '#007AFF' },
    { id: 'load', name: 'Load', value: '72%', icon: Activity, color: '#FF375F' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ArrowLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Image source={{ uri: machine.image }} style={styles.headerImage} />
          <View style={styles.headerOverlay} />
          <View style={styles.headerContent}>
            <Text style={styles.machineName}>{machine.name}</Text>
            <View style={styles.statusContainer}>
              {machine.status === 'warning' ? (
                <AlertTriangle size={20} color="#FF9500" />
              ) : (
                <CheckCircle size={20} color="#32D74B" />
              )}
              <Text style={[
                styles.statusText,
                { color: machine.status === 'warning' ? '#FF9500' : '#32D74B' }
              ]}>
                {machine.status === 'warning' ? 'Warning' : 'Normal'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.metricsGrid}>
            {metrics.map((metric) => (
              <TouchableOpacity
                key={metric.id}
                style={[
                  styles.metricCard,
                  selectedMetric === metric.id && styles.selectedMetricCard
                ]}
                onPress={() => setSelectedMetric(metric.id)}
              >
                <metric.icon size={24} color={metric.color} />
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricName}>{metric.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.chartContainer}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>24h History</Text>
              <View style={styles.timeContainer}>
                <Clock size={16} color="#666" />
                <Text style={styles.lastUpdate}>Updated {machine.lastUpdate}</Text>
              </View>
            </View>
            
            <VictoryChart
              theme={VictoryTheme.material}
              height={220}
              padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
            >
              <VictoryAxis
                tickFormat={(t) => `${t}h`}
                style={{
                  axis: { stroke: '#E1E1E1' },
                  tickLabels: { fill: '#666', fontSize: 12, fontFamily: 'Inter-Regular' }
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => `${t}°`}
                style={{
                  axis: { stroke: '#E1E1E1' },
                  tickLabels: { fill: '#666', fontSize: 12, fontFamily: 'Inter-Regular' }
                }}
              />
              <VictoryLine
                data={CHART_DATA}
                style={{
                  data: { stroke: '#007AFF', strokeWidth: 3 }
                }}
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
              />
            </VictoryChart>
          </View>
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
    height: 280,
    position: 'relative',
  },
  headerImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  machineName: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#fff',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  content: {
    padding: 20,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  metricCard: {
    width: (Dimensions.get('window').width - 56) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedMetricCard: {
    backgroundColor: '#f0f9ff',
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  metricValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 4,
  },
  metricName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#1a1a1a',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  lastUpdate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
});