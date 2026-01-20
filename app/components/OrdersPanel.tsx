'use client';

import { useEffect, useState } from 'react';
import { getServices } from '@/app/lib/services';
import { OrderItem } from '@/app/lib/orders';

export default function OrdersPanel() {
  const [items, setItems] = useState<OrderItem[]>([]);

  const services = getServices();

  const addService = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const qty = service.hasQty ? 1 : 1;
    const total = service.price * qty;

    setItems([
      ...items,
      {
        serviceId: service.id,
        name: service.name,
        price: service.price,
        qty,
        total,
      },
    ]);
  };

  return (
    <div>
      <h3>Create Order</h3>

      <h4>Available works</h4>
      {services.map((s) => (
        <button
          key={s.id}
          onClick={() => addService(s.id)}
          style={{ marginRight: 8, marginBottom: 8 }}
        >
          {s.name} (${s.price})
        </button>
      ))}

      <hr />

      <h4>Order items</h4>
      {items.length === 0 && <div>No items yet</div>}

      {items.map((item, i) => (
        <div key={i}>
          {item.name} — ${item.price} × {item.qty} = ${item.total}
        </div>
      ))}
    </div>
  );
}
