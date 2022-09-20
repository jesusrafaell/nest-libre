import { DataSource } from 'typeorm';
import AfiliadosLibrePago from '../models/afiliados_librepago.entity';

const data: AfiliadosLibrePago[] = [
  { afiliado: '000000722000030' },
  { afiliado: '000000722000031' },
  { afiliado: '000000722000032' },
  { afiliado: '000000722000033' },
  { afiliado: '000000722000034' },
  { afiliado: '000000722000035' },
  { afiliado: '000000722000036' },
  { afiliado: '000000722000037' },
  { afiliado: '000000722000038' },
  { afiliado: '000000722000039' },
];
export default async function (appDataSource: DataSource) {
  const valid = await appDataSource.getRepository(AfiliadosLibrePago).find();
  if (!valid.length)
    await appDataSource.getRepository(AfiliadosLibrePago).save(data);
  console.log('listo afiliados');
}
