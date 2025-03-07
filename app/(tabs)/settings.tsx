import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Clock, Moon, Wifi, FileSliders as Sliders, CircleHelp as HelpCircle, FileText, ChevronRight, LogOut } from 'lucide-react-native';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const handleLogout = () => {
    // In production, implement actual logout logic
    router.replace('/(auth)/login');
  };

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    description, 
    toggle, 
    onPress 
  }: { 
    icon: any, 
    title: string, 
    description?: string,
    toggle?: boolean,
    onPress?: () => void 
  }) => (
    <TouchableOpacity 
      style={styles.settingItem}
      onPress={onPress}
      disabled={toggle}
    >
      <View style={styles.settingIcon}>
        <Icon size={24} color="#666" />
      </View>
      <View style={styles.settingText}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      {toggle !== undefined ? (
        <Switch
          value={toggle}
          onValueChange={(value) => {
            switch (title) {
              case 'Push Notifications':
                setPushNotifications(value);
                break;
              case 'Dark Mode':
                setDarkMode(value);
                break;
              case 'Auto Refresh':
                setAutoRefresh(value);
                break;
            }
          }}
          trackColor={{ false: '#ddd', true: '#007AFF' }}
          thumbColor={Platform.OS === 'ios' ? '#fff' : toggle ? '#fff' : '#f4f3f4'}
        />
      ) : (
        <ChevronRight size={20} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={Bell}
              title="Push Notifications"
              description="Receive alerts and updates"
              toggle={pushNotifications}
            />
            <SettingItem
              icon={Moon}
              title="Dark Mode"
              description="Switch to dark theme"
              toggle={darkMode}
            />
            <SettingItem
              icon={Clock}
              title="Auto Refresh"
              description="Update data automatically"
              toggle={autoRefresh}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Connection</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={Wifi}
              title="API Endpoints"
              description="Configure server connections"
              onPress={() => {}}
            />
            <SettingItem
              icon={Sliders}
              title="Alert Thresholds"
              description="Customize alert settings"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingItem
              icon={HelpCircle}
              title="Help & FAQs"
              description="Get help and support"
              onPress={() => {}}
            />
            <SettingItem
              icon={FileText}
              title="Terms of Service"
              description="Read our terms and conditions"
              onPress={() => {}}
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <LogOut size={20} color="#FF3B30" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    paddingHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 2,
  },
  settingDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FF3B30',
  },
  version: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
});