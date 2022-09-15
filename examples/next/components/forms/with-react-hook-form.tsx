import { useFetchAddresses } from '@jp-postal-code/react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../ui/button';
import FormControl from '../ui/form-control';
import Input from '../ui/input';
import Label from '../ui/label';
import Select from '../ui/select';

interface Props {
  initialValue?: {
    postalCode: string;
    address1: string;
  };
}

interface FormInputs {
  postalCode: string;
  address1: string;
  address2: string;
}

const WithReactHookForm: FC<Props> = ({ initialValue }) => {
  const { register, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: initialValue,
  });

  const postalCode = watch('postalCode');
  const { addresses } = useFetchAddresses(postalCode);

  return (
    <div>
      <h1>With react-hook-form</h1>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <FormControl>
          <Label htmlFor="postal-code">郵便番号</Label>
          <Input
            id="postal-code"
            placeholder="000-0000"
            {...register('postalCode', { required: true })}
          />
        </FormControl>

        <FormControl>
          <Label htmlFor="address1">住所</Label>
          <Select
            id="address1"
            {...register('address1', {
              disabled: addresses == null,
              required: true,
            })}
          >
            {addresses?.map(({ region, locality, address1, address2 }) => {
              const value = `${region}${locality}${address1}${address2}`;

              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <Label htmlFor="address2">番地以降</Label>
          <Input id="address2" {...register('address2')} />
        </FormControl>

        <Button type="submit">送信</Button>
      </form>
    </div>
  );
};

export default WithReactHookForm;
