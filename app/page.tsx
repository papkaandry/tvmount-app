<div style={styles.content}>
  {activeTab === 'Admin' && role === 'admin' && (
    <AdminPanel />
  )}

  {activeTab === 'Orders' && <OrdersPanel />}

  {activeTab === 'Works' && <WorksPanel />}

  {activeTab !== 'Admin' &&
    activeTab !== 'Orders' &&
    activeTab !== 'Works' && (
      <div>
        <strong>Active tab:</strong> {activeTab}
      </div>
    )}
</div>
