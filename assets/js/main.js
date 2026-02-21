// Main JavaScript file for Alf Casino ES

document.addEventListener('DOMContentLoaded', function() {
    console.log('Alf Casino ES - Sitio cargado');
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми секциями
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Эффект параллакса для заголовка
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const header = document.querySelector('header');
        
        if (header) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });
    
    // Добавляем эффект "магнит" для кнопок CTA
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) * 0.1;
            const moveY = (y - centerY) * 0.1;
            
            button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Эффект печатания для заголовка (опционально)
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        const text = headerTitle.textContent;
        headerTitle.textContent = '';
        headerTitle.style.opacity = '1';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                headerTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Запускаем эффект печатания через небольшую задержку
        setTimeout(typeWriter, 500);
    }
    
    // Добавляем эффект "ripple" при клике на кнопки
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Анимация чисел в таблицах (если есть)
    const animateNumbers = () => {
        const numberElements = document.querySelectorAll('td');
        numberElements.forEach(el => {
            const text = el.textContent;
            if (text.match(/^\d+[€$]/)) {
                const number = parseInt(text.replace(/[€$,\s]/g, ''));
                if (!isNaN(number)) {
                    let current = 0;
                    const increment = number / 30;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            el.textContent = text;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current).toLocaleString() + ' €';
                        }
                    }, 30);
                }
            }
        });
    };
    
    // Запускаем анимацию чисел при загрузке
    setTimeout(animateNumbers, 1000);
    
    // Добавляем эффект "shake" для важных элементов
    const importantElements = document.querySelectorAll('.cta-section, .cta-button');
    setInterval(() => {
        importantElements.forEach(el => {
            el.style.animation = 'none';
            setTimeout(() => {
                el.style.animation = '';
            }, 10);
        });
    }, 5000);
});
