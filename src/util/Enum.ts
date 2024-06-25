export enum Action {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
}

export enum Resource {
  USER = "user",
  EQUIPMENT = "equipment",
  SUPPLIER = "supplier",
  EQUIPMENT_TYPE = "equipment-type",
  LOAN_HISTORY = "loan-history",
  MAINTENANCE = "maintenance",
  LOCATION = "location",
  ROLE = "role",
}

export enum Status {
  NEW = "new",
  IN_USE = "in-use",
  NOT_IN_USE = "not-in-use",
  ON_LOAN = "on-loan",
  BROKEN = "broken",
  UNDER_REPAIR = "under-repair",
  LOST = "lost",
  DISPOSED = "disposed",
}
