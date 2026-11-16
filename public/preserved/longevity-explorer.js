(function(){
  var parentWin=null;
  try { if(window.parent!==window && window.parent.location.origin===location.origin) parentWin=window.parent; } catch(e) {}
  var host=parentWin||window;
  var video=document.querySelector('.lx-opening video');
  var play=document.querySelector('.lx-opening button[aria-label^="Play"]');
  if(video&&play) play.addEventListener('click',function(){
    video.controls=true;
    video.play().then(function(){play.hidden=true;play.style.display='none';}).catch(function(){video.controls=true;});
  });
  function post(){var main=document.querySelector('main');if(main&&parentWin)parentWin.postMessage({tuluHeight:Math.ceil(main.getBoundingClientRect().bottom+scrollY)},location.origin);}
  function reveal(el){
    if(!el)return;
    var frame=window.frameElement;
    var header=parentWin&&parentWin.document.querySelector('.site-header');
    var top=(frame?frame.getBoundingClientRect().top:0)+el.getBoundingClientRect().top;
    host.scrollBy({top:top-(header?header.getBoundingClientRect().height:0)-16,behavior:'auto'});
  }
  function openHash(){
    if(parentWin&&parentWin.location.pathname!=='/longevity-os')return;
    var id=host.location.hash.slice(1),el=document.getElementById(id);
    if(!el)return;
    var detail=el.closest('details');if(detail)detail.open=true;
    if(el.classList.contains('lx-conversation'))el.open=true;
    post();
    setTimeout(function(){reveal(detail?detail.querySelector('summary'):el);},200);
  }
  document.querySelectorAll('.lx-details').forEach(function(d){d.addEventListener('toggle',function(){
    d.querySelector('summary').textContent=(d.open?'Hide ':'View ')+d.closest('article').querySelector('h3').textContent+' details';
    post();
  });});
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[href^="#"]');if(!a)return;
    var id=a.getAttribute('href').slice(1);if(!document.getElementById(id))return;
    e.preventDefault();host.location.hash=id;openHash();
  });
  host.addEventListener('hashchange',openHash);host.addEventListener('popstate',openHash);
  addEventListener('pagehide',function(){host.removeEventListener('hashchange',openHash);host.removeEventListener('popstate',openHash);});
  new ResizeObserver(post).observe(document.body);
  if(document.readyState==='complete')setTimeout(openHash,100);else addEventListener('load',function(){setTimeout(openHash,100);});
  post();
})();
