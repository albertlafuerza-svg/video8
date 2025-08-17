// Archivo generado automáticamente el 2025-08-17T13:47:44.996Z
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
  // Precios: Película $90 CUP, Serie $400 CUP/temp, Transferencia +15%
  // Total de novelas: 11
  // Zonas de entrega activas: 23
  
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
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                activeTab === 'pricing'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Control de Precios
            </button>
            <button
              onClick={() => setActiveTab('novelas')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                activeTab === 'novelas'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Gestión de Novelas
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                activeTab === 'delivery'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Zonas de Entrega
            </button>
            <button
              onClick={() => setActiveTab('backup')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                activeTab === 'backup'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-white/50'
              }`}
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
                  <p className="text-sm text-blue-700">Película: $90 CUP</p>
                  <p className="text-sm text-blue-700">Serie: $400 CUP/temp</p>
                  <p className="text-sm text-blue-700">Transferencia: +15%</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Catálogo</h4>
                  <p className="text-sm text-blue-700">Novelas: 11</p>
                  <p className="text-sm text-blue-700">Zonas activas: 23</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Estado</h4>
                  <p className="text-sm text-blue-700">Sistema: Operativo</p>
                  <p className="text-sm text-blue-700">Última actualización: 17/8/2025, 9:47:44</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}