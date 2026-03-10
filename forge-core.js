// forge-core.js

/**
 * MOTOR DE SÍNTESIS CUÁNTICA - DEVFORGE HYPER-CORE V4
 * Lógica local sin APIs externas. 
 * Implementa reconocimiento de patrones, motor matemático y base de datos de conocimiento.
 */

const KNOWLEDGE_BASE = {
    "comandos": {
        "ayuda": "Lista de comandos disponibles: [ayuda, hora, fecha, limpiar, sistema, calcular, quien eres, crear (html/css/js)]",
        "sistema": "SYNTH-CORE V4. Estado: Operativo. Latencia: <1ms. Memoria: Local Browser Cache.",
        "quien eres": "Soy una Inteligencia Sintética Local diseñada por DevForge para ejecución rápida sin API keys.",
        "limpiar": "COMANDO_ESPECIAL_CLEAR"
    },
    "tecnologia": {
        "html": "HyperText Markup Language - Estructura básica: <!DOCTYPE html><html><head></head><body></body></html>",
        "css": "Cascading Style Sheets - Usado para diseño. Tailwind CSS es la recomendación actual.",
        "javascript": "Lenguaje de programación de alto nivel, motor de este sistema.",
        "react": "Biblioteca JS para interfaces de usuario basada en componentes.",
        "python": "Lenguaje versátil conocido por su legibilidad y uso en IA."
    },
    "crear": {
        "html": "Estructura generada: <div>Nuevo Componente</div>",
        "js": "Función generada: const init = () => { console.log('Ready'); }",
        "css": "Estilo base: .container { display: flex; justify-content: center; }"
    }
};

class SynthEngine {
    constructor() {
        this.chatContainer = document.getElementById('chat-container');
        this.form = document.getElementById('ai-form');
        this.input = document.getElementById('user-input');
        this.init();
    }

    init() {
        lucide.createIcons();
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.log("SISTEMA", "Interfaz de control lista. Esperando entrada...");
    }

    handleSubmit(e) {
        e.preventDefault();
        const rawText = this.input.value.trim();
        if (!rawText) return;

        this.log("USUARIO", rawText);
        this.processQuery(rawText.toLowerCase());
        this.input.value = '';
    }

    log(role, message) {
        const div = document.createElement('div');
        div.className = `log-entry p-3 rounded ${role === 'USUARIO' ? 'bg-zinc-800/30' : 'bg-zinc-900 border border-zinc-800'}`;
        
        const label = role === 'USUARIO' ? 'C:\\USER>' : '[SISTEMA]';
        const color = role === 'USUARIO' ? 'text-zinc-500' : 'text-emerald-500';

        div.innerHTML = `
            <p class="${color} font-bold mb-1 text-xs tracking-widest">${label}</p>
            <p class="leading-relaxed">${message}</p>
        `;

        this.chatContainer.appendChild(div);
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    processQuery(query) {
        // 1. Comando Especial: Limpiar
        if (query === 'limpiar' || query === 'clear') {
            this.chatContainer.innerHTML = '';
            this.log("SISTEMA", "Terminal reiniciada.");
            return;
        }

        // 2. Comandos de Tiempo
        if (query.includes('hora')) {
            this.log("SISTEMA", `La hora actual es: ${new Date().toLocaleTimeString()}`);
            return;
        }
        if (query.includes('fecha')) {
            this.log("SISTEMA", `La fecha actual es: ${new Date().toLocaleDateString()}`);
            return;
        }

        // 3. Motor Matemático (Evaluación segura)
        if (query.match(/[0-9]+[\s]*[\+\-\*\/][\s]*[0-9]+/)) {
            try {
                // Sanitización básica para evitar eval malicioso
                const calculation = query.replace(/[^-()\d/*+.]/g, '');
                const result = Function(`"use strict"; return (${calculation})`)();
                this.log("SISTEMA", `Resultado del cálculo: ${result}`);
                return;
            } catch (e) {
                this.log("ERROR", "Error en expresión matemática.");
            }
        }

        // 4. Reconocimiento de Intenciones (NLP Simple)
        let response = this.searchKnowledge(query);
        
        if (response) {
            this.log("SISTEMA", response);
        } else {
            // 5. Fallback: Inteligencia Generativa Simulada
            this.generateFallback(query);
        }
    }

    searchKnowledge(query) {
        // Búsqueda profunda en el objeto de conocimiento
        for (let category in KNOWLEDGE_BASE) {
            for (let key in KNOWLEDGE_BASE[category]) {
                if (query.includes(key)) {
                    return KNOWLEDGE_BASE[category][key];
                }
            }
        }
        return null;
    }

    generateFallback(query) {
        const defaultResponses = [
            "Análisis completado. El comando no existe en la base de datos local, pero el patrón sugiere una consulta sobre: " + query,
            "No tengo instrucciones específicas para '" + query + "'. ¿Deseas que lo registre en el log de desarrollo?",
            "Instrucción '" + query + "' no reconocida. Intenta con 'ayuda' para ver capacidades.",
            "SYNTH-CORE requiere parámetros más específicos para ejecutar: " + query
        ];
        const random = Math.floor(Math.random() * defaultResponses.length);
        this.log("SISTEMA", defaultResponses[random]);
    }
}

// Inicializar el núcleo
window.addEventListener('DOMContentLoaded', () => {
    new SynthEngine();
});