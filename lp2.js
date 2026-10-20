
(function(){
  var bar=document.getElementById('ctafix'), fv=document.querySelector('.fv'), contact=document.getElementById('contact'), ft=document.querySelector('.ft');
  var pastFv=false,inContact=false,inFt=false,onForm=false;
  function sync(){ onForm=inContact||inFt; var on=pastFv&&!onForm; if(bar) bar.classList.toggle('is-on',on); document.body.classList.toggle('fx-on',on); }
  if(bar&&fv&&('IntersectionObserver' in window)){
    new IntersectionObserver(function(es){pastFv=!es[0].isIntersecting;sync();},{threshold:0}).observe(fv);
    if(contact) new IntersectionObserver(function(es){inContact=es[0].isIntersecting;sync();},{threshold:.15}).observe(contact);
    if(ft) new IntersectionObserver(function(es){inFt=es[0].isIntersecting;sync();},{threshold:0}).observe(ft);
    var price=document.getElementById('price');
    if(price) new IntersectionObserver(function(es){ if(es[0].boundingClientRect.top<0) bar.classList.add('is-past-price'); },{threshold:0}).observe(price);
  }
  document.querySelectorAll('details').forEach(function(d){
    d.addEventListener('toggle',function(){
      if(!d.open||!bar) return;
      var r=d.getBoundingClientRect(), bh=bar.classList.contains('is-on')?bar.offsetHeight:0;
      if(r.bottom>window.innerHeight-bh-8) window.scrollBy(0, r.bottom-(window.innerHeight-bh-16));
    });
  });
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-intent="doc"]'); if(!a) return;
    var ta=document.getElementById('cf-msg'); if(ta&&!ta.value.trim()) ta.value='サービス資料の送付を希望します。';
  });
})();
