import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

interface ExperienciaTech {
  empresa: string;
  puesto: string;
  periodo: string;
  descripcion: string;
  destacado?: boolean;
  tecnologias: string[];
}

interface OtraExperiencia {
  puesto: string;
  descripcion: string;
  softSkill: string;
}

interface Skill {
  nombre: string;
  porcentaje: number;
}

interface CategoriaSkill {
  titulo: string;
  items: Skill[];
}

interface Estudio {
  titulo: string;
  centro: string;
  periodo: string;
  certificadoUrl?: string;
}

interface Idioma {
  nombre: string;
  nivel: string;
  detalle: string;
}

export interface Proyecto {
  titulo: string;
  descripcion: string;
  tecnologias: string[];
  estado: 'publicado' | 'personal' | 'en-desarrollo';
  estadoLabel: string;
  imagen?: string;
  urlWeb?: string;
  urlGithub?: string;
  linksTelegram?: { titulo: string; url: string }[];
  esGit?: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  nombre = 'Ramón Valls';
  titulo = 'Desarrollador Software';
  sobreMi = 'Graduado en Ingeniería Informática. Apasionado de la informática y el desarrollo web. Me considero una persona resolutiva, con facilidad para adaptarme a nuevos entornos y con ganas de aportar valor técnico.';
   
  tiempoExperiencia: string = '';
  private timerInterval: any;

  email = 'ramonprotic@outlook.es';
  mostrarModalContacto = false;
  emailCopiado = false;

  abrirModalContacto() {
    this.mostrarModalContacto = true;
  }

  cerrarModalContacto() {
    this.mostrarModalContacto = false;
  }

  copiarEmail() {
    navigator.clipboard.writeText(this.email);
    this.emailCopiado = true;
    setTimeout(() => {
      this.emailCopiado = false;
    }, 2000);
  }

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.calcularTiempoExperiencia();
    // Actualiza cada segundo en vivo
    this.timerInterval = setInterval(() => {
      this.calcularTiempoExperiencia();
      this.cd.detectChanges();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  calcularTiempoExperiencia() {
    // 📅 Fecha de inicio: 9 de Septiembre de 2025 (Mes 8 en JS porque Enero es 0)
    const fechaInicio = new Date(2025, 8, 9, 0, 0, 0); 
    const ahora = new Date();

    // 💡 OPCIONAL: Si quieres sumarle los ~5 meses previos de Calima Solutions (Feb-Jun 2025):
    const msCalima = 5 * 30.4375 * 24 * 60 * 60 * 1000; // ~5 meses en milisegundos
    
    // Milisegundos totales transcurridos (quita "+ msCalima" si solo quieres contar desde Septiembre 2025)
    let diffMs = (ahora.getTime() - fechaInicio.getTime()) + msCalima;

    if (diffMs < 0) diffMs = 0;

    // Desglose de tiempo
    const segundosTotales = Math.floor(diffMs / 1000);
    const minutosTotales = Math.floor(segundosTotales / 60);
    const horasTotales = Math.floor(minutosTotales / 60);
    const diasTotales = Math.floor(horasTotales / 24);

    // Conversión a Años, Meses y Días
    const anios = Math.floor(diasTotales / 365.25);
    const diasRestantesAnio = diasTotales % 365.25;
    const meses = Math.floor(diasRestantesAnio / 30.4375);
    const dias = Math.floor(diasRestantesAnio % 30.4375);

    const horas = horasTotales % 24;
    const minutos = minutosTotales % 60;
    const segundos = segundosTotales % 60;

    // Formato con ceros a la izquierda
    const hStr = horas < 10 ? '0' + horas : horas;
    const mStr = minutos < 10 ? '0' + minutos : minutos;
    const sStr = segundos < 10 ? '0' + segundos : segundos;

    // Construcción del string
    const textoAnios = anios > 0 ? `${anios} año${anios > 1 ? 's' : ''}, ` : '';
    const textoMeses = `${meses} mes${meses !== 1 ? 'es' : ''}`;

    this.tiempoExperiencia = `${textoAnios}${textoMeses}, ${dias}d : ${hStr}h : ${mStr}m : ${sStr}s`;
  }
  
  categoriasSkills: CategoriaSkill[] = [
    {
      titulo: '🌐 Frontend & Desarrollo Web',
      items: [
        { nombre: 'Angular (TS, HTML, CSS)', porcentaje: 95 },
        { nombre: 'React / JavaScript', porcentaje: 85 },
        { nombre: 'Laravel', porcentaje: 75 }
      ]
    },
    {
      titulo: '⚙️ Backend & Base de Datos',
      items: [
        { nombre: 'C# / Java', porcentaje: 90 },
        { nombre: 'MySQL', porcentaje: 90 },
        { nombre: 'Firebase', porcentaje: 98 },
        { nombre: 'C', porcentaje: 50 },
        { nombre: 'Python', porcentaje: 55 }
      ]
    },
    {
      titulo: '🛠️ DevOps & Herramientas',
      items: [
        { nombre: 'GitHub', porcentaje: 98 },
        { nombre: 'Jira', porcentaje: 98 },
        { nombre: 'Scripts', porcentaje: 95 },
        { nombre: 'AWS', porcentaje: 60 },
        { nombre: 'Docker', porcentaje: 30 }
      ]
    },
    {
      titulo: '🎮 Videojuegos & Datos',
      items: [
        { nombre: 'Unity', porcentaje: 75 },
        { nombre: 'Phaser', porcentaje: 50 },
        { nombre: 'Pandas', porcentaje: 40 }
      ]
    }
  ];

  estudios: Estudio[] = [
    {
      titulo: 'Grado en Ingeniería Informática',
      centro: 'Universidad Las Palmas de Gran Canaria',
      periodo: ''
    },
    {
      titulo: 'Curso de Inteligencia Empresarial (Business Intelligence)',
      centro: 'Academia Adams',
      periodo: '',
      certificadoUrl: '/Certificado_Final_GDPymes_Inteligencia_Empresarial.pdf'
    }
  ];

  idiomas: Idioma[] = [
    { nombre: 'Español', nivel: 'Nativo', detalle: 'Lengua materna.' },
    { nombre: 'Inglés', nivel: 'B2 / C1 (Competencia Operativa)', detalle: 'Acreditado B1, pero con más de un año de experiencia real trabajando a diario para una empresa alemana.' },
    { nombre: 'Italiano', nivel: 'A2 / B1 (Intermedio bajo)', detalle: 'Un año de residencia en Italia (experiencia de inmersión lingüística y cultural).' }
  ];

  //De informático
  // 1. Cambia 'estudiosYTech' por 'experienciaTech'
  experienciaTech: ExperienciaTech[] = [
    {
      empresa: 'Calima Solutions',
      puesto: 'Desarrollador FullStack',
      periodo: 'Febrero 2025 - Septiembre 2025',
      descripcion: 'Desarrollo de interfaces de usuario y mantenimiento de aplicaciones web.',
      destacado: true,
      tecnologias: ['Angular', 'TypeScript', 'Laravel', 'MySQL', 'Git']
    },
    {
      empresa: 'Jungheinrich Alemania',
      puesto: 'Programador / Soporte Técnico',
      periodo: 'Septiembre 2025 - Hasta ahora',
      descripcion: 'Desarrollo de software en C# sobre una arquitectura empresarial compleja y modular. Configuración y despliegue de pruebas por componentes en servidores AWS. Gestión técnica y visualización en tiempo real de vehículos robóticos autónomos (AGVs/Trucks) mediante Procon-Web y resolución de incidencias técnicas avanzadas.',
      destacado: true,
      tecnologias: ['C#', '.NET', 'AWS', 'Procon-Web', 'AGVs / Robótica Industrial', 'SQL', 'Arquitectura por Componentes']    },
    {
      empresa: 'Proyectos B2B & Agentes de IA',
      puesto: 'Desarrollador de Agentes IA & Automatización',
      periodo: '2026 - Actualmente',
      descripcion: 'Diseño e implementación de asistentes virtuales y agentes de IA integrados con Botpress y WhatsApp API para empresas de manera autónoma.',
      destacado: true,
      tecnologias: ['Botpress', 'Python', 'WhatsApp API', 'Telegram API', 'Web Scraping', 'Webhooks', 'REST APIs', 'LLMs / IA']
    }
  ];

// ⚠️ ELIMINA esta línea que estaba al final de tu clase:
// ExperienciaTech: any;

  //OTROS EXPERIENCIAS
  otrasExperiencias: OtraExperiencia[] = [
    { puesto: 'Monitor de Campamento', descripcion: 'Coordinación de grupos y gestión de actividades. Vigilante nocturno', softSkill: 'Liderazgo y empatía' },
    { puesto: 'Azafato de Eventos', descripcion: 'Atención al público, a la diversidad y resolución de problemas en directo.', softSkill: 'Comunicación y cara al público' },
    { puesto: 'Camarero', descripcion: 'Trabajo en entornos de alta exigencia y ritmo rápido.', softSkill: 'Gestión del estrés, presión y trabajo en equipo' }
  ];

  proyectos: Proyecto[] = [
    {
      titulo: 'Academia RV Oposiciones',
      descripcion: 'Plataforma web completa para gestión de alumnos, pasarela de pago con Stripe, clases online, venta de materiales y panel de gestión de sesiones.',
      tecnologias: ['Angular', 'Node.js', 'Express', 'MySQL', 'Stripe'],
      estado: 'publicado',
      estadoLabel: '🟢 Web Publicada',
      imagen: 'assets/proyectos/rvoposfoto.png',
      urlWeb: 'https://rvoposiciones.com'
    },
    {
      titulo: 'Bot de Alertas Oficiales en Telegram (Oposiciones Docentes y Subvenciones)',
      descripcion: 'Sistema automatizado en Python para el rastreo periódico (web scraping) en portales del Gobierno y Boletines Oficiales de Canarias. Combina la búsqueda de nombramientos por candidato en listas de oposiciones con la detección y notificación en tiempo real de nuevas ayudas y subvenciones públicas.',
      tecnologias: ['Python', 'Telegram API', 'Web Scraping', 'OracleCLoud', 'BeautifulSoup / Selenium', 'Automation'],
      estado: 'publicado',
      estadoLabel: '🟢 Bots de Telegram',
      linksTelegram: [
        { titulo: 'Bot Oposiciones', url: 'https://t.me/rvopos_bot' },
        { titulo: 'Bot Ayudas Canarias', url: 'https://t.me/avisoviviendabot' }
      ], 
      imagen: 'assets/proyectos/botTele.png',
      esGit: false,
    },
    {
      titulo: 'TFG - Aplicación móvil para la gestión de personas diabéticas',
      descripcion: 'Aplicación web para organización de dietas, base de datos con recetas saludables, creación de dietas, uso de IA para cálculo calórico y objetivo de cada comida, gestión de buenos hábitos con objetivos diarios en calendario conectado con el del móvil y control de calorías en las comidas del día y ejercicio hecho.',
      tecnologias: ['React Native', 'Llama IA', 'Firebase'],
      estado: 'personal',
      estadoLabel: '🛠️ TFG Universitario',
      imagen: 'assets/proyectos/tfg.png',
      urlGithub: 'https://github.com/Raamonvm8/diafitness.git'
    }
  ];
ExperienciaTech: any;
  
}
