import mongoose, { Document, Model, Schema } from "mongoose";

export interface IIncomeRecord {
  id: string;
  name: string;
  money_collected: number;
  session_lasted: string;
  start_time: string;
  end_time: string;
  date: string;
  rate: number;
}

export interface IProfile {
  label: string;
  incomeRecords: IIncomeRecord[];
}

export interface IUser extends Document {
  email: string;
  name?: string;
  profiles: IProfile[];
  user?: any;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  name: String,
  profiles: [
    {
      label: {
        type: String,
      },
      incomeRecords: [
        {
          id: String,
          name: String,
          rate: Number,
          money_collected: Number,
          date: String,
          session_lasted: String,
          start_time: String,
          end_time: String,
        },
      ],
    },
  ],
});

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default UserModel;
