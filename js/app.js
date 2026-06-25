const menuToggle=document.querySelector('.menu-toggle');
const mainNav=document.querySelector('.main-nav');
const navLinks=document.querySelectorAll('.main-nav a');
const reveals=document.querySelectorAll('.reveal');

menuToggle?.addEventListener('click',()=>{
  const isOpen=mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded',String(isOpen));
});

navLinks.forEach(link=>{
  link.addEventListener('click',()=>{
    mainNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded','false');
  });
});

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});

reveals.forEach(element=>observer.observe(element));

const sections=document.querySelectorAll('main section[id]');
const activeObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      navLinks.forEach(link=>{
        link.classList.toggle('active-link',link.getAttribute('href')===`#${entry.target.id}`);
      });
    }
  });
},{threshold:.45});

sections.forEach(section=>activeObserver.observe(section));
