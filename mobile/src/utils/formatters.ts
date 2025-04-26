export const formatCpf = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1');

export const formatCnpj = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');

export const formatCep = (value: string) =>
  value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{3})+?$/, '$1-$2')
    .replace(/(-\d{3})(\d+?)/, '$1');

export const formatDate = (value: string) => {
  const parts = [];

  value = value.replace(/\D/g, '');

  if (value.length > 0) parts.push(value.substring(0, 2));
  if (value.length > 2) parts.push(value.substring(2, 4));
  if (value.length > 4) parts.push(value.substring(4, 8));

  return parts.join('/');
};

export const formatBrazilPhoneNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (digits.length <= 10) {
    return digits.replace(
      /^(\d{0,2})(\d{0,4})(\d{0,4})$/,
      (_, ddd, part1, part2) => {
        if (part2) return `(${ddd}) ${part1}-${part2}`;
        if (part1) return `(${ddd}) ${part1}`;
        if (ddd) return `(${ddd}`;
        return '';
      }
    );
  }

  // (99) 9 9999-9999
  return digits.replace(
    /^(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})$/,
    (_, ddd, nine, part1, part2) => {
      if (part2) return `(${ddd}) ${nine} ${part1}-${part2}`;
      if (part1) return `(${ddd}) ${nine} ${part1}`;
      if (nine) return `(${ddd}) ${nine}`;
      if (ddd) return `(${ddd}`;
      return '';
    }
  );
};
