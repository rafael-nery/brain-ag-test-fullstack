import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsValidAreaConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any
    const totalArea = object.totalArea
    const arableLand = object.arableLand
    const vegetationArea = object.vegetationArea

    return totalArea >= arableLand + vegetationArea
  }

  defaultMessage(args: ValidationArguments) {
    return 'A soma da área agricultável e vegetação não pode ser maior que a área total da fazenda'
  }
}

export function IsValidArea(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidAreaConstraint
    })
  }
}
