# WealthFinanceByKunal — Formula Audit & Calculation Notes

This release standardises the core calculators, corrects calculation conventions, adds formula explanations to each calculator page, and improves Indian rupee input formatting.

## Core calculation conventions

- Currency inputs accept plain digits; display uses Indian comma grouping (for example, ₹10,00,000).
- SIP contributions are assumed at month-end.
- For investment projections, the effective monthly rate is derived from the effective annual return: `(1 + annual return)^(1/12) - 1`.
- Loan EMI uses the nominal annual loan rate divided by 12, consistent with standard reducing-balance EMI calculations.
- Outputs are estimates, not guaranteed returns.

## Calculator formulas and assumptions

| Calculator | Method |
|---|---|
| SIP | Future value of an ordinary monthly annuity; month-end deposits, effective monthly return. |
| Step-up SIP | Monthly SIP increases by the selected percentage every 12 months; each deposit is made at month-end. |
| Lumpsum | `FV = P × (1 + annual return)^years`; annual compounding. |
| SWP | Each month: apply effective monthly return, then withdraw the fixed amount at month-end. Stops when corpus is exhausted. |
| FD | Quarterly compounding; tax estimate applies a user-entered flat rate to total interest. Actual tax depends on the depositor's slab and applicable rules. |
| FD Tax | Compounding frequency selected by the user; simplified flat tax on total interest, not a full tax computation. |
| Inflation | `Future cost = current amount × (1 + inflation)^years`. |
| Financial Planning | Grow current investments to the goal date, subtract from target, then reverse-calculate month-end SIP for the remaining future-value gap. |
| Retirement Planner | Present value at retirement of monthly withdrawals that rise with monthly inflation; subtract future value of current retirement savings; calculate SIP for the remaining corpus. |
| PPF | Simplified annual model with each annual deposit assumed at the start of the year. Actual PPF interest is calculated monthly on eligible balances; rates and deposit timing can change the outcome. |
| Home Loan EMI | Standard reducing-balance EMI; fixed nominal annual rate divided by 12. |
| Car Loan EMI | Same reducing-balance EMI formula as home loan. |
| Car Loan vs FD + OD | Same monthly payment applied to both financing paths; OD interest is paid before principal reduction; OD simulation can continue beyond the original loan term. FD assumes quarterly compounding and flat tax; cashback assumed immediate. |
| Extra EMI vs RD | Compare monthly principal prepayment against monthly RD deposits followed by lump-sum prepayment; RD uses simplified monthly effective compounding and month-end deposits. Prepayment fees are included. |

## Retirement planner: corrected method

The prior implementation incorrectly accumulated monthly expenses as if they were deposits. The revised model calculates the present value at retirement of inflation-growing monthly withdrawals.

Inputs:
- Monthly expenses today
- Current age, retirement age and planning age
- Inflation rate
- Expected pre-retirement return
- Expected post-retirement return
- Current retirement investments

The monthly retirement expense at retirement is:
`Current monthly expense × (1 + inflation)^years until retirement`

The required retirement corpus is the sum of each projected retirement-month withdrawal discounted back to the retirement date using the post-retirement monthly return. Existing retirement savings are grown to retirement and offset against this corpus. The remaining amount is converted into a month-end SIP using the pre-retirement return assumption.

This is a deterministic estimate. It does not model market volatility, sequence-of-returns risk, healthcare shocks, taxes, changing asset allocation or irregular cash flows.

## Important limitations

- FD and FD Tax flat-tax estimates are not substitutes for an income-tax calculation. Interest taxation, TDS, surcharge, cess, deductions and tax slab may change the actual post-tax return.
- PPF is a simplified annual estimate, not an official account statement or exact month-wise interest calculation.
- RD in the loan comparison is simplified and does not reproduce every bank's quarterly RD interest convention.
- Loan comparisons exclude lender-specific processing fees, foreclosure rules, OD renewal conditions and changing interest rates unless explicitly entered.
- Market-linked returns are not guaranteed. Inflation and return assumptions remain constant throughout each projection.
- Validate assumptions and consult a qualified financial adviser before making financial decisions.

## Files

- `calculators.js`: standardised core calculation engine.
- `app.js`: navigation and Indian currency grouping.
- `calculators.css`: shared responsive design and formula styling.
- Individual HTML pages: inputs, results, formula explanation and assumptions.
