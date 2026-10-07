export type LedgerItem={type:"INCOME"|"EXPENSE"|"TRANSFER_IN"|"TRANSFER_OUT"|"ADJUSTMENT",amount:number};
export function calculateCurrentBalance(initial:number, items:LedgerItem[]){return items.reduce((b,i)=>b+(i.type==="INCOME"||i.type==="TRANSFER_IN"||i.type==="ADJUSTMENT"?i.amount:-i.amount),initial);}
export function calculateAvailableBalance(current:number, protectedAmount:number, allocated:number){return Math.max(0,current-protectedAmount-allocated);}
export function validateProtectedAmount(current:number, protectedAmount:number){return protectedAmount>=0&&protectedAmount<=current;}
export function savingProgress(current:number,target:number){return target<=0?0:Math.min(100,(current/target)*100);}
