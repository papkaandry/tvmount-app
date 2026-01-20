'use client';

import { useEffect, useState } from 'react';
import {
  getServices,
  initServicesIfNeeded,
  saveServices,
  StoredService,
} from '@/app/lib/services';

export default function WorksPanel() {
  const [services, setServices] = useState<StoredService[]>([]);
  const role =
    typeof window !== 'undefined'
      ? localStorage.getItem('role')
      : null;

  const isAdmin = role === 'admin';

  useEffect(() => {
    initServicesIfNeeded();
    setServices(getServices());
  }, []);

  const updatePrice = (id: string, price: number) => {
    const updated = services.map((s) =>
      s.id === id ? { ...s, price } : s
    );
    setServices(updated);
    saveServices(updated);
  };

  const toggleEnabled = (id: string) => {
    const updated = services.map((s) =>
      s.id === id ? { ...s, enabled: !s.enabled } : s
    );
    setServices(updated);
    saveServices(updated);
  };

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>
        Works & Prices
      </h3>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Active</th>
            <th>Service</th>
            <th>Price ($)</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id}>
              <td>
                <input
                  type="checkbox"
                  checked={s.enabled}
                  disabled={!isAdmin}
                  onChange={() => toggleEnabled(s.id)}
                />
              </td>

              <td>{s.name}</td>

              <td>
                {isAdmin ? (
                  <input
                    type="number"
                    value={s.price}
                    onChange={(e) =>
                      updatePrice(
                        s.id,
                        Number(e.target.value)
                      )
                    }
                    style={styles.priceInput}
                  />
                ) : (
                  `$${s.price}`
                )}
              </td>

              <td>{s.unit || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!isAdmin && (
        <div style={styles.readOnly}>
          Only admin can edit prices
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */

const styles: Record<string, React.CSSProperties> = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },

  priceInput: {
    width: 80,
    padding: '4px 6px',
  },

  readOnly: {
    marginTop: 12,
    fontSize: 13,
    opacity: 0.6,
  },
};
