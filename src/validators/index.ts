import { ObjectSchema } from 'joi';
import { entryValidationSchema as entry } from './Entry';
import { userValidationSchema as user } from './User';

export type IValidatorType = keyof typeof Validators;

const Validators: { [key: string]: ObjectSchema<any> } = {
  entry,
  user,
};

export default Validators;
