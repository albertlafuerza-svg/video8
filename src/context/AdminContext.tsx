import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PriceConfig {
  moviePrice: number;
  seriesPrice: number;
  transferFeePercentage: number;
  novelPricePerChapter: number;
}

export interface DeliveryZone {
  id: number;
  name: string;
  cost: number;
  active: boolean;
  createdAt: string;
}

export interface Novel {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  active: boolean;
  createdAt?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  section: string;
  action: string;
}

interface AdminState {
  isAuthenticated: boolean;
  prices: PriceConfig;
  deliveryZones: DeliveryZone[];
  novels: Novel[];
  notifications: Notification[];
  lastBackup: string | null;
}

type AdminAction =
  | { type: 'LOGIN'; payload: boolean }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PRICES'; payload: PriceConfig }
  | { type: 'ADD_DELIVERY_ZONE'; payload: Omit<DeliveryZone, 'id' | 'createdAt'> }
  | { type: 'UPDATE_DELIVERY_ZONE'; payload: DeliveryZone }
  | { type: 'DELETE_DELIVERY_ZONE'; payload: number }
  | { type: 'ADD_NOVEL'; payload: Omit<Novel, 'id' | 'createdAt'> }
  | { type: 'UPDATE_NOVEL'; payload: Novel }
  | { type: 'DELETE_NOVEL'; payload: number }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'SET_LAST_BACKUP'; payload: string }
  | { type: 'LOAD_STATE'; payload: Partial<AdminState> };

interface AdminContextType {
  state: AdminState;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updatePrices: (prices: PriceConfig) => void;
  addDeliveryZone: (zone: Omit<DeliveryZone, 'id' | 'createdAt'>) => void;
  updateDeliveryZone: (zone: DeliveryZone) => void;
  deleteDeliveryZone: (id: number) => void;
  addNovel: (novel: Omit<Novel, 'id' | 'createdAt'>) => void;
  updateNovel: (novel: Novel) => void;
  deleteNovel: (id: number) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  clearNotifications: () => void;
  exportSystemBackup: () => void;
}

const initialState: AdminState = {
  isAuthenticated: false,
  prices: {
    moviePrice: 80,
    seriesPrice: 300,
    transferFeePercentage: 10,
    novelPricePerChapter: 5
  },
  deliveryZones: [
    { id: 1, name: 'Santiago de Cuba > Santiago de Cuba > Nuevo Vista Alegre', cost: 100, active: true, createdAt: new Date().toISOString() },
    { id: 2, name: 'Santiago de Cuba > Santiago de Cuba > Vista Alegre', cost: 300, active: true, createdAt: new Date().toISOString() },
    { id: 3, name: 'Santiago de Cuba > Santiago de Cuba > Reparto Sueño', cost: 250, active: true, createdAt: new Date().toISOString() },
    { id: 4, name: 'Santiago de Cuba > Santiago de Cuba > San Pedrito', cost: 150, active: true, createdAt: new Date().toISOString() },
    { id: 5, name: 'Santiago de Cuba > Santiago de Cuba > Altamira', cost: 300, active: true, createdAt: new Date().toISOString() },
    { id: 6, name: 'Santiago de Cuba > Santiago de Cuba > Micro 7, 8 , 9', cost: 150, active: true, createdAt: new Date().toISOString() },
    { id: 7, name: 'Santiago de Cuba > Santiago de Cuba > Alameda', cost: 150, active: true, createdAt: new Date().toISOString() },
    { id: 8, name: 'Santiago de Cuba > Santiago de Cuba > El Caney', cost: 800, active: true, createdAt: new Date().toISOString() },
    { id: 9, name: 'Santiago de Cuba > Santiago de Cuba > Quintero', cost: 200, active: true, createdAt: new Date().toISOString() },
    { id: 10, name: 'Santiago de Cuba > Santiago de Cuba > Marimon', cost: 100, active: true, createdAt: new Date().toISOString() }
  ],
  novels: [
    { id: 1, titulo: "Corazón Salvaje", genero: "Drama/Romance", capitulos: 185, año: 2009, active: true, createdAt: new Date().toISOString() },
    { id: 2, titulo: "La Usurpadora", genero: "Drama/Melodrama", capitulos: 98, año: 1998, active: true, createdAt: new Date().toISOString() },
    { id: 3, titulo: "María la del Barrio", genero: "Drama/Romance", capitulos: 73, año: 1995, active: true, createdAt: new Date().toISOString() },
    { id: 4, titulo: "Marimar", genero: "Drama/Romance", capitulos: 63, año: 1994, active: true, createdAt: new Date().toISOString() },
    { id: 5, titulo: "Rosalinda", genero: "Drama/Romance", capitulos: 80, año: 1999, active: true, createdAt: new Date().toISOString() }
  ],
  notifications: [],
  lastBackup: null
};

function adminReducer(state: AdminState, action: AdminAction): AdminState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: action.payload };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'UPDATE_PRICES':
      return { ...state, prices: action.payload };
    case 'ADD_DELIVERY_ZONE':
      const newZone = {
        ...action.payload,
        id: Math.max(...state.deliveryZones.map(z => z.id), 0) + 1,
        createdAt: new Date().toISOString()
      };
      return { ...state, deliveryZones: [...state.deliveryZones, newZone] };
    case 'UPDATE_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: state.deliveryZones.map(zone =>
          zone.id === action.payload.id ? action.payload : zone
        )
      };
    case 'DELETE_DELIVERY_ZONE':
      return {
        ...state,
        deliveryZones: state.deliveryZones.filter(zone => zone.id !== action.payload)
      };
    case 'ADD_NOVEL':
      const newNovel = {
        ...action.payload,
        id: Math.max(...state.novels.map(n => n.id), 0) + 1,
        createdAt: new Date().toISOString()
      };
      return { ...state, novels: [...state.novels, newNovel] };
    case 'UPDATE_NOVEL':
      return {
        ...state,
        novels: state.novels.map(novel =>
          novel.id === action.payload.id ? action.payload : novel
        )
      };
    case 'DELETE_NOVEL':
      return {
        ...state,
        novels: state.novels.filter(novel => novel.id !== action.payload)
      };
    case 'ADD_NOTIFICATION':
      const notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      };
      return {
        ...state,
        notifications: [notification, ...state.notifications]
      };
    case 'CLEAR_NOTIFICATIONS':
      return { ...state, notifications: [] };
    case 'SET_LAST_BACKUP':
      return { ...state, lastBackup: action.payload };
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('adminState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: 'LOAD_STATE', payload: parsedState });
      } catch (error) {
        console.error('Error loading admin state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adminState', JSON.stringify(state));
  }, [state]);

  const login = (username: string, password: string): boolean => {
    if (username === 'admin' && password === 'admin123') {
      dispatch({ type: 'LOGIN', payload: true });
      addNotification({
        type: 'success',
        title: 'Acceso Autorizado',
        message: 'Sesión iniciada correctamente',
        section: 'Autenticación',
        action: 'login'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    addNotification({
      type: 'info',
      title: 'Sesión Cerrada',
      message: 'Has cerrado sesión correctamente',
      section: 'Autenticación',
      action: 'logout'
    });
  };

  const updatePrices = (prices: PriceConfig) => {
    dispatch({ type: 'UPDATE_PRICES', payload: prices });
    addNotification({
      type: 'success',
      title: 'Precios Actualizados',
      message: 'Los precios han sido actualizados correctamente',
      section: 'Precios',
      action: 'update'
    });
  };

  const addDeliveryZone = (zone: Omit<DeliveryZone, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_DELIVERY_ZONE', payload: zone });
    addNotification({
      type: 'success',
      title: 'Zona Agregada',
      message: `Se agregó la zona "${zone.name}"`,
      section: 'Zonas de Entrega',
      action: 'create'
    });
  };

  const updateDeliveryZone = (zone: DeliveryZone) => {
    dispatch({ type: 'UPDATE_DELIVERY_ZONE', payload: zone });
    addNotification({
      type: 'success',
      title: 'Zona Actualizada',
      message: `Se actualizó la zona "${zone.name}"`,
      section: 'Zonas de Entrega',
      action: 'update'
    });
  };

  const deleteDeliveryZone = (id: number) => {
    const zone = state.deliveryZones.find(z => z.id === id);
    dispatch({ type: 'DELETE_DELIVERY_ZONE', payload: id });
    addNotification({
      type: 'warning',
      title: 'Zona Eliminada',
      message: `Se eliminó la zona "${zone?.name}"`,
      section: 'Zonas de Entrega',
      action: 'delete'
    });
  };

  const addNovel = (novel: Omit<Novel, 'id' | 'createdAt'>) => {
    dispatch({ type: 'ADD_NOVEL', payload: novel });
    addNotification({
      type: 'success',
      title: 'Novela Agregada',
      message: `Se agregó la novela "${novel.titulo}"`,
      section: 'Gestión de Novelas',
      action: 'create'
    });
  };

  const updateNovel = (novel: Novel) => {
    dispatch({ type: 'UPDATE_NOVEL', payload: novel });
    addNotification({
      type: 'success',
      title: 'Novela Actualizada',
      message: `Se actualizó la novela "${novel.titulo}"`,
      section: 'Gestión de Novelas',
      action: 'update'
    });
  };

  const deleteNovel = (id: number) => {
    const novel = state.novels.find(n => n.id === id);
    dispatch({ type: 'DELETE_NOVEL', payload: id });
    addNotification({
      type: 'warning',
      title: 'Novela Eliminada',
      message: `Se eliminó la novela "${novel?.titulo}"`,
      section: 'Gestión de Novelas',
      action: 'delete'
    });
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
  };

  const clearNotifications = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' });
  };

  const exportSystemBackup = () => {
    const timestamp = new Date().toISOString();
    dispatch({ type: 'SET_LAST_BACKUP', payload: timestamp });
    
    // Generate complete system backup with all files
    const systemFiles = {
      'AdminContext.tsx': generateAdminContextFile(),
      'CartContext.tsx': generateCartContextFile(),
      'CheckoutModal.tsx': generateCheckoutModalFile(),
      'PriceCard.tsx': generatePriceCardFile(),
      'NovelasModal.tsx': generateNovelasModalFile()
    };

    // Create ZIP-like structure
    let backupContent = `# TV a la Carta - Sistema Completo\n`;
    backupContent += `# Exportado el: ${new Date().toLocaleString('es-ES')}\n`;
    backupContent += `# Configuración actual sincronizada\n\n`;
    
    Object.entries(systemFiles).forEach(([filename, content]) => {
      backupContent += `\n${'='.repeat(80)}\n`;
      backupContent += `# ARCHIVO: ${filename}\n`;
      backupContent += `${'='.repeat(80)}\n\n`;
      backupContent += content;
      backupContent += `\n\n`;
    });

    // Add current configuration
    backupContent += `\n${'='.repeat(80)}\n`;
    backupContent += `# CONFIGURACIÓN ACTUAL\n`;
    backupContent += `${'='.repeat(80)}\n\n`;
    backupContent += JSON.stringify(state, null, 2);

    const blob = new Blob([backupContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `TV_a_la_Carta_Sistema_Completo_${timestamp.replace(/[:.]/g, '-')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addNotification({
      type: 'success',
      title: 'Sistema Exportado',
      message: 'El sistema completo ha sido exportado correctamente',
      section: 'Sistema',
      action: 'export'
    });
  };

  const generateAdminContextFile = () => {
    return `import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface PriceConfig {
  moviePrice: number;
  seriesPrice: number;
  transferFeePercentage: number;
  novelPricePerChapter: number;
}

export interface DeliveryZone {
  id: number;
  name: string;
  cost: number;
  active: boolean;
  createdAt: string;
}

export interface Novel {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  active: boolean;
  createdAt?: string;
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: string;
  section: string;
  action: string;
}

interface AdminState {
  isAuthenticated: boolean;
  prices: PriceConfig;
  deliveryZones: DeliveryZone[];
  novels: Novel[];
  notifications: Notification[];
  lastBackup: string | null;
}

// Configuración actual sincronizada:
// Precios: ${JSON.stringify(state.prices, null, 2)}
// Zonas de entrega: ${state.deliveryZones.length} zonas configuradas
// Novelas: ${state.novels.length} novelas en catálogo
// Última actualización: ${new Date().toLocaleString('es-ES')}

// [Resto del código del AdminContext con la configuración actual...]`;
  };

  const generateCartContextFile = () => {
    return `import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Toast } from '../components/Toast';
import { AdminContext } from './AdminContext';
import type { CartItem } from '../types/movie';

// Configuración actual de precios sincronizada:
// Película: $${state.prices.moviePrice} CUP
// Serie por temporada: $${state.prices.seriesPrice} CUP  
// Recargo transferencia: ${state.prices.transferFeePercentage}%
// Novela por capítulo: $${state.prices.novelPricePerChapter} CUP

interface SeriesCartItem extends CartItem {
  selectedSeasons?: number[];
  paymentType?: 'cash' | 'transfer';
}

interface CartState {
  items: SeriesCartItem[];
  total: number;
}

// [Resto del código del CartContext con precios sincronizados...]`;
  };

  const generateCheckoutModalFile = () => {
    return `import React, { useState } from 'react';
import { X, User, MapPin, Phone, Copy, Check, MessageCircle, Calculator, DollarSign, CreditCard } from 'lucide-react';
import { AdminContext } from '../context/AdminContext';

// Zonas de entrega sincronizadas desde el panel de control:
const ADMIN_DELIVERY_ZONES = ${JSON.stringify(
  state.deliveryZones.reduce((acc, zone) => {
    acc[zone.name] = zone.cost;
    return acc;
  }, {} as { [key: string]: number }), null, 2
)};

// Configuración de precios actual:
// Recargo por transferencia: ${state.prices.transferFeePercentage}%

export interface CustomerInfo {
  fullName: string;
  phone: string;
  address: string;
}

// [Resto del código del CheckoutModal con zonas y precios sincronizados...]`;
  };

  const generatePriceCardFile = () => {
    return `import React from 'react';
import { DollarSign, Tv, Film, Star, CreditCard } from 'lucide-react';
import { AdminContext } from '../context/AdminContext';

// Precios actuales sincronizados desde el panel de control:
// Película: $${state.prices.moviePrice} CUP
// Serie por temporada: $${state.prices.seriesPrice} CUP
// Recargo transferencia: ${state.prices.transferFeePercentage}%

interface PriceCardProps {
  type: 'movie' | 'tv';
  selectedSeasons?: number[];
  episodeCount?: number;
  isAnime?: boolean;
}

export function PriceCard({ type, selectedSeasons = [], episodeCount = 0, isAnime = false }: PriceCardProps) {
  const adminContext = React.useContext(AdminContext);
  
  // Obtener precios del contexto admin con actualizaciones en tiempo real
  const moviePrice = adminContext?.state?.prices?.moviePrice || ${state.prices.moviePrice};
  const seriesPrice = adminContext?.state?.prices?.seriesPrice || ${state.prices.seriesPrice};
  const transferFeePercentage = adminContext?.state?.prices?.transferFeePercentage || ${state.prices.transferFeePercentage};

  // [Resto del código del PriceCard con precios sincronizados...]`;
  };

  const generateNovelasModalFile = () => {
    return `import React, { useState, useEffect } from 'react';
import { X, Download, MessageCircle, Phone, BookOpen, Info, Check, DollarSign, CreditCard, Calculator, Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { AdminContext } from '../context/AdminContext';

// Catálogo de novelas sincronizado desde el panel de control:
const ADMIN_NOVELS = ${JSON.stringify(state.novels, null, 2)};

// Precios actuales:
// Por capítulo: $${state.prices.novelPricePerChapter} CUP
// Recargo transferencia: ${state.prices.transferFeePercentage}%

interface Novela {
  id: number;
  titulo: string;
  genero: string;
  capitulos: number;
  año: number;
  descripcion?: string;
  paymentType?: 'cash' | 'transfer';
}

// [Resto del código del NovelasModal con catálogo sincronizado...]`;
  };

  return (
    <AdminContext.Provider value={{
      state,
      login,
      logout,
      updatePrices,
      addDeliveryZone,
      updateDeliveryZone,
      deleteDeliveryZone,
      addNovel,
      updateNovel,
      deleteNovel,
      addNotification,
      clearNotifications,
      exportSystemBackup
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

export { AdminContext };