const bundlesEl=document.querySelector('#bundles');
const customInput=document.querySelector('#customCoins');
const summaryCoins=document.querySelector('#summaryCoins');
const summaryPrice=document.querySelector('#summaryPrice');
const payBtn=document.querySelector('#payBtn');
const toast=document.querySelector('#toast');
const fmt=n=>new Intl.NumberFormat('en-NG',{maximumFractionDigits:0}).format(n);
const money=n=>'₦'+fmt(n);
const priceFor=coins=>coins*25; // ₦2,500 per 100 coins
const amounts=[100,200,300,400,500,600,700,800,900,1000,1500,2000,2500,3000,4000,5000];
let selected=null;
amounts.forEach((amount,i)=>{
 const b=document.createElement('button'); b.type='button';b.className='bundle';b.dataset.amount=amount;
 b.innerHTML=`${amount===1000?'<span class="popular">POPULAR</span>':''}<span class="coin" aria-hidden="true">♪</span><div class="qty">${fmt(amount)} coins</div><div class="price">${money(priceFor(amount))}</div>`;
 b.addEventListener('click',()=>{customInput.value='';selectAmount(amount,b)});bundlesEl.appendChild(b);
});
function selectAmount(amount,button){
 selected=amount;document.querySelectorAll('.bundle').forEach(x=>x.classList.toggle('active',x===button));
 updateSummary();
}
function updateSummary(){
 const raw=customInput.value.trim();
 if(raw){const n=Number(raw);selected=Number.isInteger(n)&&n>=100&&n<=200000?n:null;document.querySelectorAll('.bundle').forEach(x=>x.classList.remove('active'));}
 const valid=Number.isInteger(selected)&&selected>=100&&selected<=200000;
 summaryCoins.textContent=valid?fmt(selected)+' coins':'—';
 summaryPrice.textContent=valid?money(priceFor(selected)):'₦0';
 payBtn.disabled=!valid;
}
customInput.addEventListener('input',()=>{selected=null;updateSummary()});
payBtn.addEventListener('click',()=>{
 if(payBtn.disabled)return;
 toast.textContent='KoraPay checkout is not connected yet. Add your merchant integration to accept live payments.';
 toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),4500);
});
