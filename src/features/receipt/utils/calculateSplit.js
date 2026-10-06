import { toCents } from "./money";

// Split `total` cents between `count` people. Leftover cents go to the
// first people so the parts always sum exactly to the total.
// e.g. 1000 / 3 -> [334, 333, 333]
function splitEvenly(total, count) {
  const base = Math.floor(total / count);
  const remainder = total - base * count;
  return Array.from({ length: count }, (_, i) => base + (i < remainder ? 1 : 0));
}


// Match people who owe money with people who are owed, with few transfers.
function calculateTransfers(balances) {
  const debtors = balances.filter((b) => b.balance < 0).map((b) => ({ id: b.id, amount: -b.balance }));
  const creditors = balances.filter((b) => b.balance > 0).map((b) => ({ id: b.id, amount: b.balance }));

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const transfers = [];
  let i = 0;
  let j = 0;

  while (i < debtors.length && j < creditors.length) {
    const amount = Math.min(debtors[i].amount, creditors[j].amount);
    transfers.push({ fromId: debtors[i].id, toId: creditors[j].id, amount });

    debtors[i].amount -= amount;
    creditors[j].amount -= amount;

    if (debtors[i].amount === 0) i++;
    if (creditors[j].amount === 0) j++;
  }

  return transfers;
}


export function calculateSplit(people, items) {
  const byPerson = Object.fromEntries(
    people.map((p) => [p.id, { person: p, lines: [], total: 0, paid: 0, balance: 0 }])
  );

  for (const item of items) {
    // what each person owes for this item
    const shares = splitEvenly(toCents(item.price), item.sharedBy.length);
    item.sharedBy.forEach((personId, index) => {
      const entry = byPerson[personId];
      if (!entry) return;
      entry.lines.push({
        itemId: item.id,
        name: item.name,
        amount: shares[index],
        sharedCount: item.sharedBy.length,
      });
      entry.total += shares[index];
    });

    // what each person actually paid for this item
    for (const payment of item.payments) {
      const entry = byPerson[payment.payerId];
      if (entry) entry.paid += toCents(payment.amount);
    }
  }

  const receipts = Object.values(byPerson).map((r) => ({ ...r, balance: r.paid - r.total }));
  const transfers = calculateTransfers(receipts.map((r) => ({ id: r.person.id, balance: r.balance })));
  const grandTotal = receipts.reduce((sum, r) => sum + r.total, 0);

  return { receipts, transfers, grandTotal };
}
