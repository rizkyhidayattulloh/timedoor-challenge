import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { createQueryBuilder, getRepository, Repository } from "typeorm";

@Injectable()
@ValidatorConstraint({ name: 'isUnique', async: true })
export class IsUnique implements ValidatorConstraintInterface {
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const [entityClass, findCondition = validationArguments.property] = validationArguments.constraints;

        return (
            (await getRepository(entityClass).count({
                where:
                    typeof findCondition === 'function'
                        ? findCondition()
                        : {
                            [findCondition || validationArguments.property]: value,
                        },
            })) <= 0
        );
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `${validationArguments.property} alredy used`;
    }
}