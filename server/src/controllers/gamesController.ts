import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

  public async list(req: Request, res: Response) {
    await pool.query('SELECT * FROM games', function(err, result, fields) {
      if (err) throw err;
      res.json(result);
    });
  }

  public async getOne(req: Request, res: Response): Promise<any> {
    const { id } = req.params;
    await pool.query('SELECT * FROM games where id = ?', [id], function(err, result, fields) {
      if (err) throw err;
      res.json(result);
    });

  }

  public async create(req: Request, res: Response): Promise<void> {
    await pool.query('INSERT INTO games set ?', [req.body]);
    res.json({ message: 'Game Saved' });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('DELETE FROM games WHERE id = ?', [id]);
    res.json({ message: 'Game deleted' });

  }

  public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await pool.query('UPDATE games SET ? WHERE id = ?', [req.body, id]);
    res.json({ message: 'Game updated' });
  }

}

const gamesController = new GamesController();
export default gamesController;
