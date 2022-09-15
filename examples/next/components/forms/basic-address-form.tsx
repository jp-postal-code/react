import { useFetchAddresses } from '@jp-postal-code/react';
import { FC, FormEventHandler, useState } from 'react';
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

const BasicAddressForm: FC<Props> = ({ initialValue }) => {
  const [postalCode, setPostalCode] = useState(initialValue?.postalCode ?? '');
  const [address1, setAddress1] = useState(initialValue?.address1 ?? '');
  const [address2, setAddress2] = useState('');
  const { addresses } = useFetchAddresses(postalCode);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log({
      postalCode,
      address1,
      address2,
    });
  };

  return (
    <div>
      <h1>BasicAddressForm</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Label htmlFor="postal-code">郵便番号</Label>
          <Input
            id="postal-code"
            placeholder="000-0000"
            value={postalCode}
            onChange={(event) => setPostalCode(event.target.value)}
            required
          />
        </FormControl>

        <FormControl>
          <Label htmlFor="address1">住所</Label>
          <Select
            id="address1"
            disabled={addresses == null}
            value={address1}
            onChange={(event) => setAddress1(event.target.value)}
            required
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
          <Input
            id="address2"
            value={address2}
            onChange={(event) => setAddress2(event.target.value)}
          />
        </FormControl>

        <Button type="submit">送信</Button>
      </form>
    </div>
  );
};

export default BasicAddressForm;
