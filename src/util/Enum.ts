export enum Action {
  READ = "read",
  WRITE = "write",
  DELETE = "delete",
}

export enum Resource {
  USER = "user",
  POST = "post",
  ROLE = "role",
  COMMENT = "comment",
  FICTION = "fiction",
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
