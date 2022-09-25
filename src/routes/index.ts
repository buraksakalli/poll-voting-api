import { Application, Request } from 'express';
import {
  get_all_users,
  get_user_by_id,
  get_all_polls,
  get_poll_by_id,
  create_poll,
  get_all_entries,
  get_entry_by_id,
  create_entry,
  create_user,
  login,
  get_users_polls,
} from '../controller';
import { auth } from '../utils/verifyToken';

export default (app: Application) => {
  app.route('/users/:id').get(get_user_by_id);
  app.route('/users').post(create_user);
  app.route('/polls').get(get_all_polls);
  app.route('/polls/:id').get(get_poll_by_id);
  // app.route("/polls/:id").put(update_poll);
  // app.route("/polls/:id").delete(delete_poll);

  app.route('/entry').get(get_all_entries);
  app.route('/entry/:id').get(get_entry_by_id);
  // app.route("/entries/:id").put(update_entry);
  // app.route("/entries/:id").delete(delete_entry);
  app.route('/login').post(login);

  // @ts-ignore
  app.use(auth);
  app.route('/auth').post((req, res) => {
    // @ts-ignore
    res.status(200).json({ message: 'Authenticated', auth: true, user: req.user });
  });
  app.route('/users').get(get_all_users);
  app.route('/entry').post(create_entry);
  app.route('/polls').post(create_poll);
  app.route('/user/polls').get(get_users_polls);
};
