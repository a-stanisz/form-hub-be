CREATE TABLE IF NOT EXISTS Submission (
  "id" CHAR(16),
  "sumbittedAt" TIMESTAMP,
  "data" JSONB,
  "createdAt" TIMESTAMP,
  "updatedAt" TIMESTAMP,

  PRIMARY KEY ("id")
);