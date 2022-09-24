import { User, Poll, Entry, IPoll, IEntry } from '../schema';

export const getAllUsers = async () => {
  const users = await User.find({});
  return users;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const getAllPolls = async () => {
  const polls = await Poll.find({});
  return polls;
};

export const getPollById = async (id: string) => {
  const poll = await Poll.findById(id);
  return poll;
};

export const createPoll = async (body: IPoll) => {
  const poll = new Poll({ ...body });

  const res = poll
    .save()
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
  return res;
};

// export const updatePoll = async (id: string, poll: any) => {
//   const updatedPoll = await Poll.findByIdAndUpdate(id, poll, { new: true });
//   return updatedPoll;
// };

// export const deletePoll = async (id: string) => {
//   const deletedPoll = await Poll.findByIdAndDelete(id);
//   return deletedPoll;
// };

export const getAllEntries = async () => {
  const entries = await Entry.find({});
  return entries;
};

export const getEntryById = async (id: string) => {
  const entry = await Entry.findById(id);
  return entry;
};

export const createEntry = async (body: IEntry) => {
  const entry = new Entry({
    poll_id: body.poll_id,
    user_id: body.user_id,
    option: body.option,
  });

  const res = entry
    .save()
    .then(res => {
      return {
        status: 200,
        message: 'Entry created successfully',
        data: res,
      };
    })
    .catch(err => {
      return {
        status: 500,
        message: err?.message,
      };
    });
  return res;
};

export const updateEntry = async (id: string, entry: any) => {
  const updatedEntry = await Entry.findByIdAndUpdate(id, entry, { new: true });
  return updatedEntry;
};
