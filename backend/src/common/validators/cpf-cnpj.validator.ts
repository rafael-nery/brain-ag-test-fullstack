import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsCpfCnpjConstraint implements ValidatorConstraintInterface {
  validate(cpfCnpj: string, args: ValidationArguments) {
    const cleanCpfCnpj = cpfCnpj.replace(/[^\d]+/g, '')

    if (cleanCpfCnpj.length === 11) {
      return this.validateCpf(cleanCpfCnpj)
    } else if (cleanCpfCnpj.length === 14) {
      return this.validateCnpj(cleanCpfCnpj)
    }

    return false
  }

  private validateCpf(cpf: string): boolean {
    // Implementação básica da validação de CPF
    // Esta é uma validação simplificada e não deve ser usada em produção
    return cpf !== '00000000000' && cpf.length === 11
  }

  private validateCnpj(cnpj: string): boolean {
    // Implementação básica da validação de CNPJ
    // Esta é uma validação simplificada e não deve ser usada em produção
    return cnpj !== '00000000000000' && cnpj.length === 14
  }

  defaultMessage(args: ValidationArguments) {
    return 'CPF ou CNPJ inválido'
  }
}

export function IsCpfCnpj(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCpfCnpjConstraint
    })
  }
}
