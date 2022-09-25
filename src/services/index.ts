import { IUser, User } from '../models/User';
import { Poll, IPoll } from '../models/Poll';
import { Entry, IEntry } from '../models/Entry';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const getAllUsers = async () => {
  const users = await User.find({}).select('-password');
  return users;
};

export const getUserById = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

export const createUser = async (user: IUser) => {
  const emailExist = await User.findOne({ email: user.email });
  if (emailExist) return { message: 'Email already exists' };

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const newUser = await new User({
    ...user,
    password: hashedPassword,
  });

  const savedUser = await newUser.save();

  return {
    id: savedUser._id,
    fullname: savedUser.fullname,
  };
};

export const getAllPolls = async () => {
  const polls = await Poll.find({});
  return polls;
};

export const getPollById = async (id: string) => {
  const poll = await Poll.findById(id);
  return poll;
};

export const getPollBySlug = async (slug: string) => {
  const poll = await Poll.findOne({ slug });
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
  // check if user has voted
  const userHasVoted = await Entry.findOne({
    poll_id: body.poll_id,
    user_id: body.user_id,
  });

  if (userHasVoted) return { message: 'You have already voted', status: 400 };

  const entry = new Entry({
    poll_id: body.poll_id,
    user_id: body.user_id,
    option: body.option,
  });

  const res: any = entry
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

export const userLogin = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) return { message: 'Email or password is wrong', status: 401 };

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return { message: 'Email or password is wrong', status: 401 };

  const token = jwt.sign({ _id: user._id, fullname: user.fullname }, process.env['TOKEN_SECRET'] as string);

  return {
    id: user._id,
    fullname: user.fullname,
    token,
    status: 200,
  };
};
