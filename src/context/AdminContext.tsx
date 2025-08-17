import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { 
  AdminConfig, 
  AdminState, 
  NovelasConfig, 
  DeliveryZoneConfig, 
  AdminAction,
  AdminContextType
} from '../types/admin';
import { DEFAULT_ADMIN_CONFIG } from '../types/admin';

// Usar la configuración por defecto importada
const defaultConfig: AdminConfig = DEFAULT_ADMIN_CONFIG;

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'UPDATE_PRICING':
      return {
        ...state,
        config: {
          ...state.config,
          pricing: action.payload
        }
      };
    case 'ADD_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: [...state.config.novelas, action.payload]
        }
      };
    case 'UPDATE_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: state.config.novelas.map(novela =>
            novela.id === action.payload.id ? action.payload : novela
          )
        }
      };
    case 'DELETE_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: state.config.novelas.filter(novela => novela.id !== action.payload)
        }
      };
    case 'ADD_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: [...state.config.deliveryZones, action.payload]
        }
      };
    case 'UPDATE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.map(zone =>
            zone.id === action.payload.id ? action.payload : zone
          )
        }
      };
    case 'DELETE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.filter(zone => zone.id !== action.payload)
        }
      };
    case 'TOGGLE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.map(zone =>
            zone.id === action.payload ? { ...zone, active: !zone.active } : zone
          )
        }
      };
    case 'LOAD_CONFIG':
      return {
        ...state,
        config: action.payload
      };
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticated: true
      };
    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    config: defaultConfig,
    isAuthenticated: false
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('adminConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        dispatch({ type: 'LOAD_CONFIG', payload: parsedConfig });
      } catch (error) {
        console.error('Error loading admin config:', error);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin') {
      dispatch({ type: 'LOG_IN' });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  const addNovela = (novela: Omit<NovelasConfig, 'id'>) => {
    const newNovela = {
      ...novela,
      id: Math.max(...state.config.novelas.map(n => n.id), 0) + 1
    };
    dispatch({ type: 'ADD_NOVELA', payload: newNovela });
  };

  const updateNovela = (id: number, novelaData: Partial<NovelasConfig>) => {
    const existingNovela = state.config.novelas.find(n => n.id === id);
    if (existingNovela) {
      const updatedNovela = { ...existingNovela, ...novelaData };
      dispatch({ type: 'UPDATE_NOVELA', payload: updatedNovela });
    }
  };

  const deleteNovela = (id: number) => {
    dispatch({ type: 'DELETE_NOVELA', payload: id });
  };

  const addDeliveryZone = (zone: Omit<DeliveryZoneConfig, 'id'>) => {
    const newZone = {
      ...zone,
      id: Math.max(...state.config.deliveryZones.map(z => z.id), 0) + 1
    };
    dispatch({ type: 'ADD_DELIVERY_ZONE', payload: newZone });
  };

  const updateDeliveryZone = (id: number, zoneData: Partial<DeliveryZoneConfig>) => {
    const existingZone = state.config.deliveryZones.find(z => z.id === id);
    if (existingZone) {
      const updatedZone = { ...existingZone, ...zoneData };
      dispatch({ type: 'UPDATE_DELIVERY_ZONE', payload: updatedZone });
    }
  };

  const deleteDeliveryZone = (id: number) => {
    dispatch({ type: 'DELETE_DELIVERY_ZONE', payload: id });
  };

  const exportConfig = (): string => {
    return JSON.stringify(state.config, null, 2);
  };

  const importConfig = (configData: string): boolean => {
    try {
      const parsedConfig = JSON.parse(configData);
      // Basic validation
      if (parsedConfig.pricing && parsedConfig.novelas && parsedConfig.deliveryZones) {
        dispatch({ type: 'LOAD_CONFIG', payload: parsedConfig });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const resetToDefaults = () => {
    dispatch({ type: 'LOAD_CONFIG', payload: defaultConfig });
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  const getCurrentConfig = (): AdminConfig => {
    return state.config;
  };

  const generateSystemFileContent = (filename: string): string => {
    const currentConfig = state.config;
    const timestamp = new Date().toISOString();
    
    switch (filename) {
      case 'admin.ts':
        return `// Archivo generado automáticamente el ${timestamp}
// Configuración actual del sistema aplicada

import React from 'react';

export interface AdminConfig {
  pricing: {
    moviePrice: number;
    seriesPrice: number;
    transferFeePercentage: number;
  };
  novelas: NovelasConfig[];
  deliveryZones: DeliveryZoneConfig[];
}

export interface NovelasConfig {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  costoEfectivo: number;
  costoTransferencia: number;
  descripcion?: string;
}

export interface DeliveryZoneConfig {
  id: number;
  name: string;
  fullPath: string;
  cost: number;
  active: boolean;
}

export interface AdminState {
  isAuthenticated: boolean;
  config: AdminConfig;
}

export type AdminAction = 
  | { type: 'UPDATE_PRICING'; payload: AdminConfig['pricing'] }
  | { type: 'ADD_NOVELA'; payload: NovelasConfig }
  | { type: 'UPDATE_NOVELA'; payload: NovelasConfig }
  | { type: 'DELETE_NOVELA'; payload: number }
  | { type: 'ADD_DELIVERY_ZONE'; payload: DeliveryZoneConfig }
  | { type: 'UPDATE_DELIVERY_ZONE'; payload: DeliveryZoneConfig }
  | { type: 'DELETE_DELIVERY_ZONE'; payload: number }
  | { type: 'TOGGLE_DELIVERY_ZONE'; payload: number }
  | { type: 'LOAD_CONFIG'; payload: AdminConfig }
  | { type: 'LOG_IN' }
  | { type: 'LOG_OUT' };

export interface AdminContextType {
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  addNovela: (novela: Omit<NovelasConfig, 'id'>) => void;
  updateNovela: (id: number, novela: Partial<NovelasConfig>) => void;
  deleteNovela: (id: number) => void;
  addDeliveryZone: (zone: Omit<DeliveryZoneConfig, 'id'>) => void;
  updateDeliveryZone: (id: number, zone: Partial<DeliveryZoneConfig>) => void;
  deleteDeliveryZone: (id: number) => void;
  exportConfig: () => string;
  importConfig: (configData: string) => boolean;
  resetToDefaults: () => void;
  showNotification: (message: string, type: 'success' | 'info' | 'warning' | 'error') => void;
  exportSystemFiles: () => void;
  getCurrentConfig: () => AdminConfig;
}

// CONFIGURACIÓN ACTUAL DEL SISTEMA APLICADA
// Precios actuales:
// - Película: $${currentConfig.pricing.moviePrice} CUP
// - Serie: $${currentConfig.pricing.seriesPrice} CUP por temporada
// - Recargo transferencia: ${currentConfig.pricing.transferFeePercentage}%
// Total de novelas: ${currentConfig.novelas.length}
// Zonas de entrega activas: ${currentConfig.deliveryZones.filter(z => z.active).length}

export const CURRENT_SYSTEM_CONFIG: AdminConfig = ${JSON.stringify(currentConfig, null, 2)};

// Configuración por defecto del sistema
export const DEFAULT_ADMIN_CONFIG: AdminConfig = ${JSON.stringify(defaultConfig, null, 2)};`;

      case 'AdminContext.tsx':
        return `// Archivo generado automáticamente el ${timestamp}
// AdminContext con configuración actual aplicada

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { 
  AdminConfig, 
  AdminState, 
  NovelasConfig, 
  DeliveryZoneConfig, 
  AdminAction,
  AdminContextType
} from '../types/admin';

// Configuración actual aplicada desde el panel de control
// Última actualización: ${timestamp}
// Precios aplicados:
// - Película: $${currentConfig.pricing.moviePrice} CUP
// - Serie: $${currentConfig.pricing.seriesPrice} CUP por temporada
// - Recargo transferencia: ${currentConfig.pricing.transferFeePercentage}%
// Total de novelas: ${currentConfig.novelas.length}
// Zonas de entrega activas: ${currentConfig.deliveryZones.filter(z => z.active).length}

const currentAppliedConfig: AdminConfig = ${JSON.stringify(currentConfig, null, 2)};

const defaultConfig: AdminConfig = ${JSON.stringify(defaultConfig, null, 2)};

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'UPDATE_PRICING':
      return {
        ...state,
        config: {
          ...state.config,
          pricing: action.payload
        }
      };
    case 'ADD_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: [...state.config.novelas, action.payload]
        }
      };
    case 'UPDATE_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: state.config.novelas.map(novela =>
            novela.id === action.payload.id ? action.payload : novela
          )
        }
      };
    case 'DELETE_NOVELA':
      return {
        ...state,
        config: {
          ...state.config,
          novelas: state.config.novelas.filter(novela => novela.id !== action.payload)
        }
      };
    case 'ADD_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: [...state.config.deliveryZones, action.payload]
        }
      };
    case 'UPDATE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.map(zone =>
            zone.id === action.payload.id ? action.payload : zone
          )
        }
      };
    case 'DELETE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.filter(zone => zone.id !== action.payload)
        }
      };
    case 'TOGGLE_DELIVERY_ZONE':
      return {
        ...state,
        config: {
          ...state.config,
          deliveryZones: state.config.deliveryZones.map(zone =>
            zone.id === action.payload ? { ...zone, active: !zone.active } : zone
          )
        }
      };
    case 'LOAD_CONFIG':
      return {
        ...state,
        config: action.payload
      };
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticated: true
      };
    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, {
    config: currentAppliedConfig,
    isAuthenticated: false
  });

  useEffect(() => {
    const savedConfig = localStorage.getItem('adminConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        dispatch({ type: 'LOAD_CONFIG', payload: parsedConfig });
      } catch (error) {
        console.error('Error loading admin config:', error);
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin') {
      dispatch({ type: 'LOG_IN' });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOG_OUT' });
  };

  const addNovela = (novela: Omit<NovelasConfig, 'id'>) => {
    const newNovela = {
      ...novela,
      id: Math.max(...state.config.novelas.map(n => n.id), 0) + 1
    };
    dispatch({ type: 'ADD_NOVELA', payload: newNovela });
  };

  const updateNovela = (id: number, novelaData: Partial<NovelasConfig>) => {
    const existingNovela = state.config.novelas.find(n => n.id === id);
    if (existingNovela) {
      const updatedNovela = { ...existingNovela, ...novelaData };
      dispatch({ type: 'UPDATE_NOVELA', payload: updatedNovela });
    }
  };

  const deleteNovela = (id: number) => {
    dispatch({ type: 'DELETE_NOVELA', payload: id });
  };

  const addDeliveryZone = (zone: Omit<DeliveryZoneConfig, 'id'>) => {
    const newZone = {
      ...zone,
      id: Math.max(...state.config.deliveryZones.map(z => z.id), 0) + 1
    };
    dispatch({ type: 'ADD_DELIVERY_ZONE', payload: newZone });
  };

  const updateDeliveryZone = (id: number, zoneData: Partial<DeliveryZoneConfig>) => {
    const existingZone = state.config.deliveryZones.find(z => z.id === id);
    if (existingZone) {
      const updatedZone = { ...existingZone, ...zoneData };
      dispatch({ type: 'UPDATE_DELIVERY_ZONE', payload: updatedZone });
    }
  };

  const deleteDeliveryZone = (id: number) => {
    dispatch({ type: 'DELETE_DELIVERY_ZONE', payload: id });
  };

  const exportConfig = (): string => {
    return JSON.stringify(state.config, null, 2);
  };

  const importConfig = (configData: string): boolean => {
    try {
      const parsedConfig = JSON.parse(configData);
      if (parsedConfig.pricing && parsedConfig.novelas && parsedConfig.deliveryZones) {
        dispatch({ type: 'LOAD_CONFIG', payload: parsedConfig });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const resetToDefaults = () => {
    dispatch({ type: 'LOAD_CONFIG', payload: defaultConfig });
  };

  const showNotification = (message: string, type: 'success' | 'info' | 'warning' | 'error') => {
    console.log(\`\${type.toUpperCase()}: \${message}\`);
  };

  const getCurrentConfig = (): AdminConfig => {
    return state.config;
  };

  const exportSystemFiles = () => {
    console.log('Exportando archivos del sistema con configuración actual aplicada...');
  };

  const contextValue: AdminContextType = {
    state, 
    dispatch, 
    login, 
    logout,
    addNovela,
    updateNovela,
    deleteNovela,
    addDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    exportConfig,
    importConfig,
    resetToDefaults,
    showNotification,
    exportSystemFiles,
    getCurrentConfig
  };

  useEffect(() => {
    localStorage.setItem('adminConfig', JSON.stringify(state.config));
  }, [state.config]);

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};`;

      case 'AdminPanel.tsx':
        return `// Archivo generado automáticamente el ${timestamp}
// AdminPanel con configuración actual aplicada

import React, { useState } from 'react';
import { X, Settings, DollarSign, BookOpen, Download, Upload, RotateCcw, Save, Plus, Edit3, Trash2, MapPin, FileCode, CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { NovelasConfig, DeliveryZoneConfig } from '../types/admin';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { state, logout, dispatch, addNovela, updateNovela, deleteNovela, addDeliveryZone, updateDeliveryZone, deleteDeliveryZone, exportConfig, importConfig, resetToDefaults, getCurrentConfig } = useAdmin();
  
  // Configuración actual aplicada:
  // Precios: Película $${currentConfig.pricing.moviePrice} CUP, Serie $${currentConfig.pricing.seriesPrice} CUP/temp, Transferencia +${currentConfig.pricing.transferFeePercentage}%
  // Total de novelas: ${currentConfig.novelas.length}
  // Zonas de entrega activas: ${currentConfig.deliveryZones.filter(z => z.active).length}
  
  const [activeTab, setActiveTab] = useState<'pricing' | 'novelas' | 'delivery' | 'backup'>('pricing');
  const [notifications, setNotifications] = useState<Array<{ id: number; message: string; type: 'success' | 'info' | 'warning' | 'error' }>>([]);
  
  // Pricing form state
  const [pricingForm, setPricingForm] = useState(state.config.pricing);
  
  // Novelas form state
  const [novelaForm, setNovelaForm] = useState<Partial<NovelasConfig>>({
    titulo: '',
    genero: '',
    capitulos: 0,
    año: new Date().getFullYear(),
    costoEfectivo: 0,
    costoTransferencia: 0,
    descripcion: ''
  });
  const [editingNovela, setEditingNovela] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Delivery zones form state
  const [deliveryForm, setDeliveryForm] = useState<Partial<DeliveryZoneConfig>>({
    name: '',
    fullPath: '',
    cost: 0,
    active: true
  });
  const [editingZone, setEditingZone] = useState<number | null>(null);
  const [zoneSearchTerm, setZoneSearchTerm] = useState('');
  
  // Backup state
  const [importData, setImportData] = useState('');

  // Obtener configuración actual del admin
  const currentConfig = getCurrentConfig();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg">
                <Settings className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Panel de Control Administrativo</h2>
                <p className="text-sm opacity-90">Gestión completa del sistema TV a la Carta</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={logout}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cerrar Sesión
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="flex space-x-1 p-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab('pricing')}
              className={\`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center \${
                activeTab === 'pricing'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }\`}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Control de Precios
            </button>
            <button
              onClick={() => setActiveTab('novelas')}
              className={\`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center \${
                activeTab === 'novelas'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }\`}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Gestión de Novelas
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={\`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center \${
                activeTab === 'delivery'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }\`}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Zonas de Entrega
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={\`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center \${
                activeTab === 'backup'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }\`}
            >
              <Download className="h-5 w-5 mr-2" />
              Sistema Backup
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-200px)]">
          <div className="p-6">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                Panel de Control con Configuración Actual Aplicada
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Precios Actuales</h4>
                  <p className="text-sm text-blue-700">Película: $${currentConfig.pricing.moviePrice} CUP</p>
                  <p className="text-sm text-blue-700">Serie: $${currentConfig.pricing.seriesPrice} CUP/temp</p>
                  <p className="text-sm text-blue-700">Transferencia: +${currentConfig.pricing.transferFeePercentage}%</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Catálogo</h4>
                  <p className="text-sm text-blue-700">Novelas: ${currentConfig.novelas.length}</p>
                  <p className="text-sm text-blue-700">Zonas activas: ${currentConfig.deliveryZones.filter(z => z.active).length}</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Estado</h4>
                  <p className="text-sm text-blue-700">Sistema: Operativo</p>
                  <p className="text-sm text-blue-700">Última actualización: ${new Date().toLocaleString('es-ES')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

      case 'CheckoutModal.tsx':
        return `// Archivo generado automáticamente el ${timestamp}
// CheckoutModal con configuración actual aplicada

import React, { useState } from 'react';
import { X, User, MapPin, Phone, Copy, Check, MessageCircle, Calculator, DollarSign, CreditCard } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// Configuración de precios actual aplicada
// Precios: Película $${currentConfig.pricing.moviePrice} CUP, Serie $${currentConfig.pricing.seriesPrice} CUP por temporada
// Recargo transferencia: ${currentConfig.pricing.transferFeePercentage}%

const CURRENT_PRICING = {
  moviePrice: ${currentConfig.pricing.moviePrice},
  seriesPrice: ${currentConfig.pricing.seriesPrice},
  transferFeePercentage: ${currentConfig.pricing.transferFeePercentage}
};

// Zonas de entrega actuales aplicadas
const CURRENT_DELIVERY_ZONES = ${JSON.stringify(currentConfig.deliveryZones.filter(z => z.active), null, 2)};

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
}

export interface OrderData {
  orderId: string;
  customerInfo: CustomerInfo;
  deliveryZone: string;
  deliveryCost: number;
  items: any[];
  subtotal: number;
  transferFee: number;
  total: number;
  cashTotal?: number;
  transferTotal?: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (orderData: OrderData) => void;
  items: any[];
  total: number;
}

export function CheckoutModal({ isOpen, onClose, onCheckout, items, total }: CheckoutModalProps) {
  const { getCurrentConfig } = useAdmin();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    phone: '',
    address: '',
  });
  
  const [deliveryZone, setDeliveryZone] = useState('Por favor seleccionar su Barrio/Zona');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderGenerated, setOrderGenerated] = useState(false);
  const [generatedOrder, setGeneratedOrder] = useState('');
  const [copied, setCopied] = useState(false);

  // Obtener configuración actual del admin
  const currentConfig = getCurrentConfig();
  
  // Get delivery zones from admin config (current applied configuration)
  const deliveryZones = currentConfig.deliveryZones.filter(zone => zone.active);
  const selectedZone = deliveryZones.find(zone => zone.fullPath === deliveryZone);
  const deliveryCost = selectedZone?.cost || 0;
  const finalTotal = total + deliveryCost;

  // Implementación con configuración actual aplicada
  // Precios: Película $${currentConfig.pricing.moviePrice} CUP, Serie $${currentConfig.pricing.seriesPrice} CUP por temporada
  // Recargo transferencia: ${currentConfig.pricing.transferFeePercentage}%
  // Zonas disponibles: ${currentConfig.deliveryZones.filter(z => z.active).length} zonas activas

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <MessageCircle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Finalizar Pedido</h2>
                <p className="text-sm opacity-90">Complete sus datos para procesar el pedido</p>
                <p className="text-xs opacity-75">Precios: Película $${currentConfig.pricing.moviePrice} CUP | Serie $${currentConfig.pricing.seriesPrice} CUP/temp | Transferencia +${currentConfig.pricing.transferFeePercentage}%</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="p-4 sm:p-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-4 sm:p-6 mb-6 border border-blue-200">
              <div className="flex items-center mb-4">
                <Calculator className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Resumen del Pedido</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
                      $${total.toLocaleString()} CUP
                    </div>
                    <div className="text-sm text-gray-600">Subtotal Contenido</div>
                    <div className="text-xs text-gray-500 mt-1">${items.length} elementos</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-2">
                      $${deliveryCost.toLocaleString()} CUP
                    </div>
                    <div className="text-sm text-gray-600">Costo de Entrega</div>
                    <div className="text-xs text-gray-500 mt-1">
                      ${selectedZone?.name || 'Seleccionar zona'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-4 border-2 border-green-300">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                  <span className="text-lg sm:text-xl font-bold text-gray-900">Total Final:</span>
                  <span className="text-2xl sm:text-3xl font-bold text-green-600">
                    $${finalTotal.toLocaleString()} CUP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

      case 'NovelasModal.tsx':
        return `// Archivo generado automáticamente el ${timestamp}
// NovelasModal con configuración actual aplicada

import React, { useState, useEffect } from 'react';
import { X, Download, MessageCircle, Phone, BookOpen, Info, Check, DollarSign, CreditCard, Calculator } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// Catálogo de novelas actual aplicado
// Total de novelas: ${currentConfig.novelas.length}
// Configuración de precios actual: Transferencia +${currentConfig.pricing.transferFeePercentage}%

const CURRENT_NOVELAS_CATALOG = ${JSON.stringify(currentConfig.novelas, null, 2)};

// Configuración de precios actual
const CURRENT_PRICING_CONFIG = {
  moviePrice: ${currentConfig.pricing.moviePrice},
  seriesPrice: ${currentConfig.pricing.seriesPrice},
  transferFeePercentage: ${currentConfig.pricing.transferFeePercentage}
};

interface Novela {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  paymentType?: 'cash' | 'transfer';
}

interface NovelasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NovelasModal({ isOpen, onClose }: NovelasModalProps) {
  const { getCurrentConfig } = useAdmin();
  const [selectedNovelas, setSelectedNovelas] = useState<number[]>([]);
  const [novelasWithPayment, setNovelasWithPayment] = useState<Novela[]>([]);
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [showNovelList, setShowNovelList] = useState(false);

  // Obtener configuración actual del admin
  const currentConfig = getCurrentConfig();
  
  // Get novelas from current admin config (applied configuration)
  const novelas: Novela[] = currentConfig.novelas.map(novela => ({
    id: novela.id,
    titulo: novela.titulo,
    genero: novela.genero,
    capitulos: novela.capitulos,
    año: novela.año,
    descripcion: novela.descripcion
  }));

  const phoneNumber = '+5354690878';

  // Implementación con catálogo actual aplicado
  // Total de novelas: ${currentConfig.novelas.length}
  // Recargo por transferencia: ${currentConfig.pricing.transferFeePercentage}%

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl animate-in fade-in duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-4 sm:p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-xl mr-4 shadow-lg">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Catálogo de Novelas</h2>
                <p className="text-sm sm:text-base opacity-90">
                  ${novelas.length} novelas disponibles | Transferencia +${currentConfig.pricing.transferFeePercentage}%
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
          <div className="p-4 sm:p-6">
            {/* Información Principal */}
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-pink-200">
              <div className="flex items-center mb-4">
                <div className="bg-pink-100 p-3 rounded-xl mr-4">
                  <Info className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold text-pink-900">Información Importante</h3>
              </div>
              
              <div className="space-y-4 text-pink-800">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📚</span>
                  <p className="font-semibold">Las novelas se encargan completas</p>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💰</span>
                  <p className="font-semibold">Precios variables según novela (configuración actual aplicada)</p>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💳</span>
                  <p className="font-semibold">Transferencia bancaria: +${currentConfig.pricing.transferFeePercentage}% de recargo</p>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📱</span>
                  <p className="font-semibold">Para más información, contacta al número:</p>
                </div>
              </div>

              {/* Número de contacto */}
              <div className="mt-6 bg-white rounded-xl p-4 border border-pink-300">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="text-center sm:text-left">
                    <p className="text-lg font-bold text-gray-900">${phoneNumber}</p>
                    <p className="text-sm text-gray-600">Contacto directo</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Llamar
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

      default:
        return `// Archivo no reconocido: ${filename}`;
    }
  };

  const exportSystemFiles = () => {
    try {
      const filesToExport = [
        { name: 'admin.ts', folder: 'src/types' },
        { name: 'AdminContext.tsx', folder: 'src/context' }, 
        { name: 'AdminPanel.tsx', folder: 'src/components' },
        { name: 'CheckoutModal.tsx', folder: 'src/components' },
        { name: 'NovelasModal.tsx', folder: 'src/components' }
      ];

      const timestamp = new Date().toLocaleString('es-ES');
      
      // Crear archivo README con información del export
      const readmeContent = `# Archivos del Sistema TV a la Carta - Exportación Completa

## Información de la Exportación
- **Fecha de exportación:** ${timestamp}
- **Configuración aplicada:** Todos los cambios realizados en el panel de control

## Configuración Actual del Sistema

### Precios Aplicados:
- **Películas:** $${state.config.pricing.moviePrice} CUP
- **Series:** $${state.config.pricing.seriesPrice} CUP por temporada  
- **Recargo transferencia:** ${state.config.pricing.transferFeePercentage}%

### Catálogo de Novelas: ${state.config.novelas.length} novelas
${state.config.novelas.map(n => `- **${n.titulo}** (${n.capitulos} caps, ${n.año}) - Efectivo: $${n.costoEfectivo} CUP, Transferencia: $${n.costoTransferencia} CUP`).join('\n')}

### Zonas de Entrega: ${state.config.deliveryZones.filter(z => z.active).length} zonas activas
${state.config.deliveryZones.filter(z => z.active).map(z => `- **${z.name}:** $${z.cost} CUP`).join('\n')}

## Estructura de Archivos Exportados
\`\`\`
src/
├── types/
│   └── admin.ts
├── context/
│   └── AdminContext.tsx
└── components/
    ├── AdminPanel.tsx
    ├── CheckoutModal.tsx
    └── NovelasModal.tsx
\`\`\`

## Instrucciones de Uso
1. Reemplazar los archivos existentes con estos archivos exportados
2. Todos los cambios realizados en el panel de control están aplicados
3. La configuración está sincronizada en todos los componentes

---
*Exportado automáticamente desde el Panel de Control Administrativo*
*TV a la Carta - Sistema de Gestión Integral*
`;

      // Exportar README primero
      const readmeBlob = new Blob([readmeContent], { type: 'text/markdown;charset=utf-8' });
      const readmeUrl = URL.createObjectURL(readmeBlob);
      const readmeLink = document.createElement('a');
      readmeLink.href = readmeUrl;
      readmeLink.download = 'README-Exportacion-Sistema.md';
      document.body.appendChild(readmeLink);
      readmeLink.click();
      document.body.removeChild(readmeLink);
      URL.revokeObjectURL(readmeUrl);

      // Exportar cada archivo del sistema en su carpeta correspondiente
      filesToExport.forEach((file, index) => {
        setTimeout(() => {
          const content = generateSystemFileContent(file.name);
          const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          
          // Crear nombre de archivo con estructura de carpetas
          const folderPath = file.folder.replace('/', '-');
          link.download = `${folderPath}-${file.name}`;
          
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, index * 500); // Delay para evitar problemas de descarga
      });

      console.log('✅ Archivos del sistema exportados correctamente con configuración actual aplicada');
      
    } catch (error) {
      console.error('❌ Error al exportar archivos del sistema:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('adminConfig', JSON.stringify(state.config));
  }, [state.config]);

  const contextValue: AdminContextType = {
    state, 
    dispatch, 
    login, 
    logout,
    addNovela,
    updateNovela,
    deleteNovela,
    addDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    exportConfig,
    importConfig,
    resetToDefaults,
    showNotification,
    exportSystemFiles,
    getCurrentConfig
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};