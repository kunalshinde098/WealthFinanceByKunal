
(()=> {
 const path=location.pathname.split('/').pop()||'index.html';
 const title=document.title.split('|')[0].trim()||'Financial Calculators';
 const nav="<aside id=\"wfSidebar\"><a class=\"wf-brand\" href=\"index.html\">\u20b9 WealthFinance<span style=\"color:#72d7c4\">ByKunal</span><small>SMART MONEY TOOLS</small></a><nav class=\"wf-nav\"><input class=\"wf-search\" id=\"wfSearch\" placeholder=\"Search calculators...\" aria-label=\"Search calculators\"><a class=\"wf-link\" href=\"index.html\">\u2302 &nbsp; Calculator Home</a><div class=\"wf-label\">Financial toolkit</div><button class=\"wf-toggle\" type=\"button\" aria-expanded=\"true\" aria-controls=\"wf-tree-0\">\ud83d\udcc8&nbsp; INVEST & GROW<span class=\"arrow\">\u203a</span></button><div class=\"wf-sub\" id=\"wf-tree-0\"><a class=\"wf-link\" href=\"sip-calculator.html\" data-name=\"sip calculator\">\ud83d\udcc8&nbsp; SIP Calculator</a><a class=\"wf-link\" href=\"step-up-sip-calculator.html\" data-name=\"step up sip\">\ud83d\ude80&nbsp; Step Up SIP</a><a class=\"wf-link\" href=\"lumpsum-calculator.html\" data-name=\"lumpsum calculator\">\ud83d\udcb0&nbsp; Lumpsum Calculator</a><a class=\"wf-link\" href=\"swp-calculator.html\" data-name=\"swp calculator\">\ud83d\udd04&nbsp; SWP Calculator</a><a class=\"wf-link\" href=\"fd-calculator.html\" data-name=\"fixed deposit (fd)\">\ud83c\udfe6&nbsp; Fixed Deposit (FD)</a><a class=\"wf-link\" href=\"inflation-calculator.html\" data-name=\"inflation calculator\">\ud83d\udcc9&nbsp; Inflation Calculator</a><a class=\"wf-link\" href=\"fd-tax-calculator.html\" data-name=\"fd tax calculator\">\ud83e\uddfe&nbsp; FD Tax Calculator</a></div><button class=\"wf-toggle\" type=\"button\" aria-expanded=\"true\" aria-controls=\"wf-tree-1\">\ud83e\udded&nbsp; PLAN YOUR FUTURE<span class=\"arrow\">\u203a</span></button><div class=\"wf-sub\" id=\"wf-tree-1\"><a class=\"wf-link\" href=\"financial-planning-calculator.html\" data-name=\"financial planning\">\ud83c\udfaf&nbsp; Financial Planning</a><a class=\"wf-link\" href=\"retirement-planner.html\" data-name=\"retirement planner\">\ud83c\udf05&nbsp; Retirement Planner</a><a class=\"wf-link\" href=\"ppf-calculator.html\" data-name=\"ppf calculator\">\ud83d\udcdc&nbsp; PPF Calculator</a></div><button class=\"wf-toggle\" type=\"button\" aria-expanded=\"true\" aria-controls=\"wf-tree-2\">\ud83c\udfe1&nbsp; LOANS & REPAYMENT<span class=\"arrow\">\u203a</span></button><div class=\"wf-sub\" id=\"wf-tree-2\"><a class=\"wf-link\" href=\"home-loan-emi-calculator.html\" data-name=\"home loan emi\">\ud83c\udfe0&nbsp; Home Loan EMI</a><a class=\"wf-link\" href=\"car-loan-emi-calculator.html\" data-name=\"car loan emi\">\ud83d\ude97&nbsp; Car Loan EMI</a><a class=\"wf-link\" href=\"car-loan-vs-fd-od.html\" data-name=\"car loan vs fd + od\">\u2696\ufe0f&nbsp; Car Loan vs FD + OD</a><a class=\"wf-link\" href=\"car-loan-extra-vs-rd.html\" data-name=\"extra emi vs rd\">\u2795&nbsp; Extra EMI vs RD</a></div></nav><div class=\"wf-foot\">Practical tools for smarter money decisions<br><a href=\"https://whatsapp.com/channel/0029VaDsVrdGJP8Dq8mHdS3M\" target=\"_blank\" rel=\"noopener\">Follow on WhatsApp \u2197</a></div></aside>";
 const original=[...document.body.childNodes];
 document.body.insertAdjacentHTML('afterbegin',nav+'<div id="wfOverlay"></div>');
 const main=document.createElement('div');main.id='wfMain';
 original.forEach(node=>main.appendChild(node));
 document.body.appendChild(main);
 const top=document.createElement('header');top.id='wfTop';
 top.innerHTML='<div style="display:flex;align-items:center;gap:12px"><button id="wfMenu" aria-label="Open navigation" aria-expanded="false">☰</button><span class="crumb">WealthFinanceByKunal&nbsp; / &nbsp;'+title.replace(/[<>]/g,'')+'</span></div><span class="tag">India-focused calculators</span>';
 main.insertBefore(top,main.firstChild);
 const content=document.createElement('div');content.className='wf-content';
 while(top.nextSibling)content.appendChild(top.nextSibling);
 main.appendChild(content);
 const active=document.querySelector('#wfSidebar a[href="'+path+'"]');if(active)active.classList.add('active');
 document.querySelectorAll('.wf-toggle').forEach(btn=>btn.addEventListener('click',()=>{const sub=document.getElementById(btn.getAttribute('aria-controls'));const opened=btn.getAttribute('aria-expanded')==='true';btn.setAttribute('aria-expanded',String(!opened));sub.hidden=opened;}));
 const menu=document.getElementById('wfMenu'),overlay=document.getElementById('wfOverlay');
 const close=()=>{document.body.classList.remove('wf-nav-open');menu.setAttribute('aria-expanded','false')};
 menu.addEventListener('click',()=>{document.body.classList.toggle('wf-nav-open');menu.setAttribute('aria-expanded',document.body.classList.contains('wf-nav-open')?'true':'false')});
 overlay.addEventListener('click',close);document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
 document.querySelectorAll('#wfSidebar a').forEach(a=>a.addEventListener('click',close));

 // Indian-number grouping for rupee inputs across every calculator page.
 const groupINR=value=>{
   const raw=String(value??'').replace(/[₹,\s]/g,'');
   if(!raw)return '';
   const parts=raw.split('.');
   const whole=parts[0].replace(/\D/g,'');
   const decimals=parts.length>1?'.'+parts.slice(1).join('').replace(/\D/g,'').slice(0,2):'';
   return (whole?Number(whole).toLocaleString('en-IN'):'0')+decimals;
 };
 document.querySelectorAll('input[data-money="inr"]').forEach(el=>{
   el.value=groupINR(el.value);
   el.addEventListener('focus',()=>{el.value=el.value.replace(/,/g,'')});
   el.addEventListener('blur',()=>{el.value=groupINR(el.value);el.dispatchEvent(new Event('input',{bubbles:true}))});
 });
 const search=document.getElementById('wfSearch');
 search.addEventListener('input',()=>{const q=search.value.toLowerCase().trim();document.querySelectorAll('.wf-toggle').forEach(btn=>{const sub=document.getElementById(btn.getAttribute('aria-controls'));let n=0;sub.querySelectorAll('a').forEach(a=>{const show=!q||a.textContent.toLowerCase().includes(q);a.hidden=!show;if(show)n++});btn.hidden=n===0;sub.hidden=q?false:n===0;btn.setAttribute('aria-expanded',q?'true':btn.getAttribute('aria-expanded'))})});
})();
