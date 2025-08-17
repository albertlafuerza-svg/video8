// Archivo generado automáticamente el 2025-08-17T13:05:15.073Z
// CheckoutModal con configuración actual aplicada

import React, { useState } from 'react';
import { X, User, MapPin, Phone, Copy, Check, MessageCircle, Calculator, DollarSign, CreditCard } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// Configuración de precios actual aplicada
const CURRENT_PRICING = {
  "moviePrice": 80,
  "seriesPrice": 300,
  "transferFeePercentage": 10
};

// Zonas de entrega actuales aplicadas
const CURRENT_DELIVERY_ZONES = [
  {
    "id": 1,
    "name": "Por favor seleccionar su Barrio/Zona",
    "fullPath": "Por favor seleccionar su Barrio/Zona",
    "cost": 0,
    "active": true
  },
  {
    "id": 2,
    "name": "Nuevo Vista Alegre",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Nuevo Vista Alegre",
    "cost": 200,
    "active": true
  },
  {
    "id": 3,
    "name": "Vista Alegre",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Vista Alegre",
    "cost": 300,
    "active": true
  },
  {
    "id": 4,
    "name": "Reparto Sueño",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Reparto Sueño",
    "cost": 250,
    "active": true
  },
  {
    "id": 5,
    "name": "San Pedrito",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > San Pedrito",
    "cost": 150,
    "active": true
  },
  {
    "id": 6,
    "name": "Altamira",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Altamira",
    "cost": 300,
    "active": true
  },
  {
    "id": 7,
    "name": "Micro 7, 8 , 9",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Micro 7, 8 , 9",
    "cost": 150,
    "active": true
  },
  {
    "id": 8,
    "name": "Alameda",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Alameda",
    "cost": 150,
    "active": true
  },
  {
    "id": 9,
    "name": "El Caney",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > El Caney",
    "cost": 800,
    "active": true
  },
  {
    "id": 10,
    "name": "Quintero",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Quintero",
    "cost": 200,
    "active": true
  },
  {
    "id": 11,
    "name": "Marimon",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Marimon",
    "cost": 100,
    "active": true
  },
  {
    "id": 12,
    "name": "Los cangrejitos",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Los cangrejitos",
    "cost": 150,
    "active": true
  },
  {
    "id": 13,
    "name": "Trocha",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Trocha",
    "cost": 200,
    "active": true
  },
  {
    "id": 14,
    "name": "Versalles",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Versalles",
    "cost": 800,
    "active": true
  },
  {
    "id": 15,
    "name": "Reparto Portuondo",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Reparto Portuondo",
    "cost": 600,
    "active": true
  },
  {
    "id": 16,
    "name": "30 de Noviembre",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > 30 de Noviembre",
    "cost": 600,
    "active": true
  },
  {
    "id": 17,
    "name": "Rajayoga",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Rajayoga",
    "cost": 800,
    "active": true
  },
  {
    "id": 18,
    "name": "Antonio Maceo",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Antonio Maceo",
    "cost": 600,
    "active": true
  },
  {
    "id": 19,
    "name": "Los Pinos",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Los Pinos",
    "cost": 200,
    "active": true
  },
  {
    "id": 20,
    "name": "Distrito José Martí",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Distrito José Martí",
    "cost": 100,
    "active": true
  },
  {
    "id": 21,
    "name": "Cobre",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Cobre",
    "cost": 800,
    "active": true
  },
  {
    "id": 22,
    "name": "El Parque Céspedes",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > El Parque Céspedes",
    "cost": 200,
    "active": true
  },
  {
    "id": 23,
    "name": "Carretera del Morro",
    "fullPath": "Santiago de Cuba > Santiago de Cuba > Carretera del Morro",
    "cost": 300,
    "active": true
  }
];

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
  // Implementación con configuración actual aplicada
  // Precios: Película $80 CUP, Serie $300 CUP por temporada
  // Recargo transferencia: 10%
  // Zonas disponibles: 23 zonas activas
  
  return (
    // JSX del CheckoutModal con configuración actual aplicada
    <div>CheckoutModal con configuración actual</div>
  );
}