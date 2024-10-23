export const validateCpfCnpj = (value: string) => {
  // Remove caracteres não numéricos
  const numbers = value.replace(/[^\d]/g, '');

  // Valida CPF
  if (numbers.length === 11) {
    if (/^(\d)\1{10}$/.test(numbers)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(numbers.charAt(i)) * (10 - i);
    }
    let rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(numbers.charAt(9))) return false;
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(numbers.charAt(i)) * (11 - i);
    }
    rev = 11 - (sum % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(numbers.charAt(10))) return false;
    return true;
  }

  // Valida CNPJ
  if (numbers.length === 14) {
    if (/^(\d)\1{13}$/.test(numbers)) return false;
    let size = numbers.length - 2;
    let numbers_array = numbers.split('');
    let verification = numbers_array.splice(size);
    let sum = 0;
    let pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers_array[size - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(verification[0])) return false;
    size = size + 1;
    numbers_array = numbers.split('');
    verification = numbers_array.splice(size);
    sum = 0;
    pos = size - 7;
    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers_array[size - i]) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(verification[0])) return false;
    return true;
  }

  return false;
};