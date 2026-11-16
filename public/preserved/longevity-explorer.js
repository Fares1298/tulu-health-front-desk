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
  function post(){var main=document.querySelector('main');if(main&&parentWin)parentWin.postMessage({tuluHeight:Math.ceil(main.getBoundingClientRect().bottom+scrollY)},location.origin);}
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
    post();afterResize(el);
  }
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
