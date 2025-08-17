// Archivo generado automáticamente el 2025-08-17T13:05:15.573Z
// NovelasModal con configuración actual aplicada

import React, { useState, useEffect } from 'react';
import { X, Download, MessageCircle, Phone, BookOpen, Info, Check, DollarSign, CreditCard, Calculator } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

// Catálogo de novelas actual aplicado
const CURRENT_NOVELAS_CATALOG = [
  {
    "id": 1,
    "titulo": "Corazón Salvaje 2026",
    "genero": "Drama/Romance",
    "capitulos": 185,
    "año": 2009,
    "costoEfectivo": 925,
    "costoTransferencia": 1018
  },
  {
    "id": 2,
    "titulo": "La Usurpadora",
    "genero": "Drama/Melodrama",
    "capitulos": 98,
    "año": 1998,
    "costoEfectivo": 490,
    "costoTransferencia": 539
  },
  {
    "id": 3,
    "titulo": "María la del Barrio",
    "genero": "Drama/Romance",
    "capitulos": 73,
    "año": 1995,
    "costoEfectivo": 365,
    "costoTransferencia": 402
  },
  {
    "id": 4,
    "titulo": "Marimar",
    "genero": "Drama/Romance",
    "capitulos": 63,
    "año": 1994,
    "costoEfectivo": 315,
    "costoTransferencia": 347
  },
  {
    "id": 5,
    "titulo": "Rosalinda",
    "genero": "Drama/Romance",
    "capitulos": 80,
    "año": 1999,
    "costoEfectivo": 400,
    "costoTransferencia": 440
  },
  {
    "id": 6,
    "titulo": "La Madrastra",
    "genero": "Drama/Suspenso",
    "capitulos": 135,
    "año": 2005,
    "costoEfectivo": 675,
    "costoTransferencia": 743
  },
  {
    "id": 7,
    "titulo": "Rubí",
    "genero": "Drama/Melodrama",
    "capitulos": 115,
    "año": 2004,
    "costoEfectivo": 575,
    "costoTransferencia": 633
  },
  {
    "id": 8,
    "titulo": "Pasión de Gavilanes",
    "genero": "Drama/Romance",
    "capitulos": 188,
    "año": 2003,
    "costoEfectivo": 940,
    "costoTransferencia": 1034
  },
  {
    "id": 9,
    "titulo": "Yo Soy Betty, la Fea",
    "genero": "Comedia/Romance",
    "capitulos": 335,
    "año": 1999,
    "costoEfectivo": 1675,
    "costoTransferencia": 1843
  },
  {
    "id": 10,
    "titulo": "El Cuerpo del Deseo",
    "genero": "Drama/Fantasía",
    "capitulos": 178,
    "año": 2005,
    "costoEfectivo": 890,
    "costoTransferencia": 979
  }
];

// Configuración de precios actual
const CURRENT_PRICING_CONFIG = {
  "moviePrice": 80,
  "seriesPrice": 300,
  "transferFeePercentage": 10
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
  // Implementación con catálogo actual aplicado
  // Total de novelas: 10
  // Recargo por transferencia: 10%
  
  return (
    // JSX del NovelasModal con configuración actual aplicada
    <div>NovelasModal con configuración actual</div>
  );
}