(function(){
  var parentWin=null;
  try{if(window.parent!==window&&window.parent.location.origin===location.origin)parentWin=window.parent;}catch(e){}
  var host=parentWin||window;
  var video=document.querySelector('.lx-opening video');
  var play=document.querySelector('.lx-opening button[aria-label^="Play"]');
  if(video&&play)play.addEventListener('click',function(){
    video.controls=true;
    video.play().then(function(){play.hidden=true;}).catch(function(){video.controls=true;});
  });
  var details=Array.from(document.querySelectorAll('.lx-details'));
  function post(){var main=document.querySelector('main');if(main&&parentWin)parentWin.postMessage({tuluHeight:Math.ceil(main.getBoundingClientRect().bottom+scrollY)},location.origin);}
  function label(d){d.querySelector('summary').textContent=d.open?'Hide details':'View details';d.querySelector('summary').setAttribute('aria-label',(d.open?'Hide ':'View ')+d.closest('article').querySelector('h3,h4').textContent+' details');}
  function openOnly(d){
    var group=d.closest('[data-explorer]');
    group.querySelectorAll('.lx-details').forEach(function(other){if(other!==d){other.open=false;label(other);}});
    d.open=true;label(d);post();
  }
  function reveal(el){
    var frame=window.frameElement;
    var header=parentWin&&parentWin.document.querySelector('.site-header');
    var top=(frame?frame.getBoundingClientRect().top:0)+el.getBoundingClientRect().top;
    host.scrollBy({top:top-(header?header.getBoundingClientRect().height:0)-16,behavior:'auto'});
  }
  function afterResize(el){
    var attempts=0;
    function settle(){
      var main=document.querySelector('main'),frame=window.frameElement;
      var expected=main?Math.ceil(main.getBoundingClientRect().bottom+scrollY):0;
      if(frame&&Math.abs(frame.getBoundingClientRect().height-expected)>4&&attempts++<40){post();setTimeout(settle,50);return;}
      reveal(el);
    }
    setTimeout(settle,100);
  }
  function openHash(){
    if(parentWin&&parentWin.location.pathname!=='/longevity-os')return;
    var id;try{id=decodeURIComponent(host.location.hash.slice(1));}catch(e){return;}
    var el=document.getElementById(id);if(!el)return;
    var d=el.closest('.lx-details');if(d)openOnly(d);
    post();afterResize(d?d.closest('article').querySelector('h3,h4'):el);
  }
  // Native details names enforce exclusivity without JavaScript; this also
  // supports browsers that predate grouped details and keeps labels in sync.
  details.forEach(function(d){
    d.addEventListener('toggle',function(){
      if(d.open)openOnly(d);else label(d);
      post();
    });
    var summary=d.querySelector('summary');
    summary.addEventListener('click',function(e){
      e.preventDefault();
      var opening=!d.open;
      if(opening){
        var previous=Array.from(d.closest('[data-explorer]').querySelectorAll('.lx-details')).find(function(other){return other.open&&other!==d;});
        openOnly(d);
        host.history.pushState(host.history.state,'','#'+d.dataset.feature);
        if(previous)afterResize(d.closest('article').querySelector('h3,h4'));
      }else{d.open=false;label(d);post();}
    });
  });
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
