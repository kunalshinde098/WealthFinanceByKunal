
const money = n => Number.isFinite(n) ? '₹' + Math.round(n).toLocaleString('en-IN') : '—';
const cleanNumber = value => Number(String(value ?? '').replace(/[₹,\s]/g, '')) || 0;
const num = id => Math.max(0, cleanNumber(document.getElementById(id)?.value));
const annualToMonthly = annualPct => Math.pow(1 + Math.max(-99.99, annualPct) / 100, 1/12) - 1;
const months = years => Math.max(0, Math.round(years * 12));
const emi = (principal, annualPct, n) => {
  if (n <= 0) return 0;
  const r = annualPct / 1200;
  return r === 0 ? principal/n : principal*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);
};
function output(items) {
  const target = document.getElementById('results');
  if (!target) return;
  target.innerHTML = items.map((x,i) => `<div class="result ${i===0?'primary':''}"><h3>${x[0]}</h3><div class="value">${x[1]}</div>${x[2]?`<div class="detail">${x[2]}</div>`:''}</div>`).join('');
}
function calculate() {
 const type = document.body.dataset.type;
 if(type==='sip'){
  const p=num('monthly'), annual=num('rate'), n=months(num('years')), r=annualToMonthly(annual);
  let fv=0; for(let m=0;m<n;m++) fv=fv*(1+r)+p;
  const invested=p*n;
  output([['Future value',money(fv),'Monthly SIP deposited at the end of each month'],['Total invested',money(invested),`${n.toLocaleString('en-IN')} monthly instalments`],['Estimated gains',money(fv-invested),'Future value less total contributions']]);
 } else if(type==='stepup'){
  const p=num('monthly'), annual=num('rate'), y=Math.floor(num('years')), step=num('step')/100, r=annualToMonthly(annual);
  let fv=0,total=0;
  for(let m=1;m<=y*12;m++){fv*=1+r;const contribution=p*Math.pow(1+step,Math.floor((m-1)/12));fv+=contribution;total+=contribution;}
  output([['Estimated corpus',money(fv),'SIP increases once every 12 months'],['Total invested',money(total),'Sum of all monthly contributions'],['Estimated gains',money(fv-total),'Projected corpus less contributions']]);
 } else if(type==='lumpsum'){
  const p=num('amount'), annual=num('rate'), y=num('years'), fv=p*Math.pow(1+annual/100,y);
  output([['Future value',money(fv),'Annual compounding assumption'],['Invested amount',money(p)],['Estimated gains',money(fv-p)]]);
 } else if(type==='swp'){
  let balance=num('amount'), withdrawal=num('withdrawal'), annual=num('rate'), n=months(num('years')), r=annualToMonthly(annual), paid=0, elapsed=0;
  for(let m=1;m<=n && balance>0.005;m++){balance*=1+r;const take=Math.min(withdrawal,balance);balance-=take;paid+=take;elapsed++;}
  output([['Remaining corpus',money(Math.max(0,balance)),'After monthly return and month-end withdrawal'],['Total withdrawn',money(paid),`${elapsed} withdrawals made`],['Withdrawal duration',`${Math.floor(elapsed/12)} years ${elapsed%12} months`,'Stops when the corpus is exhausted or selected period ends']]);
 } else if(type==='fd'){
  const p=num('amount'), annual=num('rate'), y=num('years'), tax=Math.min(100,num('tax'))/100, n=y*4, maturity=p*Math.pow(1+annual/400,n), interest=maturity-p, post=p+interest*(1-tax);
  output([['Maturity value (pre-tax)',money(maturity),'Quarterly compounding assumption'],['Interest earned',money(interest),'Before tax'],['Indicative post-tax value',money(post),'Flat tax-rate approximation on total interest']]);
 } else if(type==='inflation'){
  const p=num('amount'), annual=num('rate')/100, y=num('years'), future=p*Math.pow(1+annual,y), present=p/Math.pow(1+annual,y);
  output([['Future cost',money(future),'What today’s amount may cost after inflation'],['Equivalent value today',money(present),'Today’s purchasing-power equivalent'],['Increase in cost',money(future-p),'Nominal increase over the period']]);
 } else if(type==='planning'){
  const goal=num('goal'), current=num('current'), annual=num('rate'), n=months(num('years')), r=annualToMonthly(annual);
  const currentFV=current*Math.pow(1+r,n), gap=Math.max(0,goal-currentFV);
  let sip=0;
  if(gap>0) sip=n===0?Infinity:(r===0?gap/n:gap*r/(Math.pow(1+r,n)-1));
  const contribution=Number.isFinite(sip)?sip*n:Infinity;
  output([
   ['Required monthly SIP',Number.isFinite(sip)?money(sip):'Not possible','Month-end SIP needed after growing your existing investments'],
   ['Future value of current investments',money(currentFV),'Existing corpus compounded to the goal date'],
   ['Future-value gap',money(gap),'Target less projected existing corpus'],
   ['Total new SIP contributions',Number.isFinite(contribution)?money(contribution):'—','Monthly SIP multiplied by the number of months']
  ]);
 } else if(type==='retirement'){
  const expense=num('expense'), age=num('age'), retire=num('retire'), life=num('life');
  const inflation=num('inflation')/100, preAnnual=num('rate'), postAnnual=num('postRate'), currentCorpus=num('currentCorpus');
  if(retire<=age || life<=retire){
    output([['Check your age inputs','Invalid','Retirement age must be greater than current age, and plan-until age must be greater than retirement age.']]);
    return;
  }
  const years=retire-age, retirementYears=life-retire, n=months(retirementYears);
  const expenseAtRetirement=expense*Math.pow(1+inflation,years);
  const infMonthly=Math.pow(1+inflation,1/12)-1, postMonthly=annualToMonthly(postAnnual);
  let requiredCorpus=0;
  // Monthly withdrawals at month-end; each month's withdrawal rises with monthly inflation.
  for(let m=1;m<=n;m++) requiredCorpus += expenseAtRetirement*Math.pow(1+infMonthly,m-1)/Math.pow(1+postMonthly,m);
  const existingAtRetirement=currentCorpus*Math.pow(1+annualToMonthly(preAnnual),months(years));
  const shortfall=Math.max(0,requiredCorpus-existingAtRetirement);
  const preMonthly=annualToMonthly(preAnnual);
  let sip=0;
  if(shortfall>0) sip=months(years)===0?Infinity:(preMonthly===0?shortfall/months(years):shortfall*preMonthly/(Math.pow(1+preMonthly,months(years))-1));
  output([
   ['Required retirement corpus',money(requiredCorpus),'Present value at retirement of inflation-growing monthly withdrawals'],
   ['Monthly expense at retirement',money(expenseAtRetirement),'Today’s expense inflated until retirement age'],
   ['Existing corpus at retirement',money(existingAtRetirement),'Current retirement savings compounded until retirement'],
   ['Indicative monthly SIP',Number.isFinite(sip)?money(sip):'Not possible','SIP required to fund any remaining corpus gap']
  ]);
 } else if(type==='ppf'){
  const annualDeposit=num('amount'), rate=num('rate')/100, years=Math.min(50,Math.floor(num('years')));
  let balance=0;
  // Simplified annual model: deposit at the start of each year, then annual interest.
  for(let y=0;y<years;y++) balance=(balance+annualDeposit)*(1+rate);
  const invested=annualDeposit*years;
  output([['Estimated maturity value',money(balance),'Annual compounding; deposit assumed at start of each year'],['Total deposits',money(invested)],['Estimated interest',money(balance-invested)]]);
 } else if(type==='emi'){
  const principal=num('amount'), annual=num('rate'), n=months(num('years')), monthlyEMI=emi(principal,annual,n), total=monthlyEMI*n;
  output([['Monthly EMI',money(monthlyEMI),'Reducing-balance loan; monthly rate = annual nominal rate ÷ 12'],['Total interest',money(total-principal),'Assumes rate and EMI remain unchanged'],['Total repayment',money(total),'Principal plus total interest']]);
 }
}
document.querySelectorAll('input').forEach(el=>el.addEventListener('input',calculate));
document.getElementById('calcBtn')?.addEventListener('click',calculate);
calculate();
