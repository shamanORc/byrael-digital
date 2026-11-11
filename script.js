const extra=document.createElement('link');
extra.rel='stylesheet';
extra.href='footer-links.css';
document.head.appendChild(extra);

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.add('motion-ready');

const menu=document.querySelector('.menu');
const nav=document.querySelector('.nav');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const groups=[
  ...document.querySelectorAll('.section-title'),
  ...document.querySelectorAll('.service-grid article'),
  ...document.querySelectorAll('.service-keywords article'),
  ...document.querySelectorAll('.about>div'),
  ...document.querySelectorAll('.faq details'),
  ...document.querySelectorAll('.contact-grid>div')
];
groups.forEach((el,index)=>{
  el.classList.add('reveal');
  el.style.setProperty('--reveal-delay',`${Math.min(index%4,3)*70}ms`);
});

if(reduceMotion){
  groups.forEach(el=>el.classList.add('visible'));
  document.body.classList.add('motion-loaded');
}else{
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting)return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  },{threshold:.1,rootMargin:'0px 0px -7% 0px'});
  groups.forEach(el=>observer.observe(el));
  requestAnimationFrame(()=>requestAnimationFrame(()=>document.body.classList.add('motion-loaded')));
}

document.querySelectorAll('.faq details').forEach(item=>{
  item.addEventListener('toggle',()=>{
    if(!item.open)return;
    document.querySelectorAll('.faq details[open]').forEach(other=>{
      if(other!==item)other.removeAttribute('open');
    });
  });
});

document.querySelector('#lead-form')?.addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.currentTarget;
  const data=new FormData(form);
  const subject=encodeURIComponent('Novo projeto BYRAEL — '+data.get('name'));
  const body=encodeURIComponent('Nome: '+data.get('name')+'\nContato: '+data.get('contact')+'\n\nProjeto:\n'+data.get('idea'));
  const button=form.querySelector('button');
  const note=form.querySelector('small');
  form.classList.add('is-sending');
  button.firstChild.textContent='Abrindo seu e-mail ';
  note.textContent='Mensagem preparada. Basta revisar e enviar.';
  window.setTimeout(()=>{window.location.href='mailto:contato@byrael.xyz?subject='+subject+'&body='+body},220);
});
