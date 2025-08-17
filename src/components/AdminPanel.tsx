// Archivo generado automáticamente el 2025-08-17T13:05:14.573Z
// AdminPanel con configuración actual aplicada

import React, { useState } from 'react';
import { X, Settings, DollarSign, BookOpen, Download, Upload, RotateCcw, Save, Plus, Edit3, Trash2, Eye, EyeOff, MapPin, FileCode, CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { NovelasConfig, DeliveryZoneConfig } from '../types/admin';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  // Configuración actual aplicada: {
  "moviePrice": 80,
  "seriesPrice": 300,
  "transferFeePercentage": 10
}
  // Total de novelas: 10
  // Zonas de entrega activas: 23
  
  // ... resto de la implementación del AdminPanel
  
  return (
    // JSX del AdminPanel con configuración actual aplicada
    <div>AdminPanel con configuración actual</div>
  );
}