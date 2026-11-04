(function(){
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
  if(btn){btn.addEventListener('click',function(){var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o)});
    nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)}})}
  var top=document.querySelector('.to-top');
  if(top){window.addEventListener('scroll',function(){top.classList.toggle('show',window.scrollY>600)},{passive:true});
    top.addEventListener('click',function(){window.scrollTo({top:0})})}
  var items=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});items.forEach(function(i){io.observe(i)})}
  else items.forEach(function(i){i.classList.add('in')});
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
  var f=document.getElementById('enquiry');
  if(f){f.addEventListener('submit',function(e){e.preventDefault();
    var d=new FormData(f),body='Name: '+d.get('name')+'\nPhone: '+d.get('phone')+'\nEmail: '+d.get('email')+'\nInterest: '+d.get('interest')+'\n\n'+d.get('message');
    window.location.href='mailto:'+f.dataset.email+'?subject='+encodeURIComponent('Website enquiry: '+d.get('interest'))+'&body='+encodeURIComponent(body);
    document.getElementById('form-msg').classList.add('show');f.reset()})}
})();
/* Lightbox with zoom (buttons, wheel, double-click, pinch, drag) */
(function(){
  var btns=[].slice.call(document.querySelectorAll('.zoom'));if(!btns.length)return;
  var lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo viewer');
  lb.innerHTML='<div class="lb-bar"><span class="lb-count"></span><div class="lb-tools"><button type="button" data-a="out" aria-label="Zoom out">&minus;</button><button type="button" data-a="in" aria-label="Zoom in">+</button><button type="button" data-a="reset" aria-label="Reset zoom" style="font-size:.8rem">1:1</button><button type="button" data-a="close" aria-label="Close">&times;</button></div></div><div class="lb-stage"><img alt=""></div><button type="button" class="lb-prev" data-a="prev" aria-label="Previous photo">&lsaquo;</button><button type="button" class="lb-next" data-a="next" aria-label="Next photo">&rsaquo;</button><p class="lb-cap"></p>';
  document.body.appendChild(lb);
  var st=lb.querySelector('.lb-stage'),im=st.querySelector('img'),cap=lb.querySelector('.lb-cap'),cnt=lb.querySelector('.lb-count');
  var i=0,s=1,x=0,y=0,last=null,pts={},pd=0,moved=false,opener=null;
  function apply(){im.style.transform='translate('+x+'px,'+y+'px) scale('+s+')';st.classList.toggle('zoomed',s>1)}
  function clamp(){if(s<=1){x=0;y=0;return}var mx=im.clientWidth*(s-1)/2+40,my=im.clientHeight*(s-1)/2+40;x=Math.max(-mx,Math.min(mx,x));y=Math.max(-my,Math.min(my,y))}
  function zoom(n){s=Math.max(1,Math.min(5,n));clamp();apply()}
  function show(n){i=(n+btns.length)%btns.length;s=1;x=0;y=0;apply();im.src=btns[i].dataset.full;im.alt=btns[i].querySelector('img').alt;cap.textContent=btns[i].dataset.cap;cnt.textContent=(i+1)+' / '+btns.length}
  function open(n){opener=btns[n];show(n);lb.classList.add('open');document.body.style.overflow='hidden';lb.querySelector('[data-a=close]').focus()}
  function close(){lb.classList.remove('open');document.body.style.overflow='';if(opener)opener.focus()}
  btns.forEach(function(b,n){b.addEventListener('click',function(){open(n)})});
  lb.addEventListener('click',function(e){var a=e.target.closest('[data-a]');if(!a)return;a=a.dataset.a;
    if(a==='close')close();else if(a==='next')show(i+1);else if(a==='prev')show(i-1);else if(a==='in')zoom(s+.75);else if(a==='out')zoom(s-.75);else if(a==='reset')zoom(1)});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();else if(e.key==='ArrowRight')show(i+1);else if(e.key==='ArrowLeft')show(i-1);else if(e.key==='+'||e.key==='=')zoom(s+.75);else if(e.key==='-')zoom(s-.75);else if(e.key==='0')zoom(1)});
  st.addEventListener('wheel',function(e){e.preventDefault();zoom(s*(e.deltaY<0?1.2:1/1.2))},{passive:false});
  st.addEventListener('dblclick',function(){zoom(s>1?1:2.5)});
  st.addEventListener('click',function(e){if(e.target===st&&!moved)close()});
  st.addEventListener('pointerdown',function(e){st.setPointerCapture(e.pointerId);pts[e.pointerId]=e;last={x:e.clientX,y:e.clientY};moved=false;var k=Object.keys(pts);if(k.length===2)pd=Math.hypot(pts[k[0]].clientX-pts[k[1]].clientX,pts[k[0]].clientY-pts[k[1]].clientY);if(s>1)st.classList.add('drag')});
  st.addEventListener('pointermove',function(e){if(!pts[e.pointerId])return;pts[e.pointerId]=e;var k=Object.keys(pts);
    if(k.length===2){var d=Math.hypot(pts[k[0]].clientX-pts[k[1]].clientX,pts[k[0]].clientY-pts[k[1]].clientY);if(pd)zoom(s*d/pd);pd=d;moved=true}
    else if(s>1){x+=e.clientX-last.x;y+=e.clientY-last.y;last={x:e.clientX,y:e.clientY};moved=true;clamp();apply()}});
  function up(e){delete pts[e.pointerId];pd=0;st.classList.remove('drag');if(Object.keys(pts).length===1){var r=pts[Object.keys(pts)[0]];last={x:r.clientX,y:r.clientY}}}
  st.addEventListener('pointerup',up);st.addEventListener('pointercancel',up);
  var sx=null;st.addEventListener('touchstart',function(e){sx=e.touches.length===1&&s===1?e.touches[0].clientX:null},{passive:true});
  st.addEventListener('touchend',function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>60)show(i+(d<0?1:-1));sx=null},{passive:true});
})();
