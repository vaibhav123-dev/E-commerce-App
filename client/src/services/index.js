export function getInitials(firstName, lastName) {
  const firstInitial = firstName?.charAt(0).toUpperCase() || "";
  const lastInitial = lastName?.charAt(0).toUpperCase() || "";

  const initialsStr = `${firstInitial}${lastInitial}`;

  return initialsStr;
}
