import {
  get_all_users,
  get_user_by_id,
  get_all_polls,
  get_poll_by_id,
  create_poll,
  get_all_entries,
  get_entry_by_id,
  create_entry,
} from '../controller';

export default (app: any) => {
  app.route('/users').get(get_all_users);
  app.route('/users/:id').get(get_user_by_id);
  app.route('/polls').get(get_all_polls);
  app.route('/polls/:id').get(get_poll_by_id);
  app.route('/polls').post(create_poll);
  // app.route("/polls/:id").put(update_poll);
  // app.route("/polls/:id").delete(delete_poll);

  app.route('/entry').get(get_all_entries);
  app.route('/entry/:id').get(get_entry_by_id);
  app.route('/entry').post(create_entry);
  // app.route("/entries/:id").put(update_entry);
  // app.route("/entries/:id").delete(delete_entry);
};
