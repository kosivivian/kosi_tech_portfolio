document.querySelectorAll('.brand').forEach(brand=>brand.innerHTML='<img class="brand-icon" src="kosi-icon-mark-burgundy.png" alt=""><img class="brand-wordmark" src="kosi-wordmark-inter800.png" alt="Kosi Nebolisa">');
document.getElementById('year').textContent=new Date().getFullYear();
if(location.pathname!=='/'&&!location.pathname.endsWith('index.html')){const styles=document.createElement('link');styles.rel='stylesheet';styles.href='specialty.css';document.head.append(styles)}
const typeStyles=document.createElement('link');typeStyles.rel='stylesheet';typeStyles.href='typography.css';document.head.append(typeStyles);
const chat=document.createElement('script');chat.src='chat.js';document.body.append(chat);
if(document.getElementById('field'))setTimeout(()=>{const extras=document.createElement('script');extras.src='project-extras.js';document.body.append(extras)},0);
const observer=new IntersectionObserver((entries)=>entries.forEach((entry,index)=>{if(entry.isIntersecting){setTimeout(()=>entry.target.classList.add('visible'),index*65);observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
