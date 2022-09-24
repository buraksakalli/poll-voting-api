import { Request, Response } from 'express';
import {
  getAllUsers,
  getUserById,
  getAllPolls,
  getPollById,
  createPoll,
  getAllEntries,
  getEntryById,
  createEntry,
} from '../models';

export const get_all_users = async (req: Request, res: Response) => {
  getAllUsers().then(users => {
    res.json(users);
  });
};

export const get_user_by_id = async (req: Request, res: Response) => {
  const id = req.params.id;
  getUserById(id).then(user => {
    res.json(user);
  });
};

export const get_all_polls = async (req: Request, res: Response) => {
  getAllPolls().then(polls => {
    res.json(polls);
  });
};

export const get_poll_by_id = async (req: Request, res: Response) => {
  const id = req.params.id;
  getPollById(id).then(poll => {
    res.json(poll);
  });
};

export const create_poll = async (req: Request, res: Response) => {
  createPoll(req.body).then(poll => {
    res.json(poll);
  });
};

// export const update_poll = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   const poll = new Poll({
//     title: req.body.title,
//     description: req.body.description,
//     options: req.body.options,
//     votes: req.body.votes,
//     user: req.body.user,
//   });
// };

// export const delete_poll = async (req: Request, res: Response) => {
//   const id = req.params.id;
//   deletePoll(id).then((poll) => {
//     res.json(poll);
//   });
// };

export const get_all_entries = async (req: Request, res: Response) => {
  getAllEntries().then(entries => {
    console.log(entries);
    res.json(entries);
  });
};

export const get_entry_by_id = async (req: Request, res: Response) => {
  const id = req.params.id;
  getEntryById(id).then(entry => {
    res.json(entry);
  });
};

export const create_entry = async (req: Request, res: Response) => {
  createEntry(req.body).then(entry => {
    console.log(entry);
    res.json(entry);
  });
};
