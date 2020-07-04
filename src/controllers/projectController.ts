import { Request, Response } from 'express'

class ProjectController {
  public index (req: Request, res: Response) {
    return res.json({ id: req.userId })
  }
}

export default new ProjectController()
