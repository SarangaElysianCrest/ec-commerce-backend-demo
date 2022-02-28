export const CREATE_USER = 1;
export const EDIT_USER = CREATE_USER << 1;
export const DELETE_USER = EDIT_USER << 1;

export const EDIT_MEALS = DELETE_USER << 1;

export const ROOT_PERMISSION = (EDIT_MEALS << 1) - 1;

export function hasPermission(perm: number, checkPerm: number) {
  if (perm & checkPerm) {
    return true;
  }
  return false;
}
