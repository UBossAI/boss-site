import type { FaqEntry } from './types.js';

/**
 * Spanish FAQ content. Register per PROJECT.md: warm, conversational, Central American /
 * Mexican Spanish, "tú" not "usted" — deliberately less formal than the English, which
 * carries the credibility-anchor job. Adapted rather than literally translated.
 */
export const faqEntries: readonly FaqEntry[] = [
	// ─── Trabajar con nosotros ──────────────────────────────────────────────────
	{
		id: 'what-is-uboss',
		category: 'working-with-us',
		featured: true,
		question: '¿Qué es UBOSS, exactamente?',
		answer: [
			'UBOSS arma los sistemas que se encargan de lo repetitivo de tu negocio — los seguimientos con clientes, el papeleo, los horarios, los recordatorios de facturas — para que tu tiempo se vaya en el trabajo de verdad.',
			'No somos otra aplicación más para andar abriendo. Nos conectamos con las herramientas que ya usas, automatizamos lo que pasa entre ellas, y te damos una forma clara de ver cómo va tu negocio en realidad.'
		],
		keywords: ['qué es uboss', 'que es uboss', 'inteligencia artificial', 'automatización']
	},
	{
		id: 'consultation-call',
		category: 'working-with-us',
		featured: true,
		question: '¿Qué pasa en la llamada de consulta?',
		answer: [
			'Empezamos por averiguar qué es lo que más tiempo y dolores de cabeza te está costando. Esa primera plática es para entender, no para venderte nada — queremos saber cómo funciona tu negocio de verdad antes de proponerte algo.',
			'Te vas con una idea clara de qué se podría automatizar, cuánto trabajo llevaría más o menos, y una respuesta honesta si lo que necesitas no es algo que hagamos.'
		],
		keywords: ['consulta', 'llamada gratis', 'consultoría', 'primera cita']
	},
	{
		id: 'pricing',
		category: 'working-with-us',
		featured: true,
		question: '¿Cómo funcionan los precios?',
		answer: [
			'El precio se cotiza después de la llamada de consulta, porque el número correcto depende completamente de qué estemos resolviendo.',
			'Lo normal es un pago único de instalación por armar todo, y luego un pago mensual que cubre mantenerlo funcionando — revisando que no haya problemas, arreglando lo que se rompa, y ajustando conforme tu negocio cambia. No publicamos paquetes fijos porque los problemas que nos traen casi nunca son iguales.'
		],
		keywords: ['precio', 'costo', 'cuánto cuesta', 'cuanto cuesta', 'mensualidad', 'cotización']
	},
	{
		id: 'contract-commitment',
		category: 'working-with-us',
		question: '¿Hay contrato o algún compromiso a largo plazo?',
		answer: [
			'No hay contratos a largo plazo. La parte mensual es mes a mes — preferimos ganarnos tu confianza cada mes que amarrarte a algo.'
		],
		keywords: ['contrato', 'compromiso', 'cancelar', 'mes a mes']
	},
	{
		id: 'setup-timeline',
		category: 'working-with-us',
		question: '¿Cuánto tiempo tarda la instalación?',
		answer: [
			'La mayoría de las instalaciones sencillas quedan listas en una o dos semanas. Los proyectos más grandes — varios sistemas conectados, dashboards personalizados, varias personas usándolo — normalmente llevan de dos a cuatro semanas.',
			'Lo que más varía casi nunca es armarlo. Es cuánto estamos conectando y qué tan rápido nos puedan dar acceso a las herramientas que ya usas.'
		],
		keywords: ['cuánto tarda', 'cuanto tarda', 'tiempo', 'instalación', 'implementación']
	},
	{
		id: 'start-small',
		category: 'working-with-us',
		question: '¿Puedo empezar chico e ir agregando más después?',
		answer: [
			'Claro que sí, y así le hace la mayoría. Resolver primero un dolor de cabeza específico es la forma más sensata de empezar — es menos compromiso, y ves la cosa funcionando antes de decidir hasta dónde llevarla.',
			'Los sistemas se arman para poder crecer, no para tener que reemplazarlos. Empezar chico no significa empezar de cero después.'
		],
		keywords: ['empezar chico', 'poco a poco', 'agregar después', 'crecer']
	},
	{
		id: 'outside-trades',
		category: 'working-with-us',
		question: '¿Trabajan con negocios que no sean de oficios?',
		answer: [
			'Hoy por hoy nos enfocamos en oficios y negocios de servicio local — contratistas, electricistas, plomeros, HVAC, limpieza, jardinería. Ahí es donde está la mayor parte de nuestro trabajo y donde nos sabemos los detalles de memoria.',
			'Dicho eso, el trabajo de fondo no es exclusivo de los oficios: recolectar datos de forma confiable, automatizar seguimientos, armar reportes y manejar expedientes con cuidado aplica igual para despachos contables, oficinas de bienes raíces, y consultorios médicos y dentales.',
			'Si estás en alguno de esos campos y los problemas te suenan familiares, vale la pena platicarlo. Te decimos honestamente si encaja o no.'
		],
		keywords: [
			'contador',
			'contabilidad',
			'impuestos',
			'bienes raíces',
			'bienes raices',
			'médico',
			'medico',
			'dental',
			'consultorio',
			'otras industrias'
		]
	},
	{
		id: 'language-support',
		category: 'working-with-us',
		question: '¿Dan soporte en español o portugués?',
		answer: [
			'Sí. Soporte completo en inglés y español, y el portugués lo estamos implementando. El fundador es bilingüe en inglés y español, así que no tienes que pasar por un traductor para que te resuelvan.'
		],
		keywords: ['español', 'espanol', 'portugués', 'portugues', 'bilingüe', 'idioma']
	},
	{
		id: 'crm-different',
		category: 'working-with-us',
		question: 'Ya probé un CRM antes y nadie lo usó. ¿Por qué esto sería diferente?',
		answer: [
			'La mayoría de los CRM están hechos para equipos de ventas grandes: muchísimos botones que nunca vas a tocar, y tanto que escribir a mano que mantenerlo al día se vuelve un trabajo de medio tiempo. Por eso terminan olvidados.',
			'Lo que nosotros armamos no es otra aplicación para andar entrando. Se conecta con lo que ya usas y trabaja calladito por detrás. Tú te quedas con lo que importa — quién llamó, qué trabajos están atorados, para dónde se va el dinero — sin que nadie tenga que convertirse en asistente de datos.'
		],
		keywords: ['crm', 'alternativa a crm', 'muy complicado', 'nadie lo usa']
	},

	// ─── Sistemas y automatización ──────────────────────────────────────────────
	{
		id: 'automate-my-business',
		category: 'systems-automation',
		featured: true,
		question: '¿Cómo se automatiza un negocio que todavía funciona con llamadas y papel?',
		answer: [
			'Empezamos por aprender cómo fluye el trabajo hoy — quién contesta la llamada, qué se anota, qué pasa después, y por dónde se pierden las cosas.',
			'La automatización solo sirve tanto como ese entendimiento. Un sistema armado sobre una suposición equivocada da más trabajo del que quita. Ya que está claro el proceso real, convertimos las partes repetitivas en algo que corre solo, y las decisiones de criterio se quedan contigo.'
		],
		keywords: ['cómo automatizar', 'como automatizar', 'automatización', 'papel', 'formularios']
	},
	{
		id: 'existing-tools',
		category: 'systems-automation',
		question: '¿Voy a tener que cambiar las herramientas que ya uso?',
		answer: [
			'Normalmente no. La idea es conectar lo que ya está funcionando, no arrancarlo — casi toda herramienta que valga la pena se puede integrar, y es mejor construir alrededor de tus costumbres que obligarte a agarrar nuevas.',
			'Si de plano una herramienta te está frenando, te lo decimos. Pero cambiar de software es el último recurso, no el punto de partida.'
		],
		keywords: [
			'integración',
			'api',
			'quickbooks',
			'google',
			'gmail',
			'calendario',
			'conectar herramientas'
		]
	},
	{
		id: 'dashboards',
		category: 'systems-automation',
		featured: true,
		question: '¿Pueden armar un dashboard para mi negocio?',
		answer: [
			'Sí, y empieza con los datos. En la llamada de consulta vemos qué estás guardando ya, qué no, y con qué tomarías decisiones de verdad.',
			'De ahí montamos la recolección donde falte y armamos las vistas encima — para que en lugar de abrir cinco programas distintos para saber cómo te fue en el mes, lo tengas en un solo lugar. Los buenos te muestran tanto dónde estás parado ahorita como para dónde va la tendencia.'
		],
		keywords: [
			'dashboard',
			'tablero',
			'panel de datos',
			'cómo crear un dashboard',
			'como crear un dashboard',
			'reportes',
			'gráficas'
		]
	},
	{
		id: 'business-metrics',
		category: 'systems-automation',
		question: '¿Qué números puede seguir un dashboard?',
		answer: [
			'Los comunes entran todos — cuánto crecen tus ventas, tu margen de ganancia, cuánto te cuesta conseguir un cliente nuevo, qué tanto de tus cotizaciones se convierten en trabajo, tus ingresos fijos al mes, qué tan rápido se mueve tu inventario, cuánto te cuesta el mantenimiento — más lo que sea específico de cómo trabajas tú.',
			'Lo difícil casi nunca es la gráfica. Un número vale lo que vale el proceso que lo alimenta, así que la mayor parte del trabajo se va en asegurar que lo que entra sea correcto antes de construir nada encima.'
		],
		keywords: [
			'métricas',
			'metricas',
			'costo por cliente',
			'margen',
			'ingresos',
			'inventario',
			'indicadores'
		]
	},
	{
		id: 'estimates-invoices',
		category: 'systems-automation',
		question: '¿Pueden hacer que mis cotizaciones y facturas se vean más profesionales?',
		answer: [
			'Sí. El papeleo suele ser la parte más floja de una operación que por lo demás es excelente — una cotización vaga y hecha a mano puede hacer que un trabajo de primera se vea descuidado, y desglosar bien materiales y mano de obra no es el pasatiempo favorito de nadie.',
			'Nosotros armamos las herramientas para que cada cotización, factura y confirmación que le llega a tu cliente se vea limpia, desglosada y pareja.'
		],
		keywords: ['factura', 'cotización', 'cotizacion', 'presupuesto', 'desglose', 'papeleo']
	},
	{
		id: 'customer-notifications',
		category: 'systems-automation',
		question: '¿Pueden mandar confirmaciones por mensaje de texto a mis clientes?',
		answer: [
			'Sí, dentro de las reglas que aplican para mensajes de negocio. Mandar textos requiere el permiso de la persona antes de escribirle — eso es requisito legal, no preferencia nuestra — así que el flujo que armamos empieza con un formulario o una cita donde el cliente da su permiso.',
			'De ahí en adelante, las confirmaciones, recordatorios y seguimientos salen solos. El correo funciona igual y con menos restricciones.'
		],
		keywords: [
			'mensaje de texto',
			'sms',
			'confirmación',
			'recordatorio',
			'notificación',
			'whatsapp',
			'cita'
		]
	},

	// ─── Asistentes de IA ───────────────────────────────────────────────────────
	{
		id: 'automation-vs-ai',
		category: 'ai-assistants',
		featured: true,
		question: '¿Cuál es la diferencia entre automatización e inteligencia artificial?',
		answer: [
			'La automatización es la columna vertebral; la IA es la parte que razona. La automatización se encarga del trabajo definido — mover la información a donde tiene que ir, disparar el siguiente paso, asegurarse de que nada se caiga.',
			'La IA se encarga de lo que necesita interpretación: leer un mensaje desordenado, resumir qué pasó, redactar una respuesta. La mayoría de los negocios necesitan las dos, y la división importa — usar IA donde bastaba una regla simple sale más lento, más caro y menos predecible.'
		],
		keywords: ['automatización o ia', 'diferencia', 'cuál necesito', 'ambas']
	},
	{
		id: 'replace-employees',
		category: 'ai-assistants',
		featured: true,
		question: '¿La inteligencia artificial va a reemplazar a mis empleados?',
		answer: [
			'Esa decisión es tuya, no nuestra, y no es hacia dónde construimos. La meta es que la gente que ya tienes sea más efectiva — menos tiempo en papeleo repetitivo, más en el trabajo en el que de verdad son buenos.',
			'Qué haces con ese tiempo que se libera es una decisión de negocio que solo tú puedes tomar. Lo que funciona en una empresa no se copia igualito en otra; cada quien trabaja a su ritmo y agarra la información distinto, y un sistema que ignora eso termina abandonado.'
		],
		keywords: ['reemplazar empleados', 'reemplazar secretaria', 'despidos', 'perder trabajo']
	},
	{
		id: 'always-on',
		category: 'ai-assistants',
		question: '¿Esto puede funcionar las 24 horas?',
		answer: [
			'La automatización no tiene horario, así que las partes automatizadas sí corren todo el tiempo — un formulario que llega a las 2 de la mañana se procesa a las 2 de la mañana.',
			'Cuánto de tu negocio funciona así es una decisión, no algo automático. Hay cosas que deberían esperar a una persona, y preferimos ayudarte a trazar esa línea a propósito que automatizar todo nada más porque se puede.'
		],
		keywords: ['24/7', '24 horas', 'de noche', 'fines de semana', 'siempre']
	},
	{
		id: 'model-outage',
		category: 'ai-assistants',
		question: '¿Qué pasa si ChatGPT u otro servicio de IA se cae?',
		answer: [
			'Para la mayor parte del trabajo corremos modelos propios, así que si se cae un proveedor de fuera no se lleva tus sistemas con él. Donde sí se usa un modelo externo, hay un camino de respaldo para redirigir a otra opción.',
			'El principio de diseño es que ninguna dependencia externa por sí sola debería poder parar tu negocio.'
		],
		keywords: ['se cae', 'caída', 'chatgpt', 'respaldo', 'confiabilidad']
	},
	{
		id: 'where-ai-helps',
		category: 'ai-assistants',
		question: '¿Cómo deciden dónde la IA de verdad ayuda?',
		answer: [
			'Empezando por el problema, no por la tecnología. En la consulta vemos qué te está costando tiempo, dónde se cometen errores, y qué te gustaría dejar de estar pensando — y de ahí le ponemos la herramienta correcta a cada cosa, que muchas veces es una automatización sencilla y no IA.',
			'Cuando un asistente de IA sí encaja, lo dejamos bien acotado: una tarea definida, permisos definidos, y un límite claro de hasta dónde puede llegar.'
		],
		keywords: [
			'integrar ia',
			'agentes',
			'entrenar ia',
			'ia personalizada',
			'por dónde empezar con ia'
		]
	},

	// ─── Que te encuentren en línea ─────────────────────────────────────────────
	{
		id: 'ai-search-visibility',
		category: 'getting-found',
		featured: true,
		question: '¿Cómo aparezco cuando alguien le pregunta a ChatGPT por un negocio como el mío?',
		answer: [
			'Cada vez más gente le pide una recomendación a un asistente de IA en lugar de escribir en el buscador, y esos sistemas leen la información de tu negocio distinto a como la lee una persona.',
			'Necesitan datos consistentes, estructurados y que la máquina pueda leer — el mismo nombre, la misma zona de servicio, la misma descripción en todos lados — respaldados por contenido que de verdad conteste lo que la gente pregunta. Nosotros lo montamos y lo mantenemos parejo, para que aparezcas te busquen como te busquen.'
		],
		keywords: [
			'chatgpt',
			'búsqueda con ia',
			'busqueda con ia',
			'geo',
			'perplexity',
			'visibilidad',
			'inteligencia artificial'
		]
	},
	{
		id: 'google-ranking',
		category: 'getting-found',
		featured: true,
		question: '¿Pueden ayudarme a aparecer más arriba en Google?',
		answer: [
			'Sí — y la versión honesta es que es trabajo constante, no un botón que se prende.',
			'Empieza por lo básico: un perfil de negocio correcto y completo, la misma información en todos los lugares donde apareces, un sitio que cargue rápido y diga claramente qué haces, y contenido que conteste preguntas reales. Las reseñas de clientes de verdad pesan bastante, así que parte de lo que armamos es que sea fácil pedirlas en el momento correcto.',
			'Nosotros nos encargamos del montaje y del mantenimiento, porque en el mantenimiento es donde se queda atrás la mayoría.'
		],
		keywords: [
			'google',
			'seo',
			'aparecer en google',
			'salir en google',
			'perfil de negocio',
			'buscador',
			'posicionamiento'
		]
	},
	{
		id: 'social-media',
		category: 'getting-found',
		question: '¿Manejan Facebook e Instagram?',
		answer: [
			'Podemos ayudarte a manejar una página de Facebook y a correr campañas pagadas en las plataformas de Meta — Facebook, Instagram y WhatsApp.',
			'Si vale la pena o no depende de tu negocio. Para algunos oficios, la recomendación de boca en boca y el buscador ya cubren, y ese dinero rinde mejor en otro lado. Te decimos las cosas claras antes de que gastes.'
		],
		keywords: ['facebook', 'instagram', 'meta', 'redes sociales', 'anuncios', 'publicidad']
	},
	{
		id: 'customer-reviews',
		category: 'getting-found',
		question: '¿Qué tanto importan las reseñas en línea?',
		answer: [
			'Importan bastante, y cada vez más. Una reseña es lo que un cliente dice públicamente sobre si hiciste lo que prometiste, y tanto la gente como los sistemas de inteligencia artificial le dan mucho peso a eso para decidir en quién confiar.',
			'El problema es que los clientes contentos casi nunca se acuerdan de dejar una. Nosotros automatizamos que se les pida en el momento más natural — justo después de terminar el trabajo — para que esa credibilidad crezca sola, sin que andes persiguiendo a nadie.'
		],
		keywords: ['reseñas', 'resenas', 'reviews', 'reputación', 'calificaciones', 'estrellas']
	},

	// ─── Privacidad y seguridad ─────────────────────────────────────────────────
	{
		id: 'data-storage',
		category: 'privacy-security',
		featured: true,
		question: '¿Dónde se guardan los datos de mi negocio?',
		answer: [
			'En servidores que manejamos nosotros mismos, y solo juntamos lo que el sistema de verdad necesita para funcionar.',
			'Guardar menos datos en lugar de más es a propósito — lo que no se junta es lo que no se puede filtrar. Si un proyecto de plano necesita un servicio de fuera para guardar algo, te decimos cuál y por qué antes de armarlo.'
		],
		keywords: ['datos', 'dónde se guardan', 'donde se guardan', 'servidores', 'nube']
	},
	{
		id: 'pii-and-ai',
		category: 'privacy-security',
		question: '¿La información de mis clientes se va a las empresas de inteligencia artificial?',
		answer: [
			'No pasamos información personal identificable por modelos de IA de terceros. Casi todo el procesamiento corre en modelos que nosotros mismos alojamos, que es la razón principal por la que podemos comprometernos a eso.',
			'Donde un servicio externo de plano sea la herramienta correcta, se limita a trabajo que no involucra los datos personales de tus clientes.'
		],
		keywords: [
			'información personal',
			'informacion personal',
			'privacidad',
			'datos de clientes',
			'entrenamiento'
		]
	},
	{
		id: 'security-practices',
		category: 'privacy-security',
		question: '¿Cómo mantienen seguros los sistemas?',
		answer: [
			'La seguridad se diseña desde el principio, no se le pega después. En la práctica eso significa privilegio mínimo — cada componente y cada agente de IA tiene acceso únicamente a lo que su tarea específica necesita, y nada más.',
			'Junto con eso: juntar la mínima información necesaria, cifrar los datos tanto cuando viajan como cuando están guardados, y ponerle límites claros a lo que los sistemas automáticos tienen permitido hacer.',
			'Construimos siguiendo los principios detrás de los marcos de seguridad reconocidos — disponibilidad, confidencialidad, privacidad e integridad del procesamiento — porque nos parece el estándar correcto, no porque un cliente lo haya exigido.'
		],
		keywords: ['seguridad', 'cifrado', 'privilegio mínimo', 'protección', 'hackeo']
	},
	{
		id: 'sensitive-records',
		category: 'privacy-security',
		question: '¿Y si mi negocio maneja información delicada?',
		answer: [
			'Entonces las preguntas de diseño se ponen más específicas, y preferimos sacarlas desde temprano. En la consulta repasamos qué manejas, qué reglas aplican en tu campo, y qué significa eso para cómo un sistema guarda y mueve la información.',
			'No somos un servicio de certificación de cumplimiento y no vamos a fingir que sí. Pero las prácticas de ingeniería de las que dependen los campos regulados — juntar lo mínimo, límites estrictos de acceso, mantener los expedientes delicados fuera de modelos de IA de terceros — son como construimos de todos modos, haya o no un reglamento que lo exija.'
		],
		keywords: [
			'hipaa',
			'gdpr',
			'cumplimiento',
			'regulado',
			'expedientes médicos',
			'confidencial',
			'soc 2'
		]
	},
	{
		id: 'website-legal-pages',
		category: 'privacy-security',
		question: '¿Mi sitio web necesita aviso de privacidad o términos y condiciones?',
		answer: [
			'Muchas veces sí — depende de qué recolectas y qué vendes. Si tu sitio pide datos de contacto, agenda citas o procesa pagos, normalmente hay buena razón para tener términos claros y un aviso de privacidad.',
			'Te podemos señalar qué parece necesario en la consulta. Para cualquier cosa con riesgo legal de verdad vas a querer un abogado, no a nosotros.'
		],
		keywords: ['aviso de privacidad', 'términos y condiciones', 'terminos', 'legal', 'políticas']
	}
];
