import { Request, Response } from 'express';
import { IUser } from '../models';
import {
  getAllUsers,
  getUserById,
  getAllPolls,
  createPoll,
  getAllEntries,
  getEntryById,
  createEntry,
  createUser,
  userLogin,
  getPollBySlug,
  getUsersPollsByUserId,
} from '../services';

export const get_all_users = async (req: Request, res: Response) => {
  const users: Array<IUser> = await getAllUsers();

  res.status(200).json({
    status: 'success',
    data: users,
  });
};

export const get_users_polls = async (req: Request, res: Response) => {
  // @ts-ignore
  getUsersPollsByUserId(req.user._id).then(polls => {
    res.json(polls);
  });
};

export const get_user_by_id = async (req: Request, res: Response) => {
  const { id } = req.params;
  getUserById(id).then(user => {
    res.json(user);
  });
};

// TODO: add validator middlware to create_user
export const create_user = async (req: Request, res: Response) => {
  createUser(req.body).then(user => {
    res.json(user);
  });
};

export const get_all_polls = async (req: Request, res: Response) => {
  const { page = 1 } = req.query;
  getAllPolls(Number(page)).then(polls => {
    res.json(polls);
  });
};

export const get_poll_by_id = async (req: Request, res: Response) => {
  const slug = req.params.id;
  getPollBySlug(slug).then(poll => {
    res.json(poll);
  });
};

export const create_poll = async (req: Request, res: Response) => {
  //@ts-ignore
  createPoll({ ...req.body, user_id: req.user._id }).then(poll => {
    res.json(poll);
  });
};

// export const update_poll = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const poll = new Poll({
//     title: req.body.title,
//     description: req.body.description,
//     options: req.body.options,
//     votes: req.body.votes,
//     user: req.body.user,
//   });
// };

// export const delete_poll = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   deletePoll(id).then((poll) => {
//     res.json(poll);
//   });
// };

export const get_all_entries = async (req: Request, res: Response) => {
  getAllEntries().then(entries => {
    res.json(entries);
  });
};

export const get_entry_by_id = async (req: Request, res: Response) => {
  const { id } = req.params;
  getEntryById(id).then(entry => {
    res.json(entry);
  });
};

export const create_entry = async (req: Request, res: Response) => {
  // @ts-ignore
  createEntry({ ...req.body, user_id: req.user._id }).then(entry => {
    res.status(entry.status).json(entry);
  });
};

export const login = async (req: Request, res: Response) => {
  userLogin(req.body.email, req.body.password).then(response => {
    res.header('Authorization').status(response.status).json(response);
  });
};
