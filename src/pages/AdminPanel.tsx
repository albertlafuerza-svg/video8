import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Settings, DollarSign, MapPin, BookOpen, Bell, Download, Upload, FolderSync as Sync, LogOut, Save, Plus, CreditCard as Edit, Trash2, Eye, EyeOff, User, Lock, AlertCircle, CheckCircle, Info, X, Smartphone, Globe, Calendar, Monitor, Image, Camera, FileText, Code, Database, Activity, TrendingUp, Users, ShoppingCart, Package, Zap, RefreshCw, Cloud, HardDrive, Wifi, WifiOff } from 'lucide-react';

export function AdminPanel() {
  const {
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
    clearNotifications,
    exportSystemConfig,
    importSystemConfig,
    exportCompleteSourceCode,
    syncWithRemote,
    syncAllSections
  } = useAdmin();

  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'prices' | 'delivery' | 'novels' | 'notifications' | 'system'>('prices');
  const [priceForm, setPriceForm] = useState(state.prices);
  const [deliveryForm, setDeliveryForm] = useState({ name: '', cost: 0 });
  const [editingDeliveryZone, setEditingDeliveryZone] = useState<any>(null);
  const [novelForm, setNovelForm] = useState({
    titulo: '',
    genero: '',
    capitulos: 1,
    año: new Date().getFullYear(),
    descripcion: '',
    pais: '',
    imagen: '',
    estado: 'finalizada' as 'transmision' | 'finalizada'
  });
  const [editingNovel, setEditingNovel] = useState<any>(null);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Update price form when state changes
  useEffect(() => {
    setPriceForm(state.prices);
  }, [state.prices]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginForm.username, loginForm.password);
    if (!success) {
      alert('Credenciales incorrectas');
    }
  };

  const handlePriceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updatePrices(priceForm);
  };

  const handleDeliveryZoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDeliveryZone) {
      updateDeliveryZone({
        ...editingDeliveryZone,
        name: deliveryForm.name,
        cost: deliveryForm.cost
      });
      setEditingDeliveryZone(null);
    } else {
      addDeliveryZone(deliveryForm);
    }
    setDeliveryForm({ name: '', cost: 0 });
  };

  const handleEditDeliveryZone = (zone: any) => {
    setEditingDeliveryZone(zone);
    setDeliveryForm({ name: zone.name, cost: zone.cost });
  };

  const handleNovelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNovel) {
      updateNovel({
        ...editingNovel,
        ...novelForm
      });
      setEditingNovel(null);
    } else {
      addNovel(novelForm);
    }
    setNovelForm({
      titulo: '',
      genero: '',
      capitulos: 1,
      año: new Date().getFullYear(),
      descripcion: '',
      pais: '',
      imagen: '',
      estado: 'finalizada'
    });
  };

  const handleEditNovel = (novel: any) => {
    setEditingNovel(novel);
    setNovelForm({
      titulo: novel.titulo,
      genero: novel.genero,
      capitulos: novel.capitulos,
      año: novel.año,
      descripcion: novel.descripcion || '',
      pais: novel.pais || '',
      imagen: novel.imagen || '',
      estado: novel.estado || 'finalizada'
    });
  };

  const handleImportConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importFile) return;

    try {
      const text = await importFile.text();
      const config = JSON.parse(text);
      importSystemConfig(config);
      setImportFile(null);
    } catch (error) {
      alert('Error al importar la configuración. Verifica que el archivo sea válido.');
    }
  };

  const handleExportSourceCode = async () => {
    setIsExporting(true);
    try {
      await exportCompleteSourceCode();
    } catch (error) {
      alert('Error al exportar el código fuente');
    } finally {
      setIsExporting(false);
    }
  };

  const handleSyncAll = async () => {
    setIsSyncing(true);
    try {
      await syncAllSections();
    } catch (error) {
      alert('Error durante la sincronización completa');
    } finally {
      setIsSyncing(false);
    }
  };

  // Available countries for novels
  const availableCountries = [
    'Turquía',
    'México',
    'Brasil',
    'Colombia',
    'Argentina',
    'España',
    'Estados Unidos',
    'Corea del Sur',
    'India',
    'Reino Unido',
    'Francia',
    'Italia',
    'Alemania',
    'Japón',
    'China',
    'Rusia',
    'Venezuela',
    'Chile',
    'Perú',
    'Ecuador',
    'Cuba',
    'Uruguay',
    'Paraguay',
    'Bolivia',
    'Costa Rica',
    'Panamá',
    'Guatemala',
    'Honduras',
    'Nicaragua',
    'El Salvador',
    'República Dominicana',
    'Puerto Rico'
  ];

  // Available genres for novels
  const availableGenres = [
    'Drama',
    'Romance',
    'Comedia',
    'Acción',
    'Familia',
    'Suspenso',
    'Thriller',
    'Histórico',
    'Médico',
    'Legal',
    'Policial',
    'Musical',
    'Fantasía',
    'Ciencia Ficción',
    'Terror',
    'Aventura',
    'Biografía',
    'Deportes',
    'Guerra',
    'Western'
  ];

  if (!state.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white text-center">
            <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-4">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Panel de Administración</h1>
            <p className="text-blue-100">TV a la Carta</p>
          </div>
          
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu usuario"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className={`w-2 h-2 rounded-full ${state.syncStatus.isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                <span>{state.syncStatus.isOnline ? 'En línea' : 'Sin conexión'}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Notifications */}
        {state.notifications.length > 0 && (
          <div className="mb-8 space-y-2">
            {state.notifications.slice(0, 3).map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.type === 'success' ? 'bg-green-50 border-green-400 text-green-800' :
                  notification.type === 'error' ? 'bg-red-50 border-red-400 text-red-800' :
                  notification.type === 'warning' ? 'bg-yellow-50 border-yellow-400 text-yellow-800' :
                  'bg-blue-50 border-blue-400 text-blue-800'
                }`}
              >
                <div className="flex items-center">
                  {notification.type === 'success' && <CheckCircle className="h-5 w-5 mr-2" />}
                  {notification.type === 'error' && <AlertCircle className="h-5 w-5 mr-2" />}
                  {notification.type === 'warning' && <AlertCircle className="h-5 w-5 mr-2" />}
                  {notification.type === 'info' && <Info className="h-5 w-5 mr-2" />}
                  <div>
                    <p className="font-medium">{notification.title}</p>
                    <p className="text-sm">{notification.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'prices', label: 'Precios', icon: DollarSign },
                { id: 'delivery', label: 'Zonas de Entrega', icon: MapPin },
                { id: 'novels', label: 'Gestión de Novelas', icon: BookOpen },
                { id: 'notifications', label: 'Notificaciones', icon: Bell },
                { id: 'system', label: 'Sistema', icon: Settings }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Prices Tab */}
            {activeTab === 'prices' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración de Precios</h2>
                <form onSubmit={handlePriceUpdate} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio de Películas (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.moviePrice}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, moviePrice: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio de Series por Temporada (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.seriesPrice}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, seriesPrice: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recargo por Transferencia (%)
                      </label>
                      <input
                        type="number"
                        value={priceForm.transferFeePercentage}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, transferFeePercentage: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        max="100"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Precio de Novelas por Capítulo (CUP)
                      </label>
                      <input
                        type="number"
                        value={priceForm.novelPricePerChapter}
                        onChange={(e) => setPriceForm(prev => ({ ...prev, novelPricePerChapter: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Precios
                  </button>
                </form>
              </div>
            )}

            {/* Delivery Zones Tab */}
            {activeTab === 'delivery' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Zonas de Entrega</h2>
                
                <form onSubmit={handleDeliveryZoneSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingDeliveryZone ? 'Editar Zona' : 'Agregar Nueva Zona'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Zona
                      </label>
                      <input
                        type="text"
                        value={deliveryForm.name}
                        onChange={(e) => setDeliveryForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Santiago de Cuba > Centro"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Costo de Entrega (CUP)
                      </label>
                      <input
                        type="number"
                        value={deliveryForm.cost}
                        onChange={(e) => setDeliveryForm(prev => ({ ...prev, cost: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-3 mt-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingDeliveryZone ? 'Actualizar' : 'Agregar'}
                    </button>
                    
                    {editingDeliveryZone && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingDeliveryZone(null);
                          setDeliveryForm({ name: '', cost: 0 });
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                <div className="space-y-4">
                  {state.deliveryZones.map((zone) => (
                    <div key={zone.id} className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">{zone.name}</h4>
                        <p className="text-sm text-gray-600">${zone.cost.toLocaleString()} CUP</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditDeliveryZone(zone)}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteDeliveryZone(zone.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Novels Tab */}
            {activeTab === 'novels' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestión de Novelas</h2>
                
                <form onSubmit={handleNovelSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    {editingNovel ? 'Editar Novela' : 'Agregar Nueva Novela'}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título de la Novela
                      </label>
                      <input
                        type="text"
                        value={novelForm.titulo}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, titulo: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: El Turco"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Género
                      </label>
                      <select
                        value={novelForm.genero}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, genero: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Seleccionar género</option>
                        {availableGenres.map(genre => (
                          <option key={genre} value={genre}>{genre}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Número de Capítulos
                      </label>
                      <input
                        type="number"
                        value={novelForm.capitulos}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, capitulos: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Año
                      </label>
                      <input
                        type="number"
                        value={novelForm.año}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, año: parseInt(e.target.value) }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1900"
                        max={new Date().getFullYear() + 5}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        País
                      </label>
                      <select
                        value={novelForm.pais}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, pais: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Seleccionar país</option>
                        {availableCountries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estado
                      </label>
                      <select
                        value={novelForm.estado}
                        onChange={(e) => setNovelForm(prev => ({ ...prev, estado: e.target.value as 'transmision' | 'finalizada' }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="finalizada">Finalizada</option>
                        <option value="transmision">En Transmisión</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL de Imagen (opcional)
                    </label>
                    <input
                      type="url"
                      value={novelForm.imagen}
                      onChange={(e) => setNovelForm(prev => ({ ...prev, imagen: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción
                    </label>
                    <textarea
                      value={novelForm.descripcion}
                      onChange={(e) => setNovelForm(prev => ({ ...prev, descripcion: e.target.value }))}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      placeholder="Descripción de la novela..."
                    />
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {editingNovel ? 'Actualizar' : 'Agregar'} Novela
                    </button>
                    
                    {editingNovel && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingNovel(null);
                          setNovelForm({
                            titulo: '',
                            genero: '',
                            capitulos: 1,
                            año: new Date().getFullYear(),
                            descripcion: '',
                            pais: '',
                            imagen: '',
                            estado: 'finalizada'
                          });
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Novelas Registradas ({state.novels.length})
                  </h3>
                  {state.novels.map((novel) => (
                    <div key={novel.id} className="bg-white p-6 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h4 className="font-semibold text-gray-900 text-lg mr-3">{novel.titulo}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              novel.estado === 'transmision' 
                                ? 'bg-red-100 text-red-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {novel.estado === 'transmision' ? '📡 En Transmisión' : '✅ Finalizada'}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                            <div>
                              <span className="font-medium">Género:</span> {novel.genero}
                            </div>
                            <div>
                              <span className="font-medium">Capítulos:</span> {novel.capitulos}
                            </div>
                            <div>
                              <span className="font-medium">Año:</span> {novel.año}
                            </div>
                            <div>
                              <span className="font-medium">País:</span> {novel.pais || 'No especificado'}
                            </div>
                          </div>
                          {novel.descripcion && (
                            <p className="text-gray-600 text-sm line-clamp-2">{novel.descripcion}</p>
                          )}
                          <div className="mt-3 text-sm text-gray-500">
                            <span className="font-medium">Precio:</span> ${(novel.capitulos * state.prices.novelPricePerChapter).toLocaleString()} CUP
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => handleEditNovel(novel)}
                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteNovel(novel.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Notificaciones del Sistema</h2>
                  <button
                    onClick={clearNotifications}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpiar Todas
                  </button>
                </div>
                
                <div className="space-y-3">
                  {state.notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No hay notificaciones</p>
                    </div>
                  ) : (
                    state.notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          notification.type === 'success' ? 'bg-green-50 border-green-400' :
                          notification.type === 'error' ? 'bg-red-50 border-red-400' :
                          notification.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                          'bg-blue-50 border-blue-400'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start">
                            {notification.type === 'success' && <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5" />}
                            {notification.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />}
                            {notification.type === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />}
                            {notification.type === 'info' && <Info className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />}
                            <div>
                              <h4 className="font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span>Sección: {notification.section}</span>
                                <span>Acción: {notification.action}</span>
                                <span>{new Date(notification.timestamp).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* System Tab */}
            {activeTab === 'system' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuración del Sistema</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* System Status */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                      <Activity className="h-5 w-5 mr-2" />
                      Estado del Sistema
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Versión:</span>
                        <span className="font-medium text-blue-900">{state.systemConfig.version}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Última sincronización:</span>
                        <span className="font-medium text-blue-900">
                          {new Date(state.syncStatus.lastSync).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Estado de conexión:</span>
                        <div className="flex items-center">
                          {state.syncStatus.isOnline ? (
                            <>
                              <Wifi className="h-4 w-4 text-green-600 mr-1" />
                              <span className="font-medium text-green-600">En línea</span>
                            </>
                          ) : (
                            <>
                              <WifiOff className="h-4 w-4 text-red-600 mr-1" />
                              <span className="font-medium text-red-600">Sin conexión</span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-700">Cambios pendientes:</span>
                        <span className="font-medium text-blue-900">{state.syncStatus.pendingChanges}</span>
                      </div>
                    </div>
                  </div>

                  {/* System Statistics */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Estadísticas
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-green-700">Zonas de entrega:</span>
                        <span className="font-medium text-green-900">{state.deliveryZones.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-700">Novelas registradas:</span>
                        <span className="font-medium text-green-900">{state.novels.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-700">Notificaciones:</span>
                        <span className="font-medium text-green-900">{state.notifications.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-green-700">Última exportación:</span>
                        <span className="font-medium text-green-900 text-xs">
                          {state.systemConfig.lastExport ? new Date(state.systemConfig.lastExport).toLocaleDateString() : 'Nunca'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <button
                    onClick={exportSystemConfig}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
                  >
                    <Download className="h-8 w-8 mb-3" />
                    <span className="text-lg font-semibold">Exportar Configuración</span>
                    <span className="text-sm opacity-90 mt-1">Descargar JSON</span>
                  </button>

                  <button
                    onClick={handleExportSourceCode}
                    disabled={isExporting}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white p-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
                  >
                    {isExporting ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-3"></div>
                    ) : (
                      <Code className="h-8 w-8 mb-3" />
                    )}
                    <span className="text-lg font-semibold">
                      {isExporting ? 'Exportando...' : 'Exportar Código'}
                    </span>
                    <span className="text-sm opacity-90 mt-1">Sistema completo</span>
                  </button>

                  <button
                    onClick={handleSyncAll}
                    disabled={isSyncing}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white p-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex flex-col items-center"
                  >
                    {isSyncing ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-3"></div>
                    ) : (
                      <RefreshCw className="h-8 w-8 mb-3" />
                    )}
                    <span className="text-lg font-semibold">
                      {isSyncing ? 'Sincronizando...' : 'Sincronizar Todo'}
                    </span>
                    <span className="text-sm opacity-90 mt-1">Actualizar sistema</span>
                  </button>
                </div>

                {/* Import Configuration */}
                <div className="mt-8 bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    Importar Configuración
                  </h3>
                  <form onSubmit={handleImportConfig} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Archivo de Configuración JSON
                      </label>
                      <input
                        type="file"
                        accept=".json"
                        onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!importFile}
                      className="bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Importar Configuración
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}