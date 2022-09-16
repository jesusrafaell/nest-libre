import { appDataSource } from '../config/data-source';
import afiliados_librepago from './afiliados_librepago';

appDataSource
  .initialize()
  .then(async () => {
    await afiliados_librepago(appDataSource);
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });
