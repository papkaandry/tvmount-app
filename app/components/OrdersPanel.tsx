'use client';

import { useEffect, useState } from 'react';
import { getServices } from '@/app/lib/services';
import { getOrders, saveOrders, OrderItem, Order } from '@/app/lib/orders';

export default function OrdersPanel() {
  const services = getServices();

  const [items, setItems] = useState<OrderItem[]>([]);
  const [locked, setLocked] = useState(false);

  const addService = (serviceId: string) => {
    if (locked) return;

    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const qty = service.hasQty ? 1 : 1;

    setItems((prev) => [
      ...prev,
      {
        serviceId: service.id,
        name: service.name,
        price: service.price,
        qty,
        total: service.price * qty,
      },
    ]);
  };

  const updateItem = (
    index: number,
    field: 'price' | 'qty',
    value: number
  ) => {
    if (locked) return;

    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: value,
      total:
        (field === 'price' ? value : updated[index].price) *
        (field === 'qty' ? value : updated[index].qty),
    };

    setItems(updated);
  };

  const removeItem = (index: number) => {
    if (locked) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const orderTotal = items.reduce((sum, i) => sum + i.total, 0);

  const saveOrder = () => {
    const orders = getOrders();

    const newOrder: Order = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      createdBy: localStorage.getItem('user') || 'unknown',
      role: localStorage.getItem('role') as any,
      items,
      total: orderTotal,
      locked: true,
    };

    saveOrders([...orders, newOrder]);
    setLocked(true);
    alert('Order saved and locked');
  };

  return (
    <div>
      <h3>Create Order</h3>

      {!locked && (
        <>
          <h4>Services</h4>
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => addService(s.id)}
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              {s.name} (${s.price})
            </button>
          ))}
        </>
      )}

      <hr />

      <h4>Order items</h4>

      {items.length === 0 && <div>No items</div>}

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <strong style={{ width: 220 }}>{item.name}</strong>

          <input
            type="number"
            value={item.qty}
            disabled={locked}
            onChange={(e) =>
              updateItem(i, 'qty', Number(e.target.value))
            }
            style={{ width: 60 }}
          />

          <input
            type="number"
            value={item.price}
            disabled={locked}
            onChange={(e) =>
              updateItem(i, 'price', Number(e.target.value))
            }
            style={{ width: 80 }}
          />

          <span>= ${item.total}</span>

          {!locked && (
            <button onClick={() => removeItem(i)}>❌</button>
          )}
        </div>
      ))}

      <hr />

      <h3>Total: ${orderTotal}</h3>

      {!locked && items.length > 0 && (
        <button
          onClick={saveOrder}
          style={{
            padding: '10px 16px',
            background: '#333',
            color: '#fff',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Save order
        </button>
      )}

      {locked && <strong>🔒 Order locked</strong>}
    </div>
  );
}
