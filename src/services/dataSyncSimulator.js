// Simulated 06:00 AM IST Automated Public Data Fetcher & Resilient Fallback Cache
export class DataSyncService {
  constructor() {
    this.status = "live"; // "live" | "syncing" | "stale_fallback"
    this.lastSyncTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + " IST";
    this.subscribers = new Set();
    this.syncLatencyMs = 650;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    const payload = {
      status: this.status,
      lastSyncTime: this.lastSyncTime,
      isStale: this.status === "stale_fallback",
      nextSyncTime: "Tomorrow at 06:00 AM IST"
    };
    this.subscribers.forEach(cb => cb(payload));
  }

  // Trigger manual or cron-simulated sync
  async triggerSync() {
    this.status = "syncing";
    this.notify();

    return new Promise((resolve) => {
      setTimeout(() => {
        this.status = "live";
        this.lastSyncTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }) + " IST";
        this.notify();
        resolve({ success: true, timestamp: this.lastSyncTime });
      }, this.syncLatencyMs);
    });
  }

  // Simulate API outage to demonstrate cached historical fallback
  toggleFallbackMode() {
    if (this.status === "stale_fallback") {
      this.status = "live";
    } else {
      this.status = "stale_fallback";
    }
    this.notify();
    return this.status;
  }

  getState() {
    return {
      status: this.status,
      lastSyncTime: this.lastSyncTime,
      isStale: this.status === "stale_fallback",
      nextSyncTime: "Tomorrow at 06:00 AM IST"
    };
  }
}

export const syncManager = new DataSyncService();
