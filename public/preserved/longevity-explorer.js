(function(){
  var doc=document.documentElement; doc.classList.add('js');
  var parentWin=null; try{ if(window.parent!==window && window.parent.location.origin===location.origin) parentWin=window.parent }catch(e){}
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  // video
  var v=document.querySelector('.lx-opening video'), b=document.querySelector('.lx-opening button[aria-label^="Play"]');
  if(v&&b) b.addEventListener('click',function(){ b.style.display='none'; v.controls=true; v.play(); });
  var mq=matchMedia('(max-width: 760px)');
  var explorers=[].slice.call(document.querySelectorAll('[data-explorer]')).map(function(root){
    var tabs=[].slice.call(root.querySelectorAll('.lx-tab')), accs=[].slice.call(root.querySelectorAll('.lx-acc')), panels=[].slice.call(root.querySelectorAll('[data-panel]'));
    var state={root:root,selected:panels[0].id,open:{},ids:panels.map(function(p){return p.id})};
    state.open[state.selected]=true;
    state.render=function(){
      var acc=mq.matches; root.dataset.mode=acc?'accordion':'tabs';
      root.querySelector('.lx-tablist').setAttribute('role',acc?'presentation':'tablist');
      tabs.forEach(function(t){var on=t.dataset.target===state.selected; t.setAttribute('aria-selected',on); t.tabIndex=on?0:-1;});
      accs.forEach(function(a){a.setAttribute('aria-expanded',!!state.open[a.dataset.target]);});
      panels.forEach(function(p){
        var show=acc?!!state.open[p.id]:p.id===state.selected; p.hidden=!show;
        if(acc){p.setAttribute('role','region');p.setAttribute('aria-labelledby','acc-'+p.id);p.removeAttribute('tabindex');}
        else{p.setAttribute('role','tabpanel');p.setAttribute('aria-labelledby','tab-'+p.id);p.tabIndex=0;}
      });
      post();
    };
    state.select=function(id,opts){ state.selected=id; state.open[id]=true; state.render(); if(opts&&opts.hash) setHash(id); if(opts&&opts.reveal) reveal(document.getElementById(mq.matches?'acc-'+id:'tab-'+id), opts.force); };
    tabs.forEach(function(t,i){
      t.addEventListener('click',function(){state.select(t.dataset.target,{hash:true,reveal:true})});
      t.addEventListener('keydown',function(e){var k=e.key,n=null;
        if(k==='ArrowRight')n=(i+1)%tabs.length; else if(k==='ArrowLeft')n=(i-1+tabs.length)%tabs.length; else if(k==='Home')n=0; else if(k==='End')n=tabs.length-1;
        if(n===null)return; e.preventDefault(); state.select(tabs[n].dataset.target,{hash:true}); tabs[n].focus({preventScroll:true});});
    });
    accs.forEach(function(a){a.addEventListener('click',function(){var id=a.dataset.target;
      if(state.open[id]){state.open[id]=false; state.render();} else {state.select(id,{hash:true});} });});
    return state;
  });
  function post(){ if(window.parent!==window) window.parent.postMessage({tuluHeight:Math.ceil(document.querySelector('main').getBoundingClientRect().bottom+scrollY)},location.origin); }
  function setHash(id){ var w=parentWin||window; try{ w.history.replaceState(w.history.state,'','#'+id);}catch(e){} }
  // Scroll the outer page only as much as needed to show the element near the top
  function reveal(el, force){ if(!el)return;
    var w=parentWin, frameTop=0, headerH=0, vh=innerHeight, sy=scrollY;
    if(w&&window.frameElement){ frameTop=window.frameElement.getBoundingClientRect().top; var h=w.document.querySelector('.site-header'); headerH=h?h.getBoundingClientRect().height:0; vh=w.innerHeight; }
    var top=frameTop+el.getBoundingClientRect().top;
    if(!force && top>=headerH+8 && top<=vh*0.45) return;
    var target=top-headerH-16;
    (w||window).scrollBy({top:target,behavior:reduced?'auto':(force?'auto':'smooth')});
  }
  function fromHash(force){
    var h=((parentWin||window).location.hash||'').slice(1); if(!h)return;
    for(var i=0;i<explorers.length;i++) if(explorers[i].ids.indexOf(h)>-1){ explorers[i].select(h); var id=h; requestAnimationFrame(function(){reveal(document.getElementById(mq.matches?'acc-'+id:'tab-'+id),true)}); return; }
    var sec=document.getElementById(h); if(sec) requestAnimationFrame(function(){reveal(sec,true)});
  }
  explorers.forEach(function(s){s.render()});
  mq.addEventListener('change',function(){explorers.forEach(function(s){s.render()})});
  // section jump links inside the page
  document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href^="#"]'); if(!a)return; var id=a.getAttribute('href').slice(1), el=document.getElementById(id); if(!el)return; e.preventDefault(); setHash(id); reveal(el,true);});
  (parentWin||window).addEventListener('hashchange',function(){fromHash(true)});
  if(parentWin) parentWin.addEventListener('popstate',function(){setTimeout(function(){fromHash(true)},0)});
  new ResizeObserver(post).observe(document.body);
  if(document.readyState==='complete') setTimeout(function(){fromHash(true)},50); else addEventListener('load',function(){setTimeout(function(){fromHash(true)},50)});
  post();
})();
