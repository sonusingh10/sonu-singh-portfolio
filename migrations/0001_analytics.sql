CREATE TABLE IF NOT EXISTS analytics_totals (
  metric TEXT PRIMARY KEY CHECK (metric IN ('page_view', 'resume_download')),
  value INTEGER NOT NULL DEFAULT 0 CHECK (value >= 0)
);

INSERT OR IGNORE INTO analytics_totals (metric, value) VALUES
  ('page_view', 0),
  ('resume_download', 0);
