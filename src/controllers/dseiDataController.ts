import { Request, Response } from 'express'
import { Sequelize } from 'sequelize'
import Dsei from '../models/Dsei'
import DseiData from '../models/DseiData'

class DseiDataController {
  // retorna todos os dados de DSEI
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const data = await Dsei.findAll({
        include: {
          association: 'dseidata',
          attributes: { exclude: ['code', 'createdAt', 'updatedAt'] },
          separate: true,
          order: [['date', 'desc']]
        }
      })

      return res.json(data)
    } catch (error) {
      return res.status(400).json({
        message: ' ' + error
      })
    }
  }

  // retorna os dados de DSEI por página e limite
  public async show (req: Request, res: Response): Promise<Response> {
    try {
      const limit: number = (req.query.limit as unknown) as number
      const page: number = (req.query.page as unknown) as number
      const offset = (page - 1) * limit
      const data = await Dsei.findAll({
        include: {
          association: 'dseidata',
          attributes: { exclude: ['code', 'createdAt', 'updatedAt'] },
          separate: true,
          order: [['date', 'desc']],
          offset: offset,
          limit: limit
        }
      })

      return res.json(data)
    } catch (error) {
      return res.status(400).json({
        message: ' ' + error
      })
    }
  }

  // retorna os dados de um DSEI
  public async dsei (req: Request, res: Response): Promise<Response> {
    try {
      const data = await Dsei.findAll({
        include: {
          association: 'dseidata',
          attributes: { exclude: ['code', 'createdAt', 'updatedAt'] },
          separate: true,
          order: [['date', 'desc']]
        },
        where: { code: req.query.code }
      })

      return res.json(data)
    } catch (error) {
      return res.status(400).json({
        message: ' ' + error
      })
    }
  }

  // retorna a soma de um DSEI
  public async sumOne (req: Request, res: Response): Promise<Response> {
    try {
      const code: number = (req.query.code as unknown) as number

      const dseiname = await Dsei.findByPk(code)

      const dseisum = await DseiData.findAll({
        attributes: [
          [
            Sequelize.cast(
              Sequelize.fn('sum', Sequelize.col('accumulated_cases')),
              'int'
            ),
            'accumulatedCases'
          ],
          [
            Sequelize.cast(
              Sequelize.fn('sum', Sequelize.col('accumulated_deaths')),
              'int'
            ),
            'accumulatedDeaths'
          ]
        ],
        where: { code }
      })

      const accumulatedCases =
        dseisum && dseisum[0] ? dseisum[0].accumulatedCases : 0
      const accumulatedDeaths =
        dseisum && dseisum[0] ? dseisum[0].accumulatedDeaths : 0

      return res.json({
        accumulatedCases,
        accumulatedDeaths,
        name: dseiname.name
      })
    } catch (error) {
      return res.status(400).json({
        message: ' ' + error
      })
    }
  }

  // retorna a soma por data de todos os dsei
  public async sumByDate (req: Request, res: Response): Promise<Response> {
    try {
      const data = await DseiData.findAll({
        attributes: [
          'date',
          [
            Sequelize.cast(
              Sequelize.fn('sum', Sequelize.col('accumulated_cases')),
              'int'
            ),
            'accumulatedCases'
          ],
          [
            Sequelize.cast(
              Sequelize.fn('sum', Sequelize.col('accumulated_deaths')),
              'int'
            ),
            'accumulatedDeaths'
          ]
        ],
        group: ['date']
      })

      return res.json(data)
    } catch (error) {
      return res.status(400).json({
        message: ' ' + error
      })
    }
  }

  // retorna a soma de todos os DSEI
  public async sumAll (req: Request, res: Response): Promise<Response> {
    try {
      const dseisum = await DseiData.findAll({
        attributes: [
          [
            Sequelize.cast(
              Sequelize.fn('sum', Sequelize.col('accumulated_cases')),
              'int'
            ),
            'accumulatedCases'
          ],
          [
            Sequelize.cast(
              Sequelize.fn('sum', Sequelize.col('accumulated_deaths')),
              'int'
            ),
            'accumulatedDeaths'
          ]
        ]
      })

      const accumulatedCases =
        dseisum && dseisum[0] ? dseisum[0].accumulatedCases : 0
      const accumulatedDeaths =
        dseisum && dseisum[0] ? dseisum[0].accumulatedDeaths : 0

      return res.json({
        accumulatedCases,
        accumulatedDeaths
      })
    } catch (error) {
      return res.status(400).json({
        message: ' ' + error
      })
    }
  }

  // cadastra novos dados de DSEI
  public async store (req: Request, res: Response): Promise<Response> {
    const data = await DseiData.sync()
      .then(async () => {
        return await DseiData.bulkCreate(req.body)
      })
      .catch((error) => res.status(400).json({ message: ' ' + error }))

    return res.json(data)
  }

  // deleta um DSEI
  public async destroy (req: Request, res: Response): Promise<Response> {
    try {
      await DseiData.destroy({ where: { id: req.params.id } })

      return res.json({ message: 'Deletado com sucesso!' })
    } catch (error) {
      return res.status(400).json({
        message: ' ' + error
      })
    }
  }
}

export default new DseiDataController()
