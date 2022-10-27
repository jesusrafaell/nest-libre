import { appDataSource } from '../config/data-source';
import afiliados_api from './afiliadosApi';
import origin_logs_librepago from './origin_logs_librepago';

appDataSource
  .initialize()
  .then(async () => {
    await afiliados_api(appDataSource);
    await origin_logs_librepago(appDataSource);
    process.exit();
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });
