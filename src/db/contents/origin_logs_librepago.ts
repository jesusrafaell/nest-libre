import { DataSource } from 'typeorm';
import origin_logs_librepago from '../models/origin_logs_librepago.entity';

const data: origin_logs_librepago = {
  name: 'LibrePago API',
};

export default async function (appDataSource: DataSource) {
  const valid = await appDataSource.getRepository(origin_logs_librepago).find();
  if (!valid.length)
    await appDataSource.getRepository(origin_logs_librepago).save(data);
  console.log('listo origin logs librepago');
}
