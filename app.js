const menu=document.querySelector('.menu');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('.nav').classList.toggle('open',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>{menu?.setAttribute('aria-expanded','false');document.querySelector('.nav').classList.remove('open')}));
document.querySelector('.print')?.addEventListener('click',()=>window.print());
const money=n=>new Intl.NumberFormat('ru-RU').format(n)+' ₽';
const rows=[...document.querySelectorAll('#bom-body tr')];
function updateBom(){
  const mode=document.querySelector('#bom-config')?.value||'1';
  const query=(document.querySelector('#bom-search')?.value||'').trim().toLocaleLowerCase('ru');
  let total=0,visible=0;
  rows.forEach(row=>{const q=Number(row.dataset[mode==='4'?'q4':'q1']);const cost=q*Number(row.dataset.unit);total+=cost;row.querySelector('.quantity').textContent=q;row.querySelector('.line-total').textContent=money(cost);row.hidden=!row.dataset.name.includes(query);if(!row.hidden)visible++});
  if(rows.length){document.querySelector('#bom-total').textContent=money(total);document.querySelector('#bom-reserve').textContent='С резервом 25%: '+money(Math.ceil(total*1.25));document.querySelector('#bom-empty').hidden=visible>0}
}
document.querySelector('#bom-config')?.addEventListener('change',updateBom);
document.querySelector('#bom-search')?.addEventListener('input',updateBom);
if(rows.length)updateBom();
function toa(bytes,sf){const de=sf>=11?1:0;const symbols=8+Math.max(Math.ceil((8*bytes-4*sf+28+16)/(4*(sf-2*de)))*5,0);return(12.25+symbols)*2**sf/125000}
function updateTime(){
  const control=document.querySelector('#jpeg-size');if(!control)return;
  const size=Number(control.value),sf=Number(document.querySelector('#sf').value),duty=Number(document.querySelector('#duty').value),loss=Number(document.querySelector('#loss').value);
  const count=Math.ceil(size/200);let tx=0;for(let i=0;i<count;i++)tx+=toa(26+Math.min(200,size-i*200),sf);
  const ack=count*toa(26,sf);const retries=1/(1-loss)**2;
  const seconds=duty===1?(tx+ack)*retries:Math.max(tx,ack)/duty*retries;
  const format=n=>new Intl.NumberFormat('ru-RU',{maximumFractionDigits:1}).format(n);
  document.querySelector('#time-result').textContent=seconds>=3600?format(seconds/3600)+' ч':seconds>=60?format(seconds/60)+' мин':format(seconds)+' с';
  document.querySelector('#time-detail').textContent=count+' пакетов · эфир узла '+format(tx)+' с · ACK базы '+format(ack)+' с'+(loss?' · средний множитель повторов '+format(retries):'');
}
['jpeg-size','sf','duty','loss'].forEach(id=>document.getElementById(id)?.addEventListener('change',updateTime));updateTime();
const headings=[...document.querySelectorAll('.prose h2[id]')];
if('IntersectionObserver' in window&&headings.length){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('.toc a').forEach(a=>{const active=a.getAttribute('href')==='#'+entry.target.id;a.classList.toggle('current',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}})},{rootMargin:'-15% 0px -65% 0px'});headings.forEach(h=>observer.observe(h))}
