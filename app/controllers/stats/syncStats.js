const { handleError } = require('../../utils')
const Stats = require('../../models/stats')
const { insertMany } = require('../../middleware/db')
const {
  getStatsFromApi,
  manyStatsExist,
  deleteStats
} = require('./helpers')

const processResponse = (hasBeenInserted, res) => {
  if(hasBeenInserted){
    res.status(201).json({msg: 'Las estadísticas han sido actualizadas exitosamente'});
  } else {
    handleError(res, { code: 400, msg: 'Ocurrió un error al insertas las estadísticas' });
  }
}

const syncStats = async (__req, res) => {
  try {
    const newStatsData = await getStatsFromApi()
    const statsExist = await manyStatsExist()
    if(newStatsData.length > 0 && statsExist) {
      const hasBeenDeleted = await deleteStats();
      if(hasBeenDeleted) {
        processResponse(await insertMany(newStatsData, Stats), res);
      } else {
        handleError(res, { code: 400, msg: 'Ocurrió un error eliminando los datos' });
      }
    } else {
      if(newStatsData.length <= 0) {
        handleError(res, { code: 400, msg: 'No fue posible obtener nuevas estadísticas' });
      } else {
        processResponse(await insertMany(newStatsData, Stats), res);
      }
    }
  } catch (error) {
    handleError(res, error)
  }
}

module.exports = { syncStats }
