// Datos de novelas extraídos del documento
const NOVELAS_DATA = [
  {
    id: 1,
    titulo: "Abrazame muy fuerte",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una emotiva historia de amor que toca el corazón",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 2,
    titulo: "Acorralada",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Una intensa historia de supervivencia y determinación",
    imagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 3,
    titulo: "Alma de Hierro",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "La fortaleza del espíritu humano ante las adversidades",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 4,
    titulo: "Amarte es mi pecado",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una pasión prohibida que desafía todas las convenciones",
    imagen: "https://images.unsplash.com/photo-1518621012118-1d30fb4aa8ab?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 5,
    titulo: "Amores verdaderos",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Historias entrelazadas de amor auténtico y duradero",
    imagen: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 6,
    titulo: "Antes muerta que Lichita",
    autor: "Autor no especificado",
    genero: "Comedia",
    año: "2021",
    descripcion: "Una divertida historia de transformación personal",
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 7,
    titulo: "Asi en el barrio como en el cielo",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "La vida cotidiana en el barrio con sus alegrías y penas",
    imagen: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 8,
    titulo: "Bajo el mismo cielo",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Destinos que se cruzan bajo un mismo firmamento",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 9,
    titulo: "Caer en tentacion",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Las consecuencias de ceder ante la tentación",
    imagen: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 10,
    titulo: "Camelia la texana",
    autor: "Autor no especificado",
    genero: "Acción",
    año: "2021",
    descripcion: "La historia de una mujer valiente en territorio peligroso",
    imagen: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 11,
    titulo: "Corazon indomable",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Un corazón que no se deja vencer por las circunstancias",
    imagen: "https://images.unsplash.com/photo-1518621012118-1d30fb4aa8ab?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 12,
    titulo: "Corazon que miente",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Secretos y mentiras que complican el amor verdadero",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 13,
    titulo: "Corona de lagrimas",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Una historia de sacrificio y dolor maternal",
    imagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 14,
    titulo: "Cuando me enamoro",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "El despertar del amor en circunstancias inesperadas",
    imagen: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 15,
    titulo: "Cuidado con el angel",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una historia angelical que transforma vidas",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 16,
    titulo: "De que te quiero te quiero",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una declaración de amor que supera todos los obstáculos",
    imagen: "https://images.unsplash.com/photo-1518621012118-1d30fb4aa8ab?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 17,
    titulo: "Destilando amor",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "El amor se destila gota a gota como el mejor tequila",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 18,
    titulo: "Dos hogares",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "La complejidad de pertenecer a dos mundos diferentes",
    imagen: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 19,
    titulo: "El color de la pasion",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una pasión que pinta la vida de colores intensos",
    imagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 20,
    titulo: "El hotel de los secretos",
    autor: "Autor no especificado",
    genero: "Misterio",
    año: "2021",
    descripcion: "Un hotel donde cada habitación guarda un secreto",
    imagen: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=600&fit=crop&crop=center"
  },
  // Continúo con más novelas basadas en el documento...
  {
    id: 21,
    titulo: "El maleficio",
    autor: "Autor no especificado",
    genero: "Suspenso",
    año: "2021",
    descripcion: "Una maldición que persigue a través de generaciones",
    imagen: "https://images.unsplash.com/photo-1518621012118-1d30fb4aa8ab?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 22,
    titulo: "El privilegio de amar",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "El amor como el mayor privilegio de la vida",
    imagen: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 23,
    titulo: "El vuelo del aguila",
    autor: "Autor no especificado",
    genero: "Aventura",
    año: "2021",
    descripcion: "Una historia de libertad y determinación",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 24,
    titulo: "En nombre del amor",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Todo lo que se hace en nombre del amor verdadero",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 25,
    titulo: "Esperanza del corazon",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "La esperanza como motor de la vida",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 26,
    titulo: "Fuego en la sangre",
    autor: "Autor no especificado",
    genero: "Pasión",
    año: "2021",
    descripcion: "Una pasión ardiente que consume todo a su paso",
    imagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 27,
    titulo: "Hasta el fin del mundo",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Un amor que perdura hasta el fin del mundo",
    imagen: "https://images.unsplash.com/photo-1518621012118-1d30fb4aa8ab?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 28,
    titulo: "La casa de las flores",
    autor: "Autor no especificado",
    genero: "Comedia",
    año: "2021",
    descripcion: "Una familia peculiar en una casa llena de secretos",
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 29,
    titulo: "La fuerza del destino",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Cuando el destino marca el camino a seguir",
    imagen: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 30,
    titulo: "La madrastra",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Los desafíos de formar una nueva familia",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 31,
    titulo: "La malquerida",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Una mujer marcada por el desprecio y la incomprensión",
    imagen: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 32,
    titulo: "La que no podia amar",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una mujer que debe aprender a amar nuevamente",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 33,
    titulo: "La rosa de Guadalupe",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Historias de fe, esperanza y milagros cotidianos",
    imagen: "https://images.unsplash.com/photo-1518621012118-1d30fb4aa8ab?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 34,
    titulo: "La usurpadora",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Una identidad robada que cambia dos destinos",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 35,
    titulo: "Las tontas no van al cielo",
    autor: "Autor no especificado",
    genero: "Comedia",
    año: "2021",
    descripcion: "La inteligencia femenina triunfa sobre la apariencia",
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 36,
    titulo: "Lo que la vida me robo",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Recuperando lo que la vida nos ha quitado",
    imagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 37,
    titulo: "Los miserables",
    autor: "Victor Hugo",
    genero: "Drama",
    año: "Clásico",
    descripcion: "La obra maestra de Victor Hugo sobre redención y justicia",
    imagen: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 38,
    titulo: "Marimar",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una historia de amor que supera las diferencias sociales",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 39,
    titulo: "Mi corazon es tuyo",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una entrega total del corazón al amor verdadero",
    imagen: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 40,
    titulo: "Muchacha italiana viene a casarse",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Una italiana que llega a México en busca del amor",
    imagen: "https://images.unsplash.com/photo-1518621012118-1d30fb4aa8ab?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 41,
    titulo: "Ni contigo ni sin ti",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "La complejidad de un amor imposible de definir",
    imagen: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 42,
    titulo: "Pasion de gavilanes",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Tres hermanos y su búsqueda de amor y venganza",
    imagen: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 43,
    titulo: "Por amar sin ley",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Un amor que desafía todas las reglas establecidas",
    imagen: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 44,
    titulo: "Que te perdone Dios",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "La búsqueda del perdón divino y humano",
    imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 45,
    titulo: "Quiero amarte",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "El deseo profundo de amar y ser amado",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 46,
    titulo: "Rebelde",
    autor: "Autor no especificado",
    genero: "Juvenil",
    año: "2021",
    descripcion: "Jóvenes que desafían las normas en busca de su identidad",
    imagen: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 47,
    titulo: "Rosario tijeras",
    autor: "Jorge Franco",
    genero: "Drama",
    año: "2021",
    descripcion: "La historia de una mujer marcada por la violencia",
    imagen: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 48,
    titulo: "Sortilegio",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "Un hechizo de amor que cambia destinos",
    imagen: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 49,
    titulo: "Teresa",
    autor: "Autor no especificado",
    genero: "Drama",
    año: "2021",
    descripcion: "Una mujer ambiciosa que busca cambiar su destino",
    imagen: "https://images.unsplash.com/photo-1518621012118-1d30fb4aa8ab?w=400&h=600&fit=crop&crop=center"
  },
  {
    id: 50,
    titulo: "Triunfo del amor",
    autor: "Autor no especificado",
    genero: "Romance",
    año: "2021",
    descripcion: "El amor que triunfa sobre todas las adversidades",
    imagen: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center"
  }
];

export async function generateNovelCatalog(onProgress?: (progress: number) => void): Promise<Blob> {
  const totalSteps = NOVELAS_DATA.length + 10; // +10 para pasos adicionales
  let currentStep = 0;

  const updateProgress = () => {
    currentStep++;
    const progress = Math.min((currentStep / totalSteps) * 100, 100);
    if (onProgress) {
      onProgress(progress);
    }
  };

  // Generar HTML del catálogo
  let htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo de Novelas - TV a la Carta</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            text-align: center;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 40px 20px;
            margin-bottom: 30px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .header h1 {
            font-size: 3rem;
            font-weight: bold;
            background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #667eea 100%);
            background-size: 200% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: gradientShift 3s ease-in-out infinite;
            margin-bottom: 10px;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .header p {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 20px;
        }
        
        .pricing-info {
            background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%);
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
            border: 2px solid #fdcb6e;
        }
        
        .pricing-info h3 {
            color: #2d3436;
            font-size: 1.5rem;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .contact-info {
            background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
            color: white;
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
        }
        
        .phone-numbers {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
            margin-top: 15px;
        }
        
        .phone-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 12px 20px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .phone-btn:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .novels-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 25px;
            margin-top: 30px;
        }
        
        .novel-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .novel-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        .novel-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-bottom: 3px solid #667eea;
        }
        
        .novel-content {
            padding: 20px;
        }
        
        .novel-title {
            font-size: 1.3rem;
            font-weight: bold;
            color: #2d3436;
            margin-bottom: 10px;
            line-height: 1.3;
        }
        
        .novel-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .meta-tag {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .novel-description {
            color: #636e72;
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 15px;
        }
        
        .novel-price {
            background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
            color: white;
            padding: 10px;
            border-radius: 10px;
            text-align: center;
            font-weight: bold;
            font-size: 1.1rem;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            background: linear-gradient(135deg, #667eea, #764ba2);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .stat-label {
            color: #636e72;
            font-weight: 500;
            margin-top: 5px;
        }
        
        .footer {
            text-align: center;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 30px;
            margin-top: 40px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }
        
        .footer h3 {
            color: #2d3436;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .footer p {
            color: #636e72;
            margin-bottom: 10px;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .novels-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 20px;
            }
            
            .phone-numbers {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📚 Catálogo de Novelas</h1>
            <p><strong>TV a la Carta</strong> - Su entretenimiento favorito</p>
            
            <div class="pricing-info">
                <h3>💰 Información de Precios</h3>
                <p><strong>Costo por capítulo:</strong> $5 CUP</p>
                <p><strong>Modalidad:</strong> Se encargan novelas completas</p>
                <p><strong>Nota:</strong> Los precios pueden variar cada año</p>
            </div>
            
            <div class="contact-info">
                <h3>📞 Contacto del Asistente</h3>
                <p>Para realizar su pedido, póngase en contacto con nuestro asistente.</p>
                <p>Nuestro equipo se pondrá de acuerdo con usted.</p>
                
                <div class="phone-numbers">
                    <a href="tel:+5354690878" class="phone-btn">
                        📱 +53 5469 0878 (Principal)
                    </a>
                    <a href="tel:+5353736290" class="phone-btn">
                        📞 +53 5373 6290 (Secundario)
                    </a>
                </div>
            </div>
        </div>
        
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number">${NOVELAS_DATA.length}</div>
                <div class="stat-label">Novelas Disponibles</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${new Set(NOVELAS_DATA.map(n => n.genero)).size}</div>
                <div class="stat-label">Géneros Diferentes</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">HD</div>
                <div class="stat-label">Calidad de Imagen</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">100%</div>
                <div class="stat-label">Compatible</div>
            </div>
        </div>
        
        <div class="novels-grid">`;

  updateProgress(); // Inicio

  // Generar cada tarjeta de novela
  for (const novela of NOVELAS_DATA) {
    htmlContent += `
            <div class="novel-card">
                <img src="${novela.imagen}" alt="${novela.titulo}" class="novel-image" loading="lazy">
                <div class="novel-content">
                    <h3 class="novel-title">${novela.titulo}</h3>
                    <div class="novel-meta">
                        <span class="meta-tag">📖 ${novela.genero}</span>
                        <span class="meta-tag">👤 ${novela.autor}</span>
                        <span class="meta-tag">📅 ${novela.año}</span>
                    </div>
                    <p class="novel-description">${novela.descripcion}</p>
                    <div class="novel-price">
                        💰 $5 CUP por capítulo
                    </div>
                </div>
            </div>`;
    
    updateProgress();
    
    // Pequeña pausa para simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  htmlContent += `
        </div>
        
        <div class="footer">
            <h3>🌟 TV a la Carta</h3>
            <p>Su entretenimiento favorito al alcance de sus manos</p>
            <p>📅 Catálogo generado el: ${new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p>📱 Compatible con móviles, tablets, PC y laptops</p>
            <p>🔄 Contenido actualizado regularmente</p>
            
            <div style="margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%); border-radius: 10px;">
                <p style="color: #2d3436; font-weight: bold;">
                    📞 Para pedidos: +53 5469 0878 | +53 5373 6290
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;

  updateProgress(); // Finalización

  // Crear blob con el HTML
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  
  updateProgress(); // Completado
  
  return blob;
}