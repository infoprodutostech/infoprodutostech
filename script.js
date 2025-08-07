// Cronômetro de escassez
function initCountdown() {
    // Define o tempo final (24 horas a partir de agora)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft > 0) {
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Quando o tempo acabar, reinicia o cronômetro
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // Reinicia o cronômetro para mais 24 horas
            setTimeout(() => {
                initCountdown();
            }, 1000);
        }
    }
    
    // Atualiza o cronômetro a cada segundo
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ Toggle
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            const isActive = answer.classList.contains('active');
            
            // Fecha todas as outras respostas
            faqItems.forEach(otherItem => {
                otherItem.querySelector('.faq-answer').classList.remove('active');
                otherItem.querySelector('.faq-toggle').textContent = '+';
            });
            
            // Abre ou fecha a resposta atual
            if (!isActive) {
                answer.classList.add('active');
                toggle.textContent = '-';
            }
        });
    });
}

// Smooth scroll para âncoras
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animações de entrada
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll('.testimonial-card, .content-item, .benefit-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Tracking de cliques nos botões CTA
function initCTATracking() {
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Aqui você pode adicionar código de tracking (Google Analytics, Facebook Pixel, etc.)
            console.log('CTA clicked:', button.textContent);
            
            // Adiciona um pequeno delay para garantir que o tracking seja enviado
            if (button.getAttribute('href').includes('kiwify')) {
                setTimeout(() => {
                    window.open(button.getAttribute('href'), '_blank');
                }, 100);
                return false;
            }
        });
    });
}

// Efeito de urgência - piscar o texto de urgência
function initUrgencyEffect() {
    const urgencyText = document.querySelector('.urgency-text');
    
    if (urgencyText) {
        setInterval(() => {
            urgencyText.style.opacity = urgencyText.style.opacity === '0.7' ? '1' : '0.7';
        }, 1500);
    }
}

// Contador de visitantes (simulado)
function initVisitorCounter() {
    const baseVisitors = 1247;
    const randomAdd = Math.floor(Math.random() * 50);
    const totalVisitors = baseVisitors + randomAdd;
    
    // Você pode adicionar este contador em algum lugar da página se desejar
    console.log(`Visitantes online: ${totalVisitors}`);
}

// Inicialização quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initCTATracking();
    initUrgencyEffect();
    initVisitorCounter();
});

// Prevenção de saída da página (exit intent)
let exitIntentShown = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        
        // Aqui você pode mostrar um popup de exit intent
        const confirmExit = confirm('Espere! Não perca esta oportunidade única de transformar sua vida. Tem certeza que deseja sair?');
        
        if (!confirmExit) {
            // Rola para a seção de oferta
            document.getElementById('oferta').scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Adiciona classe para dispositivos móveis
function detectMobile() {
    if (window.innerWidth <= 768) {
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}

window.addEventListener('resize', detectMobile);
detectMobile();

// Lazy loading para imagens
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Inicializa lazy loading
initLazyLoading();

