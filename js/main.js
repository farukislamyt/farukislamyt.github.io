/* =============================================
   FARUK ISLAM v3 — ULTIMATE PORTFOLIO JS
   ============================================= */
'use strict';

// ── PAGE LOADER ──
(function(){
  const loader=document.getElementById('loader'),fill=document.getElementById('loader-fill'),txt=document.getElementById('loader-txt');
  const msgs=['Compiling assets...','Painting pixels...','Wiring interactions...','Almost ready...','Welcome!'];
  let p=0,si=0;
  const iv=setInterval(()=>{
    p+=Math.random()*22+10; if(p>100)p=100;
    fill.style.width=p+'%';
    si=p<25?0:p<50?1:p<70?2:p<90?3:4;
    txt.textContent=msgs[si];
    if(p>=100){clearInterval(iv);setTimeout(()=>loader.classList.add('done'),450);}
  },160);
})();

// ── SCROLL PROGRESS ──
(function(){
  const bar=document.getElementById('scrollprog');
  window.addEventListener('scroll',()=>{bar.style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight)*100)+'%';},{passive:true});
})();

// ── CURSOR ──
(function(){
  const c=document.getElementById('cur'),f=document.getElementById('cur-follow');
  if(!c)return;
  let mx=0,my=0,fx=0,fy=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;c.style.left=mx+'px';c.style.top=my+'px';});
  (function loop(){fx+=(mx-fx)*.1;fy+=(my-fy)*.1;f.style.left=fx+'px';f.style.top=fy+'px';requestAnimationFrame(loop);})();
  document.addEventListener('mouseleave',()=>{c.style.opacity='0';f.style.opacity='0';});
  document.addEventListener('mouseenter',()=>{c.style.opacity='1';f.style.opacity='1';});
})();

// ── THEME TOGGLE ──
(function(){
  const btn=document.getElementById('themebtn'),html=document.documentElement;
  const saved=localStorage.getItem('fi-theme')||'dark';
  html.setAttribute('data-theme',saved);
  btn.addEventListener('click',()=>{
    const next=html.getAttribute('data-theme')==='dark'?'light':'dark';
    html.setAttribute('data-theme',next);
    localStorage.setItem('fi-theme',next);
  });
})();

// ── LANGUAGE SWITCHER ──
(function(){
  const btns=document.querySelectorAll('.lang-btn');
  const translations={
    en:{hero_desc:"I craft end-to-end digital products — from scalable backend architectures to pixel-perfect interfaces. 6+ years turning ambitious ideas into products people love.",contact_title:"Let's Build Something",about_title:"Who I Am"},
    bn:{hero_desc:"আমি স্কেলযোগ্য ব্যাকএন্ড থেকে পিক্সেল-পারফেক্ট ইন্টারফেস পর্যন্ত সম্পূর্ণ ডিজিটাল পণ্য তৈরি করি। ৬+ বছরে উচ্চাভিলাষী ধারণাকে পণ্যে রূপ দিচ্ছি।",contact_title:"একসাথে কিছু তৈরি করি",about_title:"আমি কে"}
  };
  btns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const lang=btn.dataset.lang;
      const t=translations[lang];
      const desc=document.getElementById('hero-desc');
      if(desc&&t)desc.textContent=t.hero_desc;
    });
  });
})();

// ── NAVBAR ──
(function(){
  const nav=document.getElementById('navbar');
  window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60),{passive:true});
})();

// ── HAMBURGER ──
(function(){
  const btn=document.getElementById('ham'),menu=document.getElementById('mob-menu');
  btn.addEventListener('click',()=>{btn.classList.toggle('open');menu.classList.toggle('open');});
  document.querySelectorAll('.mob-link').forEach(l=>l.addEventListener('click',()=>{btn.classList.remove('open');menu.classList.remove('open');}));
})();

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-80,behavior:'smooth'});}
  });
});

// ── REVEAL ──
(function(){
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
})();

// ── SKILL BARS ──
(function(){
  const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){setTimeout(()=>e.target.classList.add('go'),250);obs.unobserve(e.target);}}),{threshold:.4});
  document.querySelectorAll('.bar-f').forEach(b=>obs.observe(b));
})();

// ── COUNTER ANIMATION ──
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target,target=parseInt(el.dataset.count),suffix=el.dataset.suffix||'';
      let start=0;const dur=1600,t0=performance.now();
      (function step(now){const p=Math.min((now-t0)/dur,1),eased=1-Math.pow(1-p,3);el.textContent=Math.round(eased*target)+suffix;if(p<1)requestAnimationFrame(step);})(t0);
      obs.unobserve(el);
    });
  },{threshold:.7});
  document.querySelectorAll('[data-count]').forEach(el=>obs.observe(el));
})();

// ── TYPING EFFECT ──
(function(){
  const el=document.getElementById('typing');
  if(!el)return;
  const phrases=['Full Stack Developer','React & Node.js Expert','API Architect','UI/UX Enthusiast','Problem Solver','Open Source Contributor'];
  let i=0,j=0,del=false;
  function tick(){
    const ph=phrases[i];
    el.textContent=del?ph.slice(0,j--):ph.slice(0,j++);
    if(!del&&j>ph.length){del=true;setTimeout(tick,2000);return;}
    if(del&&j<0){del=false;i=(i+1)%phrases.length;j=0;}
    setTimeout(tick,del?40:78);
  }
  setTimeout(tick,2200);
})();

// ── PROJECT FILTER ──
(function(){
  const tabs=document.querySelectorAll('.ftab'),cards=document.querySelectorAll('#proj-grid .proj-card'),feat=document.querySelector('.proj-featured');
  tabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');
      const f=tab.dataset.filter;
      if(feat)feat.style.display=(f==='all'||f===feat.dataset.cat)?'':'none';
      cards.forEach(c=>c.classList.toggle('hidden',f!=='all'&&c.dataset.cat!==f));
    });
  });
})();

// ── TILT EFFECT ──
(function(){
  document.querySelectorAll('.proj-card,.sk-card,.testi-card,.blog-card,.cert-card').forEach(card=>{
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(700px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave',()=>{card.style.transform='';});
  });
})();

// ── BACK TO TOP ──
(function(){
  const btn=document.getElementById('btt');
  window.addEventListener('scroll',()=>btn.classList.toggle('show',window.scrollY>400),{passive:true});
  btn.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
})();

// ── ACTIVE NAV ──
(function(){
  const sections=document.querySelectorAll('section[id]'),links=document.querySelectorAll('.nav-links li a');
  window.addEventListener('scroll',()=>{
    let cur='';
    sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id;});
    links.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+cur);});
  },{passive:true});
})();

// ── COPY EMAIL ──
(function(){
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const txt=btn.dataset.copy;
      navigator.clipboard.writeText(txt).then(()=>{
        const orig=btn.textContent;btn.textContent='✓ Copied!';btn.classList.add('copied');
        setTimeout(()=>{btn.textContent=orig;btn.classList.remove('copied');},2000);
      });
    });
  });
})();

// ── CV MODAL ──
(function(){
  const overlay=document.getElementById('cv-modal'),openBtns=document.querySelectorAll('[data-open-cv]'),closeBtns=document.querySelectorAll('[data-close-cv]');
  openBtns.forEach(b=>b.addEventListener('click',e=>{e.preventDefault();overlay.classList.add('open');document.body.style.overflow='hidden';}));
  closeBtns.forEach(b=>b.addEventListener('click',()=>{overlay.classList.remove('open');document.body.style.overflow='';}));
  overlay.addEventListener('click',e=>{if(e.target===overlay){overlay.classList.remove('open');document.body.style.overflow='';}});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){overlay.classList.remove('open');document.body.style.overflow='';}});
})();

// ── CONTACT FORM + CONFETTI ──
(function(){
  const form=document.getElementById('cform'),succ=document.getElementById('cform-succ');
  if(!form)return;
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('.cform-btn');
    btn.innerHTML='<span>Sending...</span>';btn.disabled=true;
    setTimeout(()=>{
      form.reset();succ.classList.add('show');
      btn.innerHTML='<span>Send Message</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
      btn.disabled=false;
      launchConfetti();
      setTimeout(()=>succ.classList.remove('show'),6000);
    },1300);
  });
  function launchConfetti(){
    const colors=['#6366f1','#14b8a6','#f59e0b','#ec4899','#4ade80','#a78bfa'];
    for(let i=0;i<60;i++){
      const el=document.createElement('div');
      el.className='confetti-piece';
      el.style.cssText=`left:${Math.random()*100}vw;background:${colors[Math.floor(Math.random()*colors.length)]};transform:rotate(${Math.random()*360}deg);animation-duration:${Math.random()*2.5+1.5}s;animation-delay:${Math.random()*.5}s;border-radius:${Math.random()>.5?'50%':'2px'}`;
      document.body.appendChild(el);
      setTimeout(()=>el.remove(),(Math.random()*2.5+2)*1000);
    }
  }
})();

// ── PARTICLES ──
(function(){
  const canvas=document.getElementById('particles');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H,dots=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<60;i++)dots.push({x:Math.random()*window.innerWidth,y:Math.random()*window.innerHeight,r:Math.random()*1.5+.4,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,o:Math.random()*.4+.1});
  function draw(){
    ctx.clearRect(0,0,W,H);
    dots.forEach(d=>{
      d.x+=d.vx;d.y+=d.vy;
      if(d.x<0||d.x>W)d.vx*=-1;if(d.y<0||d.y>H)d.vy*=-1;
      ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fillStyle=`rgba(99,102,241,${d.o})`;ctx.fill();
    });
    dots.forEach((a,i)=>dots.slice(i+1).forEach(b=>{const dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(99,102,241,${.08*(1-dist/130)})`;ctx.lineWidth=.5;ctx.stroke();}}));
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── GITHUB ACTIVITY GRID ──
(function(){
  const grid=document.getElementById('act-grid');
  if(!grid)return;
  const levels=['','l1','l2','l3','l4'];
  const weights=[30,25,20,15,10];
  function weightedRandom(){const r=Math.random()*100;let s=0;for(let i=0;i<weights.length;i++){s+=weights[i];if(r<s)return i;}return 0;}
  for(let w=0;w<26;w++){
    const week=document.createElement('div');week.className='act-week';
    for(let d=0;d<7;d++){const day=document.createElement('div');day.className='act-day '+levels[weightedRandom()];week.appendChild(day);}
    grid.appendChild(week);
  }
})();

// ── PWA SERVICE WORKER ──
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
}

console.log('%c🚀 Faruk Islam Portfolio v3','color:#6366f1;font-size:16px;font-weight:bold;font-family:serif');
console.log('%c✨ The Ultimate Edition — Built in Dhaka 🇧🇩','color:#14b8a6;font-size:12px');
