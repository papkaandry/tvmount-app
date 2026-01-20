'use client';

import { useEffect, useState } from 'react';
import { getServices } from '@/app/lib/services';
import { getOrders, saveOrders, Order } from '@/app/lib/orders';

export default function OrdersPanel() {
  const services = getServices();
  const [items, setItems] = useState<any[]>([]);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const orders = getOrders();
    if (orders.length > 0) {
      const last = orders[orders.length - 1];
      setItems(last.items);
      setLocked(last.locked);
    }
  }, []);

  const add = (s: any) => {
    if (locked) return;
    setItems([...items, { name: s.name, price: s.price, qty: 1, total: s.price }]);
  };

  const update = (i: number, field: 'qty' | 'price', value: number) => {
    if (locked) return;
    const copy = [...items];
    copy[i][field] = value;
    copy[i].total = copy[i].price * copy[i].qty;
    setItems(copy);
  };

  const total = items.reduce((s, i) => s + i.total, 0);

  const save = () => {
    const orders = getOrders();
    const order: Order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      createdBy: localStorage.getItem('user') || '',
      role: localStorage.getItem('role') as any,
      items,
      total,
      locked: true,
    };
    saveOrders([...orders, order]);
    setLocked(true);
    alert('Order saved');
  };

  return (
    <div>
      <h3>Orders</h3>

      {!locked && (
        <>
          {services.map((s) => (
            <button key={s.id} onClick={() => add(s)} style={{ marginRight: 6, marginBottom: 6 }}>
              {s.name} (${s.price})
            </button>
          ))}
        </>
      )}

      <hr />

      {items.map((i, idx) => (
        <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
          <b style={{ width: 200 }}>{i.name}</b>
          <input type="number" value={i.qty} disabled={locked} onChange={(e) => update(idx, 'qty', +e.target.value)} />
          <input type="number" value={i.price} disabled={locked} onChange={(e) => update(idx, 'price', +e.target.value)} />
          <span>= ${i.total}</span>
        </div>
      ))}

      <hr />
      <b>Total: ${total}</b>

      {!locked && items.length > 0 && (
        <div>
          <button onClick={save} style={{ marginTop: 10 }}>Save Order</button>
        </div>
      )}

      {locked && <div>🔒 Order locked</div>}
    </div>
  );
}
