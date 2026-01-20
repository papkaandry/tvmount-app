'use client';

import { useEffect, useState } from 'react';
import {
  getServices,
  initServicesIfNeeded,
} from '@/app/lib/services';
import {
  getOrders,
  saveOrders,
  Order,
  OrderItem,
} from '@/app/lib/orders';

export default function OrdersPanel() {
  const [services, setServices] = useState<any[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [locked, setLocked] = useState(false);

  // ================= INIT =================
  useEffect(() => {
    // гарантируем, что сервисы существуют
    initServicesIfNeeded();
    setServices(getServices());

    // подгружаем последний заказ (если есть)
    const orders = getOrders();
    if (orders.length > 0) {
      const last = orders[orders.length - 1];
      setItems(last.items);
      setLocked(last.locked);
    }
  }, []);

  // ================= ADD SERVICE =================
  const addService = (s: any) => {
    if (locked) return;

    setItems((prev) => [
      ...prev,
      {
        serviceId: s.id,        // ✅ КРИТИЧЕСКИ ВАЖНО
        name: s.name,
        price: s.price,
        qty: 1,
        total: s.price,
      },
    ]);
  };

  // ================= UPDATE ITEM =================
  const updateItem = (
    index: number,
    field: 'qty' | 'price',
    value: number
  ) => {
    if (locked) return;

    const copy = [...items];
    copy[index][field] = value;
    copy[index].total = copy[index].price * copy[index].qty;
    setItems(copy);
  };

  // ================= TOTAL =================
  const total = items.reduce(
    (sum, i) => sum + i.total,
    0
  );

  // ================= SAVE ORDER =================
  const saveOrder = () => {
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

  // ================= RENDER =================
  return (
    <div>
      <h3>Orders</h3>

      {/* SERVICES */}
      {!locked && (
        <>
          <h4>Services</h4>

          {services.length === 0 && (
            <div>No services found</div>
          )}

          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => addService(s)}
              style={{
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              {s.name} (${s.price})
            </button>
          ))}
        </>
      )}

      <hr />

      {/* ITEMS */}
      {items.length === 0 && (
        <div>No items yet</div>
      )}

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginBottom: 6,
          }}
        >
          <strong style={{ width: 200 }}>
            {item.name}
          </strong>

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
        </div>
      ))}

      <hr />

      <strong>Total: ${total}</strong>

      {!locked && items.length > 0 && (
        <div>
          <button
            onClick={saveOrder}
            style={{ marginTop: 10 }}
          >
            Save Order
          </button>
        </div>
      )}

      {locked && (
        <div style={{ marginTop: 10 }}>
          🔒 Order locked
        </div>
      )}
    </div>
  );
}
