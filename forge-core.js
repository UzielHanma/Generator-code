// forge-core.js
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Icons
    lucide.createIcons();

    const chatFlow = document.getElementById('chat-flow');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const clearBtn = document.getElementById('clear-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const logContainer = document.getElementById('log-container');
    const presets = document.querySelectorAll('.forge-preset');

    // Synthesis Logic Engine (Offline Local AI Simulation)
    const synthesisEngine = {
        processRequest: (query) => {
            addLog("Iniciando análisis de tokens...", "text-blue-400");
            simulateProgress(() => {
                const response = generateLocalResponse(query);
                appendMessage('bot', response);
                addLog("Síntesis completada con éxito.", "text-green-500");
            });
        }
    };

    function appendMessage(role, content) {
        const div = document.createElement('div');
        div.className = `flex gap-4 animate-in fade-in slide-in-from-bottom duration-500 ${role === 'user' ? 'justify-end' : ''}`;
        
        const icon = role === 'bot' ? 'bot' : 'user';
        const color = role === 'bot' ? 'blue-600/20 text-blue-400 border-blue-500/30' : 'white/10 text-slate-400 border-white/20';

        div.innerHTML = `
            ${role === 'bot' ? `<div class="w-8 h-8 rounded-lg bg-${color} border flex items-center justify-center shrink-0"><i data-lucide="${icon}" class="w-5 h-5"></i></div>` : ''}
            <div class="max-w-[80%] ${role === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-none' : 'bg-white/5 text-slate-300 rounded-2xl rounded-tl-none border border-white/10'} p-4 shadow-xl">
                <p class="text-sm leading-relaxed">${content}</p>
            </div>
            ${role === 'user' ? `<div class="w-8 h-8 rounded-lg bg-${color} border flex items-center justify-center shrink-0"><i data-lucide="${icon}" class="w-5 h-5"></i></div>` : ''}
        `;
        chatFlow.appendChild(div);
        chatFlow.scrollTop = chatFlow.scrollHeight;
        lucide.createIcons();
    }

    function addLog(text, colorClass = "text-slate-500") {
        const log = document.createElement('div');
        log.className = `${colorClass} mb-1`;
        log.textContent = `> ${new Date().toLocaleTimeString()} | ${text}`;
        logContainer.prepend(log);
    }

    function simulateProgress(callback) {
        let prog = 0;
        progressBar.parentElement.classList.remove('opacity-0');
        const interval = setInterval(() => {
            prog += Math.random() * 15;
            if (prog >= 100) {
                prog = 100;
                clearInterval(interval);
                setTimeout(callback, 500);
            }
            progressBar.style.width = `${prog}%`;
            progressPercent.textContent = `${Math.round(prog)}%`;
        }, 150);
    }

    function generateLocalResponse(query) {
        const q = query.toLowerCase();
        if (q.includes('apk') || q.includes('móvil')) {
            return `Protocolo de Compilación Android Iniciado. Generando manifiesto XML, configurando Gradle 8.0 y estructurando componentes de React Native con arquitectura hexagonal. <div class="code-snippet text-blue-300">npx react-native init ForgeApp --template devforge-elite-v4</div>`;
        }
        if (q.includes('api') || q.includes('backend')) {
            return `Estructurando núcleo de API REST. Utilizando Fastify con esquemas Zod para validación y PostgreSQL con Prisma ORM. <div class="code-snippet text-purple-300">export const core_kernel = () => { return "Secure-API-v1" }</div>`;
        }
        return `Análisis heurístico completado para: "${query}". He generado el código optimizado siguiendo los estándares de diseño Apple 2025. Los scripts han sido inyectados en la memoria temporal del sistema.`;
    }

    // Event Listeners
    sendBtn.addEventListener('click', () => {
        const text = userInput.value.trim();
        if (text) {
            appendMessage('user', text);
            userInput.value = '';
            synthesisEngine.processRequest(text);
        }
    });

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    clearBtn.addEventListener('click', () => {
        chatFlow.innerHTML = '';
        addLog("Historial de sesión purgado.", "text-red-400");
    });

    presets.forEach(btn => {
        btn.addEventListener('click', () => {
            const prompt = btn.getAttribute('data-prompt');
            userInput.value = prompt;
            sendBtn.click();
        });
    });
});