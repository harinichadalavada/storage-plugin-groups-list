// (C) Copyright 2023 Hewlett Packard Enterprise Development LP
export function sortDescending(a: string, b: string) {
  if (a > b) {
    return -1
  }
  if (a < b) {
    return 1
  }
  return 0
}

export function sortAscending(a: string, b: string) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}
