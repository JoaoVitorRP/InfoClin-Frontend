export const cpfFormatter = (value) => {
  if (!value) return "";

  const cleanCpf = value.replace(/\D/g, "");

  if (cleanCpf.length === 11) return cleanCpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");

  return cleanCpf;
};

export const telephoneFormatter = (value) => {
  if (!value) return "";

  const cleanPhoneNumber = value.replace(/\D/g, "");

  // Celular: (XX) XXXXX-XXXX
  if (cleanPhoneNumber.length === 11) return cleanPhoneNumber.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");

  // Fixo: (XX) XXXX-XXXX
  if (cleanPhoneNumber.length === 10) return cleanPhoneNumber.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");

  return cleanPhoneNumber;
};
